const Cliente = require('../models/Cliente')
const Cryptojs = require('crypto-js')
const CHAVE_SEGREDO = 'chave_baixa'

const Cadastrar = async (req, res) => {
    const valor = req.body

    if (!valor.nome || !valor.email || !valor.senha || !valor.cpf || !valor.endereco || !valor.telefone) {
        return res.status(400).json({ message: 'Coloque todos os valores' })
    }

    if (valor.cpf.length !== 11) {
        return res.status(400).json({ message: 'valor do cpf tem que ser 11' })
    }

    try {
        const cpfCrypto = Cryptojs.AES.encrypt(valor.cpf, CHAVE_SEGREDO).toString()
        const senhaCrypto = Cryptojs.AES.encrypt(valor.senha, CHAVE_SEGREDO).toString()

        await Cliente.create({
            nome: valor.nome,
            email: valor.email,
            senha: senhaCrypto,
            cpf: cpfCrypto,
            endereco: valor.endereco,
            telefone: valor.telefone
        })

        res.status(201).json({ message: 'Dados cadastrados' })
    } catch (err) {
        res.status(500).json({ message: 'não foi possível cadastrar os dados' })
        console.error('não foi possível cadastrar os dados', err)
    }
}

const Listar = async (req, res) => {
    try {
        const cliente = await Cliente.findAll()
        let resultado = []

        cliente.forEach((el) => {
            let cpfdescripto = ''
            try {
                const bytes = Cryptojs.AES.decrypt(el.cpf, CHAVE_SEGREDO)
                cpfdescripto = bytes.toString(Cryptojs.enc.Utf8)

            } catch (err) {
                cpfdescripto = 'Erro ao descryptografar'
                console.error('Erro ao descryptografar', err)
            }
            resultado.push({
                codCliente: el.codCliente,
                nome: el.nome,
                email: el.email,
                cpf: cpfdescripto,
                endereco: el.endereco,
                telefone: el.telefone
            })
        })

        return res.status(200).json(resultado)
    } catch (err) {
        res.status(500).json({ message: 'Erro na operação' })
        console.error('Erro na operação', err)
    }
}

const Consultar = async (req, res) => {
    const id = req.params.id

    try {
        const cliente = await Cliente.findByPk(id)
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado' })
        }

        const bytes = Cryptojs.AES.decrypt(cliente.cpf, CHAVE_SEGREDO)
        console.log('bytes = ', bytes)
        const cpfdescripto = bytes.toString(Cryptojs.enc.Utf8)
        console.log('cpfdescripto = ', cpfdescripto)

        return res.status(200).json({
            codCliente: cliente.codCliente,
            nome: cliente.nome,
            email: cliente.email,
            cpf: cpfdescripto,
            endereco: cliente.endereco,
            telefone: cliente.telefone
        })

    } catch (err) {
        res.status(500).json({ message: 'Erro na operação' })
        console.error('Erro na operação', err)
    }
}

const Atualizar = async (req, res) => {
    const id = req.params.id
    const valor = req.body

    try {
        const cliente = await Cliente.findByPk(id)
        if (!cliente) {
            return res.status(400).json({ message: 'Cliente não encontrado' })
        }

        const dadosAtualizado = { ...valor }

        if (valor.cpf) {
            if (valor.cpf.length !== 11) {
                return res.status(400).json({ message: 'valor do cpf tem que ser 11' })
            }
            dadosAtualizado.cpf = Cryptojs.AES.encrypt(valor.cpf, CHAVE_SEGREDO).toString()
        }

        if (valor.senha) {
            dadosAtualizado.senha = Cryptojs.AES.encrypt(valor.senha, CHAVE_SEGREDO).toString()
        }

        await Cliente.update(dadosAtualizado, { where: { codCliente: id } })
        return res.status(201).json({ message: 'dados atualizados' })
    } catch (err) {
        res.status(500).json({ message: 'Erro na operação' })
        console.error('Erro na operação', err)
    }
}

const apagar = async (req, res) => {
    const id = req.params.id


    try {

        const cliente = await Cliente.findByPk(id)
        if (!cliente) {
            return res.status(400).json({ message: 'Cliente não encontrado' })
        }

        await Cliente.destroy({where: {codCliente: id}})
        res.status(200).json({message:' Operação realizada com sucesso'})

    } catch (err) {
        res.status(500).json({ message: 'Erro na operação' })
        console.error('Erro na operação', err)
    }
}

const ConsultarNome = async (req, res) => {
    const nome = req.params.nome

    try {
        const cliente = await Cliente.findOne({where: {nome: nome}})
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado' })
        }

        const bytes = Cryptojs.AES.decrypt(cliente.cpf, CHAVE_SEGREDO)
        console.log('bytes = ', bytes)
        const cpfdescripto = bytes.toString(Cryptojs.enc.Utf8)
        console.log('cpfdescripto = ', cpfdescripto)

        return res.status(200).json({
            codCliente: cliente.codCliente,
            nome: cliente.nome,
            email: cliente.email,
            cpf: cpfdescripto,
            endereco: cliente.endereco,
            telefone: cliente.telefone
        })

    } catch (err) {
        res.status(500).json({ message: 'Erro na operação' })
        console.error('Erro na operação', err)
    }
}

module.exports = {Cadastrar, Listar, Consultar, Atualizar, apagar, ConsultarNome}