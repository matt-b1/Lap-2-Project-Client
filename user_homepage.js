

// when page load, fetch all the habbits

addEventListener('load', getAllHabits())

async function getAllHabits(){
    try {
        await fetch(`http://localhost:3000/habits/user/1`)
        .then(res => res.json())
        .then(renderAllHabbits)
    } catch (err) {
        console.warn(err);
    }
}


function renderAllHabbits(data){
    let lis = [];
    

    data.forEach(element => {
        const li = document.createElement('li')
        const a = document.createElement('a')
        a.textContent = element.description
        a.setAttribute('href', '#callender-div')
        li.append(a)
        li.setAttribute('id', element.id)
        li.setAttribute('class', 'habbit-style')
        lis.push(li)
    });

    lis.forEach(li => {
        const ul = document.querySelector('#user-tasks')
        ul.append(li)
    })

    
    
}


// getting calander modals to pop up

const habbits = document.querySelectorAll('.habbit-style')

habbits.forEach(habbit => {
    const habbitId = habbit.getAttribute('id')
    habbit.addEventListener('click', renderCallender(habbitId))
})


async function renderCallender(id){
    try {
        await fetch(`http://localhost:3000/completed/1`)
        .then(res => res.json())
        .then(updateCallender)
    } catch (err) {
        console.warn(err);
    }
}

function updateCallender(data){
    const dates = document.querySelectorAll('tr')
    
    data.forEach(element => {
        if(element.date[1] === '_' ){
            var day = element.date.substring(0,1)
        }else {
            var day = element.date.substring(0,2)
        }
        dates.forEach(date => {
            if(date.textContent === day){
                date.setAttribute('class', 'completed')
            } else {
                date.removeAttribute('class', 'completed')
            }
        })
    })
}