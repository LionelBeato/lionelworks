
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

graphQLQuery('https://bookcase-deno.herokuapp.com/graphql', {query:'{ allBooks {title} }'})
.then(res => {
    console.log(res.data.allBooks);
    res.data.allBooks.forEach(book => {
        let bookDiv = document.createElement(`div`)
        bookDiv.className = "book";
        shelf.appendChild(bookDiv);
    });

}); 



