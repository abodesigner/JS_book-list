/**
 * Using ES6 Classess
 */

// Class Book
class Book {

    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// Class Logic handle UI funtionalities
class Logic {

    addBookToList(book) {
        // GET LIST
        let body = document.getElementById("book-list");

        // CREATE ROW
        let row = document.createElement("tr");

        //INSERT DATA INSIDE ROW
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `;

        body.appendChild(row);

    }

    clearAllFields() {
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("isbn").value = "";
    }

    showMessage(message, className) {

        // Create the new node to insert
        let errDiv = document.createElement('div');
        errDiv.className = className;
        errDiv.textContent = `${message}`;

        // Get a reference to the parent node
        let parent = document.getElementById("book-form").parentNode;
        let child = document.getElementById('add-book');

        parent.insertBefore(errDiv, child);

        setTimeout(function () {
            errDiv.remove();
        }, 3000);

    }

    validate(book) {
        let bookTitle = document.getElementById("title").value;
        let bookAuthor = document.getElementById("author").value;
        let bookISBN = document.getElementById("isbn").value;

        if (bookTitle === "" || bookAuthor === "" || bookISBN === "") {

            this.showMessage("Empty FIELDS", 'error');

        } else {

            this.addBookToList(book);
            StoreInLS.addBook(book);
        }
    }

    deleteBook(target) {
        if (target.classList.contains('delete')) {
            target.parentElement.parentElement.remove();
            new Logic().showMessage("Book deleted", "success");
        }
    }

}

// Class StoreInLS handle LocalStorage funtionalities
class StoreInLS {

    static getBooks() {

        let books;
        // if there is no data stored in localStorage
        if (localStorage.getItem("books") === null) {
            books = []; // then create an empty array
        } else { // else fetch the stored data using JSON.parse()
            books = JSON.parse(localStorage.getItem("books"));
        }

        return books;

    }

    static dislayBooks() {
        const books = StoreInLS.getBooks(); // return value from getBooks() method
        books.forEach(book => {
            new Logic().addBookToList(book);
        })
    }

    static addBook(book) {
        const books = StoreInLS.getBooks(); // return value from getBooks() method
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }

    static removeBook(isbn) {

        const books = StoreInLS.getBooks();
        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem("books", JSON.stringify(books));





    }
}


document.addEventListener("DOMContentLoaded", StoreInLS.dislayBooks);

// add event
let form = document.getElementById("book-form");
let book;
let logic;

form.addEventListener("submit", function (e) {

    // GET VALUES FROM INPUT FIELDS
    let bookTitle = document.getElementById("title").value;
    let bookAuthor = document.getElementById("author").value;
    let bookISBN = document.getElementById("isbn").value;

    book = new Book(bookTitle, bookAuthor, bookISBN);
    logic = new Logic();
    logic.validate(book);
    logic.clearAllFields(book);

    e.preventDefault();

});

let list = document.getElementById("book-list");
list.addEventListener("click", function (e) {

    new Logic().deleteBook(e.target);
    StoreInLS.removeBook(e.target.parentElement.previousElementSibling.textContent);

});
