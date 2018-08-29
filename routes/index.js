const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')

require('dotenv').config({ path: 'variable.env' })

const appId = process.env.APPID

const getConfig = {
    method: 'GET',
    header: {
        'content-type': 'application/json'
    }
}



router.get('/?', async (req, res) => {
    const city = req.query['city'] || "london"
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${appId}`
    try {
        const weather = await fetch(url, getConfig)
        const data = await weather.json()
        if (data.cod === "200") {
            const days = []
            data.list.map((item, index) => {
                index % 8 === 0 && days.push(item);
            })
            res.render('home', { data: days, city })
        } else {
            res.render('error', { error: data.message, city })
        }
    } catch (error) {
        console.log(error)
        res.render('error', { error: 'an error accrued please try again later ' })
    }

})







module.exports = router;
