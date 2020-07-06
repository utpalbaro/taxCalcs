function calculateTaxWithGivenRates(taxableIncome, slabs) {
    const rows = slabs.length;
    const cols = 2;

    let lowerLimit = slabs[rows - 1][0];
    let taxRate = slabs[rows - 1][1];
    let tax = 0;

    for (let i = 1; i < slabs.length; ++i) {
        if (taxableIncome < slabs[i][0]) {
            lowerLimit = slabs[i-1][0];    // the lower limit
            taxRate = slabs[i-1][1];       // the applicable tax rate

            tax = tax + taxRate*(taxableIncome - lowerLimit);
            break;
        }
        else
            tax = tax + slabs[i-1][1]*(slabs[i][0] - slabs[i-1][0]);
    }

    tax = tax + slabs[rows-1][1]*(Math.max(0, taxableIncome - slabs[rows-1][0]));

    return tax;
}

function calculateTax(taxableIncome, slabs) {
    return  Array.isArray(taxableIncome) ? 
            taxableIncome.map(row => row.map(cell => calculateTaxWithGivenRates(cell, slabs))) :
            calculateTaxWithGivenRates(taxableIncome, slabs);
}