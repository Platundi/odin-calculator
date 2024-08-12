let calculateArr = [];
let resultArr = [];
let logArray = [];
let resultLogArray = [];
let calculateBufferArr = [];
let currentString = "";
let result = 0;
let lastTouchTime = 0;

let screen = document.querySelector(".screen");
let buttons = document.querySelectorAll(".btnCalc, .btnOp");
buttons.forEach((btn, i) => {
	const isTouchDevice = "ontouchstart" in document.documentElement;
	if (isTouchDevice) {
		btn.addEventListener("touchstart", (event) => operate(event), {
			passive: true,
		});
	} else {
		btn.addEventListener("click", (event) => operate(event));
	}
});

function operate(event) {
	if (event.type == "touchstart") {
		const currentTime = new Date().getTime();
		if (currentTime - lastTouchTime < 300) {
			// 300ms ist ein typischer Zeitraum für Doppeltippen
			event.preventDefault(); // Verhindert Doppeltippen
		}
		lastTouchTime = currentTime;
	}
	if (event.currentTarget.textContent == "=") {
		calculateArr = calculateArr.map((field) => (field == "," ? "." : field));
		calculateArr.forEach((field) => {
			if (["+", "-", "/", "*"].includes(field)) {
				if (currentString) {
					resultArr.push(currentString); // Push the concatenated string before the symbol
				}
				resultArr.push(field); // Push the symbol itself
				currentString = ""; // Reset the current string for the next group
			} else {
				currentString += field; // Concatenate the numbers/characters
			}
		});
		if (currentString) {
			resultArr.push(currentString); // Zusammengeführte Nummern in neues Array
		}
		resultArr = stringToNum(resultArr);
		result = calculate(resultArr);
		result = result.toLocaleString("de-DE");
		screen.textContent = result;
		calculateArr.push(event.currentTarget.textContent);
		calculateBufferArr = calculateArr;
		resultArr.push(event.currentTarget.textContent);
		logArray = [...resultArr];
		logArray.push(result);
		resultLogArray.push(result);
		resultArr = [];
	} else {
		calculateArr.push(event.currentTarget.textContent);
		calculateBufferArr = calculateArr;
		// "=" nicht zur Aneige bringen
		screen.textContent += event.currentTarget.textContent; //Aneigescreen updaten
		if (calculateArr) {
			if (calculateBufferArr[calculateBufferArr.length - 2] == "=") {
				screen.textContent = event.currentTarget.textContent;
				calculateArr.splice(0, calculateArr.length - 1);
			}
		}
	}
}

//function concatenateNum (field)

function stringToNum(arr) {
	for (let i = 0; i < arr.length; i++) {
		let e = arr[i];
		if (!["+", "-", "/", "*"].includes(e)) {
			arr[i] = Number(e);
		}
	}
	return arr;
}

function calculate(arr) {
	for (let i = 0; i < arr.length; i++) {
		let e = arr[i];
		if (["+", "-", "/", "*"].includes(e)) {
			switch (e) {
				case "+":
					result = arr[i - 1] + arr[i + 1];
					return result;
				case "-":
					result = arr[i - 1] - arr[i + 1];
					return result;
				case "/":
					result = arr[i - 1] / arr[i + 1];
					return result;
				case "*":
					result = arr[i - 1] * arr[i + 1];
					return result;
			}
		}
	}
}
