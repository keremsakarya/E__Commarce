export function saveToLocalStorage(cart) {
    localStorage.setItem("cart", JSON.stringify(cart))
}

export function getCartFromLocalStorage() {
    return JSON.parse(localStorage.getItem("cart")) || []
}

//* Sepetteki ürün miktarını hesaplar
export function updateCartIcon(cart) {
    const cartIcon = document.getElementById("cart-icon")
    const i = document.querySelector(".bx-shopping-bag")

    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)

    i.setAttribute("data-quantity", totalQuantity)
    cartIcon.setAttribute("data-quantity", totalQuantity)
}

export function calculateCartTotal(cart) {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
}