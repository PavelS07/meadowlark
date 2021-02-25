let express = require('express');
let fortune = require('./lib/fortune.js');
let app = express();

// установка механизма представления handlebars
let handlebars = require('express-handlebars').create({ defaultlayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

// установка тестов
app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

// определяем папку со статическими данными
app.use(express.static(__dirname + '/public'))

// главная страница
app.get('/', function (req, res) {
    res.render('home');
});

// страница о
app.get('/about', function (req, res) {
    res.render('about', { fortune: fortune.getFortune() });
});


// пользовательская страница 404
app.use(function(req, res){
    res.status(404);
    res.render('404');
});

// пользовательская страница 500
app.use(function(req, res){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

// Прослушивание порта
app.listen(app.get('port'), function(){
    console.log('Express запущен\nНажмите Ctrl+C для завершения.');
});