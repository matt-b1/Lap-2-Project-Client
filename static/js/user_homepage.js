// when page load, fetch all the habits
addEventListener('load', getAllHabits())

const logOut = document.querySelector('#logout');
const habitButtton = document.querySelector('#addHabit');
filterHabit;
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
        .then(res => {
            renderAllHabits(res)
            setTimeout(() => {
                appendStreak(res);
              }, 500)
            
        })
    } catch (err) {
        console.warn(err);
        document.querySelector('#streakCounter').textContent = `Current Streak: ${localStorage.getItem('streak')} days`
    }
}

function appendStreak(habitList) {
    if (!!habitList.length) {

        let allTasksCompleted = true

        const tasks = document.querySelectorAll('li>a');
        tasks.forEach(task => {
	        if (task.getAttribute('class') === 'habit'){
                console.log(task.getAttribute('class'))
		        allTasksCompleted = false
	        }
        })

        let date = new Date();
        const month = date.toLocaleString('default', { month: '2-digit' });
        const todaysDate = `${date.getDate()}_${month}_22`
        const yesterdaysDate = `${date.getDate()-1}_${month}_22`
        const daysFromLastUpdate = date.getDate() - parseInt(localStorage.getItem('last_update').split('_')[0])

        if (!!allTasksCompleted){
            if (daysFromLastUpdate !== 0) {
                //update streak count
                console.log(parseInt(localStorage.getItem('streak')) + daysFromLastUpdate)
                let changes = {
                    column_to_change: "streak", 
                    value: parseInt(localStorage.getItem('streak')) + daysFromLastUpdate,
                    user_id: parseInt(localStorage.getItem('user_id'))
                }

                let options = {
                    method: 'PATCH',
                    body: JSON.stringify(changes),
                    headers: {
                        "Content-Type": "application/json"
                    }
                };

                fetch('https://lap2-project-achieved.herokuapp.com/users', options)
                    .then(res => res.json())

                //update last_update

                let changes_1 = {
                    column_to_change: "last_update", 
                    value: todaysDate,
                    user_id: parseInt(localStorage.getItem('user_id'))
                }

                let options_1 = {
                    method: 'PATCH',
                    body: JSON.stringify(changes_1),
                    headers: {
                        "Content-Type": "application/json"
                    }
                };

                setTimeout(() => {
                    fetch('https://lap2-project-achieved.herokuapp.com/users', options_1)
                        .then(res => res.json())
                        .then(data => updateLocalStorage(data.token));
                  }, 100)
            }
        } else {
            if (daysFromLastUpdate > 1) {
                //update streak count

                let changes = {
                    column_to_change: "streak", 
                    value: 0,
                    user_id: parseInt(localStorage.getItem('user_id'))
                }

                let options = {
                    method: 'PATCH',
                    body: JSON.stringify(changes),
                    headers: {
                        "Content-Type": "application/json"
                    }
                };

                fetch('https://lap2-project-achieved.herokuapp.com/users', options)
                    .then(res => res.json())

                //update last_update

                let changes_1 = {
                    column_to_change: "last_update", 
                    value: yesterdaysDate,
                    user_id: parseInt(localStorage.getItem('user_id'))
                }

                let options_1 = {
                    method: 'PATCH',
                    body: JSON.stringify(changes_1),
                    headers: {
                        "Content-Type": "application/json"
                    }
                };

                setTimeout(() => {
                    fetch('https://lap2-project-achieved.herokuapp.com/users', options_1)
                        .then(res => res.json())
                        .then(data => updateLocalStorage(data.token))
                }, 100)
            }
        }
    }
    // update counter in html
    setTimeout(() => {
        document.querySelector('#streakCounter').textContent = `Current Streak: ${localStorage.getItem('streak')} days`;
    }, 1000)
    }

function updateLocalStorage(token) {
    const decodedToken = jwt_decode(token);
    localStorage.setItem('token', token);
    localStorage.setItem('username', decodedToken.username);
    localStorage.setItem('user_id', decodedToken.user_id);
    localStorage.setItem('streak', decodedToken.streak);
    localStorage.setItem('last_update', decodedToken.last_update);
}

function getDate() {
    let date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    document.querySelector('#date').innerHTML = `${date.getDate()} ${month} ${date.getFullYear()}`;
}

function renderUser() {
    document.querySelector('#user').textContent = `${localStorage.getItem('username')}`;
}

