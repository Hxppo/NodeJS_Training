const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const helmet = require('helmet');
const morgon = require('morgan');
const logger = require('./middleware/logger');
const express = require('express');
const app = express();
const courses = require('./routes/courses');
const home = require('./routes/home');

app.set('view engine', 'pug');
app.set('views', './views');

console.log('Name: ' + config.get('name'));
console.log('Mail_Server: ' + config.get('mail.host'));

// prepross the request 
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));
app.use(helmet());

// define the routers
app.use('/api/courses', courses);
app.use('/', home);

// enable tiny given the NODE_ENV
if (app.get('env') === 'development') {
    app.use(morgon('tiny'));
    startupDebugger('Morgon is enabled...');
}

// output to console given the spacename 
dbDebugger('Connect to the database...');

app.use(logger.log);
app.use(logger.authenticate);

// PORT: enviorment variable 
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listerning to port ${port}...`);
});
