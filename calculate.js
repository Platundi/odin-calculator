let calculateArr = [];
let resultArr = [];
let currentString = "";
let result = 0;

let screen = document.querySelector(".screen");
let buttons = document.querySelectorAll(".btnCalc, .btnOp");
buttons.forEach((btn) => {
	btn.addEventListener("click", () => {
		if (btn.textContent == "=") {
			calculateArr.forEach(
				(field) => {
					if (["+", "-", "/", "*"].includes(field)) {
						if (currentString) {
							resultArr.push(currentString); // Push the concatenated string before the symbol
						}
						resultArr.push(field); // Push the symbol itself
						currentString = ""; // Reset the current string for the next group
					} else {
						currentString += field; // Concatenate the numbers/characters
					}
				}
				//if (</^[0-9]$/.test(field.textContent)>) {
				//}
			);
			if (currentString) {
				resultArr.push(currentString);
			}
			for (let i = 0; i < resultArr.length; i++) {
				let e = resultArr[i];
				if (!["+", "-", "/", "*"].includes(e)) {
					resultArr[i] = Number(e);
				}
			}
			for (let i = 0; i < resultArr.length; i++) {
				let e = resultArr[i];
				if (["+", "-", "/", "*"].includes(e)) {
					switch (e) {
						case "+":
							result = resultArr[i - 1] + resultArr[i + 1];
							break;
						case "-":
							result = resultArr[i - 1] - resultArr[i + 1];
							break;
						case "/":
							result = resultArr[i - 1] / resultArr[i + 1];
							break;
						case "*":
							result = resultArr[i - 1] * resultArr[i + 1];
							break;
					}
				}
			}
			screen.textContent = result;
		}
		calculateArr.push(btn.textContent);
		screen.textContent = btn.textContent;
	});
});
