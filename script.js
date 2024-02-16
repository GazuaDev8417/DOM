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


/* Delete account */
const deleteAccount = ()=>{
    const decide = window.confirm('Tem certeza que deseja excluir sua conta?')

    if(decide){
        localStorage.clear()
        location.href = 'index.html'
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    /* Displaying elements on screen */
    body.appendChild(header)
    body.appendChild(main)
    header.appendChild(span)


    main.innerHTML += `
        ${!logged ? (
            '<h2>Tela de login usando manipulação de DOM por javascript</h2>'
        ) : `<h2>${user.hisName} está logado(a)</h2>
            <div class="user-container">
                <b>Nome: </b>${user.hisName}<br>
                <b>Idade: </b>${user.age}<br>
                <b>Gênero: </b>${user.gender}<br>
                <b>Email: </b>${user.email}<br>
                <b>Nome de usuário: </b>${user.username}<br><br>
                <div class="delAccount-container">
                    <button id="btnDelAccount" onClick="deleteAccount()">
                        Deletar Conta
                    </button>
                </div>
            </div>
        `}
    `
    /* Outro método para input text aceitar apenas números */
    /* onkeypress="return event.charCode >= 48 && event.charCode <= 57" */
    main.innerHTML += `
        ${!logged ? (
            `<form id="form">
                <fieldset>
                    <legend>${user ? 'Login' : 'Registro'}</legend>
                    ${!user ? (
                        `<input 
                            type="text"
                            id="yourName"
                            class="input"
                            placeholder='Nome completo'                            
                            required>`
                    ) : ''}
                    ${!user ? (
                        `<input 
                            type="text"
                            id="age"
                            class="input"
                            placeholder='Idade'
                            maxlength="3"
                            oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                            required>`
                    ) : ''}
                    ${!user ? (
                        `<div class="radio-container">
                            <div>
                                <input type="radio" id="male" name="gender" value="Masculino" required>
                                <label for="male">Masculino</label>
                            </div>
                            <div>
                                <input type="radio" id="female" name="gender" value="Feminino" required>
                                <label for="female">Feminino</label>
                            </div>
                         </div>`
                    ) : ''}
                    <input 
                        type="email"
                        id="email"
                        class="input"
                        placeholder='E-mail'
                        required>
                    ${!user ? (
                        `<input 
                            type="text"
                            id="username"
                            class="input"
                            placeholder='Nome de usuário'
                            required>`
                    ) : ''}
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
            </form>`
        ) : ''}
    `

    /* Form variables */
    const yourName = document.querySelector('#yourName')
    const age = document.querySelector('#age')
    const email = document.querySelector('#email')
    const username = document.querySelector('#username')
    const keyword = document.querySelector('#keyword')
    const eye = document.querySelector('.eye')

    let gender

    document.getElementsByName('gender').forEach(radio=>{
        radio.addEventListener('change', (event)=>{
            gender = event.target.value
        })
    })

    /* Show and hide password */
    if(!logged){
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
                    age: age.value,
                    gender,
                    email: email.value,
                    username: username.value,
                    keyword: keyword.value
                }
        
                if(userData.keyword.length < 6){
                    alert('Sua senha deve ter no mínimo 6 caracteres')
                    return
                }
    
                localStorage.setItem('user', JSON.stringify(userData))
                localStorage.setItem('logged', 'logged')
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


    body.appendChild(footer).innerHTML = `
        <div class="footer-text">
            <p>
                Copyright &copy; 2023 por 
                <a href="https://portfolio-x22d.onrender.com/" target="_blank">
                    Flamarion França
                </a>
            </p>
        </div>
    `
})
    
/* logout */
span.addEventListener('click', ()=>{
    if(logged){
        const decide = window.confirm('Tem certeza que quer deslogar?')
        if(decide){
            localStorage.removeItem('logged')
            location.reload()
        }
    }
})



