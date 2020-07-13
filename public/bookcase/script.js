
// code to generate books dynamically

let books = [
    {
        title: "lorem",
        publisher: "lorem",
        author: "lorem",
    },
    {
        title: "lorem",
        publisher: "lorem",
        author: "lorem",
    },
    {
        title: "lorem",
        publisher: "lorem",
        author: "lorem",
    },
]

// code to insert said books

let shelf = document.querySelector("#shelf-1");

let test = () => {
    console.log("this works!")
    books.forEach(book => {
        console.log(book);
        let bookDiv = document.createElement("div");
        bookDiv.className = "book"; 
        shelf.appendChild(bookDiv);
            }
        );

}

test(); 



