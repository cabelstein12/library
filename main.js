const myLibrary = [];



myLibrary.forEach(( _,index) => {
    addBookToSidebar(index);
})

// function Book(title, author, genre, status){
//     this.title = title;
//     this.author = author;
//     this.genre = genre;
//     this.status = status;
// }

class Book{
    constructor(title, author, genre, status){
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.status = status;
    }
}

//sample books

let grapesOfWrath = new Book('The Grapes of Wrath', 'John Steinbeck', 'Fiction', 'Read');
let creativityInc = new Book('Creativity Inc.', 'Ed Catmull', 'Non-Fiction', 'Read');
let snowCrash = new Book('Snow Crash', 'Neil Stephenson', 'Fiction', 'Read');
let lawsOfPower = new Book('Siddhartha', 'Hermann Hesse', 'Fiction', 'Unread');

myLibrary.push(grapesOfWrath);
myLibrary.push(creativityInc);
myLibrary.push(snowCrash);
myLibrary.push(lawsOfPower);

for(let i = 0 ; i < myLibrary.length; i++){
    addBookToSidebar(i);
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
        if( document.querySelector('.card').classList.value !== 'card card-rotate'){
            card.classList.toggle('card-rotate');
        }
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
    document.querySelector('#read-status').addEventListener('click', function(){
        toggleReadStatus(index);
        addBookInfo(index);
        setTimeout(() => {
            document.querySelector('.card').classList.toggle('card-rotate');
        }, "600");
    })
    document.querySelector('#delete-book').addEventListener('click', function(){
        deleteBook(index);
        setTimeout(() => {
            document.querySelector('.card').classList.toggle('card-rotate');
        }, "450");
    })
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
    // document.querySelector('.card').style.transform = 'rotateY(180deg)';
}

const bookForm = document.getElementById('book-form');
bookForm.addEventListener('submit', submitForm);