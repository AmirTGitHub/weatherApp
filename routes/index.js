const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

require("dotenv").config({ path: "variable.env" });

const appId = process.env.APPID;

const getConfig = {
  method: "GET",
  header: {
    "content-type": "application/json"
  }
};

router.get("/?", async (req, res) => {
  const city = req.query["city"] || "london";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${appId}`;
  try {
    const weather = await fetch(url, getConfig);
    const data = await weather.json();

    if (data.cod === "200") {
      // get everyday data not every three houres
      const days = [];
      data.list.map((item, index) => {
        if (index % 8 === 0) {
          //safari doesn't accept the yyyy-MM-dd an it was showed the invalid date. 
          //Now I move the frontend logic to the back-end
          const date = new Date(item.dt_txt).toString();
          const finalDate = date
            .split(" ")
            .slice(0, 3)
            .join(" ");
          item.dt_txt = finalDate
          days.push(item)
        }
      });
      res.render("home", { data: days, city });
    } else {
      res.render("error", { error: data.message, city });
    }
  } catch (error) {
    console.log(error);
    res.render("error", { error: "an error accrued please try again later " });
  }
});

router.post("/current", async (req, res) => {
  const lat = req.body.lat;
  const lon = req.body.lon;
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${appId}`;
    const weather = await fetch(url, getConfig);
    const data = await weather.json();
    if (data.cod === "400") {
      res.render("error", { error: data.message });
      return;
    }
    res.render("current", {
      location: data.name,
      main: data.weather[0].main,
      description: data.weather[0].description,
      temperature: data.main.temp
    });
  } catch (error) {
    res.render("error", {
      error: "an error accrued please try again later "
    });
  }
});

module.exports = router;
