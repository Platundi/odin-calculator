let calculateArr = [];
let resultArr = [];
let logArray = [];
let resultLogArray = [];
let calculateBufferArr = [];
let currentString = "";
let result = 0;
let lastTouchTime = 0;
let clear = false;
let divZero = false;

let screen = document.querySelector(".screen");
let buttons = document.querySelectorAll(".btnCalc, .btnOp, .btnClear");
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
		if (divZero == false) {
			result.toLocaleString("de-DE");
			// result = result.toLocaleString("de-DE");
			screen.textContent = result;
			calculateArr.push(event.currentTarget.textContent);
			//calculateBufferArr = calculateArr;
			resultArr.push(event.currentTarget.textContent);
			logArray.push(resultArr);
			logArray[logArray.length - 1].push(Number(result));
			// logArray.push(result);
			resultLogArray.push(result);
			resultArr = [];
			clear = true;
		} else {
			clearAll();
		}
	} else if (event.currentTarget.textContent == "AC") {
		clearAll();
	} else {
		if (clear == true) {
			calculateArr = [];
			if (!["+", "-", "/", "*"].includes(event.currentTarget.textContent)) {
				screen.textContent = event.currentTarget.textContent;
				calculateArr.push(event.currentTarget.textContent);
				//calculateBufferArr = calculateArr;
				currentString = "";
			} else {
				screen.textContent += event.currentTarget.textContent;
				calculateArr.push(result, event.currentTarget.textContent);
				currentString = "";
			}
			clear = false;
		} else {
			calculateArr.push(event.currentTarget.textContent);
			//calculateBufferArr = calculateArr;
			screen.textContent += event.currentTarget.textContent; //Aneigescreen updaten
		}

		if (calculateArr) {
			/*if (calculateBufferArr[calculateBufferArr.length - 2] == "=") {
				screen.textContent = event.currentTarget.textContent;
				calculateArr.splice(0, calculateArr.length - 1);
			} */
		}
	}
}

//function concatenateNum (field)

function clearAll() {
	resultArr = [];
	calculateArr = [];
	screen.textContent = "";
	result = 0;
}

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
	divZero = false;
	result = 0;
	for (let i = 0; i < arr.length; i++) {
		let e = arr[i];
		if (["+", "-", "/", "*"].includes(e)) {
			switch (e) {
				case "+":
					result = arr[i - 1] + arr[i + 1];
					arr = arr.slice(i + 2);
					arr.unshift(result);
					i = 0;
					break;
				case "-":
					result = arr[i - 1] - arr[i + 1];
					arr = arr.slice(i + 2);
					arr.unshift(result);
					i = 0;
					break;
				case "/":
					if (arr[i + 1] != 0) {
						result = arr[i - 1] / arr[i + 1];
						arr = arr.slice(i + 2);
						arr.unshift(result);
						i = 0;
					} else {
						divZero = true;
					}
					break;
				case "*":
					result = arr[i - 1] * arr[i + 1];
					arr = arr.slice(i + 2);
					arr.unshift(result);
					i = 0;
					break;
			}
		}
	}
	if (divZero != true) {
		return result;
	} else {
		alert("Divison durch 0 nicht möglich!");
	}
}
