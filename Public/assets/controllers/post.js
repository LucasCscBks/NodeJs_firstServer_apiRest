import { listUsers } from "./getUsers.js";

const inputName = document.querySelector('#inputName');
const inputEmail = document.querySelector('#inputEmail');

export function createUser() {
    let name = inputName.value
    let email = inputEmail.value
    const user = {
    "nome": name,
    "email": email
    }
    const optionsPost = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    }
    fetch(`http://localhost:3000/usuario`, optionsPost)
    .then((res) => {
        // console.log(res)
        return res.text()
    })
    .then((data) => {
        console.log(data)
        const result = document.querySelector('#result')
        result.innerHTML = data
        result.style.display = 'block'
        setTimeout(() => {
            result.style.display = 'none'
        }, 2500)
    })
    .catch((err) => {
        console.log(err)
    })
    inputName.value = ''
    inputEmail.value = ''
}