// Calculate a pair of closest points in linearithmic time
function closestPair(points) {
  return closestPoints(quickSort(points, 0, points.length - 1, 0))
}

function closestPoints(points) {
  if (points.length <= 3) {
    return bruteForceSearch(points)
  }
  const middleIndex = parseInt(points.length / 2)
  const middlePoint = points[middleIndex]

  const minLeft = closestPoints(points.slice(0, middleIndex))
  const minRight = closestPoints(points.slice(middleIndex))
  let min = dist(minLeft) < dist(minRight) ? minLeft : minRight

  let strip = []
  for (let i = 0; i < points.length; i++) {
    const currentX = points[i][0]
    const midX = middlePoint[0]

    if (Math.abs(currentX - midX) < dist(min)) {
      strip.push(points[i])
    }
  }
  strip = quickSort(strip, 0, strip.length - 1, 1)
  for (let i = 0; i < strip.length; i++) {
    for (let j = i + 1; j < strip.length; j++) {
      if (strip[j][1] - strip[i][1] >= dist(min))
        break
      if (dist([strip[i], strip[j]]) < dist(min))
        min = [strip[i], strip[j]]

    }
  }
  return min
}

function bruteForceSearch(points) {

  let min = [points[0], points[1]]
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      if (dist([points[i], points[j]]) < dist(min))
        min = [points[i], points[j]]
    }
  }
  return min
}

function dist(p) {
  return Math.sqrt((p[0][0] - p[1][0]) ** 2 + (p[0][1] - p[1][1]) ** 2);
}

function quickSort(array, begin, end, type) {

  if (begin < end) {
    const r = partition(array, begin, end, type)
    quickSort(array, begin, r - 1, type)
    quickSort(array, r + 1, end, type)
  }
  return array
}

function partition(array, begin, end, type) {

  let pivot = array[begin][type]
  let i = begin
  let j = end
  while (i < j) {
    while (array[i] != null && array[i][type] <= pivot) {
      i++
    }
    while (array[j] != null && array[j][type] > pivot) {
      j--
    }
    if (i < j) {
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }
  const temp = array[j]
  array[j] = array[begin]
  array[begin] = temp
  return j
}

module.exports = closestPair


