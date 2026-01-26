import { menuArray } from './data.js'

let customerOrderData = []

document.addEventListener('click', (e) => {

    if (e.target.dataset.itemId) {
        addItem(e.target.dataset.itemId)
    }
    else if (e.target.dataset.removeItemId) {
        removeItem(e.target.dataset.removeItemId)
    }
    else if (e.target.id === 'submit-order') {
        submitOrder()
    }
    else if (e.target.id === 'pay-btn') {
        e.preventDefault()
        makePayment()
    }
})


function renderMenu() {
    const menu = menuArray
        .map(({ name, ingredients, id, price, emoji }) =>
            `
            <div class="menu-items">
                <span class="menu-item-img">${emoji}</span>
                <span class="menu-item-details">
                    <h2>${name}</h2>
                    <p class="menu-item-ingredient">${ingredients.join(", ")}</p>
                    <p class="menu-item-price">$${price}</p>
                </span>
                <button 
                    type="button"
                    class="add-item"
                    data-item-id="${id}">+
                </button>
            </div>
        `
        ).join('')

    document.getElementById('menu').innerHTML = menu;

}

function addItem(id) {

    const itemId = Number(id)

    const itemExistInOrder = customerOrderData
        .some(order => order.id === itemId)

    if (itemExistInOrder) {

        customerOrderData = customerOrderData.map(order =>

            order.id === itemId ?
                { ...order, quantity: order.quantity + 1 } :
                order
        )
    }
    else {

        const newOrder = menuArray
            .filter(menu => menu.id === itemId)[0]

        customerOrderData.push(
            {
                id: newOrder.id,
                name: newOrder.name,
                quantity: 1,
                price: newOrder.price
            }
        )
    }

    renderItem()

}

function renderItem() {

    const total = customerOrderData
        .reduce((acc, { price, quantity }) => (price * quantity) + acc, 0)

    const itemHTML = customerOrderData.map(
        ({ name, quantity, price, id }) =>
            `
                <div class="order-details">
                    <span class="item-name">
                        ${name}
                        <span 
                            class="remove-item" 
                            id="${name}"
                            data-remove-item-id="${id}">remove</span>
                    </span>

                    <div class="item-qp-wrapper">
                        <span class="item-qty">
                            ${quantity}
                        </span>
                        <span class="item-price">
                            $${price}
                        </span>
                    </div>
                </div>
            `
    ).join('')


    const customerOrder = `
        <div class="customer-order-container">
            <p class="title">Your Order</p>
            <div class="order-header">
                <span class="item-header">Item</span>
                <div class="qp-header-wrapper">
                    <span class="qty-header">Qty</span>
                    <span class="price-header">Price</span>
                </div>
            </div>
            <div id="order-items-container">
                ${itemHTML}
            </div>
            <hr class="separator">
            <div class="total-order">
                <span class="total-text">
                    Total price:
                </span>
                <span 
                    class="total"
                    id="total">
                    $${total}
                </span>
            </div>
            <button 
                class="submit-order" 
                id="submit-order">Complete order
            </button>
        </div>
    `

    document.getElementById('customer-order').innerHTML = customerOrder

}

function removeItem(id) {

    const itemId = Number(id)

    if (!customerOrderData.length) {
        customerOrderSection.innerHTML = '';
    }
    else {
        customerOrderData = customerOrderData
            .filter(order => order.id !== itemId)
        renderItem()
    }
}

function submitOrder() {

    const totalOrderValue = document
        .getElementById('total')
        .innerText.split('').splice(1).join('')

    const paymentFormHTML =
        `<div class="form-modal">
            <h2>Enter card details</h2>
            <form id="paymentForm">
                <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    name="username"
                    required
                />
                <input
                    id="card-number"
                    type="text"
                    placeholder="Enter card number"
                    name="cardnumber"
                    required
                />
                <input
                    id="cvv"
                    type="text"
                    placeholder="Enter CVV"
                    name="cvv"
                    required
                />
                <input
                    type="hidden"
                    id="amount"
                    name="amount"
                    value="${totalOrderValue}"
                    readonly
                />
                <button class="pay-btn" id="pay-btn">Pay</button>
            </form>
        </div>
    `

    document.getElementById('payment-modal').innerHTML = paymentFormHTML
    document.querySelectorAll('.add-item').forEach(btn => btn.disabled = true)
    document.getElementById('submit-order').disabled = true
    document.getElementById('main').classList.add('inactive')
}

function makePayment() {

    const formData = new FormData(document.getElementById('paymentForm'))
    const username = formData.get('username')
    const cardNum = formData.get('cardnumber')
    const cvv = formData.get('cvv')

    if (username.length < 2 || !cardNum || !cvv)
        return

    const paymentSuccessfulHTML =
        `
            <div class="success" id="success">
                <p class="success-text">
                    Thanks, ${username}! Your order is on its way!
                </p>
            </div>
        `

    document.getElementById('payment-modal').innerHTML = ""

    resetOrder()

    document.getElementById('customer-order').innerHTML = paymentSuccessfulHTML

}


function resetOrder() {

    customerOrderData = []
    document.querySelectorAll('.add-item')
        .forEach(btn => btn.disabled = false)
    document.getElementById('submit-order').disabled = false
    document.getElementById('main').classList.remove('inactive')
}

renderMenu()