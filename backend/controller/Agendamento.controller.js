const Agendamento = require('../models/Agendamento')
const Cliente = require('../models/Cliente')
const Veiculo = require('../models/Veiculo')

const Cadastrar = async (req, res) => {
    const valor = req.body

    if (!valor.data || !valor.horario || !valor.tipoServico || !valor.idCliente || !valor.idVeiculo) {
        return res.status(400).json({ message: 'Coloque todos os valores' })
    }

    const cliente = await Cliente.findByPk(valor.idCliente)
    if (!cliente) {
        return res.status(400).json({ message: 'cliente não encontrado' })
    }

    const veiculos = await Veiculo.findByPk(valor.idVeiculo)
    if (!veiculos) {
        return res.status(400).json({ message: 'Veiculo não encontrado' })
    }

    try {

        const Novoagendamento = await Agendamento.create(valor)

        res.status(201).json({ message: 'Dados cadastrados', Agendamento: Novoagendamento })
    } catch (err) {
        res.status(500).json({ message: 'não foi possível cadastrar os dados' })
        console.error('não foi possível cadastrar os dados', err)
    }
}

const Atualizar = async (req, res) => {
    const id = req.params.id
    const valor = req.body

    try {
        const agendamento = await Agendamento.findByPk(id)
        if (!agendamento) {
            return res.status(400).json({ message: 'agendamento não encontrado' })
        }

        const cliente = await Cliente.findByPk(valor.idCliente)
        if (!cliente) {
            return res.status(400).json({ message: 'cliente não encontrado' })
        }

        const veiculo = await Veiculo.findByPk(valor.idVeiculo)
        if (!veiculo) {
            return res.status(400).json({ message: 'veiculo não encontrado' })
        }

        await Agendamento.update(valor, { where: { codAgendamento: id } })
        return res.status(201).json({ message: 'dados atualizados' })
    } catch (err) {
        res.status(500).json({ message: 'Erro na operação' })
        console.error('Erro na operação', err)
    }
}

const Listar = async (req, res) => {
    try {
        const agendamento = await Agendamento.findAll()

        return res.status(200).json(agendamento)
    } catch (err) {
        res.status(500).json({ message: 'Erro na operação' })
        console.error('Erro na operação', err)
    }
}
module.exports = { Cadastrar, Atualizar, Listar }