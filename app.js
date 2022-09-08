//Declaracion de variables
let contenedorCarrito = document.querySelector('.products');
let containerBuyCart = document.querySelector('.card-items');
let PrecioTotal = document.querySelector('.price-total')
let Totalproductos = document.querySelector('.count-product');

let Compra = []
document.addEventListener('DOMContentLoaded' ,()=> {
    if (localStorage.getItem('Compra')){
        carrito=JSON.parse(localStorage.getItem('Compra'))
        loadHtml()
    }     
});

let totalCard = 0;
let ConteoProducto = 0;

//Creacion de Funciones
InteraccionCarrito();
function InteraccionCarrito(){
    contenedorCarrito.addEventListener('click', AgregarNuevoProducto);
    containerBuyCart.addEventListener('click', EliminarProducto);
}
//añadir producto al carrito
function AgregarNuevoProducto(e){
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement; 
        MostrarContenido(selectProduct);
        localStorage.setItem("Compra", JSON.stringify(selectProduct));
    }
}
//eliminar productos del carrito
function EliminarProducto(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');

        Compra.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                totalCard =  totalCard - priceReduce;
                totalCard = totalCard.toFixed(2);
            }
        });
        Compra = Compra.filter(product => product.id !== deleteId);
        
        ConteoProducto--;
    }
    if (Compra.length === 0) {
        PrecioTotal.innerHTML = 0;
        Totalproductos.innerHTML = 0;
    }
    loadHtml();
}
//Mostrar contenido del carrito
function MostrarContenido(product){
    const infoProduct = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
        
    }
//total lista y precio
    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);
    localStorage.setItem("Compra", JSON.stringify(totalCard));

    const exist = Compra.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = Compra.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;
            } else {
                return product
            }
        });
        //Uso del spreed Operator
        Compra = [...pro];
    } else {
        Compra = [...Compra, infoProduct]
        ConteoProducto++;
    }
    loadHtml();
}

function showCart(x){
    document.getElementById("products-id").style.display = "block";
}
function closeBtn(){
     document.getElementById("products-id").style.display = "none";
}

function loadHtml(){
    clearHtml();
    Compra.forEach(product => {
        const {image, title, price, amount, id} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}$</h5>
                <h6>Amount: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;

        containerBuyCart.appendChild(row);

        PrecioTotal.innerHTML = totalCard;

        Totalproductos.innerHTML = ConteoProducto;
    });
}
 function clearHtml(){
   containerBuyCart.innerHTML = '';
   localStorage.setItem("Compra", JSON.stringify(containerBuyCart));
}