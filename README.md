# Simple Restaurant App

A simple restaurant ordering web application.

## About
A front-end web application for browsing a restaurant menu and placing orders. The app features a clean, interactive interface that allows users to select items, view a live order summary, and complete their purchase.

## Features
*   **Interactive Menu**: Browse available dishes with clear pricing.
*   **Live Order Summary**: Your selected items and total cost update in real-time.
*   **One-Click Add/Remove**: Easily add items to your order or remove them.
*   **Payment Modal**: A simulated checkout process to complete your order.

## Project Structure

Restaurant-app/
├── index.html # Main HTML structure
├── index.css # All styling for the application
├── index.js # Core JavaScript logic for interactivity
├── data.js # Contains the menu data as an array of objects
└── images/ # Folder containing image assets


## How to Use
1.  Open `index.html` in your web browser.
2.  Browse the menu items displayed on the page.
3.  Click the **"+"** button next to any item to add it to your order.
4.  View your current order and its total in the order summary section.
5.  To remove an item, click the **"remove"** button in the order list.
6.  Click **"Complete order"** to simulate the checkout process via a payment modal.

## Technologies Used
*   **HTML5**: For the page structure and content.
*   **CSS3**: For styling, layout, and visual design.
*   **Vanilla JavaScript**: For all dynamic functionality and DOM manipulation.

## Live Demo
You can view a live version of this project by opening the `index.html` file directly in your browser. No build process or server is required.

## Development
This is a static front-end project. To modify or extend it:
*   Edit `data.js` to change the menu items, prices, or images.
*   Modify `index.css` to alter the styling.
*   The main application logic is contained within `index.js`.
