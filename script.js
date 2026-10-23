
const stars = document.querySelectorAll(".night-sky .star");
const lines = document.querySelectorAll(".connections line");


const sky = document.querySelector(".night-sky");

const originalPositions = Array.from(stars).map(star => {

    const style = getComputedStyle(star);

    const x = parseFloat(style.left) / sky.clientWidth * 100;
    const y = parseFloat(style.top) / sky.clientHeight * 100;

    return { x, y };

});




function animate(time) {

    const seconds = time / 685;

    const positions = originalPositions.map((position, index) => {

        const x = position.x +
            Math.sin(seconds * 0.35 + index * 1.7) * 5;

        const y = position.y +
            Math.cos(seconds * 0.30 + index * 1.9) * 5;

        stars[index].style.left = x + "%";
        stars[index].style.top = y + "%";

        return { x, y };

    });

    lines.forEach(line => {

        const from = Number(line.dataset.from);
        const to = Number(line.dataset.to);

        line.setAttribute("x1", positions[from].x);
        line.setAttribute("y1", positions[from].y);

        line.setAttribute("x2", positions[to].x);
        line.setAttribute("y2", positions[to].y);

    });

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// JSON Section

async function loadBooks() {
    const response = await fetch("./data/books.json", { cache: "no-store" });

    if (!response.ok) {
        throw new Error("Failed to load ./data/books.json (HTTP " + response.status + ")");
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.books) || !data.books.length ||
        data.books.some(book => !book || typeof book.id !== "string" || !book.id.trim() ||
            typeof book.title !== "string" || !book.title.trim() || typeof book.personalNote !== "string")) {
        throw new Error("Expected a books array with an id, title, and personalNote for each book");
    }

    return data.books;
}

loadBooks().then(books => {
    document.querySelectorAll(".night-sky .star[data-book-id]").forEach(star => {
        const book = books.find(book => book.id === star.dataset.bookId);
        if (!book) {
            console.warn("No book found for star: " + star.dataset.bookId);
            return;
        }

        const card = star.querySelector(".book-card");
        card.querySelector("h3").textContent = book.title;
        card.querySelector("p").textContent = book.personalNote;

        const image = card.querySelector("img");
        const coverUrl = typeof book.coverUrl === "string" ? book.coverUrl.trim() : "";
        image.alt = book.title + " cover";
        image.onerror = () => { image.style.display = "none"; };
        image.style.display = coverUrl ? "" : "none";
        if (coverUrl) {
            image.src = coverUrl;
        } else {
            image.removeAttribute("src");
        }
    });

    const legend = document.querySelector(".atlas-legend");
    books.filter(book => book.featured === true).forEach(book => {
        const entry = document.createElement("div");
        const title = document.createElement("h3");
        const note = document.createElement("p");
        title.textContent = book.title;
        note.textContent = book.personalNote;
        entry.append(title, note);
        legend.append(entry);
    });
}).catch(error => {
    console.error("Could not display book data from ./data/books.json:", error);
});
