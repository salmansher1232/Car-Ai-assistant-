function analyzeCar() {
const model = document.getElementById("carModel").value;
const auction = Number(document.getElementById("auctionPrice").value);
const repair = Number(document.getElementById("repairCost").value);
const selling = Number(document.getElementById("sellingPrice").value);

const totalCost = auction + repair;
const profit = selling - totalCost;

let decision;

if (profit > 0) {
decision = "BUY / CONSIDER ✅";
} else {
decision = "SKIP ❌";
}

document.getElementById("result").innerHTML = `
<h2>${decision}</h2>
<p><strong>Car:</strong> ${model || "Not entered"}</p>
<p><strong>Total Cost:</strong> ¥${totalCost.toLocaleString()}</p>
<p><strong>Expected Sale:</strong> ¥${selling.toLocaleString()}</p>
<p><strong>Estimated Profit:</strong> ¥${profit.toLocaleString()}</p>
`;
}

