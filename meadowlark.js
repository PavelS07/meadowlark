let express = require('express');
let app = express();

let fortunes = [
    "Победи свои страхи, или они победят тебя.",
    "Рекам нужны истоки.",
    "Не бойся неведомого.",
    "Тебя ждет приятный сюрприз.",
    "Будь проще везде, где только можно.",
];

// установка механизма представления handlebars
let handlebars = require('express-handlebars').create({ defaultlayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

// определяем папку со статическими данными
app.use(express.static(__dirname + '/public'))

// главная страница
app.get('/', function (req, res) {
    res.render('home');
});

// страница о
app.get('/about', function (req, res) {
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: randomFortune });
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