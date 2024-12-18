// everything in this script is written by me, nothing is taken from the internet
// a lot of my code is self explanatory with var names, so not a lot has comments explaing it
let cartList = []; // haha get it, cause you can only put shopping carts in a cart.. call me a comedian

function saveCart() {
	localStorage.setItem("cart", JSON.stringify(cartList));
}

function loadCart() {
	const cart = localStorage.getItem("cart");
	cartList = JSON.parse(cart) || [];
}

// called in clear cart button, and other buttons
function clearCart() {
	cartList = [];
	saveCart();
	loadCartIntoPage();
}

// find the button yourself :)
// its hidden well, but its there
// well it doesn't exist right away, you have to enter
// a certain code to make it appear :)
// don't spoil it for yourself, but the answer is inside "SPOILER_BEWARNED_secretCode.js"
// hint: It's one of the most iconic cheat codes in history
function superSecretMakeItFree() {
	// loop through all the items in the cart
	for (let i = 0; i < cartList.length; i++) {
		// set the price of each item to 0
		cartList[i].price = 0;
	}

	saveCart();
	loadCartIntoPage();
}

// called in buy button
function buyItems() {
	const itemsBought = cartList.length;
	// this is the equivalent of a for loop, but cleaner using an accumulator
	// it adds up all the prices of the items in the cart
	const total = cartList.reduce((acc, item) => acc + item.price, 0);

	// all the toFixed function does is make sure the number has 2 decimal places, like money
	alert(`Bought ${itemsBought} items for $${total.toFixed(2)}, thank you for shopping with us! You will receive your items on Feburary 31st`);

	clearCart();
}

// THERE IS AN EXTRA FUNCTION HERE INSIDE THE REMOVE BUTTON ATTACHED IN THIS FUNCTION
// called on page load
function loadCartIntoPage() {
	const cartItemTemplate = document.getElementById("cartItemTemplate");
	const cartItemsContainer = document.getElementById("cartItemsContainer");

	// if these elements aren't found, the page is likely not the cart page, so don't do anything
	if (!cartItemsContainer || !cartItemTemplate) {
		console.log("Failed to load cart items: missing elements");
		return;
	}

	// clear out cart items currently

	// If there is a child still inside the container, loop until this condition is false
	// (i shouldnt have to explain this but i want credits for assignment)
	while (cartItemsContainer.firstChild) {
		cartItemsContainer.removeChild(cartItemsContainer.firstChild);
	}

	// add cart items

	// search for the first cartItem class in the template, there is only one in the template
	let cartItem = cartItemTemplate.content.querySelector(".cartItem");

	// Simple explanation: loop through the list
	// Detailed explanation: Declare a variable i and assign it to 0, then for every loop,
	// if i is less than the amount of items in the cart, run the loop, then increment i by 1
	// and repeat until the condition is false
	for (let i = 0; i < cartList.length; i++) {
		const cartItemClone = cartItem.cloneNode(true); // clone the cart item template
		const cartItemData = cartList[i]; // get the data of the item in the cart at the current index

		// not explaining all this at once, toFixed just adds decimals, and we are setting the text to the correct info
		cartItemClone.querySelector(".cartItemName").textContent = cartItemData.name;
		cartItemClone.querySelector(".itemPriceOnSale").textContent = "$" + cartItemData.price.toFixed(2);
		cartItemClone.querySelector(".itemPriceCrossed").textContent = "$" + cartItemData.originalPrice.toFixed(2);
		cartItemClone.querySelector("img").src = cartItemData.image;

		// Remove button functionality, can't do this on a seperate function because it needs to know the index
		cartItemClone.querySelector("#remove").addEventListener("click", () => {
			// splice has never actually made sense to me in my 7 years, i just know that if you have 1 as the second arg
			// it will remove the item at the index of the first arg
			// and thats all ive ever needed it for so i never looked into it
			cartList.splice(i, 1);
			saveCart();
			loadCartIntoPage(); // reload
		});

		// add the cart item to the container
		cartItemsContainer.appendChild(cartItemClone);
	}

	// update side information

	const itemsInCart = document.getElementById("itemsInCart");
	const totalCrossed = document.getElementById("totalCrossed");
	const total = document.getElementById("total");
	const buyButton = document.getElementById("buyButton");

	// shouldn't happen, but if these elements are missing, don't do anything
	if (itemsInCart && totalCrossed && total) {
		itemsInCart.textContent = `${cartList.length} Items in Cart`;
		// this is the same reducer used in the buyItems function, just for both totals
		totalCrossed.textContent = "Total: $" + (cartList.reduce((acc, item) => acc + item.originalPrice, 0)).toFixed(2);
		total.textContent = "Total: $" + (cartList.reduce((acc, item) => acc + item.price, 0)).toFixed(2);

		buyButton.textContent = `Buy ${cartList.length} Items`;
	}
}

// called in multiple add to cart buttons
function addToCart(amount) {
	// loop the amount of times that was provided and add a cart item to the cart list
	for (let i = 0; i < amount; i++) {
		const cartItem = {
			name: "Shopping Cart",
			image: "icon.webp",
			price: 99.99,
			originalPrice: 199.99
		}

		// add the cart item to the cart list
		cartList.push(cartItem);
	}

	alert(`Added ${amount} item${amount != 1 ? "s" : ""} to cart!`);

	saveCart();
}

loadCart();

// wait for the page to load before adding the cart items

window.addEventListener("load", loadCartIntoPage);