const express = require('express')
const cors = require('cors')
const router = require('./routers/routers')

const app = express()

app.use(cors())

app.use("/api", router)

app.listen(4000, function() {
    console.log("listening on port 4000")
})
