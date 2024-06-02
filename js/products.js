export async function fetchProducts() {
    try {
        //* db.json dosyasına fetch ile istek attık
        const response = await fetch("db.json")
        if (!response.ok) {
            throw new Error("URL yanlış")
        }

        //* Gelen cevabı json formatına çevirdik ve dışarıya return ettik
        return await response.json()

    } catch (error) {
        return []
    }
}

//* Ürünlerin sayfaya render edilen fonksiyonlarını tanımlıyoruz
export function renderProducts(products, addToCartCallback) {
    //* HTML dosyasından ürünlerin listeleneceği elementi seçeriz
    const productList = document.getElementById("productList")

    //* Ürünlerin html formatında listeye eklenmesi için products dizisini dönüp her bir product için ekrana product cart ını aktardık
    productList.innerHTML = products.map((product) => `
    <div class="product">
    <img src="${product.image}
        alt="" class="product-img">
    <div class="product-info">
        <h2 class="product-title">${product.title}</h2>
        <p class="product-price">$${product.price}</p>
        <a class="add-to-cart" data-id="${product.id}">Add to Cart</a>
    </div>
</div>
    `).join("")

    //* add to cart butonları seçiliyor
    const addToCartButtons = document.getElementsByClassName("add-to-cart")

    //* Her bir add to cart butonuna tıklama olayı ekleniyor
    for (let i = 0; i < addToCartButtons.length; i++) {
        const addToCartButton = addToCartButtons[i]
        addToCartButton.addEventListener("click", addToCartCallback)
    }
}