function fibo(x) {
	let first = 0;
	let second = 1;
	let y = 0;

	for (let i = 2; i <= x ; i++ ) {
		y = first + second;
		first = second;
		second = y;
	}
	return y;
	
}

calcButton.addEventListener("click", () => {
	let x = document.getElementById("x").value;
	let y = fibo(x);

	const docY = document.getElementById("y");
	docY.innerText = y;
});