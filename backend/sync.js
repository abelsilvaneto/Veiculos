const conn = require('./db/conn')
const { Cliente, Veiculo, Agendamento } = require('./models/rel')

async function syncDateBase() {
    try {
        await conn.sync({ force: true })
        console.log('Fazendo a conexão com banco de dados')
    } catch (err) {
        console.error('Problemas na conexão',err)
    } finally {
        await conn.close()
        console.log('Fechando conexão com o banco')
    }
}

syncDateBase()