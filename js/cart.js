import { calculateCartTotal, getCartFromLocalStorage, saveToLocalStorage, updateCartIcon } from "./utils.js"

let cart = getCartFromLocalStorage()

//* Sepete ürün ekleyecek fonksiyondur
export function addToCart(event, products) {
    //* Tıkladığımız ürünün id sine eriştik ve id sini number tipine çevirdik
    const productID = parseInt(event.target.dataset.id)

    //* products dizisi içerisinden id sine ulaştığımız ürünü bulabilmek için find yöntemini kullandık
    const product = products.find((product) => product.id == productID)

    //* Ürünü bulursak if çalışacak
    if (product) {
        //* Sepette önceden eklediğimiz ürünü bulduk
        const exitingItem = cart.find((item) => item.id === productID)

        //* Sepette bu üründen daha önce varsa if çalışacak
        if (exitingItem) {
            //* Miktarını bir arttırır
            exitingItem.quantity++

        } else {
            //* Sepette bu üründen daha önce yoksa sepete yeni bir ürün ekleyeceğiz
            //* Sepet dizisine ekleyeceğimiz ürünün miktar özelliğini ekledik
            const cartItem = {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1,
            }
            cart.push(cartItem) // cart dizisine yeni oluşturduğumuz objeyi gönderdik

            event.target.textContent = "Added" // Ekleme butonunun içeriğini değiştirdik

            updateCartIcon(cart)
            saveToLocalStorage(cart)
            renderCartItems()
            displayCartTotal()

        }

    }
}

//* Sepetten ürün siler
function removeFromCart(event) {
    const productID = parseInt(event.target.dataset.id) // Sileceğimiz elemanın id sine eriştik

    cart = cart.filter((item) => item.id !== productID) // Tıklanılan elemanı sepetten kaldır
    saveToLocalStorage(cart)
    renderCartItems()
    displayCartTotal()
    updateCartIcon(cart)
}


function changeQuantity(event) {
    //* input un içerisindeki değeri aldık
    const quantity = parseInt(event.target.value)
    const productID = parseInt(event.target.dataset.id)

    if (quantity > 0) {
        const cartItem = cart.find((item) => item.id === productID)
        if (cartItem) {
            cartItem.quantity = quantity;
            saveToLocalStorage(cart);
            displayCartTotal();
            updateCartIcon(cart);
        }
    }
}


//* Sepetteki ürünleri ekrana render lar
export function renderCartItems() {
    const cartItemsElement = document.getElementById("cartItems")

    cartItemsElement.innerHTML = cart.map((item) => `
    <div class="cart-item">
                        <img src="${item.image}" alt="">
                        <div class="cart-item-info">
                            <h2 class="cart-item-title">${item.title}</h2>
                            <input type="number" min="1" value="${item.quantity}" class="cart-item-quantity" data-id="${item.id}">
                        </div>
                        <h2>$${item.price}</h2>
                        <button class="remove-from-cart" data-id="${item.id}">Remove</button>
                    </div>
    `).join("")

    //* Tüm silme butonlarını aldık
    const removeButtons = document.getElementsByClassName("remove-from-cart")
    for (let i = 0; i < removeButtons.length; i++) {
        const removeButton = removeButtons[i] // İndex numarasına göre silme butonlarını seçtik
        removeButton.addEventListener("click", removeFromCart) // Her buton için olay izleyicisi ekle ve fonksiyon çalıştır
    }

    const quantityInputs = document.getElementsByClassName("cart-item-quantity")

    for (let i = 1; i < quantityInputs.length; i++) {
        const quantityInput = quantityInputs[i]

        quantityInput.addEventListener("change", changeQuantity)
    }

    updateCartIcon(cart)
}


export function displayCartTotal() {
    const cartTotalElement = document.getElementById("cartTotal")
    const total = calculateCartTotal(cart)
    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`
}