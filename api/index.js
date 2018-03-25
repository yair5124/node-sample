const express = require('express');
const url = require('url');
const mongo = require('../util/mongodb');
var rp = require('request-promise').defaults({ json: true });
var router = express.Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

router.get('/', (req, res, next) => {
    mongo.findAll().then(result => {
        res.send(result);
    // res.render('index.ejs', {quotes: result});
    }).catch(e => next(e));
});

router.get('/quotes', (req, res, next) => {
    let urlPath = url.format({
        protocol: req.protocol,
        host: req.get('host')
    });
    rp(urlPath).then(result => {
        res.send(result);
// res.render('index.ejs', {quotes: result});
    }).catch(e => next(e));
});

router.get('/quote/:id', (req, res, next) => {
    mongo.findById(req.params.id).then(result => {
        console.log(result);
        res.send(result);
    }).catch(e => next(e));
});

router.get('/quote', (req, res, next) => {
    mongo.find(req.query).then(result => {
        console.log(result);
        res.send(result);
    }).catch(e => next(e));
});

router.put('/quote', (req, res, next) => {
    console.log(JSON.stringify(req.body));
    mongo.update(req.body).then(result => {
        console.log('Updated successfully');
        console.log(result);
        res.send(result);
    }).catch(e => next(e));
});

router.post('/quote', (req, res, next) => {
    console.log(JSON.stringify(req.body));
    mongo.insert(req.body).then(result => {
        console.log('Saved to database successfully');
        res.send(result);
    }).catch(e => next(e));
});

router.delete('/quote/:id', (req, res, next) => {
    mongo.deleteById(req.params.id).then(result => {
        console.log('Quote deleted successfully');
        res.send(result);
    }).catch(e => next(e));
});

router.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    console.error(err);
    res.status(500).send(err.stack || err)
});

module.exports = router;