const fs = require("fs")

function isSum2020(a, b) {
    return a + b === 2020 ? true : false
}

function main() {

    const testData = fs.readFileSync("/Users/bojanche/private/cheaoc/2020/day1/test.txt", "utf-8")
    const inputData = fs.readFileSync("/Users/bojanche/private/cheaoc/2020/day1/input.txt", "utf-8")

    // const splitted = testData.split('\n') // TEST DATA
    const splitted = inputData.split('\n')
    const parsed = splitted.map(s => parseInt(s))

    for (i = 0; i < parsed.length; i++) {
        for (j = i + 1; j < parsed.length; j++) {
            if (isSum2020(parsed[i], parsed[j])) {
                console.log(`${parsed[i]} + ${parsed[j]} = 2020 => Multiplied = ${parsed[i] * parsed[j]}`)
            }
        }
    }
}

main()