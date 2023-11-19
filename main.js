const myLibrary = [];

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
    const newBook = {
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

    closeButton.textContent='X';
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', closeModal)

    deleteButton.textContent = 'Remove Book';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', deleteBook);
    deleteButton.addEventListener('click', closeModal)

    modalText.innerHTML = displayBookInfo(index);
    modalBody.classList.add('modal');

    modalBody.append(closeButton);
    modalBody.append(modalText);
    modalBody.append(deleteButton);
    document.body.append(modalBody);
}

function closeModal(){
    let modalBody = document.querySelector('.modal');
    modalBody.style.display = 'none';
}


function displayBookInfo(index){
    return `
            <div>
                <p class='modal-text'>Title: ${myLibrary[index].title}</p>
                <p class='modal-text'>Author: ${myLibrary[index].author}</p>
                <p class='modal-text'>Genre: ${myLibrary[index].genre}</p>
                <p class='modal-text'>Status: ${myLibrary[index].status}</p>
            </div>
            `
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

function toggleReadStatus(num){
    if(myLibrary[num].status === 'Read'){
        myLibrary[num].status = 'Unread';
    } else {
        myLibrary[num].status = 'Read';
    }
    closeModal();
    createBookModal(num);
}

const bookForm = document.getElementById('book-form');
bookForm.addEventListener('submit', submitForm);