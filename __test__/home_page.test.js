/**
 * @jest-environment jsdom
 */

 const fs = require("fs");
 const path = require("path");
 const html = fs.readFileSync(path.resolve(__dirname, "../home_page.html"), "utf-8") 
 
 describe("home page", () => {
     beforeEach(() => {
         document.documentElement.innerHTML = html.toString();  //beforeEach can be used if an action needs to be repeated before each test
     })
     it('h1 shows "Accomplish" when website loads', () => {
         const h1 = document.querySelector('h1');
         expect(h1.innerHTML).toBe("Accomplish")
       })

       it('h1 shows "Accomplish" when website loads', () => {
        const h1 = document.querySelector('h1');
        expect(h1.innerHTML).toBe("Accomplish")
      })
    
       
    })