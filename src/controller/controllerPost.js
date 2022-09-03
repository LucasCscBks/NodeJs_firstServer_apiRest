const fs = require('fs/promises');
const path = require('path');
const pathFile = path.resolve(__dirname,"../../database/users.json");

const createUser = (req,res) => {
    async function post() {
        try {
            let userList = JSON.parse(await fs.readFile(pathFile, {encoding: 'utf8'}))
            const userListLength = userList.length
            const id = userListLength + 1
            const {nome, email} = req.body
            const user = {
                id: id,
                nome: nome, 
                email: email,
                deleted: false
                }
            if (user["nome"] == undefined || user["email"] == undefined || user["nome"] == '' || user["email"] == ''){
                res.status(400).send(`{ERROR} Não foi possível cadastrar`)
            } else {
                userList.push(user)
                fs.writeFile(pathFile, JSON.stringify(userList) , (err) => {
                    if (err) throw err;
                })
                res.status(201).send(`Usuário Cadastrado com sucesso!`);
            }
        }
        catch(err) {
            console.log(err)
        }
    }
    post()
}

module.exports = createUser
