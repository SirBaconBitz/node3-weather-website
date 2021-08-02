const path = require('path');

const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js')

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) =>
{
    res.render('index', {
        title: 'Weather',
        name: 'Anthony Palmer'
    });
});

app.get('/about', (req, res) =>
{
    res.render('about', {
        title: 'About Me',
        name: 'Anthony Palmer'
    });
});

app.get('/help', (req, res) =>
{
    res.render('help', {
        title: 'Help',
        name: 'Anthony Palmer',
        message: 'This is a helpful message'
    });
});

app.get('/weather', (req, res) =>
{
    if(!req.query.address)
    {
        res.send({
            error: "You must provide an address"
        });
    }
    else
    {
        geocode(req.query.address, (error, {lat, long, loc} = {}) => {
            if (error)
            {
                res.send({error});
            }
            else
            {
                forecast(lat, long, (error, {description, temperature, feelslike} = {}) => {
                    if (error)
                    {
                        res.send({error});
                    }
                    else
                    {
                        res.send({
                            location: loc,
                            weather: description,
                            temperature,
                            feelslike
                        });
                    }
                });
            }
        });
    }
});

app.get('/products', (req, res) =>
{
    if(!req.query.search)
    {
        res.send({
           error: "You must provide a search term"
        });
    }
    else
    {
        console.log(req.query.search);
        res.send({
            products: []
        });
    }
});

app.get('/help/*', (req, res) =>
{
    res.render('404', {
        title: '404',
        name: 'Anthony Palmer',
        errMessage: 'Help article not found.'
    });
});

app.get('*', (req, res) =>
{
    res.render('404', {
        title: '404',
        name: 'Anthony Palmer',
        errMessage: 'Page not found.'
    });
});

app.listen(port, () => {
    console.log('Server running on port ' + port);
});