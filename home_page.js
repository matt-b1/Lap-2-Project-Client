const registerForm = document.querySelector("#registerForm");
const loginForm = document.querySelector("#loginForm");

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    checkUsernameExists(e);
})

async function checkUsernameExists(e) {
    try {
        await fetch(`http://localhost:3000/users`)
        .then(res => res.json())
        .then(data => {
            let duplicate = 0;
            data.forEach(user => {
                if (e.target.name.value === user.name) {
                    duplicate++;
                }
            })
            if (duplicate === 0) {
                e.preventDefault();
                const options = {
                    method : "POST",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
                }
                fetch("http://localhost:3000/users", options);
            }
            else {
                console.log('Username in use.');
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}
