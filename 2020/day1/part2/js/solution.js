const fs = require("fs")

function isSum2020(a, b, c) {
    return a + b + c === 2020 ? true : false
}

function main() {

    const testData = fs.readFileSync("/Users/bojanche/private/cheaoc/2020/day1/test.txt", "utf-8")
    const inputData = fs.readFileSync("/Users/bojanche/private/cheaoc/2020/day1/input.txt", "utf-8")

    // const splitted = testData.split('\n') // TEST DATA
    const splitted = inputData.split('\n')
    const parsed = splitted.map(s => parseInt(s))

    for (i = 0; i < parsed.length; i++) {
        for (j = i + 1; j < parsed.length; j++) {
            for (k = j + 1; k < parsed.length; k++) {
                if (isSum2020(parsed[i], parsed[j], parsed[k])) {
                    console.log(`${parsed[i]} + ${parsed[j]} + ${parsed[k]} = 2020 => Multiplied = ${parsed[i] * parsed[j] * parsed[k]}`)
                }
            }
        }
    }
}

main()