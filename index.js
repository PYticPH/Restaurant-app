import { menuArray } from './data.js'

const main = document.getElementById('main')

let customerOrder = []

main.addEventListener('click', (e) => {

    if (e.target.dataset.itemId)
        addItem(e.target.dataset.itemId)

    if (e.target.dataset.removeItemId)
        removeItem(e.target.dataset.removeItemId)

    if (e.target.id === 'submit-order')
        submitOrder()

    if (e.target.id === 'pay-btn')
        makePayment(e)
})


function render() {
    const menuItems = menuArray
        .map(({ name, ingredients, id, price, emoji }) =>
            `
            <section class="menu-item">
                <span class="menu-item-image">${emoji}</span>
                <span class="menu-item-details">
                    <h2>${name}</h2>
                    <p class="item-ingredient">${ingredients.join(", ")}</p>
                    <p class="item-price">$${price}</p>
                </span>
                <button 
                    type="button"
                    class="add-item"
                    data-item-id="${id}">+</button>
            </section>
        `
        ).join('')

    main.innerHTML = menuItems
    renderOrder()

}

function renderOrder() {
    const orderSection = `
        <section class="order" id="order">
            <p class="order-title">Your Order</p>
            <div class="order-header">
                <span class="name-header">Item</span>
                <div class="qp-header-wrapper">
                    <span class="qty-header">Qty</span>
                    <span class="price-header">Price</span>
                </div>
            </div>
            <div class="order-item-container"
                 id="order-item-container">
            </div>
            <hr class="separator">
            <div class="total">
                <span id="total-text">
                    Total price:
                </span>
                <span 
                    class="total-amount"
                    id="total-amount">
                </span>
            </div>
            <div 
                class="submit-order" 
                id="submit-order">Complete order
            </div>
        </section>
    `
    main.insertAdjacentHTML('beforeend', orderSection)
}

function addItem(id) {

    const itemId = Number(id)

    const itemExistInOrder = customerOrder
        .some(order => order.id === itemId)

    if (itemExistInOrder) {

        customerOrder = customerOrder.map(order =>

            order.id === itemId ?
                { ...order, quantity: order.quantity + 1 } :
                order
        )
    }
    else {

        const newOrder = menuArray
            .filter(menu => menu.id === itemId)[0]

        customerOrder.push(
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

    const total = customerOrder
        .reduce((acc, { price, quantity }) => (price * quantity) + acc, 0)

    const itemHTML = customerOrder.map(
        ({ name, quantity, price, id }) =>
            `
                <div class="order-details">
                    <span class="item-name">
                        ${name}
                        <span 
                            class="remove" 
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

    document.getElementById('order').style.visibility = 'visible';
    document.getElementById('order-item-container').innerHTML = itemHTML
    document.getElementById('total-amount').innerText = `$${total}`
}

function removeItem(id) {

    const itemId = Number(id)

    customerOrder = customerOrder
        .filter(order => order.id !== itemId)

    if (!customerOrder.length)
        document.getElementById('order').style.visibility = 'hidden';
    else
        renderItem()
}

function submitOrder() {

    const totalAmount = document
        .getElementById('total-amount')
        .innerText.split('').splice(1).join('')
    
    const paymentForm = 
    `  <div class="modal">
            <h2>Enter card details</h2>
            <form id="form">
                <input 
                    id="username"
                    type="text" 
                    placeholder="Enter your username"
                    name="username" required>
                <input 
                    id="card-number"
                    type="text" 
                    placeholder="Enter card number"
                    name="cardnumber" required>
                <input
                    id="cvv" 
                    type="text"
                    placeholder="Enter CVV"
                    name="cvv" required>
                <input
                    type="hidden" 
                    id="amount"
                    name="amount"
                    value="${totalAmount}" readonly>
                <button 
                    class="pay-btn"
                    id="pay-btn"
                    type="submit">Pay</button>
            </form>
        </div>
    `

    document.querySelectorAll('.add-item')
        .forEach(btn => btn.disabled = true)

    main.classList.add('inactive')

    main.innerHTML += paymentForm
}

function makePayment(event) {
    event.preventDefault()

}

render()