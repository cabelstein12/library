const myLibrary = [];

function Book(title, author, genre, status){
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.status = status;
}
const grapesOfWrath = new Book('The Grapes of Wrath', 'John Steinbeck' , 'Fiction', 'Read');
myLibrary.push(grapesOfWrath);

function createBookModal(){
    let modalBody = document.createElement('div');
    let modalText = document.createElement('p');
    let closeButton = document.createElement('button');

    closeButton.textContent='X';
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', function(){
        modalBody.style.display = 'none';
    })

    modalText.innerHTML = displayBookInfo(0);
    modalBody.classList.add('modal');

    modalBody.append(closeButton);
    modalBody.append(modalText);
    document.body.append(modalBody);
}
function displayBookInfo(i){
    return `
            <div>
                <p class='modal-text'>Title: ${myLibrary[i].title}</p>
                <p class='modal-text'>Author: ${myLibrary[i].author}</p>
                <p class='modal-text'>Genre: ${myLibrary[i].genre}</p>
                <p class='modal-text'>Status: ${myLibrary[i].status}</p>
            </div>
            `
}

function openModal(){
    createBookModal()
}

function addBookToLibrary(){
const bookList = document.querySelector('.book-list'); ///targets ul

for(let i = 0; i < myLibrary.length; i++){
    const newBook = document.createElement('li');
    const bookLink = document.createElement('a');
    bookLink.href = '#';
    bookLink.onclick = openModal;

    bookLink.innerHTML = myLibrary[i].title;
    newBook.append(bookLink)
    bookList.appendChild(newBook);
    console.log(myLibrary[i])
    }
}



addBookToLibrary();