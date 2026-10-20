const Veiculo = require('../models/Veiculo')
const Cliente = require('../models/Cliente')
const Cryptojs = require('crypto-js')
const CHAVE_SEGREDO = 'chave_baixa'

const Cadastrar = async (req, res) => {
    const valor = req.body

    if (!valor.modelo || !valor.marca || !valor.codRastreador || !valor.idCliente || !valor.placa) {
        return res.status(400).json({ message: 'Coloque todos os valores' })
    }

    try {
        const cliente = await Cliente.findByPk(valor.idCliente)
        if (!cliente) {
            return res.status(400).json({ message: 'cliente não encontrado' })
        }

        const codRastreadorCrypto = Cryptojs.AES.encrypt(valor.codRastreador, CHAVE_SEGREDO).toString()

        await Veiculo.create({
            modelo: valor.modelo,
            marca: valor.marca,
            codRastreador: codRastreadorCrypto,
            placa: valor.placa,
            idCliente: valor.idCliente
        })

        res.status(201).json({ message: 'Dados cadastrados' })
    } catch (err) {
        res.status(500).json({ message: 'não foi possível cadastrar os dados' })
        console.error('não foi possível cadastrar os dados', err)
    }
}

module.exports = { Cadastrar }