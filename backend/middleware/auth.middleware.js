const Cryptojs = require('crypto-js')
const CHAVE_SEGREDO = 'chave_baixa'

function authMiddleware(req,res,next){
    const token = req.headers['authorization']
    console.log(token)

    if(!token){
        return res.status(401).json({message: 'acesso negado! token não fonercido'})
    }

    try{
        const bytes = Cryptojs.AES.decrypt(token, CHAVE_SEGREDO)
        const dadosDescriptografados = bytes.toString(Cryptojs.enc.Utf8)

        if(!dadosDescriptografados){
            return res.status(401).json({message: 'token inválido!'})
        }

        const payload = JSON.parse(dadosDescriptografados)

        if(Date.now() > payload.expiraEm){
            return res.status(401).json({message: 'Sessão expirados! faça login novamente'})
        }
        
        next()
    }catch(err){
        return res.status(401).json({message: 'Falha na autenticação do token'})
    }
}

module.exports = authMiddleware