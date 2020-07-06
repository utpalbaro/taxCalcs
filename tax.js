function calculateTaxWithGivenRates(taxableIncome, slabs, rates) {
    let lowerLimit = slabs[slabs.length - 1];
    let taxRate = rates[rates.length - 1];
    let tax = 0;

    for (let i = 1; i < slabs.length; ++i) {
        if (taxableIncome < slabs[i]) {
            lowerLimit = slabs[i-1];    // the lower limit
            taxRate = rates[i-1];       // the applicable tax rate

            tax = tax + taxRate*(taxableIncome - lowerLimit);
            break;
        }
        else
            tax = tax + rates[i-1]*(slabs[i] - slabs[i-1]);
    }

    tax = tax + rates[rates.length-1]*(Math.max(0, taxableIncome - slabs[slabs.length-1]));

    return tax;
}

function calculateTax(taxableIncome) {
    let slabs = [0, 250000, 500000, 1000000];
    let rates = [0, 0.05, 0.2, 0.3];

    return  Array.isArray(taxableIncome) ? 
            taxableIncome.map(row => row.map(cell => calculateTaxWithGivenRates(cell, slabs, rates))) :
            calculateTaxWithGivenRates(taxableIncome, slabs, rates);
}
