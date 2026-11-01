
const params = new URLSearchParams(window.location.search);
const bookId = params.get("id");

async function loadBook() {
    const response = await fetch("data/books.json");
    const data = await response.json();
    const book = data.books.find(b => b.id === bookId);

    document.title = book.title;

    document.getElementById("cover").src = book.coverUrl;
    document.getElementById("cover").alt = book.title;
    document.getElementById("title").textContent = book.title;
    document.getElementById("review").textContent = book.content;
}

loadBook();
