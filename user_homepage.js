

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
        const a = document.createElement('a')
        a.textContent = element.description
        a.setAttribute('href', '#callender-div')
        a.setAttribute('class', 'habbit')
        a.addEventListener('click', renderCallender())
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


async function renderCallender(){
    try {
        await fetch(`http://localhost:3000/completion_dates/1`)
        .then(res => res.json())
        .then(updateCallender)
    } catch (err) {
        console.warn(err);
    }
}

function updateCallender(data){
    console.log(data)
    let habbitdates = [];
    habbitdates.push(data)
    
    const dates = document.querySelectorAll('td')
    
    habbitdates.forEach(element => {
        if(element.data[1] === '_' ){
            var day = element.data.substring(0,1)
        }else {
            var day = element.data.substring(0,2)
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