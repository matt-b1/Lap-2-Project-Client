const registerForm = document.querySelector("#registerForm");
const loginForm = document.querySelector("#loginForm");

registerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    checkUsernameExists(e)
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
            Promise.reject(new Error('Username in use.'));
        } else {
            registerAccount(e);
        }
    }
    catch (err) {
        console.log(err);
    }
}

async function registerAccount(e) {
    e.preventDefault();
    const options = {
        method : "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
    }
    await fetch("http://localhost:3000/users", options);
}

function resetRegistration() {
    document.querySelector('#registerForm').reset();
}
