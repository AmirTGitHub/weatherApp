const appId = "fb77ae6b27304e850a962cd54f388809"
//change the NodeList to an array
NodeList.prototype.map = Array.prototype.map;

let title = document.getElementById('city')
let container = document.getElementById('container')
let card = document.createElement('div')
let newTitle = document.createElement('h3')
let newSubtitle = document.createElement('p')
let errorInPage = document.createElement('p')
let newImage = document.createElement('img')
let imageParent = document.createElement('div')
let geo = document.getElementById('geo')


// get the location of the users
const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

//get the weather base on the location of the user
const getWeather = async (position) => {
    const { latitude, longitude } = position.coords;
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${appId}`
        const data = await fetch(url)
        const weather = await data.json()
        console.log(weather)
        addToPage(weather.name, `${weather.main.temp} ${String.fromCharCode(176)}C `, weather.weather[0].description, weather.weather[0].main)
    } catch (error) {
        errorInPage.innerText = error
        document.body.appendChild(errorInPage)
    }

}
//find suable image base on weather
const foundImage = (weather) => {
    let imageSrc
    weather === "Clouds" ? imageSrc = '/icon/Cloudy.png' :
        weather === "Clear" ? imageSrc = '/icon/Sunny.png' : imageSrc = '/icon/Rainy.png'
    return imageSrc
}

// add weather of the current location to the page 
const addToPage = (position, temp, weather, checkIcon) => {
    container.style.display = 'none'
    card.classList.add('card')
    newTitle.classList.add('main')
    title.innerText = "current location: " + position
    const temperature = document.createTextNode(temp)
    newTitle.appendChild(temperature)
    const condition = document.createTextNode(weather)
    newSubtitle.appendChild(condition)
    newImage.src = foundImage(checkIcon)
    newImage.classList.add("image")
    imageParent.classList.add('icon')
    imageParent.appendChild(newImage)
    card.appendChild(imageParent)
    card.appendChild(newTitle)
    card.appendChild(newSubtitle)
    geo.appendChild(card)
    document.getElementById("btn").disabled = 'true';

}

const dateInPage = document.querySelectorAll('.date')
dateInPage.map(item => {
    const date = new Date(item.innerText).toString()
    const finalDate = date.split(' ').slice(0, 3).join(" ")
    item.innerText = finalDate
})


// Change the icone of the weather base on the weather
const imageComponent = document.querySelectorAll('.icon')
imageComponent.map(item => {
    console.log(item)
    const span = item.querySelectorAll('span')
    span.map(check => {
        if (check.innerText === "Clouds") {
            const icon = item.querySelectorAll('.image')
            icon.map(photo => photo.src = '/icon/Cloudy.png')
        } else if (check.innerText === "Clear") {
            const icon = item.querySelectorAll('.image')
            icon.map(photo => photo.src = '/icon/Sunny.png')
        }
    })
})
