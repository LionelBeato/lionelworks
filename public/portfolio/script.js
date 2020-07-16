// code to generate books dynamically

// fetch query for API

async function graphQLQuery(url, data) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "COntent-Type": "application/json",
    },
    redirect: "follow",
    reffererPolicy: "no-referrer",
    body: JSON.stringify(data),
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


graphQLQuery("https://bookcase-deno.herokuapp.com/graphql", {
  query: "{ allBooks {title, id} }",
}).then((res) => {
  console.log(res);
  res.data.allBooks.forEach((book) => {
    let bookDiv = document.createElement(`div`);
    bookDiv.className = "book";
    bookDiv.id = `book-${book.id}`;
    bookDiv.setAttribute("draggable", "true");
    shelf.appendChild(bookDiv);

    // event listener needs to be added here so that its dynamically placed on every new book element
    const element = document.getElementById(`book-${book.id}`);
    element.addEventListener("dragstart", dragstart_handler);
  });
});

// window.addEventListener("DOMContentLoaded", (event) => {
//   // get the element by its id
//   const element = document.getElementById(`book-4`);
//   console.log(element);
//   // add the ondragstart event listener
//   element.addEventListener("dragstart", dragstart_handler);
// });

function dragover_handler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
}

// I need to specify the element here to prevent event handling on nested element
// see: https://stackoverflow.com/questions/28203585/prevent-drop-inside-a-child-element-when-drag-dropping-with-js/28203782#28203782
function drop_handler(ev, el) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text/plain");
  console.log(data);
  el.appendChild(document.getElementById(data));
}

function dragstart_handler(ev) {
  // transfer element id to data transfer object
  ev.dataTransfer.setData("text/plain", ev.target.id);
  console.log(ev);

  ev.dataTransfer.setData("text/html", ev.target);
  ev.dataTransfer.dropEffect = "move";
}
