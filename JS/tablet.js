
const container = document.getElementById('products');

let productHTML = '';

fetch('https://dummyjson.com/products/category/tablets')
    .then(response => response.json())
    .then(data => {
      
       
        data.products.forEach(product => {
            productHTML += `
        <div class=" productItem rounded-4 text-center bg-basicColorGradientBottom py-3 position-relative" data-id="${product.id}">
            <img class=" productImageItem m-auto" src="${product.thumbnail}" alt="${product.title}">
            <div class="titleProduct">
                <h3 class=" text-center">${product.title}</h3>
                <p>${product.description.split(" ").splice(0, 5).join(" ")}</p>
                <p><span class="fw-bold">Price</span>: ${product.price}$</p>
                <div class="d-flex justify-content-evenly btnaddcart">
                    <button class="btn btn-outline-light addBtn" type="submit">Add +</button>
                    <i class="fa fa-heart fs-3 "></i>
                </div>
            </div>
        </div>
      `;
        });

        container.innerHTML = productHTML;
    })
    .catch(error => console.error('Error:', error));


let iconCart = document.querySelector('.icon-cart');
let wishList = document.querySelector('.wishList');
let closeCart = document.querySelector('.close');
let closeWish = document.querySelector('.closeWish');
let body = document.querySelector('body');

iconCart.addEventListener('click',()=>{
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', ()=>{
    body.classList.remove('showCart');
})
wishList.addEventListener('click',()=>{
    body.classList.toggle('showWish');
})
closeWish.addEventListener('click', ()=>{
    body.classList.remove('showWish');
})

