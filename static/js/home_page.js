const registerForm = document.querySelector("#registerForm");
const loginForm = document.querySelector("#loginForm");
const closeButton1 = document.querySelector('#close1');
const closeButton2 = document.querySelector('#close2');

registerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    checkUsernameExists(e)
})

loginForm.addEventListener("submit", (e) => {
    accountLogin(e);
})

closeButton1.addEventListener("click", (e) => {
    resetRegistration();
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
            document.querySelector('#name').placeholder = 'Username already in use...'
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
    if (e.target.password.value === e.target.confirmpassword.value) { 
        const options = {
            method : "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        await fetch("https://lap2-project-achieved.herokuapp.com/users", options);
        resetRegistration();
        document.getElementById('close1').click();
    } else {
        alert('Passwords do not match');
    }
    document.querySelector('#registerForm').reset();
}

async function accountLogin(e) {
    e.preventDefault();
    const options = {
        
    }
    await fetch("https://lap2-project-achieved.herokuapp.com/users/login", options)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        let user = data.filter(user => e.target.name.value === user.name);
        if (!user.length) {
            alert('Login failed.');
            resetLogin();
        }
        for (const userDetails of user) {
            console.log(userDetails);
            if (e.target.password.value === userDetails.password) {
                login(userDetails);
                window.location.href = 'user_home_page.html';
                resetLogin();
            }
            else {
                alert('Login failed');
                resetLogin();
            }
        } 
    })
}

function resetLogin() {
    document.querySelector('#loginForm').reset();
}

function resetRegistration() {
    document.querySelector('#registerForm').reset();
}

function login(userDetails) {
    localStorage.setItem('username', userDetails.name);
    console.log(localStorage.getItem('username'));
}
