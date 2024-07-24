const express = require('express')
const routers = express.Router()
const axios = require('axios')

routers.get("/", function(req, res) {
    res.send("Chessdata backend lives here")
})

routers.get("/openings", async (req, res) => {
    const fen = req.query.fen
    if (!fen) {
        console.log("Issue with transmitting FEN data from frontend")
    }
    else try {
        const opening = await axios.get(`https://explorer.lichess.ovh/masters?fen=${fen}`)
        console.log("Opening name: " + JSON.stringify(opening.data.opening) + "\n")
        console.log("Available moves: " + JSON.stringify(opening.data.moves))
        res.json({
            opening: opening.data.opening,
            moves: opening.data.moves
        });
    } catch (error) {
        console.error("Error querying from backend: " + error);
    }
    
})

module.exports = routers