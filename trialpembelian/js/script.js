document.addEventListener('DOMContentLoaded', function () {
    const minusButtons = document.querySelectorAll('.minus-btn');
    const plusButtons = document.querySelectorAll('.plus-btn');
    const quantities = document.querySelectorAll('.quantity');

    minusButtons.forEach((btn, index) => {
        btn.addEventListener('click', function () {
            let quantity = parseInt(quantities[index].value);
            if (quantity > 0) {
                quantities[index].value = quantity - 1;
            }
        });
    });

    plusButtons.forEach((btn, index) => {
        btn.addEventListener('click', function () {
            let quantity = parseInt(quantities[index].value);
            quantities[index].value = quantity + 1;
        });
    });

    document.querySelectorAll('.order-btn').forEach(button => {
        button.addEventListener('click', function () {
            const productImage = this.getAttribute('data-img');
            const productName = this.getAttribute('data-name');
            const productPrice = parseInt(this.getAttribute('data-price'));
            const quantityInput = this.parentElement.querySelector('.quantity');
            const quantity = parseInt(quantityInput.value);

            if (quantity > 0) {
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.push({
                    img: productImage,
                    name: productName,
                    price: productPrice,
                    quantity: quantity
                });
                localStorage.setItem('cart', JSON.stringify(cart));
                window.location.href = 'cart.html';
            } else {
                alert('Please select a quantity.');
            }
        });
    });

    const orderSummary = document.getElementById('order-summary');
    const orderList = document.getElementById('order-list');
    const totalPriceEl = document.getElementById('total-price');
    let totalPrice = 0;

});
