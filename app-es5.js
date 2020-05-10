/**
 * Using ES5
 */


//Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// CRUD Constructor will add, delete, update book object to dom
function CRUD() { }

CRUD.prototype.addBookToList = function (book) {

    // GET LIST
    let body = document.getElementById("book-list");

    // CREATE ROM
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

CRUD.prototype.clearAllFields = function () {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
}

CRUD.prototype.validate = function (book) {
    if (book.title === "" || book.author === "" || book.isbn === "") {

        let error = document.getElementById("error");
        error.classList.add('error');
        error.textContent = "EMPTY FIELDS";

        setTimeout(function () {
            error.remove();
        }, 3000)
    }

    //IF TRUE  RETURN OBJECT
    return book;
}

// add event
let form = document.getElementById("book-form");

form.addEventListener("submit", function (e) {

    // GET FORM VALUES
    let bookTitle = document.getElementById("title").value;
    let bookAuthor = document.getElementById("author").value;
    let bookISBN = document.getElementById("isbn").value;

    //console.log(`${bookTitle} - ${bookAuthor} - ${bookISBN}`);

    let book = new Book(bookTitle, bookAuthor, bookISBN);
    let crud = new CRUD();

    if (crud.validate(book)) {
        crud.addBookToList(book);
        crud.clearAllFields();
    }

    e.preventDefault();

});



if (document.querySelector(".delete")) {

    document.querySelector(".delete").addEventListener("click", function (e) {
        e.preventDefault();
        console.log("deleted");
    });
}
