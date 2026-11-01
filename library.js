const library = document.getElementById("library");
const bookList = Array.from(document.querySelectorAll(".book"));

for(let i = 0; i<bookList.length; i++){
    const random = Math.floor(Math.random() * (bookList.length));
    const temp = bookList[i];
    bookList[i] = bookList[random];
    bookList[random] = temp;
}

library.append(...bookList)


const dialog = document.getElementById("book-dialog");
const dialogCover = document.getElementById("dialog-cover");
const bookTitle = document.getElementById("book-title");
const bookReview = document.getElementById("book-review");

bookList.forEach(book => {
    const image = book.querySelector("img");

    function openBook() {
        dialogCover.src = image.src;
        dialogCover.alt = image.alt;
        bookTitle.textContent = image.alt;
        bookReview.textContent =book.dataset.review;

        dialog.showModal();
    }

    book.addEventListener("click", openBook);
});

document.getElementById("close-dialog")
    .addEventListener("click", () => {
        dialog.close();
    });
