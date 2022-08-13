require('dotenv').config();

const axios = require('axios').default;
const express = require('express');
const app = express();
const port = 3000;

const urls = {
    events: `https://api.seatgeek.com/2/events`,
    specificEvent: `https://api.seatgeek.com/2/events/{EVENT_ID}`,
    performers: `https://api.seatgeek.com/2/performers`,
    specificPerformer: `https://api.seatgeek.com/2/performers/{PERFORMER_ID}`,
    venues: `https://api.seatgeek.com/2/venues`,
    specificVenue: `https://api.seatgeek.com/2/venues/{VENUE_ID}`,
    taxonomies: `https://api.seatgeek.com/2/taxonomies`,
    recommendations: `https://api.seatgeek.com/2/recommendations`,
    genres: `https://api.seatgeek.com/2/genres`
};

const auth = {
    username: process.env.CLIENT_ID,
    password: process.env.SECRET_KEY
}

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/events', (req, res) => {
    axios.get(urls.events, {
        auth: auth
    })
    .then(r => res.json(r.data))
    .catch(err => console.log(err));
})

app.get('/events/:eventId', (req, res) => {
    axios.get(urls.specificEvent.replace('{EVENT_ID}', req.params.eventId), {
        auth: auth
    })
    .then(r => res.json(r.data))
    .catch(err => console.log(err));
})

app.get('/performers', (req, res) => {
    axios.get(urls.performers, {
        auth: auth
    })
    .then(r => res.json(r.data))
    .catch(err => handleError(err, res));
})

app.get('/performers/:performerId', (req, res) => {
    axios.get(urls.specificPerformer.replace('{PERFORMER_ID}', req.params.performerId), {
        auth: auth
    })
    .then(r => res.json(r.data))
    .catch(err => handleError(err, res));
})

app.get('/venues', (req, res) => {
    axios.get(urls.venues, {
        auth: auth
    })
    .then(r => res.json(r.data))
    .catch(err => console.log(err));
})

app.get('/venues/:venueId', (req, res) => {
    axios.get(urls.specificVenue.replace('{VENUE_ID}', req.params.venueId), {
        auth: auth
    })
    .then(r => res.json(r.data))
    .catch(err => console.log(err));
})

app.get('/taxonomies', (req, res) => {
    axios.get(urls.taxonomies, {
        auth: auth
    })
    .then(r => res.json(r.data))
    .catch(err => console.log(err));
})

app.get('/recommendations', (req, res) => {
    axios.get(urls.recommendations, {
        auth: auth,
        params: {
            'events.id': 5769286,
            // 'performers.id': 388,
            // 'performers.id': 4734,
        }
    })
    .then(r => res.json(r.data))
    .catch(err => console.log(err));
})

app.get('/genres', (req, res) => {
    axios.get(urls.genres, {
        auth: auth
    })
    .then(r => res.json(r.data))
    .catch(err => console.log(err));
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

function handleError(err, res) {
    console.log(err);
    if (err && err.data) {
        return res.json(err.data);
    }
    return res.json(err);
}