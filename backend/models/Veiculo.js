const db = require('../db/conn')
const { DataTypes } = require('sequelize')

const Veiculo = db.define('veiculo', {
    codVeiculo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    modelo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    placa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codRastreador: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idCliente: {
        type: DataTypes.INTEGER,
        references: {
            model: 'clientes',
            key: 'codCliente'
        },
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'veiculos'
})

module.exports = Veiculo