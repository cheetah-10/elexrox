var ProductName = document.getElementById('Productname');
var Price = document.getElementById('Price');
var head=document.getElementById('head')
Productcontainer = [];
if(localStorage.getItem('product')!=null){
    Productcontainer=JSON.parse(localStorage.getItem('product')); 
    displayProduct();
}
function addProduct(){
    var Product =
    {
        ProductNameValue: ProductName.value,
        ProductPrice: Price.value
    }
    Productcontainer.push(Product);
    displayProduct();  
    resetProduct();
    localStorage.setItem('product' , JSON.stringify(Productcontainer));
    console.log('hello'); 
}
function displayProduct(){
    cartoona=``;
    for(var i=0; i<Productcontainer.length; i++){
        cartoona+=`<tr class="">
                        <td class="m-3">${i+1}</td>
                        <td class="m-3">${Productcontainer[i].ProductNameValue}</td>
                        <td class="m-3">${Productcontainer[i].ProductPrice}</td>
                        <td class="m-3"><button onclick="deleteProduct(${i})" class="btn btn-dark px-4">Delete</button></td>
                    </tr>` 
    }
    document.getElementById('data').innerHTML=cartoona;
}
function resetProduct() {
    ProductName.value = null;
    url.value = null;
}
function deleteProduct(p){
    Productcontainer.splice(p,1);
    localStorage.setItem('product',JSON.stringify(Productcontainer));
    displayProduct();
}

