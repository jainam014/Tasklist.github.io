//Book class: Represents a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
//UI class:  handle UI class  
class UI {
    static displayBooks() {
        const StoredBooks = [
            {
                title: 'Book One',
                author: 'John Doe',
                isbn: '3422123'
            },
            {
                title: 'Book Two',
                author: 'Jainam Kajaliya',
                isbn: '14092005'
            }
        ];

        const books = store.getBooks();

        books.forEach((books) => UI.addBookToList(books));

    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }



    static showAlert(meassage, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(meassage));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        //Set TimeOut
        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}
//store class: handle Storages

class store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Event: Display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
//Event: Add book
document.querySelector('#book-form').addEventListener('submit', (e) => {

    //Prevent Actual Default
    e.preventDefault();

    //Get form Values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //Validate
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        //Instatiate book
        const book = new Book(title, author, isbn);

        //Add book to UI
        UI.addBookToList(book);

        //Add book Store
        store.addBook(book);

        //Show Success Meassage
        UI.showAlert('Task Added', 'success');

        //Clear fields
        UI.clearFields();

    }


});
//Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    //Remove Book From UI
    UI.deleteBook(e.target);

    //Remove Book from Store
    store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    
    //Deleted Books
    UI.showAlert('Task Removed', 'success');
});
