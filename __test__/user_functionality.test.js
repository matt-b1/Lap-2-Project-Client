const renderDOM = require('./helpers')


let dom;
let document;


describe('user_home_page.html', () =>{
    beforeEach(async () => {
        dom = await renderDOM('static/html/user_home_page.html')
        document = await dom.window.document
        
    })

    it('check getDate() works to get todays date', () =>{
        const todaysDate = document.querySelector('#date')
        let date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        expect(todaysDate.textContent).toContain(`${date.getDate()} ${month} 2022`)
    })

    xit('check get checklist button renders list of items to do', () => {
        const getChecklist = document.querySelector('#checklistButton')
        const taskForm = document.querySelector('.taskForm')
        getChecklist.dispatchEvent(new dom.window.Event('click'))
        expect(taskForm.hasChildNodes()).toBe(true)
    })

    xit('check close checklist button closes list of items', async () => {
        const getChecklist = document.querySelector('#checklistButton')
        const closeChecklist = document.querySelector('#hideChecklist')
        const taskForm = document.querySelector('.taskForm')
        getChecklist.dispatchEvent(new dom.window.Event('click'))
        closeChecklist.dispatchEvent(new dom.window.Event('click'))
        expect(taskForm.hasChildNodes()).toBe(false)

    })

    it('filter function works to get all completed tasks for today', () => {
        const select = document.querySelector('#filterSelect')
        select.value = 'Complete'
        const habits = document.querySelectorAll('li > a')
        
        habits.forEach(habit => {
            let count = 0;
            if(habit.getAttribute('class') === 'habit_completed'){
                count+=1
            }
            
        })
        
        expect(habits.length).toEqual(count)

    })
})