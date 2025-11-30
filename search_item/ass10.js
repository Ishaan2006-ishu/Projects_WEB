// let data;  // global variable

// // Fetch products
// async function fetchProducts() {
//   const url = "https://fakestoreapi.com/products";

//   try {
//     let res = await fetch(url);
//     data = await res.json();   
//     displayProducts(data);
//   } 
//   catch (err) {
//     document.getElementById("productGrid").innerHTML = "Error loading products.";
//     console.error(err);
//   }
// }


// function displayProducts(products) {
//   const grid = document.getElementById("productGrid");
//   grid.innerHTML = ""; 

//   products.forEach(item => {
//     const box = document.createElement("div");
//     box.className = "productBox";

//     box.innerHTML = `
//       <h4>${item.title}</h4>
//       <p>Price: $${item.price}</p>
//     `;

//     grid.appendChild(box);
//   });
// }


// search=document.getElementById("search");
// search.addEventListener("input", function () {
//   const text = search.value.toLowerCase();

//   const filtered = data.filter(p =>
//     p.title.toLowerCase().includes(text)
//   );
  
  

//   displayProducts(filtered);
// });


// fetchProducts();


      //  ---------------------->    With Bonous    <---------------------
let data;  


async function fetchProducts() {
  const url = "https://fakestoreapi.com/products";

  try {
    let res = await fetch(url);
    data = await res.json();   
    displayProducts(data);
  } 
  catch (err) {
    document.getElementById("productGrid").innerHTML = "Error loading products.";
    console.error(err);
  }
}



function displayProducts(products) {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = ""; 

  products.forEach(item => {
    const box = document.createElement("div");
    box.className = "productBox";

    box.innerHTML = `
      <h4>${item.title}</h4>
      <p>Price: $${item.price}</p>
    `;

    grid.appendChild(box);
  });
}




function debounce(func, delay) {
  let timer; // stays in closure

  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => func(), delay);
  };
}




function filterProducts() {
  const text = search.value.toLowerCase();

  const filtered = data.filter(p =>
    p.title.toLowerCase().includes(text)
  );

  displayProducts(filtered);
}



const search = document.getElementById("search");
search.addEventListener("input", debounce(filterProducts, 300));



fetchProducts();
