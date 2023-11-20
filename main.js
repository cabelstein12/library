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

function addBookToSidebar(num){
    const bookList = document.querySelector('.book-list');
    const newBook = document.createElement('li');
    const bookLink = document.createElement('a');
    bookLink.href = '#';
    bookLink.textContent = myLibrary[num].title;
    bookLink.addEventListener('click', function () {
        createBookModal(num);
    });
    newBook.append(bookLink);
    bookList.appendChild(newBook);
}


function createBookModal(index){
    let modalBody = document.createElement('div');
    let modalText = document.createElement('p');
    let closeButton = document.createElement('button');
    let deleteButton = document.createElement('button');
    const bookInfoElement = displayBookInfo(index);

    closeButton.textContent='X';
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', closeModal)

    deleteButton.textContent = 'Remove Book';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', closeModal)
    deleteButton.addEventListener('click', function() {
        deleteBook(index);    
    });

    modalBody.classList.add('modal');
    modalBody.setAttribute('id', index);

    modalText.appendChild(bookInfoElement);
    modalBody.append(closeButton);
    modalBody.append(modalText);
    modalBody.append(deleteButton);
    document.body.append(modalBody);
}

function closeModal(event){
    let index = event.currentTarget.parentElement.getAttribute('id');
    let modalBody = document.getElementById(index);
    modalBody.remove();
}

function generateBookElement(book, index) {
    const bookContainer = document.createElement('div');
    
    const titleParagraph = document.createElement('p');
    titleParagraph.classList.add('modal-text');
    titleParagraph.textContent = 'Title: ' + book.title;

    const authorParagraph = document.createElement('p');
    authorParagraph.classList.add('modal-text');
    authorParagraph.textContent = 'Author: ' + book.author;

    const genreParagraph = document.createElement('p');
    genreParagraph.classList.add('modal-text');
    genreParagraph.textContent = 'Genre: ' + book.genre;

    const statusParagraph = document.createElement('p');
    statusParagraph.classList.add('modal-text', 'status');
    statusParagraph.textContent = 'Status: '
    const statusLink = document.createElement('a');
    statusLink.setAttribute('id', `status${index}`)
    statusLink.href = '#';
    statusLink.textContent = book.status;
    statusLink.addEventListener('click', function(){
        toggleReadStatus(index);
    })
    statusParagraph.appendChild(statusLink);

    bookContainer.appendChild(titleParagraph);
    bookContainer.appendChild(authorParagraph);
    bookContainer.appendChild(genreParagraph);
    bookContainer.appendChild(statusParagraph);

    return bookContainer;
}

function displayBookInfo(index) {
    const bookElement = generateBookElement(myLibrary[index], index);
    return bookElement;
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