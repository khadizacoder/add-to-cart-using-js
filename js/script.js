const ringButton = document.querySelectorAll('.ring-button');
const imgSource = './images/';
for (const ring of ringButton) {
    const ringBtn = ring;
    ringBtn.addEventListener('click', (event) => {
        // dynamic img source ganarate
        const color = event.target.id.replace('-color', ''); // split('-')[0] (ai vabe o kora jai)
        // remove border
        for (const r of ringButton) {
            r.classList.remove("border", "border-purple-600", "border-2");
        }
        // add border
        event.target.classList.add("border", "border-purple-600", "border-2");
        // image changing
        const productImage = document.getElementById('product_image');
        productImage.src = imgSource + color + '.png';
    });
};

function selectWristSize(size) {
    const sizes = ['S', 'M', 'L', 'XL'];
    for (const s of sizes) {
        const button = document.getElementById(`Size_${s}`);
        if (s === size) {
            button.classList.add("border", "border-purple-600", "border-2");
        } else {
            button.classList.remove("border", "border-purple-600", "border-2");
        }
    }
}

const quantityButton = document.querySelectorAll('.quantity_button');
for (const btn of quantityButton) {
    btn.addEventListener('click', (event) => {
        const quantity = document.getElementById('quantity');
        const convertQuentity = parseInt(quantity.innerText);

        const clicked = event.target.innerText === '+' ? 1 : -1;
        const newQuantity = Math.max(0, convertQuentity + clicked);
        quantity.innerText = newQuantity;
    });
};

const checkoutContainer = document.getElementById('checkout-container');
const addToCart = document.getElementById('add-to-cart');
let cartCount = 0;
let cartItems = [];
addToCart.addEventListener('click', () => {
    const quantity = parseInt(document.getElementById('quantity').innerText);
    const cartCounted = document.getElementById('cart-count');

    if (quantity > 0) {
        cartCount = cartCount + quantity;
        cartCounted.innerText = cartCount;
        checkoutContainer.classList.remove('hidden');

        const selectedColorBtn = document.querySelector('button.border-purple-600.w-6');
        const selectedColor = selectedColorBtn.id.split('-')[0];
        const selectedSizeBtn = document.querySelector('button.border-purple-600:not(.w-6)');
        const selectedSize = selectedSizeBtn.innerText.split(' ')[0];
        const selectPrice = selectedSizeBtn.innerText.split(' ')[1].split('$')[1];
        // const productImage = document.getElementById('product_image');

        cartItems.push({
            image: imgSource + selectedColor + '.png',
            title: 'Classy Modern Smart Watch',
            color: selectedColor,
            size: selectedSize,
            price: quantity * parseInt(selectPrice),
            quantity: quantity,
        })
        // console.log(cartItems);

    } else {
        alert('Please select a quantity...')
    }
});

const cartModal = document.getElementById('cart-modal');
checkoutContainer.addEventListener('click', (event) => {

    const cartItem = document.getElementById('cart-items');
    let quantityLength = 0;

    for (const cart of cartItems) {
        const row = document.createElement('tr');
        row.classList.add('border-b', 'mt-4');

        // total quantity
        const totalQuentity = document.getElementById('total_quentity');
        const totalQuentityConvert = parseInt(totalQuentity.innerText)
        const length = cart.quantity + totalQuentityConvert;
        console.log(length)
        totalQuentity.innerText = length;

        // total price
        const totalPrice = document.getElementById('total_price');
        const totalPriceConvert = parseFloat(totalPrice.innerText)
        const total = cart.price + totalPriceConvert;
        totalPrice.innerText = total;

        row.innerHTML = `
            <td>
                <div class="flex items-center space-x-2">
                    <img src="${cart.image}" alt="Smart Watch" class="w-12 h-12 object-cover rounded-md">
                    <span class="font-semibold">${cart.title}</span>
                </div>
            </td>
            <td class="py-2 px-4 text-center hidden md:flex">${cart.color}</td>
            <td class="py-2 px-4 text-center hidden md:flex">${cart.size}</td>
            <td class="py-2 px-4 text-center ">${cart.quantity}</td>
            <td class="py-2 px-4 text-center">$${cart.price}</td>
        `
        cartItem.appendChild(row)
    }

    cartModal.classList.remove('hidden');
});

function continueShopping() {
    cartModal.classList.add('hidden')
};

const loveButton = document.getElementById('love_button');
loveButton.addEventListener('click', () => {
    loveButton.classList.add('text-purple-600')
})