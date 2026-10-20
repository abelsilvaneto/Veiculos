const db = require('../db/conn')
const { DataTypes } = require('sequelize')

const Agendamento = db.define('agendamento', {
    codAgendamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    horario: {
        type: DataTypes.TIME,
        allowNull: false
    },
    tipoServico: {
        type: DataTypes.ENUM('revisao','manutencao','instalacao'),
        allowNull: false
    },
    idCliente: {
        type: DataTypes.INTEGER,
        references: {
            model: 'clientes',
            key: 'codCliente'
        },
        allowNull: false
    },
    idVeiculo: {
        type: DataTypes.INTEGER,
        references: {
            model: 'veiculos',
            key: 'codVeiculo'
        },
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'agendamentos'
})

module.exports = Agendamento