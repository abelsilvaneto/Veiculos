const Cliente = require('./Cliente')
const Agendamento = require('./Agendamento')
const Veiculo = require('./Veiculo')

Cliente.hasMany(Agendamento, {
    as: 'AgendamentoCliente',
    foreignKey: 'idCliente',
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Cliente, {
    as: 'ClienteAgendamento',
    foreignKey: 'idCliente',
    allowNull: false
})

Veiculo.hasMany(Agendamento, {
    as: 'AgendamentoVeiculo',
    foreignKey: 'idVeiculo',
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Veiculo, {
    as: 'VeiculoAgendamento',
    foreignKey: 'idVeiculo',
    allowNull: false
})

Cliente.hasOne(Veiculo, {
    as: 'VeiculoCliente',
    foreignKey: 'idCliente',
    onDelete: 'CASCADE'
})

Veiculo.belongsTo(Cliente, {
    as: 'ClienteVeiculo',
    foreignKey: 'idCliente',
    allowNull: false
})

module.exports = { Cliente, Veiculo, Agendamento }