module.exports = (string) => {

	const numbers = {
		'zero': 0,
		'one': 1,
		'two': 2,
		'three': 3,
		'four': 4,
		'five': 5,
		'six': 6,
		'seven': 7,
		'eight': 8,
		'nine': 9,
		'ten': 10,
		'eleven': 11,
		'twelve': 12,
		'thirteen': 13,
		'fourteen': 14,
		'fifteen': 15,
		'sixteen': 16,
		'seventeen': 17,
		'eighteen': 18,
		'nineteen': 19,
		'twenty': 20,
		'thirty': 30,
		'forty': 40,
		'fifty': 50,
		'sixty': 60,
		'seventy': 70,
		'eighty': 80,
		'ninety': 90,
	}

	if (numbers[string])
		return numbers[string]

	if (string == 'one million')
		return 1000000

	const nstr = string.split(' ').filter((a) => a != 'and')
	let result = 0

	for (let i = 0; i < nstr.length; i++) {
		const w = nstr[i]
		const expr = w.match(/([a-z]+)\-([a-z]+)/)
		if (numbers[w] && nstr[i - 1] == 'hundred') {
			result += numbers[w]
		}
		else if (nstr[i + 1] == 'hundred') {
			result += 100 * numbers[w]
			i++
		} else if (nstr[i + 1] == 'thousand') {
			if (expr) {
				result = (result + (numbers[expr[1]] + numbers[expr[2]])) * 1000
				i++
			} else {
				result += numbers[w] * 1000
				i++
			}
		} else if (w == 'thousand') {
			result *= 1000
		} else if (expr) {
			result += numbers[expr[1]] + numbers[expr[2]]
		} else if (numbers[w]) {
			result += numbers[w]
		}
	}
	return result
}
