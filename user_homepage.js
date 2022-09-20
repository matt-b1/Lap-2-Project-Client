

// when page load, fetch all the habbits

addEventListener('load', getAllHabits())

async function getAllHabits(){
    try {
        await fetch(`http://localhost:3000/habits/user/1`)
        .then(res => res.json())
        .then(renderAllHabbits)
    } catch (err) {
        console.warn(err);
    }
}


function renderAllHabbits(){
    let divs = [];
    

    data.forEach(element => {
        
    });

    divs.forEach(div => {
        cardssection.append(div)
    })
    

    let cardHolders = document.getElementsByClassName("card-div")
    console.log(cardHolders.length)

    
    
}
