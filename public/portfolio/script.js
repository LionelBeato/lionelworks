
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

// fetch query for API

async function graphQLQuery(url, data){
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials:'same-origin',
        headers: {
            'COntent-Type': 'application/json'
        },
        redirect: 'follow',
        reffererPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json();
}

// code to insert said books

let shelf = document.querySelector("#shelf-1");

// let test = () => {
//     console.log("this works!")
//     books.forEach(book => {
//         console.log(book);
//         let bookDiv = document.createElement("div");
//         bookDiv.className = "book"; 
//         shelf.appendChild(bookDiv);
//             }
//         );

// }

// test();

graphQLQuery('https://bookcase-deno.herokuapp.com/graphql', 
{query:"{ allBooks {title, id} }"})
.then(res => {
    // console.log(res.data.allBooks);
    res.data.allBooks.forEach(book => {
        let bookDiv = document.createElement(`div`)
        bookDiv.className = 'book'; 
        bookDiv.id = `book-${book.id}`;
        bookDiv.setAttribute("draggable", "true")
        shelf.appendChild(bookDiv);   
    });


    let element = document.getElementById(`book-1`);
    console.log(element)
    return element; 
})
.then(element => console.log(element))





function dragover_handler(ev){
    ev.preventDefault();
    ev.dataTransfer.dropEffect =  "move"; 
}


function drop_handler(ev){
    ev.preventDefault();
   const data =  ev.dataTransfer.getData("text/plain");
   console.log(ev);
   ev.target.appendChild(document.getElementById(data));
}


window.addEventListener('DOMContentLoaded',  async () => {
    // get the element by its id
    const element = document.getElementById(`book-1`);
     await console.log(element)
    // add the ondragstart event listener
    element.addEventListener("dragstart", dragstart_handler); 
});



function dragstart_handler(ev){
    // transfer element id to data transfer object
    ev.dataTransfer.setData("text/plain", ev.target.id);
    ev.dataTransfer.setData("text/html", ev.target.outerHTML); 
    ev.dataTransfer.dropEffect = "move";
    console.log(ev);

}
