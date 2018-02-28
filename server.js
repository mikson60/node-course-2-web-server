const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// Init app
let app = express();

// Setup view engine for templating
app.set('view engine', 'hbs');

// Middleware
app.use((req, res, next) => {
    let now = new Date().toString();

    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });

    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

// Register partials
hbs.registerPartials(__dirname + '/views/partials');

// Register helpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// Setup routing
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to Jens-Stefan portfolio page!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
})

// Run app
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});