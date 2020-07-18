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
let popUp = document.createElement("div");

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
    let titleDiv = document.createElement(`h1`);
    let idDiv = document.createElement(`h3`);

    bookDiv.className = "book";
    bookDiv.id = `book-${book.id}`;
    bookDiv.setAttribute("draggable", "true");

    // titleDiv.className = "book-title";
    titleDiv.id = `book-title-${book.title}`;
    titleDiv.innerText = `${book.title}`;
    titleDiv.setAttribute("hidden", "");
    bookDiv.appendChild(titleDiv);

    // idDiv.className = "book-id";
    idDiv.id = `book-id-${book.id}`;
    idDiv.innerText = `${book.id}`;
    idDiv.setAttribute("hidden", "");
    bookDiv.appendChild(idDiv);

    shelf.appendChild(bookDiv);

    // event listener needs to be added here so that its dynamically placed on every new book element
    const element = document.getElementById(`book-${book.id}`);
    element.addEventListener("dragstart", dragstart_handler);
    element.addEventListener("click", openModal);

    // let popUpSpan = document.createElement("span");
    // popUp.appendChild(popUpSpan);

    // code to create a popup on hover
    // element.addEventListener("mouseenter", () => {
    //   console.log("this hover event works!");

    //   document.body.appendChild(popUp);
    // })

    // element.addEventListener("mouseleave", () => {
    //   console.log("child removed!!");
    //   let popUp = document.querySelector("#pop-up");
    //   document.body.removeChild(popUp);
    // })

    // code below helps create a tooltip that displays a book-title on every book
    // reference is here: http://jsfiddle.net/HJf8q/2/

    element.onmousemove = (e) => {
      // let popUp = document.querySelector(`[id*=pop-up]`);
      // there should only be one popup
      // this will avoid a few errors
      // TODO(): refactor popup code so that it only exists once
      popUp.id = `pop-up-${book.id}`;
      bookDiv.appendChild(popUp);
      popUp.innerText = `${book.title}`;
      var x = e.clientX,
        y = e.clientY;
      popUp.style.top = y + 20 + "px";
      popUp.style.left = x + 20 + "px";

      element.ondragstart = () => {
        console.log(e.target);
        console.log(e.target);
        // e.target.style.visibility = "hidden";
        popUp.style.display = "none";
        console.log(popUp);
      };

      element.ondragend = () => {
        popUp.style = "";
        popUp.style.top = y + 20 + "px";
        popUp.style.left = x + 20 + "px";
      };
    };

    // element.onmouseleave = () => {
    //   console.log("popUp removed!")
    // }
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
  let book = document.getElementById(data);
  setTimeout(() => (book.className = "book"), 0);
  el.appendChild(book);
}

let img = new Image();
img.src =
  "https://visualpharm.com/assets/867/Book-595b40b85ba036ed117daef9.svg";
// let popUp;

function dragstart_handler(ev) {
  setTimeout(() => {
    // popUp = ev.target.children[2];
    // popUp.style.visiblity = "hidden";
    console.log(popUp);
    ev.target.className = "hidden";
  }, 0);

  ev.dataTransfer.setData("text/plain", ev.target.id);
  // ev.dataTransfer.setDragImage(img, 1, 1);
  console.log(ev.target);

  ev.dataTransfer.setData("text/html", ev.target);
  ev.dataTransfer.dropEffect = "move";
}

// code for modal

var modal = document.querySelector(".modal");
let modalContent = document.querySelector(".modal-content");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");

function openModal(event) {
  console.log(event.target);
  console.log(event.target.children);
  // event.target.childNodes.forEach(child => {
  //   child.removeAttribute("hidden");
  //   console.log(child);
  //   modalContent.appendChild(child);

  // });

  let child1 = event.target.children[0].cloneNode(true);
  let child2 = event.target.children[1].cloneNode(true);

  child1.removeAttribute("hidden");
  child2.removeAttribute("hidden");

  modalContent.appendChild(child1);
  modalContent.appendChild(child2);

  modal.classList.toggle("show-modal");

  // if (!modal.classList.toggle("show-modal")){
  // modalContent.remove(title);
  // modalContent.remove(bio);
  // }
}

function closeModal() {
  modal.classList.toggle("show-modal");
  while (modalContent.firstChild) {
    modalContent.removeChild(modalContent.firstChild);
  }
}

// function windowOnClick(event) {
//   if (event.target === modal) {
//     closeModal();
//   }
// }

trigger.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);
window.addEventListener("click", windowOnClick);
