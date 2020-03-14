pastFibbyResults();
async function pastFibbyResults(sortOrder) {
  showResultsSpinner();
  let results = document.getElementById("past-results");
  results.innerHTML = "";
  let response = await fetch("http://localhost:5050/getFibonacciResults");
  let data = await response.json();
  if (sortOrder === 1) {
    data.results.sort(function(a, b) {
      return a.result - b.result;
    });
  } else if (sortOrder === 2) {
    data.results.sort(function(a, b) {
      return b.result - a.result;
    });
  } else if (sortOrder === 3) {
    data.results.sort(function(a, b) {
      return new Date(a.createdDate) - new Date(b.createdDate);
    });
  } else if (sortOrder === 4) {
    data.results.sort(function(a, b) {
      return new Date(b.createdDate) - new Date(a.createdDate);
    });
  }
  for (let i = 0; i < 8; i++) {
    let fibbyOfText = document.createElement("span");
    fibbyOfText.innerText = "The Fibonacci Of ";
    let isText = document.createElement("span");
    isText.innerText = " is ";
    let calculatedasText = document.createElement("span");
    let date = new Date(data.results[i].createdDate).toString();
    calculatedasText.innerText = `. Calculated at ${date}`;
    let fibbyX = document.createElement("span");
    fibbyX.className = "bold";
    fibbyX.innerText = data.results[i].number;
    let fibbyY = document.createElement("span");
    fibbyY.className = "bold";
    fibbyY.innerHTML = data.results[i].result;
    let newLi = document.createElement("li");
    newLi.appendChild(fibbyOfText);
    newLi.appendChild(fibbyX);
    newLi.appendChild(isText);
    newLi.appendChild(fibbyY);
    newLi.appendChild(calculatedasText);
    let results = document.getElementById("past-results");
    results.appendChild(newLi);
  }
  hideResultsSpinner();
}

let dropdown = document.getElementById("dropdown");
dropdown.addEventListener("click", displayDropDownItems);

function displayDropDownItems() {
  var x = document.getElementById("dropdown-list");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

let numAsc = document.getElementById("numAsc");
numAsc.addEventListener("click", () => {
  pastFibbyResults(1);
});

let numDesc = document.getElementById("numDesc");
numDesc.addEventListener("click", () => {
  pastFibbyResults(2);
});

let dateAsc = document.getElementById("dateAsc");
dateAsc.addEventListener("click", () => {
  pastFibbyResults(3);
});

let dateDesc = document.getElementById("dateDesc");
dateDesc.addEventListener("click", () => {
  pastFibbyResults(4);
});

let calcFibButton = document.getElementById("calcFibby");
calcFibButton.addEventListener("click", validateNumFromUser);

function validateNumFromUser() {
  hideAlert();
  document.getElementById("y").innerText = "";
  document.getElementById("fortytooerror").innerText = "";
  showSpinner();
  fibonacciX = document.getElementById("inputField").value;
  if (fibonacciX > 50) {
    let alert = document.getElementById("alert");
    showAlert();
    alert.innerText = "Can't be larger than 50.";
    hideSpinner();
  } else if (fibonacciX < 1) {
    let alert = document.getElementById("alert");
    showAlert();
    alert.innerText = "Can't be less than 1.";
    hideSpinner();
  } else {
    if (document.getElementById("checkBox").checked === true) {
      calculateFibonacciByServer(fibonacciX);
    } else {
      let y = calculateFibonacciLocal(fibonacciX);
      hideSpinner();
      document.getElementById("y").innerText = y;
    }
  }

 

  function calculateFibonacciLocal(x) {

    if (x === 1 || x === 0) return x;
    
    else {
      return (
        calculateFibonacciLocal(x - 2) + calculateFibonacciLocal(x - 1)
      );
    }
  }

  async function calculateFibonacciByServer(x) {
    let response = await fetch("http://localhost:5050/fibonacci/" + x);
    let data;
    if (response.status === 400 || response.status === 500) {
      data = await response.text();
    } else {
      data = await response.json();
    }
    if (typeof data === "object") {
      hideSpinner();
      document.getElementById("y").innerText = data.result;
      pastFibbyResults();
    } else {
      hideSpinner();
      document.getElementById("fortytooerror").innerText =
        "Server Error: " + data;
    }
  }
}

function showSpinner() {
  let spinner = document.getElementById("spinner");
  spinner.style.display = "inline-block";
  setTimeout(() => {
    spinner.className = spinner.className.replace("show", "");
  }, 8000);
}

function hideSpinner() {
  let spinner = document.getElementById("spinner");
  spinner.style.display = "none";
}

function showResultsSpinner() {
  let spinner = document.getElementById("spinner-results");
  spinner.style.display = "inline-block";
  setTimeout(() => {
    spinner.className = spinner.className.replace("show", "");
  }, 8000);
}

function hideResultsSpinner() {
  let spinner = document.getElementById("spinner-results");
  spinner.style.display = "none";
}

function showAlert() {
  let alert = document.getElementById("alert");
  alert.style.display = "inline-block";
}

function hideAlert() {
  let alert = document.getElementById("alert");
  alert.style.display = "none";
}