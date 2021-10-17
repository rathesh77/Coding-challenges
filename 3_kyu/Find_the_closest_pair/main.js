// Calculate a pair of closest points in linearithmic time
function closestPair(points) {
	if (points.length == 2)
		return points
	let t1 = quickSort([...points], 0, points.length - 1, 0)
	let t2 = quickSort([...points], 0, points.length - 1, 1)

	// point du milieu
	const middleIndex = parseInt((t1.length -1) /2)
	let middlePoint = t1[middleIndex]
	
	// les deux sous tableaux
	let sub1 = t1.slice(0, middleIndex)
	let sub2 = t1.slice(middleIndex, t1.length)


	let min1 = findDistance(sub1)
	let min2 = findDistance(sub2)

	let firstMin = findMin(min1, min2)
	let secondMin = combine(t2)
	return findMin(firstMin, secondMin)
}

function combine(array) {
	let min = [array[0], array[1]]

	for (let i = 1; i < array.length; i++) {
		for (let j = i+1; j < 7; j++) {
			min = findMin([array[i], array[j]], min)
		}
	}
	return min
}
function findDistance(array) {
	let min = [array[0], array[1]]
	for (let i = 1; i < array.length; i++) {
		for (let j = i + 1; j < array.length; j++) {
			/*const deltaX = Math.abs(array[i][0] - array[j][0])
			const deltaY = Math.abs(array[i][1] - array[j][1])
			const minX = Math.abs(min[0][0] - min[1][0])
			const miny = Math.abs(min[0][1] - min[1][1])
			if (deltaX < minX && deltaY < minY) {
				min = [array[i], array[j]]
			}*/
			min = findMin([array[i], array[j]], min)
		}
	}
	return min
}

function findMin(pair1, pair2) {
	const deltaX = Math.abs(pair1[0][0] - pair1[1][0])
	const deltaY = Math.abs(pair1[0][1] - pair1[1][1])
	const minX = Math.abs(pair2[0][0] - pair2[1][0])
	const minY = Math.abs(pair2[0][1] - pair2[1][1])
	if (dist(pair1) < dist(pair2) ) {
		return pair1
	}
	return pair2
}
function dist(p) {
return Math.sqrt( (p[0][0] - p[1][0] )*(p[0][0]  - p[1][0] ) +
								(p[0][1]  - p[1][1] )*(p[0][1]  - p[1][1] )
						);
}
function quickSort(array, begin, end, type) {
	
	if (begin < end){
		let r = partition(array, begin, end, type)
		quickSort(array, begin, r-1, type)
		quickSort(array,r+1, end, type)
	}
	return array
}

function partition(array, begin, end, type) {
	
	let pivot = array[begin][type]
	let i = begin
	let j = end
	while (i < j) {
		while (array[i] && array[i][type] <= pivot) {
			i++
		}
		while (array[j] && array[j][type] > pivot) {
			j--
		}
		if(i < j){
			let temp = array[i]
			array[i] = array[j]
			array[j] = temp
		}
	}
	let temp = array[j]
	array[j] = array[begin]
	array[begin] = temp
	return j
}

let array = [ [ 2, 2 ],
[ 2, 8 ],
[ 5, 5 ],
[ 6, 3 ],
[ 6, 7 ],
[ 7, 4 ],
[ 7, 9 ] ]
  
console.log(closestPair(array))


/*const deltaX = Math.abs(array[i][0] - array[j][0])
const deltaY = Math.abs(array[i][1] - array[j][1])
const minX = Math.abs(min[0][0] - min[1][0])
const miny = Math.abs(min[0][1] - min[1][1])
if (deltaX < minX && deltaY < minY) {
	min = [array[i], array[j]]
}*/