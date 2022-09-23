# Achieved

## Project Aims

The project was to develop a habit tracker app that provided the following functionalities:

- Login/Registration system.
- Manage user habits.
- Mark habits off as complete.

## Table of Contents

1. [Installation & Use](#installation--use)
2. [Technologies](#technologies)
3. [Routes](#routes)
4. [Design](#site-design)
5. [Wins & Challenges](#wins--challenges)
6. [Code Snippets](#code-snippets)
7. [Testing](#testing)
8. [Future Features](#future-features)
9. [Licence](#license)
10. [Contributors](#contributors)

## Installation & Use

### *Site*

The site is deployed on [netlify](https://achieved-habit-tracker.netlify.app/static/html/home_page.html).

### *Server*

The server is deployed on [heroku](https://lap2-project-achieved.herokuapp.com/).

### *To run locally*

- Clone or download the repo.
- Open a terminal from the within the backend folder.
- ```npm install``` to get all the required dependencies.
- ```npm run dev``` to initialise the server.
- Run home_page.html within the client-side folder on a live server.

## Technologies

- #### Client-side: HTML/CSS/JS
- #### Server-side: Node.js/JS
- #### Database: PostgreSQL

### Planning

- GitHub issues
- Excalidraw
- Slack

### Dependencies

- bcrypt
- express
- Jest
- pg
- Nodemon
- Jsonwebtoken
- JSDom

## Routes

```
router.get('/:id', completedController.show);
router.post('/', completedController.create)
```
- Gets a habit id and completion status.
- Posts completion dates.
---
```
router.get('/:id', habitsController.showById);
router.get('/user/:id', verifyToken, habitsController.showByUserId);
router.post('/', habitsController.create)
router.delete('/:id', habitsController.destroy)
```
- Gets all habits for a user id.
- Gets a habit by habit id.
- Posts habit data.
- Deletes by habit id. 
---
```
router.get('/', usersController.index)
router.post('/', usersController.create)
router.post('/login', usersController.showByUsername)
```
- Gets user data.
- Creates a new user account.
- Logs in to a user account.

## Site Design

#### *Home page*
![image](https://user-images.githubusercontent.com/86776447/191809825-1994ad0e-9cd4-425f-b41c-3c2726186fdc.png)
---
#### *Log in form*

![image](https://user-images.githubusercontent.com/86776447/191809937-d088d53c-2392-4b55-9ef9-f8d13f6db67b.png)
---
#### *Sign up form*

![image](https://user-images.githubusercontent.com/86776447/191809963-e3b780fb-dbe8-422b-a062-cadad0874b94.png)
---
#### *User home page*
![image](https://user-images.githubusercontent.com/86776447/191918111-b200b648-e456-4171-8c55-a2be8a1be7d3.png)
---
#### *Habit calendar*
![image](https://user-images.githubusercontent.com/86776447/191810350-788ae0df-8fa8-4a1c-82bf-54ccbedad3cb.png)
---
#### *Create habit form*
![image](https://user-images.githubusercontent.com/86776447/191918187-422fdb09-6c08-4177-8c4a-475b6660bb31.png)

## Wins & Challenges

### Wins

- Authorisation and authentication system is fully functional.
- All data is successfully retrieved from the server and appropriately displayed client-side.
- Testing coverage of over 60%.

### Challenges

- A way of updating the streak successfully. A date needs to be sent and validated on the server to make sure that the streak does not increment everytime a condition is met on the clients' end.

## Code Snippets

## Testing

## Future Features

- Ability to suitably measure or track habit progress (eg. progress bar, percentage).
- Further work on design to make it look cleaner/more responsive.
- Make the calendar work for future dates.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Contributors

### [Zulaika Ali](https://github.com/zlka)
### [Stefan Mircea](https://github.com/babole)
### [Isobel Melvin](https://github.com/littlerou)
### [Matthew Blackman](https://github.com/ultimafinal1)
