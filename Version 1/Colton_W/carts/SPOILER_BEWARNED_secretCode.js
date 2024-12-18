// :C you gave up, didn't you? I'm sorry, I'll give you a hint: it's a Konami code
// scroll further down to see the code, but try to solve it first, i just gave u the answer




















































































function revealButton() {
	// remove the display: none
	document.getElementById("superSecretFreeButton").style.display = null;
}

// konami code
let konamiCode = [];
const konami = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightbaEnter";

// I count this is as 1 function, making it 6 total
document.addEventListener("keydown", (e) => {
	konamiCode.push(e.key); // add the key to the array

	if (konamiCode.join("") === konami) { // join the array into a string and compare it to the konami code
		revealButton();
	} else if (!konami.startsWith(konamiCode.join(""))) { // if you entered the wrong key, reset the code
		konamiCode = [];
	}
})