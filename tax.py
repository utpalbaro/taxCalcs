def calculateTaxWithGivenRates(taxableIncome, slabs):
    rows = len(slabs)

    lowerLimit = slabs[rows - 1][0]
    taxRate = slabs[rows - 1][1]
    tax = 0

    for i in range(1, len(slabs)):
        if (taxableIncome < slabs[i][0]):
            lowerLimit = slabs[i-1][0]    # the lower limit
            taxRate = slabs[i-1][1]       # the applicable tax rate

            tax = tax + taxRate*(taxableIncome - lowerLimit)
            break

        else:
            tax = tax + slabs[i-1][1]*(slabs[i][0] - slabs[i-1][0])

    tax = tax + slabs[rows-1][1]*(max(0, taxableIncome - slabs[rows-1][0]))

    return tax


def calculateTax(taxableIncome, slabs):
    return  calculateTaxWithGivenRates(taxableIncome, slabs)
