const myLibrary = [];

let grapesOfWrath = new Book('The Grapes of Wrath', 'John Steinbeck', 'Fiction', 'Read');
let creativityInc = new Book('Creativity Inc.', 'Ed Catmull', 'Non-Fiction', 'Read');
let snowCrash = new Book('Snow Crash', 'Neil Stephenson', 'Fiction', 'Read');
let lawsOfPower = new Book('48 Laws of Power', 'Robert Greene', 'Non-Fiction', 'Unread');

myLibrary.push(grapesOfWrath);
myLibrary.push(creativityInc);
myLibrary.push(snowCrash);
myLibrary.push(lawsOfPower);

myLibrary.forEach(( _,index) => {
    addBookToSidebar(index);
})

function Book(title, author, genre, status){
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.status = status;
}

function submitForm(e){
    e.preventDefault();
    const bookForm = document.getElementById('book-form');
    const bookData = new FormData(bookForm);
    const newBook = { //make new book obj with key value pairs of form input
         title : bookData.get('title'),
         author : bookData.get('author'),
         genre : bookData.get('genre'),
         status : bookData.get('status'),
    }
    myLibrary.push(newBook);
    addBookToSidebar(myLibrary.length-1);
    bookForm.reset();
}

function addBookToSidebar(index){
    const card = document.querySelector('.card');
    const bookList = document.querySelector('.book-list');
    const newBook = document.createElement('li');
    const bookLink = document.createElement('a');
    bookLink.setAttribute('id', index)
    bookLink.href = '#';
    bookLink.textContent = myLibrary[index].title;
    bookLink.addEventListener('click', () => {
        addBookInfo(index);
        card.classList.toggle('card-rotate');
    });
    
    newBook.append(bookLink);
    bookList.appendChild(newBook);
}

document.querySelector('.add-new-book').addEventListener('click', () => {
    document.querySelector('.card').classList.toggle('card-rotate');
})

function addBookInfo(index) {
    const title = document.querySelector('.book-title');
    const author = document.querySelector('.book-author');
    const genre = document.querySelector('.book-genre');
    const status = document.querySelector('.book-status');

    title.textContent = `Title: ${myLibrary[index].title}`;
    author.textContent = `Author: ${myLibrary[index].author}`;
    genre.textContent = `Genre: ${myLibrary[index].genre}`;
    status.textContent = `Status: ${myLibrary[index].status}`;
}

function deleteBook(index){
    myLibrary.splice(index, 1);
    updateBookList();
}

function updateBookList(){
    const bookList = document.querySelector('.book-list');
    bookList.innerHTML = '';

    for(let i = 0; i < myLibrary.length; i++){
        addBookToSidebar(i)
    }
}

function toggleReadStatus(index){
    if(myLibrary[index].status === 'Read'){
        myLibrary[index].status = 'Unread';
    } else {
        myLibrary[index].status = 'Read';
    }
    let statusLink = document.getElementById(index)
    statusLink.remove();
    createBookModal(index);
}

const bookForm = document.getElementById('book-form');
bookForm.addEventListener('submit', submitForm);