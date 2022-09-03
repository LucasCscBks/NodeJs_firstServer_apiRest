const fs = require('fs/promises');
const path = require('path');
const pathFile = path.resolve(__dirname,"../../database/users.json");

const updateUser = (req,res) => {
    async function update() {
        try {
            let userList = JSON.parse(await fs.readFile(pathFile, {encoding: 'utf8'}))
            const { id } = req.params;
            const { nome , email} = req.body
            const userIndex = userList.findIndex(user => user.id == id);
            if (userIndex < 0 || userList[userIndex]['deleted'] === true) {
                res.status(400).send(`{error}: Usuário não encontrado`);
            } else if (nome == '' && email == '') {
                res.status(400).send(`{error}: Passe algum parâmetro para atualizar`);
            } else if (userIndex >= 0) {
                let user 
                if (nome == '') {
                    user = {
                        id : Number(id),
                        nome : userList[userIndex]['nome'],
                        email,
                        "deleted": false
                    };
                } else if (email == '') {
                    user = {
                        id : Number(id),
                        nome,
                        email : userList[userIndex]['email'],
                        "deleted": false
                    };
                } else {
                    user = {
                        id : Number(id),
                        nome,
                        email,
                        "deleted": false
                    };
                }
                
                userList[userIndex] = user;
                fs.writeFile(pathFile, JSON.stringify(userList) , (err) => {
                    if (err) throw err;
                })
                res.status(200).send(`Usuário ${userList[userIndex]['nome']} atualizado com sucesso!`)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    update()
}

module.exports = updateUser