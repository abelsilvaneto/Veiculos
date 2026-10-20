const db = require('../db/conn')
const {DataTypes} = require('sequelize')

const Cliente = db.define('cliente',{
    codCliente:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf:{
        type: DataTypes.STRING,
        allowNull: false
    },
    endereco:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    telefone:{
        type: DataTypes.INTEGER(11),
        allowNull:false
    }
},{
    timestamps: false,
    tableName: 'clientes'
})

module.exports = Cliente