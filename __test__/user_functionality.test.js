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

    it('check get checklist button renders list of items to do', () => {
        const getChecklist = document.querySelector('#checklistButton')
        getChecklist.dispatchEvent(new dom.window.Event('click'))
        const taskForm = document.querySelector('.taskForm')
        expect(taskForm.hasChildNodes()).toBe(true)
    })
})