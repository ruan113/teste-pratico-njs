const express = require('express');
const viewRoutes = require('./routes');

const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//Routes
app.use('', viewRoutes);
app.use(express.static(__dirname + '/assets'));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.listen(process.env.PORT || '3000', () => {
    console.log(`Server is running on port: ${process.env.PORT || '3000'}`)
});
