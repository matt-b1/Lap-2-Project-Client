/**
 * @jest-environment jsdom
 */

 const fs = require("fs");
 const path = require("path");
 const html = fs.readFileSync(path.resolve(__dirname, "../static/html/home_page.html"), "utf-8") 
 
 describe("home page", () => {
     beforeEach(() => {
         document.documentElement.innerHTML = html.toString();  //beforeEach can be used if an action needs to be repeated before each test
     })

       it('it has a nav bar with two anchor tags', () => {
        const anchors = document.querySelectorAll('nav > a')
        expect(anchors.length).toEqual(2)
      })

      it('it has a login anchor tag', () =>{
        const login = document.querySelector('#login')
        expect(login.innerHTML).toContain("Login")
      })
      it('it has a signup anchor tag', () =>{
        const signUp = document.querySelector('#signup')
        expect(signUp.innerHTML).toContain("Sign up")
      })

      it('it has a signup anchor tag', () =>{
        const signUp = document.querySelector('#signup')
        expect(signUp.innerHTML).toContain("Sign up")
      })

    
       
    })