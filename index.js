const inAddBtn = document.getElementById("income-addBtn");
const outAddBtn = document.getElementById("outcome-addBtn");

let inOutData = [];
let inOutDataLS = JSON.parse(localStorage.getItem("inOutArr"));
if (inOutDataLS?.length > 0) {
    inOutData = JSON.parse(localStorage.getItem("inOutArr"));
    inOutDataElem = [...inOutData];
    updateMainContentnListUI();
    sum();
}

let lastId = 0;

function onInAddBtnClicked() {
    const incomeName = document.getElementById("income-name");
    const incomeValue = document.getElementById("income-val");
    if (incomeName.value.trim() === '' || incomeValue.value.trim() === '') {
        alert("Uzupełnij nazwę i/lub kwotę");
        return false;
    }
    inOutDataElem = {
        name: incomeName.value,
        value: incomeValue.value,
        id: lastId,
        type: "income"
    }
    inOutData.push(inOutDataElem);

    lastId++;

    updateMainContentnListUI();
    sum();
}      
 
function onOutAddBtnClicked() {
    const outcomeName = document.getElementById("outcome-name");
    const outcomeValue = document.getElementById("outcome-val");
    if (outcomeName.value.trim() === '' || outcomeValue.value.trim() === '') {
        alert("Uzupełnij nazwę i/lub kwotę");
        return false;
    }
    inOutDataElem = {
        name: outcomeName.value,
        value: outcomeValue.value,
        id: lastId,
        type: "outcome"
    }
    inOutData.push(inOutDataElem);
    lastId++;

    updateMainContentnListUI();
    sum();
}       
    
function updateMainContentnListUI () {
    const mainContentIncomeList = document.getElementById("mainContent-income-list");
    const mainContentOutcomeList = document.getElementById("mainContent-outcome-list");

    mainContentIncomeList.innerText = " ";
    mainContentOutcomeList.innerText = " ";

    inOutData.forEach(function(inOutDataElem) {
        const container = document.createElement("div");
        container.classList = "list-element"

        const paragraph = document.createElement("p");
        paragraph.innerText = `${inOutDataElem.name}:  ${inOutDataElem.value} zł`

        const editBtn = document.createElement("button");
        editBtn.innerText = "Edytuj"
        editBtn.id = `edit_${inOutDataElem.id}`

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Usuń"
        deleteBtn.id = `delete_${inOutDataElem.id}`

        container.appendChild(paragraph);
        container.appendChild(editBtn);
        container.appendChild(deleteBtn);

        if (inOutDataElem.type === "income") {
            mainContentIncomeList.appendChild(container)
        } else {
            mainContentOutcomeList.appendChild(container)
        }

        localStorage.setItem("inOutArr", JSON.stringify(inOutData));
    });
}

function sum() {
    document.getElementById("balance")?.remove(); 
    let incomeSum = 0;
    let outcomeSum = 0;

    const incomeSumElem = document.getElementById("incomeSum");
    const outcomeSumElem = document.getElementById("outcomeSum");
    const topContainer = document.getElementById("topContainer");

    inOutData.forEach(function(inOutDataElem) {
        if (inOutDataElem.type === "income") {
            incomeSum += parseInt(inOutDataElem.value);
        }
        else if (inOutDataElem.type === "outcome"){
            outcomeSum += parseInt(inOutDataElem.value);
        }
    });

    incomeSumElem.innerText = incomeSum.toString();
    outcomeSumElem.innerText = outcomeSum.toString();
    
    let sumAll = incomeSum - outcomeSum;
    const sumAllContent = document.createElement("h1");
    sumAllContent.id = "balance";

    if (sumAll < 0) {
        sumAllContent.innerText = `Bilans jest ujemny. Jesteś na minusie ${sumAll*(-1)} złotych`;
    } else if (sumAll == 0) {
        sumAllContent.innerText = `Bilans wynosi zero`; 
    } else {
        sumAllContent.innerText = `Możesz jeszcze wydać ${sumAll} złotych`;
    }
    topContainer.appendChild(sumAllContent);
}

