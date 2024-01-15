/* User logged */
const user = JSON.parse(localStorage.getItem('user'))
const logged = localStorage.getItem('logged')

/* Creation of elements */
const header = document.createElement('header')
const span = document.createElement('span')
const main = document.createElement('main')
const footer = document.createElement('footer')

/* Instance of body */
const body = document.body

/* Setting attributes */
header.setAttribute('class', 'top')
header.innerHTML = `<h1>Manipulando DOM</h1>`
span.setAttribute('class', 'logout')
span.innerHTML = `${!logged ? '<span class="loggedout-text">Você não está logado</span>' :  'Logout'}`
main.setAttribute('class', 'middle')


/* Displaying elements on screen */
main.innerHTML = `
    ${!logged ? (
        '<h2>Tela de login usando manipulação de DOM por javascript</h2>'
    ) : `<h2>${user.hisName} está logado(a)`}
`

document.addEventListener('DOMContentLoaded', ()=>{
    if(user && !logged){
        main.innerHTML += `
            <form id="form">
            <fieldset>
                <legend>${user ? 'Login' : 'Registro'}</legend>
                ${!user ? (
                    `<input 
                    type="text"
                    id="yourName"
                    class="input"
                    placeholder='Seu nome'
                    required>`
                ) : ''}
                <input 
                    type="email"
                    id="email"
                    class="input"
                    placeholder='E-mail'
                    required>
                <div class="eye-container">
                    <input 
                        type="password"
                        id="keyword"
                        class="input"
                        placeholder='Sua senha'
                        required>
                    <div class="eye">Mostrar</div>
                </div>
                <div class="btn-container">
                    <button type="reset">Limpar</button>
                    <button type="submit">Enviar</button>
                </div>
            </fieldset>
            </form>
        `
    
        /* Form variables */
        const yourName = document.querySelector('#yourName')
        const email = document.querySelector('#email')
        const keyword = document.querySelector('#keyword')
        const eye = document.querySelector('.eye')
    
        /* Show and hide password */
        eye.addEventListener('click', ()=>{
            if(keyword.type === 'password'){
                keyword.setAttribute('type', 'text')
                eye.innerText = 'Ocultar'
            }else{
                keyword.setAttribute('type', 'password')
                eye.innerText = 'Mostrar'
            }
        })
    
        /* Submit form */
        document.querySelector('#form').addEventListener('submit', (e)=>{
            e.preventDefault()
            if(!user){
                const userData = {
                    hisName: yourName.value,
                    email: email.value,
                    keyword: keyword.value
                }
        
                if(userData.keyword.length < 6){
                    alert('Sua senha deve ter no mínimo 6 caracteres')
                    return
                }
    
                localStorage.setItem('user', JSON.stringify(userData))
                location.reload()
            }else{
                if(email.value !== user.email || keyword.value !== user.keyword){
                    alert('Usuário não encontrado!')
                }else{
                    localStorage.setItem('logged', 'logged')
                    location.reload()
                }
            }
    
        })
    }
})

body.appendChild(header)
body.appendChild(main)
header.appendChild(span)

/* logout */
span.addEventListener('click', ()=>{
    const decide = window.confirm('Tem certeza que quer deslogar?')
    if(decide){
        localStorage.removeItem('logged')
        location.reload()
    }
})


