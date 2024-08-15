const favoriteNumber = 7;
const factContainer = document.getElementById('fact-container');

async function getNumberFact() {
    const response = await fetch(`http://numbersapi.com/${favoriteNumber}?json`);
    const data = await response.json();
    const fact = document.createElement('p');
    fact.textContent = data.text;
    factContainer.appendChild(fact);
}

getNumberFact();


const numbers = [8, 14, 21];

async function getMultipleNumberFacts() {
    const response = await fetch(`http://numbersapi.com/${numbers.join(',')}?json`);
    const data = await response.json();

    for (let num in data) {
        const fact = document.createElement('p');
        fact.textContent = data[num];
        factContainer.appendChild(fact);
    }
}

getMultipleNumberFacts();


async function getFourNumberFacts() {
    const promises = [];

    for (let i = 0; i < 4; i++) {
        promises.push(fetch(`http://numbersapi.com/${favoriteNumber}?json`));
    }

    const responses = await Promise.all(promises);
    const dataPromises = responses.map(response => response.json());
    const facts = await Promise.all(dataPromises);

    facts.forEach(factData => {
        const fact = document.createElement('p');
        fact.textContent = factData.text;
        factContainer.appendChild(fact);
    });
}

getFourNumberFacts();