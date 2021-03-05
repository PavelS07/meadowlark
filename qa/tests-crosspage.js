let Browser = require('zombie'),
    assert = require('chai').assert;
let browser;
let domainName = 'http://localhost:3000';

suite('Межстраничные тесты', function(){
    setup(function(){
        browser = new Browser();
    });

test('запрос расценок для групп со страницы туров по реке Худ'
    + 'должен заполнять поле реферера', function(done){
    let referrer = domainName + '/tours/hood-river';
    browser.visit(referrer, function(){
        browser.clickLink('.requestGroupRate', function(){
            assert(browser.field('referrer').value
                === referrer);
            done();
        }); });
});
test('запрос расценок для групп со страницы туров '
    + 'пансионата "Орегон Коуст" должен '
    + 'заполнять поле реферера', function(done){
    let referrer = domainName + '/tours/oregon-coast';
    browser.visit(referrer, function(){
        browser.clickLink('.requestGroupRate', function(){
            assert(browser.field('referrer').value
                === referrer);
            done();
        }); });
});
test('посещение страницы "Запрос цены для групп" напрямую '
    + 'должен приводить к пустому полю реферера', function(done){
    browser.visit(domainName + '/tours/request-group-rate',
        function(){
            assert(browser.field('referrer').value=== '');
            done();
        });});
});
