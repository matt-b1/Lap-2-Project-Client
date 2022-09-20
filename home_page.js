const registerForm = document.querySelector("#registerForm");
const loginForm = document.querySelector("#loginForm");

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const options = {
        method : "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
    }
    console.log(options);
    fetch("http://localhost:3000/users", options)
    .then(res => {
        console.log(res);
        res.json();
    })
    .then(data => console.log(data));
})
