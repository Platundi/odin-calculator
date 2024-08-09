let calculateArr = [];

let buttons = document.querySelectorAll(".btnCalc, .btnOp");
buttons.forEach((btn) => {
	btn.addEventListener("click", () => {
		calculateArr.push(btn.textContent);
	});
});
