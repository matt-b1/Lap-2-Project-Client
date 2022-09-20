/**
 * @jest-environment jsdom
 */

 const fs = require("fs");
 const path = require("path");
const { hasUncaughtExceptionCaptureCallback } = require("process");
 const html = fs.readFileSync(path.resolve(__dirname, "../user_home_page.html"), "utf-8") 
 
 describe("home page", () => {
     beforeEach(() => {
         document.documentElement.innerHTML = html.toString();  //beforeEach can be used if an action needs to be repeated before each test
     })

     it('it has h3 with "what will you achieve today"', () => {
       const h3 = document.querySelector('h3')
       expect(h3.innerHTML).toContain("What will you achieve today?")
      })

    })