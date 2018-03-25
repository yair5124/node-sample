const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api')

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use('/', api);

app.listen(3000, () => console.log('App started listening on port 3000'));

