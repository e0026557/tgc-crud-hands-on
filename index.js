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
app.get('/update-book/:book_id', function(req, res) {
    let bookId = req.params.book_id;
    let book = database.getBook(bookId) 
    res.render('update-book-form.hbs', book);
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

// Find book by id
// TODO

app.listen(3000, function(){
    console.log("Server has started");
})