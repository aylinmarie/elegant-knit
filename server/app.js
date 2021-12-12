require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000; 

const usernameKey = process.env.REACT_APP_RAVELRY_USERNAME_KEY;
const passwordKey = process.env.REACT_APP_RAVELRY_PASSWORD_KEY;
const username = 'aylinmarie';
const base = 'https://api.ravelry.com';
const url = base + '/people/' + username + '/favorites/list.json';

app.use(cors());

app.get('/data', async(req, res, next) => {
    try {
        const response = await axios.get(url, {
            auth: {
                username: usernameKey,
                password: passwordKey
            }
        });
        res.json(response.data )
    } catch (error) {
        res.json({message: 'Looks like we have an error:', error: error})
    }
})

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); 
