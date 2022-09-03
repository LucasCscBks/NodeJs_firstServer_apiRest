const fs = require('fs/promises');
const path = require('path');
const pathFile = path.resolve(__dirname,"../../database/users.json");

const userDel = (req,res) => {
    async function del() {
        try {
            let userList = JSON.parse(await fs.readFile(pathFile, {encoding: 'utf8'}))
            const { id } = req.params;
            const userIndex = userList.findIndex(user => user.id == id);
            if (userIndex < 0 || userList[userIndex]['deleted'] === true) {
                res.status(400).send(`{error}: Usuário não encontrado`);
            } else if (userIndex >= 0) {
                const user = {
                    "nome": userList[userIndex]["nome"],
                    "email": userList[userIndex]["email"],
                    id,
                    "deleted": true
                };
                userList[userIndex] = user;
                
                fs.writeFile(pathFile, JSON.stringify(userList) , (err) => {
                    if (err) throw err;
                })
                res.status(200).send(`Usuário ${userList[userIndex]['nome']} Deletado com sucesso!!`)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    del()
}

module.exports = userDel