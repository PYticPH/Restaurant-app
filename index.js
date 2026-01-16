import { menuArray } from './data.js'

function render() {
    const menuItems = menuArray
        .map(({ name, ingredients, id, price, emoji }) =>
            `
            <section class="menu-item" id="menu-${id}">
                <span class="menu-item-image">${emoji}</span>
                <span class="menu-item-details">
                    <h2>${name}</h2>
                    <p class="item-ingredient">${ingredients.join(", ")}</p>
                    <p class="item-price">$${price}</p>
                </span>
                <button class="add-item" id="add-item">+</button>
            </section>
        `
        ).join('')

    document.getElementById('main').innerHTML = menuItems
}

render()