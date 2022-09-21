// when page load, fetch all the habits

addEventListener('load', getAllHabits())
const habitButtton = document.querySelector('#addHabit')


async function getAllHabits(){
    try {
        await fetch(`https://lap2-project-achieved.herokuapp.com/habits/user/1`)
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
        a.setAttribute('href', '#calendar-div')
        a.setAttribute('class', 'habbit')
        a.addEventListener('click', renderCalendar())
        li.append(a)
        li.setAttribute('id', element.id)
        li.setAttribute('class', 'habit-style')
        lis.push(li)
    });

    lis.forEach(li => {
        const ul = document.querySelector('#user-tasks')
        ul.append(li)
    })
}

// getting calender modals to pop up

habitButtton.addEventListener("click", renderCalendar);

async function renderCalendar(){
    try {
        await fetch(`https://lap2-project-achieved.herokuapp.com/completion_dates/1`)
        .then(res => res.json())
        .then(updateCalender)
    } catch (err) {
        console.warn(err);
    }
}

function updateCalender(data){
    console.log(data)
    let habitdates = [];
    habitdates.push(data)
    
    const dates = document.querySelectorAll('td')
    
    habitdates.forEach(element => {
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