function renderAllHabits(data) {
    let lis = [];
    data.forEach(element => {
        console.log('loading to do list...')
        const li = document.createElement('li')
        const a = document.createElement('a')
        const iconDiv = document.createElement('div')
        const img = document.createElement('img')
        a.textContent = element.description
        a.setAttribute('href', '#calender-div')
        a.setAttribute('class', 'habit')
        a.setAttribute('id', element.id)
        a.addEventListener('click', renderCalendar)
        li.append(a)
        li.setAttribute('id', `li_${element.id}`)
        li.setAttribute('class', element.frequency) // element.frequency
        img.setAttribute('src', '../images/delete.png')
        img.setAttribute('id', 'delete')
        img.addEventListener('click', deleteHabit.bind(this, a.getAttribute('id'), element.description))
        iconDiv.setAttribute('id', 'iconDiv')
        iconDiv.append(img);
        li.append(a)
        li.append(iconDiv)
        lis.push(li)
    });

    lis.forEach(li => {
        const ul = document.querySelector('#user-tasks')
        ul.append(li)
    })

    const tasks = document.querySelectorAll('li>a');


    tasks.forEach(task => {
        const id = task.getAttribute('id')
        fetch(`https://lap2-project-achieved.herokuapp.com/completion_dates/${id}`)
            .then(res => res.json())
            .then(crossCheckDates)

        function crossCheckDates(dates) {
            let li = document.querySelector(`#li_${id}`)
            let date = new Date();
            const month = date.toLocaleString('default', { month: '2-digit' });
            const todaysDate = `${date.getDate()}_${month}_22`
            const todaysDay = date.getDate()
            if (dates.err === 'Completion dates not found for this habit') {
                console.log('no date')
            } else {
                dates.forEach(date => {
                    if (date.date === todaysDate || li.getAttribute('class') === 'Monthly') {
                        task.setAttribute('class', 'habit_completed')
                    } else if (parseInt(date.date.split('_')[1]) - todaysDay < 6 && li.getAttribute('class') === 'Weekly') {
                        task.setAttribute('class', 'habit_completed')
                    }
                })

            }

        }
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
        const id = task.getAttribute('id')
        fetch(`https://lap2-project-achieved.herokuapp.com/completion_dates/${id}`)
        .then(res => res.json())
        .then(renderHabitChecklist)
        
        function renderHabitChecklist(data){
            let date = new Date();
            const month = date.toLocaleString('default', { month: '2-digit' });
            const todaysDate = `${date.getDate()}_${month}_22`
            let count = 0;

            if(data.err === 'Completion dates not found for this habit'){
                console.log('no date')
            } else{
                data.forEach( date => {
                    console.log(date.date)
                    if(date.date === todaysDate ){
                        count = 1;
                    }
                })
            }
            if(data.err === 'Completion dates not found for this habit' || count === 0){
                
                if(task.getAttribute('class') === 'habit'){
                    const div = document.createElement('div')
                    div.setAttribute('class',`confirm ${task.getAttribute('id')}`)
                    div.setAttribute('id',`checkbox_${task.getAttribute('id')}`)
                    const p = document.createElement('p')
                    p.textContent = `Did you complete ${task.textContent} today?`
                    const yesInput = document.createElement('input')
                    yesInput.addEventListener('click', postChecklist)
                    yesInput.setAttribute('class','yesButton')
                    yesInput.setAttribute('id',`yesButton_${task.getAttribute('id')}`)
                    yesInput.setAttribute('type','checkbox')
                    yesInput.setAttribute('name',`confirm_${task.getAttribute('id')}`)
                    yesInput.setAttribute('value','yes')
                    div.append(p)  
                    div.append(yesInput)
                    // 
                    const checklistDiv = document.querySelector('.taskForm')
                    checklistDiv.append(div)

                } else {
                    console.log('completing tasks...')
                    task.setAttribute('class', 'habit_completed')
                }
            }
        }
    })
    listComplete();
    checklistButton.setAttribute('hidden', 'hidden')
    hideChecklistButton.removeAttribute('hidden')
}

function listComplete() {
    if(document.querySelectorAll('.habit').length === 0) {
        const p = document.createElement('p')
        p.textContent = `All done for today!` 
        const checklistDiv = document.querySelector('.taskForm')
        checklistDiv.append(p)
    }
}

function removeChecklist(){
    const divs = document.querySelectorAll('.confirm')
    divs.forEach(div => {
        div.remove();
    })
    const checklistDiv = document.querySelector('.taskForm')
    checklistDiv.innerHTML = '';
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
        task.setAttribute('class', 'habit_completed')
    })
    listComplete(); 
}



