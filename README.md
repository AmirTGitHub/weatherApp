# weatherApp
<img src="https://developers.cloudflare.com/logos/expressjs.svg" width="100">
This is a weather application for the Financial Times junior engineer role.

I used `Express` to run the server and `Handlebars` for the engine view.

The application is live in [`here`](https://weather-app-amir.herokuapp.com/)

# How to run the app locally

To run the app locally you need to first run `npm install` in your terminal in this folder to install all the dependencies.Afterward, if you run `npm start` you can see the prompt in the console that the `server is running ov port 4545` and if you open the browser and go to [`localhost:4545`](localhost:4545) you can see the app.

# Dependencies

```
"dependencies": {
    "dotenv": "^6.0.0",
    "express": "^4.16.3",
    "express-handlebars": "^3.0.0",
    "node-fetch": "^2.2.0",
    "nodemon": "^1.18.3"
  }
  ```
   # Application specification 

* 1.Display the weather for your current location:
  
  With `HTML5 Geolocation` I get the user `latitude and longitude` and pass them to the backend and then I will do the `Fetch` to get the weather data and render them to the page.

* 2.Allow you to chose the city you’re getting the weather from:
  
  I provide a `form` in the page so the user can write a city name and find the weather of that city.

* 3.Not rely too heavily on client-side frameworks (i.e. Angular, React) or libraries like jQuery:
  
  I didn't use any of these libraries.

# Additionally, for bonus points, the site could:

* 1.Be accessible:
  
  Based on `lighthouse chrome app` it is `80% accessible`.

* 2.Be responsive:
  
  Because I used `origami input` and` button` and those are responsive. Also, I used `flexbox` for the weather cards and that helps everything to shrink near the edges`.

* 3.Be server-side rendered:
  
  I used `Express` for the server and all the logic of the app are happening in the server

* 4.Be progressively enhanced:
  
  Again based of `lighthouse chrome app` it is `85% progressive` web app`.

* 5.Be built using Javascript and node.js:
  
   I used only `vanilla JavaScript` on the front-end and `Node.js` for the back-end.

* 6.Be deployed on Heroku:
  
  it is live on [`Heroku`.](https://weather-app-amir.herokuapp.com/)

* 8.Use​​ Origami​ Components:
  
  I used `form` and `button` from the Origami Components.

* 9.Work offlinePlease :
  
  By registering `service workers` and use fetch first strategy I catch all the important parts of the app and when the user is offline I show the last result of the weather.
