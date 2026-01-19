import { menuArray } from './data.js'

const main = document.getElementById('main')

let customerOrder = []

main.addEventListener('click', (e) => {

    if (e.target.name)
        addItem(e.target.name)

    if (e.target.id)
        removeItem(e.target.id)
})


function render() {
    const menuItems = menuArray
        .map(({ name, ingredients, price, emoji }) =>
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
                    name="${name}">+</button>
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
                id="submit-order">Complete order</div>
        </section>
    `
    main.insertAdjacentHTML('beforeend', orderSection)
}

function addItem(item) {

    const itemExistInOrder = customerOrder
        .some(order => order.name === item)

    if (itemExistInOrder) {

        customerOrder = customerOrder.map(order =>

            order.name === item ?
                { ...order, quantity: order.quantity + 1 } :
                order
        )
    }
    else {

        const newOrder = menuArray
            .filter(menu => menu.name === item)[0]

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
                        ${name}<span class="remove" id="remove-${id}">remove</span>
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

function removeItem(item) {

    customerOrder = customerOrder
        .filter(order => `remove-${order.id}` !== item)

    if (!customerOrder.length)
        document.getElementById('order').style.visibility = 'hidden';
    else
        renderItem()
}

render()