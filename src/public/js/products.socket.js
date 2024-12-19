const socket = io();

const productsList = document.getElementById("products-list");
const productsForm = document.getElementById("products-form");
const inputProductId = document.getElementById("input-product-id");
const btnDeleteProduct = document.getElementById("btn-delete-product");
const errorMessage = document.getElementById("error-message");

socket.on("products-list", (data) => {
    productsList.innerHTML = "<tr><td colspan='4'>Cargando productos...</td></tr>";
    setTimeout(() => {
        productsList.innerHTML = "";

        data.products.forEach(product => {
            productsList.innerHTML += `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.title}</td>
                    <td>$${product.price}</td>
                    <td>
                        <button class="add-to-cart" data-id="${product.id}">Agregar al carrito</button>
                        <button class="remove-from-cart" data-id="${product.id}">Eliminar del carrito</button>
                    </td>
                </tr>
            `;
        });

        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", (event) => {
                const productId = event.target.getAttribute("data-id");
                socket.emit("add-to-cart", { id: productId });
            });
        });

        document.querySelectorAll(".remove-from-cart").forEach(button => {
            button.addEventListener("click", (event) => {
                const productId = event.target.getAttribute("data-id");
                socket.emit("remove-from-cart", { id: productId });
            });
        });
    }, 500);
});

productsForm.onsubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(productsForm);
    const title = formData.get("title");
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    const status = formData.get("status") === "on";

    if (!title || isNaN(price) || isNaN(stock)) {
        errorMessage.textContent = "Todos los campos son obligatorios.";
        if (!title) document.querySelector("[name='title']").style.borderColor = 'red';
        if (isNaN(price)) document.querySelector("[name='price']").style.borderColor = 'red';
        if (isNaN(stock)) document.querySelector("[name='stock']").style.borderColor = 'red';
        return;
    }

    socket.emit("insert-product", { title, price, stock, status, code: `PRD${Date.now()}`, category: "General" });
    productsForm.reset();
    errorMessage.textContent = "";
};

btnDeleteProduct.onclick = () => {
    const productId = Number(inputProductId.value);
    if (productId) {
        socket.emit("delete-product", { id: productId });
    }
    inputProductId.value = "";
};

socket.on("error-message", (data) => {
    errorMessage.textContent = data.message;
});
