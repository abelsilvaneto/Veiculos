const Cliente = require("../models/Cliente");
const Cryptojs = require('crypto-js')
const CHAVE_SEGREDO = 'chave_baixa'

const Login = async (req, res) => {
    const valor = req.body

    if (!valor.email || !valor.senha) {
        return res.status(400).json({ message: 'coloque todos os valores' })
    }

    try {
        const cliente = await Cliente.findOne({ where: { email: valor.email } })
        if (!cliente) {
            return res.status(400).json({ message: 'cliente não encontrado' })
        }

        const bytes = Cryptojs.AES.decrypt(valor.senha, CHAVE_SEGREDO)
        console.log(bytes)
        const senhaCrypto = bytes.toString(Cryptojs.enc.Utf8)
        console.log(senhaCrypto)

        if (valor.senha !== senhaCrypto) {
            return res.status(400).json({message: 'senha incorreta'})
        }

        const HorasMs = 3 * 60 * 60 * 1000
        const TempoExpira = Date.now() + HorasMs

        const payLoad = {
            idCliente : cliente.codCliente,
            nome: cliente.nome,
            expiraEm : TempoExpira
        }

        const token = Cryptojs.AES.encrypt(JSON.stringify(payLoad), CHAVE_SEGREDO).toString()

        return res.status(200).json({
            message: 'Login realizado',
            token: token,
            nome: cliente.nome
        })

    } catch (err) {
                res.status(500).json({ message: 'Erro na operação' })
        console.error('Erro na operação', err)
    }
}

module.exports = {Login}