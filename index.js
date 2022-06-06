const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
const database = require('./data');

const app = express();

app.set('view engine', 'hbs');

wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

app.use(express.urlencoded({
    'extended': false
}));

// Show all books
app.get('/', function(req,res){
    let books = database.getAll();
    res.render('books.hbs', {
        books: books
    });
})

// Add books
app.get('/add-book', function(req,res) {
    res.render('add-book-form.hbs');
})

app.post('/add-book', function(req, res) {
    let title = req.body.title;
    let isbn = req.body.isbn;

    database.addBook(title, isbn);

    res.redirect('/');
})

// Update books
app.get('/update-book', function(req, res) {
    res.render('update-book-form.hbs');
})

app.post('/update-book', function(req, res) {
    let id = req.body.id;
    let title = req.body.title;
    let isbn = req.body.isbn;

    database.updateBook(id, title, isbn);

    res.redirect('/');
})

// Delete books
app.get('/delete-book', function(req, res) {
    res.render('delete-book-form.hbs');
})

app.post('/delete-book', function(req, res) {
    let id = req.body.id;
    database.deleteBook(id);
    res.redirect('/');
})

app.listen(3000, function(){
    console.log("Server has started");
})