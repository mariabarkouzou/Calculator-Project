const screen = document.getElementById("screen");
const numberBtns = document.querySelectorAll(".number-btns");
const ac = document.getElementById("ac");
const equals = document.getElementById("equals");
const operators = document.querySelectorAll(".operators");
const del = document.getElementById("del");
const dot = document.getElementById("dot");

let num1 = "";
let num2 = "";
let op = "";
let result;

// function checkKeyPress() {
// 	document.addEventListener("keydown", function (e) {
// 		if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
// 			console.log("KEYBOARD operator clicked");
// 			op = e.key;
// 		}

// 		if (e.key === ".") {
// 			console.log("dot is clicked");
// 			addDot();
// 		}

// 		// trying switch statement instead of if
// 		switch (e.key) {
// 			case "Backspace":
// 				console.log("backspace clicked!");
// 				deleteContent();
// 				break;
// 		}

// 		assignValues(e.key);

// 		console.log({ num1 });
// 		console.log({ op });
// 		console.log({ num2 });

// 		return e.key;
// 	});
// }
// checkKeyPress();

// Event Listeners

numberBtns.forEach((button) =>
	button.addEventListener("click", () => {
		if (equals.addEventListener("click", () => {})) {
			screen.textContent = num2 !== "" ? operate() : "Enter Number";
		} else if (screen.textContent === "Enter Number") {
			screen.textContent = num1;
		} else if (screen.textContent === "0") {
			num1 = "";
			screen.textContent = "";
		} else if (num2 === "0") {
			num2 = "";
		} else {
			screen.textContent = num1;
		}

		screen.textContent += button.textContent;
		assignValues(button.textContent);
	})
);

operators.forEach((button) =>
	button.addEventListener("click", () => {
		if (num1 && num2 && op) {
			num1 = operate();
			screen.textContent = num1;
			num2 = "";
			if (button.textContent === "x") {
				op = "*";
			} else if (button.textContent === "÷") {
				op = "/";
			} else {
				op = button.textContent;
			}
		} else if (num1 === "") {
			screen.textContent = "Enter Number";
		} else {
			op = button.textContent;
			if (op === "x") {
				op = "*";
			} else if (op === "÷") {
				op = "/";
			}
			screen.textContent = op;
		}
	})
);

ac.addEventListener("click", () => {
	screen.textContent = "";
	clearNumsOp();
});

equals.addEventListener("click", () => {
	screen.textContent = num2 !== "" ? operate() : "Enter Number";
	clearNumsOp();
});

dot.addEventListener("click", addDot);

del.addEventListener("click", deleteContent);

//  Functions

function assignValues(buttonClicked) {
	// RegExp to exclude other characters than those in square brackets below
	let reg = /[^0-9\,\.]/g;
	if (op === "+" || op === "-" || op === "*" || op === "/") {
		// console.log("before assignment num2 is: ", num2);
		if (num2 === "0.") {
			num2 += buttonClicked;
		} else if (num2 === "0") {
			num2 += buttonClicked.replace(/^0+/, "");
			screen.textContent = num2;
		} else {
			num2 += buttonClicked.replace(reg, "");
		}
		console.log("after assignment num2 is: ", num2);
		screen.textContent = `${num1} ${op} ${num2}`;
	} else if (num1 === "0.") {
		// console.log("before assignment num1 is: ", num1);
		num1 += buttonClicked;
	} else if (num1 === "0") {
		num1 += buttonClicked.replace(/^0+/, "");
		screen.textContent = num1;
	} else {
		// using RegExp declared inside assignValues()
		num1 += buttonClicked.replace(reg, "");
	}
	console.log("after assignment num1 is: ", num1);
}

function operate() {
	// console.log("op is: " + op + " " + typeof op);
	// console.log("num1 is: " + num1 + " " + typeof num1);
	// console.log("num2 is: " + num2 + " " + typeof num2);
	num1 = parseFloat(num1, 10);
	num2 = parseFloat(num2, 10);
	// console.log("num1 after parseInt is: " + num1 + " " + typeof num1);
	// console.log("num2 after parseInt is: " + num2 + " " + typeof num2);
	if (op === "+") {
		result = num1 + num2;
	} else if (op === "-") {
		result = num1 - num2;
	} else if (op === "*") {
		result = num1 * num2;
	} else if (op === "/") {
		if (num1 !== 0 && num2 !== 0) {
			result = num1 / num2;
		} else {
			result = "You Must Be Joking!!!";
		}
	}

	if (typeof result === "number" && result !== Math.round(result * 100) / 100) {
		result = Math.round(result * 100) / 100;
	}

	return result;
}

function deleteContent() {
	screen.textContent = screen.textContent.slice(0, -1);

	if (op === "") {
		num1 = screen.textContent;
		console.log("after DEL num1 is: ", num1);
	} else {
		if (num2 === "") {
			screen.textContent = `${num1} ${op} `;
		}

		let operatorIndex = screen.textContent.indexOf(op);
		num2 = screen.textContent.slice(operatorIndex + 2);
		console.log("after DEL num2 is: ", num2);
	}
}

function addDot() {
	if (op === "") {
		if (num1.includes(".")) return;
		if (num1 === "") {
			num1 += "0.";
		} else {
			num1 += ".";
		}
		screen.textContent = num1;
	} else {
		if (num2.includes(".")) return;
		if (num2 === "") {
			num2 += "0.";
		} else {
			num2 += ".";
		}
		screen.textContent = num2;
	}
}

function clearNumsOp() {
	num1 = "";
	num2 = "";
	op = "";
}

// TODO 	Add keyboard support
// TODO		1. num1 not being displayed on screen when pressed on the keyboard.
// TODO		2. dot does not work properly. It adds 2 dots and doesn't stop.
// TODO		3. need to set up equals
// TODO		4. need to set up AC
// ***		5. delete seems to work all right!

// TODO PEMDAS precedence etc