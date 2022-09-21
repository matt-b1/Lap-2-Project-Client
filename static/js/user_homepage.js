


// when page load, fetch all the habits

addEventListener('load', getAllHabits())


const logOut = document.querySelector('#logout');
const habitButtton = document.querySelector('#addHabit')
getDate();
renderUser();

logOut.addEventListener('click', () => {
    localStorage.clear();
})

async function getAllHabits(){
    try {
        const options = { headers: new Headers({'Authorization': localStorage.getItem('token')}) }
        await fetch(`https://lap2-project-achieved.herokuapp.com/habits/user/1`, options)
        const data = await response.json();
        if(data.err){
            console.warn(data.err);
            logout();
        }
        renderAllHabits(data)
    } catch (err) {
        console.warn(err);
    }
}

function getDate() {
    let date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    document.querySelector('#date').innerHTML = `${date.getDate()} ${month} ${date.getFullYear()}`;
}

function renderUser() {
    document.querySelector('#user').textContent = `${localStorage.getItem('username')}`;
}

function renderAllHabits(data){
    let lis = [];
    console.log(data);
    data.forEach(element => {
        const li = document.createElement('li')
        const a = document.createElement('a')
        a.textContent = element.description
        a.setAttribute('href', '#calendar-div')
        a.setAttribute('class', 'habbit')
        a.addEventListener('click', renderCallender())
        a.setAttribute('id', element.id)
        li.append(a)
        li.setAttribute('class', 'habbit-style')
        li.setAttribute('class', element.frequency) // element.frequency
        lis.push(li)
    });

    lis.forEach(li => {
        const ul = document.querySelector('#user-tasks')
        ul.append(li)
    })
}

<<<<<<< HEAD
=======
// TASK POSTING
const checklistButton = document.querySelector('#checklistButton')
const hideChecklistButton = document.querySelector('#hideChecklist')
checklistButton.addEventListener('click', renderCheckList)
hideChecklistButton.addEventListener('click', removeChecklist)
// render the checklist
function renderCheckList() {

    let divs =[];
    const tasks = document.querySelectorAll('li>a');
    tasks.forEach(task => {
        const div = document.createElement('div')
        div.setAttribute('class',`confirm ${task.getAttribute('id')}`)
        div.setAttribute('id',`checkbox ${task.getAttribute('id')}`)

        const p = document.createElement('p')
        p.textContent = `Did you complete ${task.textContent} today?`

        const yesLabel = document.createElement('label')
        yesLabel.setAttribute('for', 'yesButton')
        yesLabel.textContent = 'Yes'

        const yesInput = document.createElement('input')
        yesInput.setAttribute('class','yesButton')
        yesInput.setAttribute('id',`yesButton_${task.getAttribute('id')}`)
        yesInput.setAttribute('type','radio')
        yesInput.setAttribute('name',`confirm_${task.getAttribute('id')}`)
        yesInput.setAttribute('value','yes')
        
        const noLabel = document.createElement('label')
        noLabel.setAttribute('for', 'noButton')
        noLabel.textContent = 'No'

        const noInput = document.createElement('input')
        noInput.setAttribute('id',`noButton_${task.getAttribute('id')}`)
        noInput.setAttribute('class','noButton')
        noInput.setAttribute('type','radio')
        noInput.setAttribute('name',`confirm_${task.getAttribute('id')}`)
        noInput.setAttribute('value','no')
        noInput.textContent = 'No'

        const labeldate = document.createElement('label')
        labeldate.setAttribute('for',`day_${task.getAttribute('id')}`)
        labeldate.textContent = 'Enter date of completion:'
        const dateInput = document.createElement('input')
        dateInput.setAttribute('class', 'date')
        dateInput.setAttribute('type', 'date')
        dateInput.setAttribute('id',`day_${task.getAttribute('id')}`)



        div.append(p)  
        div.append(yesLabel)  
        div.append(yesInput)
        div.append(noLabel)
        div.append(noInput)
        div.append(labeldate)
        div.append(dateInput)
        divs.push(div)

    })
    const checklistDiv = document.querySelector('.taskForm')
    divs.forEach(div => {
        checklistDiv.append(div)

    })

    const submitChecklist = document.createElement('button')
    submitChecklist.setAttribute('id', 'checklistSubmit')
    submitChecklist.textContent = 'Submit Checklist'
    submitChecklist.addEventListener('click', postChecklist)
    checklistDiv.append(submitChecklist)



    checklistButton.setAttribute('hidden', 'hidden')
    hideChecklistButton.removeAttribute('hidden')


}

function removeChecklist(){
    const divs = document.querySelectorAll('.confirm')
    divs.forEach(div => {
        div.remove();
    })

    hideChecklistButton.setAttribute('hidden', 'hidden')
    checklistButton.removeAttribute('hidden')
    const submitChecklist = document.querySelector('#checklistSubmit')
    submitChecklist.remove()
}

function postChecklist() {
    const yesButtons = document.querySelectorAll('.yesButton')
    
    checkedyesButtons = Array.from(yesButtons).filter(yesButton =>{
        return yesButton.checked === true
    })
    let dates = []
    checkedyesButtons.forEach(yesButton => {
        const id = yesButton.getAttribute('id').split('_')[1]
        // console.log('this is id' +id)
        
        
        const date = document.querySelector(`#day_${id}`)
        dates.push(date)
    })
    console.log(dates)
    
    dates.forEach(date => {
        const reversedDate = []
        const newarray = date.value.split('-')
        console.log(newarray[2][0])
        if(newarray[2][0]===0){
            reversedDate.push(`${newarray[2][1]}`)
            reversedDate.push(`_${newarray[1]}`)
            reversedDate.push(`_${newarray[0]}`)
            var reversedDateString = reversedDate.join('')
            console.log('this is date ' + reversedDateString)
        } else{
            reversedDate.push(`${newarray[2]}`)
            reversedDate.push(`_${newarray[1]}`)
            reversedDate.push(`_${newarray[0]}`)
            var reversedDateString = reversedDate.join('')
            console.log('this is date ' + reversedDateString)
        }

        try {
            const entryData = {
                habit_id: parseInt(date.getAttribute('id').split('_')[1]),
                data: reversedDateString
            
            }
            console.log(entryData)
            const options = {
                method : "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(entryData)
            }
            fetch(`https://lap2-project-achieved.herokuapp.com/completion_dates`, options)
        } catch (err) {
            console.warn(err);
        }
         
    })  
    
}






>>>>>>> ae449da104569aedb4fbfa9223956cffff324738
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

<<<<<<< HEAD
function logout() {
    localStorage.clear();
=======
// add filter for complete, incomplete , none
// function filterTasks() {
//     const tasks = document.querySelectorAll(li > a)
//     const completedTasks = tasks.filter(task => {
//         task.getAttribute('class') = 'complete'
//     })

//     completedTasks.forEach(task => {

//     })
// }

// Add the post habit function

const habbitForm = document.querySelector('#createHabbitForm');
habbitForm.addEventListener('submit', addNewHabit )

async function addNewHabit(e){
    e.preventDefault();
    try {
        const entryData = {
            description: e.target.habbitDescription.value,
            frequency:e.target.frequency.value,
            user_id: 1
            
        }
        console.log(entryData)
        const options = {
            method : "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(entryData)
        }
        fetch(`https://lap2-project-achieved.herokuapp.com/habits`, options)
    } catch (err) {
        console.warn(err);
    }

>>>>>>> ae449da104569aedb4fbfa9223956cffff324738
}
