const buttons = document.getElementById("buttons")
window.onload = (event) =>  { 
    fetch("/jokebook/categories", {
        method: "GET",
    })
    .then(response => response.json())
    .then(json => {
        for (const cat of json) {
            let button = document.createElement("button")
            button.innerText = cat
            button.addEventListener("click", (elem, eveny) => {
                fetchJoke(cat)
            })
            console.log(button)
            buttons.appendChild(button)
        }
    })
}

function fetchJoke(category) {
    const joke_container = document.getElementById("joke")
    joke_container.innerHTML = ""
    fetch(`/jokebook/joke/${category}`, {
        method: "GET",
    })
    .then(response => response.json())
    .then(json => {
        const joke = document.createElement("p")
        joke.innerText = json.joke
        const response = document.createElement("p")
        response.innerText = json.response
        joke_container.appendChild(joke)
        joke_container.appendChild(response)
    })
    .catch(err => {
        joke_container.innerText = "an error occured"
        console.log(err)
    })
}