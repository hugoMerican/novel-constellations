const library = document.getElementById("library");
const bookList = Array.from(document.querySelectorAll(".book"));

for(let i = 0; i<bookList.length; i++){
    const random = Math.floor(Math.random() * (bookList.length - 1));
    const temp = bookList[i];
    bookList[i] = bookList[random];
    bookList[random] = temp;
}

library.append(...bookList)
