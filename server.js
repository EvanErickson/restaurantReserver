const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/reservations', (req, res) => {
  fs.readFile('reservations.json', 'utf8', (e, data) => {
    if (e) { console.log(e) }

    const reservations = JSON.parse(data)

    res.json(reservations)
  })
})

app.post('/reservations', (req, res) => {
  fs.readFile('reservations.json', 'utf8', (e, data) => {
    if (e) { console.log(e) }

    const reservations = JSON.parse(data)

    reservations.push(req.body)

    fs.writeFile('reservations.json', JSON.stringify(reservations), e => {
      if (e) { console.log(e) }
      res.sendStatus(200)
    })
  })
})

app.listen(3000)
