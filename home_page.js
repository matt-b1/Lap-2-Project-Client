const registerForm = document.querySelector("#registerForm");
const loginForm = document.querySelector("#loginForm");
const closeButton1 = document.querySelector('#close1');

registerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    checkUsernameExists(e)
})

closeButton1.addEventListener("click", (e) => {
    resetRegistration();
})

async function checkUsernameExists(e) {
    try {
        let dupe;
        await fetch(`http://localhost:3000/users`)
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
        await fetch("http://localhost:3000/users", options);
        resetRegistration();
        document.getElementById('close1').click();
    } else {
        alert('Passwords do not match');
    }
    document.querySelector('#registerForm').reset();

}

function resetRegistration() {
    document.querySelector('#registerForm').reset();
}
