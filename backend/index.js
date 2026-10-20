const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const HOTS = 'localhost'

const conn = require('./db/conn')


require('./models/rel')

const authMiddleware = require('./middleware/auth.middleware')
const authController = require('./controller/auth.controller')
const VeiculoController = require('./controller/Veiculo.controller')
const ClienteController = require('./controller/Cliente.controller')
const AgendamentoController = require('./controller/Agendamento.controller')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.post('/cliente', ClienteController.Cadastrar)
app.post('/login', authController.Login)

app.get('/', (req,res)=>{
    res.status(200).json({message: 'Aplicação rodando'})
})

app.use(authMiddleware)

app.get('/clientes', ClienteController.Listar)
app.get('/cliente/:id',ClienteController.Consultar)
app.get('/cliente/buscaNome/:nome', ClienteController.ConsultarNome)
app.put('/cliente/:id', ClienteController.Atualizar)
app.delete('/cliente/:id', ClienteController.apagar)

app.post('/veiculo', VeiculoController.Cadastrar)

app.post('/agendamento', AgendamentoController.Cadastrar)
app.put('/agendamento/:id', AgendamentoController.Atualizar)
app.get('/agendamentos',AgendamentoController.Listar)

conn.sync()
.then(()=>{
    app.listen(PORT, HOTS, ()=>{
        console.log(`Servidor rodando em http://${HOTS}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('Erro ao conectar com o banco de dados',err)
})