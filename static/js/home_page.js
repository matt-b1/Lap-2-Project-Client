const registerForm = document.querySelector("#registerForm");
const loginForm = document.querySelector("#loginForm");
const closeButton1 = document.querySelector('#close1');
const closeButton2 = document.querySelector('#close2');

registerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    checkUsernameExists(e)
})

loginForm.addEventListener("submit", (e) => {
    requestLogin(e);
})

closeButton1.addEventListener("click", (e) => {
    resetRegistration();
    document.querySelector('#name1').placeholder = 'Username...'
})

closeButton2.addEventListener("click", (e) => {
    resetLogin();   
})

async function checkUsernameExists(e) {
    try {
        let dupe;
        await fetch(`https://lap2-project-achieved.herokuapp.com/users`)
        .then(res => res.json())
        .then(data => {
            data.forEach(user => {
                if (e.target.name.value === user.name) {
                    dupe = true;
                }
            })
        });
        if (dupe) {
            document.querySelector('#name1').placeholder = 'Username already in use...'
            resetRegistration();
        } else if ((e.target.password.value).length < 6){
            alert('Passwords need to be 6 characters long.');
            resetRegistration();
        }
        else {
            registerAccount(e);
        }
    }
    catch (err) {
        console.log(err);
    }
}

async function registerAccount(e) {
    e.preventDefault();

    let date = new Date();
    const month = date.toLocaleString('default', { month: '2-digit' });
    const yesterdaysDate = `${date.getDate()-1}_${month}_22`

    if (e.target.password.value === e.target.confirmpassword.value) { 
        const options = {
            method : "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ name: e.target.name1.value, password: e.target.password1.value, last_update: yesterdaysDate })
        }
        await fetch("https://lap2-project-achieved.herokuapp.com/users", options);
        alert(`Account ${e.target.name.value} successfully registered.`)
        resetRegistration();
        document.getElementById('close1').click();
    } else {
        alert('Passwords do not match');
    }
    resetRegistration();
}

async function requestLogin(e){
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const r = await fetch(`https://lap2-project-achieved.herokuapp.com/users/login`, options)
        const data = await r.json()
        console.log(data);
        if (!data.success) { 
            resetLogin();
            alert('Login failed. Please try again');
            throw new Error('Login not authorised');
        }
        login(data.token);
    } catch (err) {
        console.warn(err);
    }
}

function resetLogin() {
    document.querySelector('#loginForm').reset();
}

function resetRegistration() {
    document.querySelector('#registerForm').reset();
}

function login(token) {
    const decodedToken = jwt_decode(token);
    localStorage.setItem('token', token);
    localStorage.setItem('username', decodedToken.username);
    localStorage.setItem('user_id', decodedToken.user_id);
    localStorage.setItem('streak', decodedToken.streak);
    localStorage.setItem('last_update', decodedToken.last_update);
    window.location.href = 'user_home_page.html';
    resetLogin();
}

function logout(){
    localStorage.clear();
}

