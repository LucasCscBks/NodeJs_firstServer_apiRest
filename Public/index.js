import { createUser } from "./assets/controllers/post.js";
import { listUsers } from "./assets/controllers/getUsers.js";

// const buttonGetId = document.querySelector('#buttonGetId');
const buttonPost = document.querySelector('#buttonCadastro');
buttonPost.addEventListener('click' , createUser)

// const buttonPut = document.querySelector('#buttonPut');
const buttonListar = document.querySelector('#buttonListar');
buttonListar.addEventListener('click' , listUsers)

// buttonGetId.addEventListener('click' , () => {
//     fetch(`http://localhost:3000/usuario/20`)
//     .then((res) => {
//         console.log(res)
//         return res.json()
//     })
//     .then((data) => {
//         console.log(data)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// })
