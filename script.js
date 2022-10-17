const currencyElementOne = document.querySelector('#currency-one');
const amountElementOne = document.querySelector('#amount-one');
const currencyElementTwo = document.querySelector('#currency-two');
const amountElementTwo = document.querySelector('#amount-two');

const rateElement = document.querySelector('#rate');
const swap = document.querySelector('#swap');

// Fetch exchange rates and update the DOM
function calculate() {
    const currencyOne = currencyElementOne.value;
    const currencyTwo = currencyElementTwo.value;

    fetch("https://open.exchangerate-api.com/v6/latest")
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[currencyTwo] / data.rates[currencyOne];
      rateElement.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
      amountElementTwo.value = (amountElementOne.value * (rate)).toFixed(2);
    })
}


currencyElementOne.addEventListener('change', calculate);
amountElementOne.addEventListener('input', calculate);
currencyElementTwo.addEventListener('change', calculate);
amountElementTwo.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyElementOne.value;
    currencyElementOne.value = currencyElementTwo.value;
    currencyElementTwo.value = temp;
    calculate();
  });

calculate();
