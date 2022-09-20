

// when page load, fetch all the habits

addEventListener('load', getAllHabits())

async function getAllHabits(){
    try {
        await fetch(`http://localhost:3000/habits/user/1`)
        .then(res => res.json())
        .then(renderAllHabits)
    } catch (err) {
        console.warn(err);
    }
}


function renderAllHabits(data){
    let lis = [];
    

    data.forEach(element => {
        const li = document.createElement('li')
        li.setAttribute('id', element.id)
        li.setAttribute('class', 'habit-style')
        li.textContent = element.description
        lis.push(li)
    });

    lis.forEach(li => {
        const ul = document.querySelector('#user-tasks')
        ul.append(li)
    })

    
    
}
