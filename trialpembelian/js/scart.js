document.addEventListener('DOMContentLoaded', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalProductsElem = document.getElementById('total-products');
    const totalPriceElem = document.getElementById('total-price');
    const discountElem = document.getElementById('discount');
    const totalPaymentElem = document.getElementById('total-payment');

    let totalProducts = 0;
    let totalPrice = 0;
    let discount = 0;

    
    if (cart.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="6" class="text-center">Keranjang Anda kosong</td>`;
        cartItemsContainer.appendChild(row);
    } else {
        cart.forEach((item, index) => {
            const totalItemPrice = item.price * item.quantity;
            totalProducts += item.quantity;
            totalPrice += totalItemPrice;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${item.img}" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>Rp. ${item.price.toLocaleString()}</td>
                <td>Rp. ${totalItemPrice.toLocaleString()}</td>
                <td><button class="btn btn-danger delete-btn" data-index="${index}">Delete</button></td>
            `;
            cartItemsContainer.appendChild(row);
        });
    }

    discount = totalPrice * 0.1; 
    const totalPayment = totalPrice - discount;

   
    totalProductsElem.textContent = totalProducts;
    totalPriceElem.textContent = totalPrice.toLocaleString();
    discountElem.textContent = discount.toLocaleString();
    totalPaymentElem.textContent = totalPayment.toLocaleString();

    
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart)); 
            location.reload(); 
        });
    });


    document.getElementById('clear-cart').addEventListener('click', function () {
        localStorage.removeItem('cart');
        location.reload();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const paymentButton = document.querySelector('.btn-success');
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));

    paymentButton.addEventListener('click', function () {
        successModal.show(); 
    });
});