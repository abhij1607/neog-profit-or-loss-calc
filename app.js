const initialPriceInput = document.querySelector('#initial-price');
const quantityInput = document.querySelector('#quntity');
const currentPriceInput = document.querySelector('#current-price');
const btnCheck = document.querySelector('#btn-check');
const errorDiv = document.querySelector('.error-handler');
const outputDiv = document.querySelector('.output');

btnCheck.addEventListener('click',calcBtnClickHandler);

function calculateProfitLoss(initial,quantity,current) {
    if(initial > current) {
        let loss = (initial-current) * quantity;
        let lossPercentage = (loss/(initial*quantity)) * 100;
        return ['Loss',loss,lossPercentage];
    } else if (initial <current) {
        let profit = (current - initial) * quantity;
        let profitPercentage = (profit/(initial * quantity)) * 100;
        return ['Profit',profit,profitPercentage];
    } else {
        return ['profit',0,0];
    }
}

function validate(initial,quantity,current) {
    if (initial < 0 && quantity < 0 && current < 0) {
        showError('Price and quantity cannot be negative!');
    } else if(!initial || !quantity || !current) {
        showError("Price and quantity cannot be empty or 0!");
        return false;
    } else if (initial < 0 || current < 0) {
        showError('Price cannot be negative!');
        return false;
    } else if (quantity < 0 ) {
        showError('Quantity cannot be negative!');
        return false;
    } else {
        return true;
    }
}

function calcBtnClickHandler() {
    clearOutput();
    removeError();
    let initialPrice = Number(initialPriceInput.value);
    let quantity = Number(quantityInput.value);
    let currentPrice = Number(currentPriceInput.value);
    if(validate(initialPrice,quantity,currentPrice)) {
        let resultList = calculateProfitLoss(initialPrice,quantity,currentPrice);
        if(resultList[1] === 0) {
            showOutput('No pain no gain and no gain no pain😉');
        } else {
            showOutput(`the ${resultList[0]} is ${resultList[1].toFixed(2)} and the percentage of ${resultList[0]} is ${resultList[2].toFixed(2)}%`);
        }
        
    }
}

function showError(error) {
    errorDiv.innerHTML = error;
}

function removeError(){
    errorDiv.innerHTML="";
}

function showOutput(msg){
    outputDiv.innerHTML = msg;
}

function clearOutput(){
    outputDiv.innerHTML = "";
}
