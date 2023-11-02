function countElements() {
    const elements = document.getElementsByTagName('p');
    document.getElementById('result1').innerText = `There are ${elements.length} paragraph tags on this page.`;
}

function countFirstDiv() {
    const firstDivElements = document.getElementById('firstDiv').getElementsByTagName('*').length;
    document.getElementById('result2').innerText = `There are ${firstDivElements} elements inside the first div.`;
}

function countSecondDiv() {
    const secondDivElements = document.getElementById('secondDiv').getElementsByTagName('*').length;
    document.getElementById('result3').innerText = `There are ${secondDivElements} elements inside the second div.`;
}