


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
        await fetch(`https://lap2-project-achieved.herokuapp.com/habits/user/${localStorage.getItem('user_id')}`, options)
        .then(res => res.json())
        .then(renderAllHabits)
        
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
        console.log('loading to do list...')
        const li = document.createElement('li')
        const a = document.createElement('a')
        a.textContent = element.description
        a.setAttribute('href', '#calender-div')
        a.setAttribute('class', 'habbit')
        a.setAttribute('id', element.id)
        a.addEventListener('click', renderCalendar)
        li.append(a)
        li.setAttribute('id', `li_${element.id}`)
        li.setAttribute('class', 'habbit-style')
        li.setAttribute('class', element.frequency) // element.frequency
        lis.push(li)
    });
   
    lis.forEach(li => {
        const ul = document.querySelector('#user-tasks')
        ul.append(li)
    })
}

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
        if(task.getAttribute('class') === 'habbit'){
            const div = document.createElement('div')
            div.setAttribute('class',`confirm ${task.getAttribute('id')}`)
            div.setAttribute('id',`checkbox_${task.getAttribute('id')}`)

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

            div.append(p)  
            div.append(yesLabel)  
            div.append(yesInput)
            div.append(noLabel)
            div.append(noInput)
            divs.push(div)
        }

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
   
    let date = new Date();
    const month = date.toLocaleString('default', { month: '2-digit' });
    const todaysDate = `${date.getDate()}_${month}_22`
    console.log(todaysDate);
    checkedyesButtons.forEach(yesButton => {
        try {
            const entryData = {
                habit_id: parseInt(yesButton.getAttribute('id').split('_')[1]),
                date: todaysDate
            
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
        const yesdiv = document.querySelector(`#checkbox_${yesButton.getAttribute('id').split('_')[1]}`)
        yesdiv.remove()
        const task = document.getElementById(`${yesButton.getAttribute('id').split('_')[1]}`)
        task.setAttribute('class', 'habbit_completed')
    })
   
}
    



// getting calender modals to pop up

async function renderCalendar(e){
    try {
        const id = e.srcElement.getAttribute('id')
        console.log(e.srcElement.getAttribute('id'))
        const options = { headers: new Headers({'Authorization': localStorage.getItem('token')}) }
        await fetch(`https://lap2-project-achieved.herokuapp.com/completion_dates/${id}`,options)
        .then(res => res.json())
        .then(updateCalender)
    } catch (err) {
        console.warn(err);
    }
}

function updateCalender(data){
    console.log(data)

    if(data.err === 'Completion dates not found for this habit'){
        console.log('do nothing')
    } else {
        const dates = document.querySelectorAll('td')
        
        
       
        data.forEach(element => {
            console.log(element.habitId)
            const list = document.getElementById(`li_${element.habitId}`)
       
            if(list.getAttribute('class') === 'Monthly'){
                    
                    dates.forEach(date => {
                        if(date.textContent){
                        date.setAttribute('class', 'completed')
                        }
                    })
            
                        
                        
            } else if(list.getAttribute('class') === 'Weekly'){
                
                
                    const dateSplit = element.date.split('_')
                    let days = []
                    days.push(dateSplit[0]);
                    console.log(days)
                    for(let i = 0 ; i < 6; i++){
                        days.push((parseInt(days[i]) + 1).toString())
                    }
                    days.forEach(day => {
                        dates.forEach(date => {
                            if(date.textContent === day){
                                date.setAttribute('class', 'completed')
                            } 
                        })

                    })
                    
            } else {
                
                    console.log(element.date)
                    
                    const dateSplit = element.date.split('_')
                    const day = dateSplit[0];
                    
                    dates.forEach(date => {
                        if(date.textContent === day){
                            date.setAttribute('class', 'completed')
                        }
                    })
                    
                
            }
        })
    }
}

function logout() {
    localStorage.clear();
}
// add filter for complete, incomplete , none
// function filterTasks() {
//     const tasks = document.querySelectorAll(li > a)
//     const completedTasks = tasks.filter(task => {
//         task.getAttribute('class') = 'habbit_completed'
//     })
// 
//     completedTasks.forEach(task => {
//          const ul = document.querySelector('#user-tasks')
//          
//     })
// }

// Add the post habit function

const habbitForm = document.querySelector('#createHabbitForm');
habbitForm.addEventListener('submit', addNewHabit )

async function addNewHabit(e) {
    e.preventDefault();
    try {
        const entryData = {
            description: e.target.habbitDescription.value,
            frequency:e.target.frequency.value,
            user_id: localStorage.getItem('user_id')
            
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

}