// getting calender modals to pop up


async function renderCalendar(e){
    
    try {
        const id = e.srcElement.getAttribute('id')
        console.log(e.srcElement.getAttribute('id'))
        await fetch(`https://lap2-project-achieved.herokuapp.com/completion_dates/${id}`)
        .then(res => res.json())
        .then(updateCalendar)
    } catch (err) {
        console.warn(err);
    }
    const frequency = e.srcElement.parentElement.getAttribute('class')
    const calenderHeader = document.querySelector('#calender-header')
    calenderHeader.textContent = `${frequency} Habit: ${e.srcElement.textContent}`
}

function updateCalendar(data){
    console.log(data)
    const tds = document.querySelectorAll('td')

    tds.forEach(td => {
        td.removeAttribute('class')
    })

    if(data.err === 'Completion dates not found for this habit'){
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


const select = document.querySelector('#filterSelect');
select.addEventListener('change', (event) => {
    filterHabit(event.target.value);
})

function filterHabit(filter) {
    let habits = document.querySelectorAll('#user-tasks li a');
    let listdiv = document.querySelectorAll('#user-tasks li');
    if (filter === 'complete') {
        for (let i = 0; i < habits.length; i++) {
            console.log(habits);
            if ((habits[i]).getAttribute('class') === 'habit_completed') {
                listdiv[i].style.display = '';
            } else {
                listdiv[i].style.display = 'none';
            }
        }
    } else if (filter === 'incomplete') {
        for (let i = 0; i < habits.length; i++) {
            if ((habits[i]).getAttribute('class') !== 'habit_completed') {
                listdiv[i].style.display = '';
            } else {
                listdiv[i].style.display = 'none';
            }
        }
    } else if (filter === 'all') {
        for (let i = 0; i < habits.length; i++) {
            listdiv[i].style.display = '';
        }
    }
}

const habitForm = document.querySelector('#createHabitForm');
habitForm.addEventListener('submit', (e) => {
    addNewHabit(e);
    getHabitData(e.target.habitDescription.value);
})

function renderNewHabit(filtered){
    let entryData;
    let entryId;
    for (let entry of filtered) { 
        entryData = {
            description: entry.description,
            frequency: entry.frequency,
            user_id: localStorage.getItem('user_id')
        }
        entryId = entry.id;
    }
    console.log(entryData);
    const li = document.createElement('li')
    const a = document.createElement('a')
    const img = document.createElement('img')
    a.textContent = entryData.description
    a.setAttribute('href', '#calendar-div')
    a.setAttribute('class', 'habit')
    a.setAttribute('id', entryData.id)
    a.addEventListener('click', renderCalendar(a.getAttribute('id')))
    img.setAttribute('src', '../images/delete.png')
    img.setAttribute('id', 'delete')
    img.addEventListener('click', deleteHabit.bind(this, entryId, entryData.description))
    li.append(a)
    li.append(img)
    li.setAttribute('class', 'habit-style')
    li.setAttribute('class', entryData.frequency) // element.frequency
    {
        const ul = document.querySelector('#user-tasks')
        ul.append(li)
    }
}

async function getHabitData(habit) {
    try {
        let filtered;
        /*const options = {
            method: "GET",
            headers: {
            authorization:
                    `${localStorage.getItem('token')}`,
                
            }
        }*/
        const options = { headers: new Headers({'Authorization': localStorage.getItem('token')}) }
        await fetch(`https://lap2-project-achieved.herokuapp.com/habits/user/${localStorage.getItem('user_id')}`, options)
        .then(res => res.json())
        .then(data =>  {
                filtered = data.filter(match => match.description === habit)
            }
        )
        renderNewHabit(filtered)
    } catch (err) {
        console.log(err);
    }
}

async function addNewHabit(e) {
    e.preventDefault();
    try {
        const entryData = {
            description: e.target.habitDescription.value,
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
        .then(reloadPage);
    } catch (err) {
        console.warn(err);
    }
}

function reloadPage() {
    location.reload();
}

async function deleteHabit(habit_id, description) {
    const options = {
        method : "DELETE",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({"id": habit_id})
    }
    if (confirm(`Delete entry "${description}"?`)) {
        fetch(`https://lap2-project-achieved.herokuapp.com/habits/${habit_id}`, options)
        .then(reloadPage)
    } else {
        return;
    }
}
