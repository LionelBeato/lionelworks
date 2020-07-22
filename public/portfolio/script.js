// code to generate slots dynamically

let shelf = document.querySelector(".book-shelf");
let popUp = document.createElement("div");

const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

rangeArray = range(1,24,1);
rangeArray.forEach( el => {
  let bookSlot = document.createElement('div');
  bookSlot.id = `book-slot-${el}`; 

  bookSlot.setAttribute("ondrop", "drop_handler(event, this)");
  bookSlot.setAttribute("ondragover", "dragover_handler(event)"); 

  // if (!bookSlot.hasChildNodes){
  //   bookSlot.setAttribute("ondrop", "");
  //   bookSlot.setAttribute("ondragover", ""); 
  // }

  // console.log(bookSlot);

  shelf.appendChild(bookSlot); 

  // ondrop="drop_handler(event, this)"
 // ondragover="dragover_handler(event)"


}
);

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
  query: "{ allBooks {title, id, blurb, slug, color} }",
}).then((res) => {
  console.log(res);
  res.data.allBooks.forEach((book) => {
    let bookDiv = document.createElement(`div`);
    let bindTop = document.createElement(`div`); 
    let bindBottom = document.createElement(`div`); 
    let blurbEl = document.createElement(`p`); 
    let titleDiv = document.createElement(`h1`);
    let shownTitle = document.createElement('span');
    let idDiv = document.createElement(`h3`);

    bookDiv.setAttribute("data-title", `${book.title}`)

    blurbEl.innerText = `${book.blurb}`

    bookDiv.className = "book";
    bookDiv.id = `book-${book.id}`;
    bookDiv.setAttribute("draggable", "true");

    shownTitle.innerText = `${book.slug}`; 
    shownTitle.className = "book-title"; 

    bindTop.className = "bind-top"; 
    bindBottom.className = "bind-bottom";
    bookDiv.appendChild(bindTop);
    bookDiv.appendChild(bindBottom); 

    // titleDiv.className = "book-title";
    titleDiv.id = `book-title-${book.title}`;
    titleDiv.innerText = `${book.title}`;
    titleDiv.setAttribute("hidden", "");
    bookDiv.appendChild(titleDiv);

    // idDiv.className = "book-id";
    idDiv.id = `book-id-${book.id}`;
    idDiv.innerText = `${book.id}`;
    idDiv.setAttribute("hidden", "");
    blurbEl.setAttribute("hidden", "");
    bookDiv.appendChild(blurbEl);

      function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
      }    
    bookDiv.style.height = `${getRandomIntInclusive(6,8)}rem`;
    console.log(getRandomIntInclusive(8,10));
    // bookDiv.style.backgroundColor = `${book.color}`; 
    // bookDiv.appendChild(shownTitle);

    let bookSlot = document.querySelector(`#book-slot-${book.id}`)


    bookSlot.appendChild(bookDiv);

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

    popUp.id = `pop-up`;

    element.onmousemove = (e) => {

    let x = e.clientX;
    let y = e.clientY;
    popUp.style.top = y + 20 + "px";
    popUp.style.left = x + 20 + "px";

      bookDiv.appendChild(popUp);
      popUp.innerText = `${book.title}`;
      

      // this method help remove the extra pop-up element from the drag image
      element.ondragstart = (ev) => {
        popUp.style.display = "none";
        setTimeout(() => {
          ev.target.className = "hidden";  
        }, 0)
      };

      // this method resets the popup
      element.ondragend = (ev) => {
        ev.target.className = "book";
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
    // console.log(popUp);
    // ev.target.className = "hidden";
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

  let child1 = event.target.children[2].cloneNode(true);
  let child2 = event.target.children[3].cloneNode(true);

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


let searchBox = document.querySelector("#search-box");

// selection code
let sel = document.getElementById('search-select')
sel.onmouseout = (e) => {
  console.log(sel.value)
}

// function to search books  
searchBox.onkeyup = async (e) => {
  console.log(e.target.value);
  let search = String(e.target.value);
  console.log(search);  

  let q;

  if (sel.value === 'title'){
    q = `{ booksByTitle(title:"${search}") {title, id, blurb, slug, color} }`;
  }
  if (sel.value === 'author'){
    q = `{ booksByAuthor(lastName:"${search}") {title, id, blurb, slug, color} }`;
  }
  
  graphQLQuery("https://bookcase-deno.herokuapp.com/graphql", {
    query: q,
  })
  .then((res) => {
    console.log(res);
    let returnedBooks;
    if (sel.value === 'title'){
      returnedBooks = res.data.booksByTitle;
    }
    if (sel.value === 'author'){
      returnedBooks = res.data.booksByAuthor;
    }
    let allBookDivs = document.querySelectorAll(".book");
    allBookDivs.forEach(el => el.remove());

    returnedBooks.forEach((book) => {
      let bookDiv = document.createElement(`div`);
      let bindTop = document.createElement(`div`); 
      let bindBottom = document.createElement(`div`); 
      let blurbEl = document.createElement(`p`); 
      let titleDiv = document.createElement(`h1`);
      let shownTitle = document.createElement('span');
      let idDiv = document.createElement(`h3`);
  
      bookDiv.setAttribute("data-title", `${book.title}`)
  
      blurbEl.innerText = `${book.blurb}`
  
      bookDiv.className = "book";
      bookDiv.id = `book-${book.id}`;
      bookDiv.setAttribute("draggable", "true");
  
      shownTitle.innerText = `${book.slug}`; 
      shownTitle.className = "book-title"; 
  
      bindTop.className = "bind-top"; 
      bindBottom.className = "bind-bottom";
      bookDiv.appendChild(bindTop);
      bookDiv.appendChild(bindBottom); 
  
      // titleDiv.className = "book-title";
      titleDiv.id = `book-title-${book.title}`;
      titleDiv.innerText = `${book.title}`;
      titleDiv.setAttribute("hidden", "");
      bookDiv.appendChild(titleDiv);
  
      // idDiv.className = "book-id";
      idDiv.id = `book-id-${book.id}`;
      idDiv.innerText = `${book.id}`;
      idDiv.setAttribute("hidden", "");
      blurbEl.setAttribute("hidden", "");
      bookDiv.appendChild(blurbEl);
  
        function getRandomIntInclusive(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
        }    
      bookDiv.style.height = `${getRandomIntInclusive(6,8)}rem`;
      console.log(getRandomIntInclusive(8,10));
      // bookDiv.style.backgroundColor = `${book.color}`; 
      // bookDiv.appendChild(shownTitle);
  
      let bookSlot = document.querySelector(`#book-slot-${book.id}`)
  
  
      bookSlot.appendChild(bookDiv);
  
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
  
      popUp.id = `pop-up`;
  
      element.onmousemove = (e) => {
  
      let x = e.clientX;
      let y = e.clientY;
      popUp.style.top = y + 20 + "px";
      popUp.style.left = x + 20 + "px";
  
        bookDiv.appendChild(popUp);
        popUp.innerText = `${book.title}`;
        
  
        // this method help remove the extra pop-up element from the drag image
        element.ondragstart = (ev) => {
          popUp.style.display = "none";
          setTimeout(() => {
            ev.target.className = "hidden";  
          }, 0)
        };
  
        // this method resets the popup
        element.ondragend = (ev) => {
          ev.target.className = "book";
          popUp.style = "";
          popUp.style.top = y + 20 + "px";
          popUp.style.left = x + 20 + "px";
        };
      };
  
      // element.onmouseleave = () => {
      //   console.log("popUp removed!")
      // }
    });
  }).catch(e => console.log(`Error with your query! See this: ${e}`));
}



trigger.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);
// window.addEventListener("click", windowOnClick);


