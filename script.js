const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");

// Load currency options dynamically
fetch("https://api.exchangerate-api.com/v4/latest/USD")
  .then(res => res.json())
  .then(data => {
    const currencies = Object.keys(data.rates);
    currencies.forEach(curr => {
      let option1 = document.createElement("option");
      let option2 = document.createElement("option");
      option1.value = option2.value = curr;
      option1.text = option2.text = curr;
      fromCurrency.add(option1);
      toCurrency.add(option2);
    });
    fromCurrency.value = "USD";
    toCurrency.value = "PKR"; // Default Pakistan
  });

// Convert function
function convertCurrency() {
  let amount = document.getElementById("amount").value;
  if (amount === "" || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }
  let from = fromCurrency.value;
  let to = toCurrency.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
    .then(res => res.json())
    .then(data => {
      let rate = data.rates[to];
      let converted = (amount * rate).toFixed(2);
      result.innerHTML = `${amount} ${from} = <b>${converted} ${to}</b>`;
    });
}
