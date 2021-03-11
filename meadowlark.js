let express = require('express');
let fortune = require('./lib/fortune.js');
let app = express();

// установка механизма представления handlebars
let handlebars = require('express-handlebars').create(
    { defaultlayout:'main',
             helpers:{
               section:function(name, options){
                if(!this._sections){this._sections = {}};
                this._sections[name] = options.fn(this);
                return null;
            }
            }});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// порт для прослушки
app.set('port', process.env.PORT || 3000);

// определяем папку со статическими данными
app.use(express.static(__dirname + '/public'))


// установка тестов
app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

// промежуточное ПО для примера работы частичных шаблонов
app.use(function(req, res, next){
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weatherContext = getWeatherData();
    next();
});

// главная страница
app.get('/', function (req, res) {
    res.render('home');
});

// страница тура
app.get('/tours/hood-river', function (req, res) {
    res.render('tours/hood-river');
});

// страница пансионата
app.get('/tours/oregon-coast', function (req, res) {
    res.render('tours/hood-river');
});

// страница запрос цены
app.get('/tours/request-group-rate', function (req, res) {
    res.render('tours/request-group-rate');
});

// страница о
app.get('/about', function (req, res) {
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});



// пользовательская страница 404
app.use(function(req, res){
    res.status(404);
    res.render('404');
});

// пользовательская страница 500
app.use(function(err, req, res){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

// Прослушивание порта
app.listen(app.get('port'), function(){
    console.log('Express запущен\nНажмите Ctrl+C для завершения.');
});

// функция для работы примера с частичными шаблонами
function getWeatherData(){
    return {
        locations: [
            {
                name: 'Портленд',
                forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather: 'Сплошная облачность ',
                temp: '54.1 F (12.3 C)',
            },
            {
                name: 'Бенд',
                forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
                weather: 'Малооблачно',
                temp: '55.0 F (12.8 C)',
            },
            {
                name: 'Манзанита',
                forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
                weather: 'Небольшой дождь',
                temp: '55.0 F (12.8 C)',
            },
        ],
    }
}