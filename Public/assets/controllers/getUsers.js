let tbody = document.querySelector('#tbody')

const optionsDelete = {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    }
}

export function listUsers() {
    const result = document.querySelector('#result')
    result.innerHTML = ''
    result.style.display = 'none'
    fetch(`http://localhost:3000/usuarios`)
    .then((res) => {
        // console.log(res)
        return res.json()
    })
    .then((data) => {
        // console.log(data)
        tbody.innerHTML = `<tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Email</th>
        <th>Editar</th>
        <th>Apagar</th>
        </tr>`
        for (let i = 0; i < data.length; i++) {
            tbody.innerHTML += `<tr>
            <td>${data[i]['id']}</td>
            <td>${data[i]['nome']}</td>
            <td>${data[i]['email']}</td>
            <td><img class="edits" data-id="${data[i]['id']}" src="__dirname+../../assets/images/edit.png"/></td>
            <td><img class="deletes" data-id="${data[i]['id']}" src="__dirname+../../assets/images/delet.png"/></td>
            </tr>`
        }
        
        // console.log(delClass)

        // XXXXX PASSANDO EVENTO DE DELETAR XXXXX//
        let delClass = document.querySelectorAll('.deletes');
        for (let i = 0; i < delClass.length; i++) {
            delClass[i].addEventListener('click' , () => {
                let ident = delClass[i]
                fetch(`http://localhost:3000/usuario/${ident.dataset.id}` , optionsDelete)
                .then((res) => {
                    // console.log(res)
                    return res.text()
                })
                .then((data) => {
                    listUsers()
                    console.log(data)
                    result.innerHTML = data
                    result.style.display = 'block'
                    setTimeout(() => {
                        result.style.display = 'none'
                    }, 2500)
                })
            })
        }
        // XXXXX PASSANDO EVENTO DE DELETAR XXXXX//

        // XXXXX PASSANDO O EVENTO DE EDIÇÃO XXXXX//
        let editClass = document.querySelectorAll('.edits');
        for (let i = 0; i < editClass.length; i++) {
            editClass[i].addEventListener('click', () => {
                let ident = editClass[i]
                // console.log(ident)
                const updateForm = document.querySelector('#update');
                updateForm.style.display = 'block'
                updateForm.innerHTML = `<input type="text" id="updateName" class="inputs" placeholder="Nome completo"/>
                <input type="text" id="updateEmail" class="inputs" placeholder="E-mail"/>
                <button type="button" id="updateButton">Atualizar</button>`
                const updateName = document.querySelector('#updateName');
                const updateEmail = document.querySelector('#updateEmail');
                updateName.focus()

                const updateButton = document.querySelector('#updateButton');
                updateButton.addEventListener('click', () => {
                    let names = updateName.value
                    let emails = updateEmail.value
                    const updateUser = {
                        "nome": names,
                        "email": emails
                    }
                    const optionsUpdate = {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updateUser),
                    }
                    fetch(`http://localhost:3000/usuario/${ident.dataset.id}` , optionsUpdate)
                    .then((res) => {
                        return res.text()
                    })
                    .then((data) => {
                        listUsers()
                        console.log(data)
                        result.innerHTML = data
                        result.style.display = 'block'
                        setTimeout(() => {
                            result.style.display = 'none'
                        }, 2500)
                    })
                    updateForm.style.display = 'none'
                    // console.log(updateUser)
                })
            })
        }
        // XXXXX PASSANDO O EVENTO DE EDIÇÃO XXXXX//
    })
}