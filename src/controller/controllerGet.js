const fs = require('fs/promises');
const path = require('path');
const pathFile = path.resolve(__dirname,"../../database/users.json");

const getUser = (req,res) => {
    async function create() {
        try {
            let userList = JSON.parse(await fs.readFile(pathFile, {encoding: 'utf8'}))
            const userListLength = userList.length
            console.log(userListLength)
            let showList = []
            
            let result = ``
            for (let i = 0; i < userListLength; i++) {
                if (userList[i]['deleted'] == false) {
                    showList.push(userList[i]);
                }
            }
            const showListLength = showList.length
            for (let i = 0; i < showListLength; i++) {
                result += `Nome: ${showList[i]['nome']}\n\Email: ${showList[i]['email']}\n\ID: ${showList[i]['id']}\n`
            }
            console.log(result)
            res.status(200).send(showList);
        }
        catch (err){
            console.log(err)
        }
    }
    create()
}

const getUserByID = (req,res) => {
    async function getId() {
        try {
            let userList = JSON.parse(await fs.readFile(pathFile, {encoding: 'utf8'}))
            const userListLength = userList.length
            let result = ``
            let id = req.params.id
            let showList = []
            for (let i = 0; i < userListLength; i++) {
                if (userList[i]['id'] == id && userList[i]['deleted'] == false) {
                    showList.push(userList[i])
                    result = `Nome: ${showList[0]['nome']}\n\Email: ${showList[0]['email']}\n\ID: ${showList[0]['id']}\n`
                    res.status(200).send(showList);
                }
            }
            if (showList.length == 0){
                res.status(400).send(`Usuário não encontrado!!`)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    getId()
}

module.exports = {getUser, getUserByID}