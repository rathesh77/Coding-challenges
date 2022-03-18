function travel(r, zipcode) {
  // your code
  if (zipcode == '') {
    return ':/'
  }

  let addresses = r.split(',')
  console.log(addresses)
  let ans = zipcode + ':'
  addresses = addresses.filter((el) => el.endsWith(zipcode))
  if (addresses.length == 0) {
    return zipcode + ':/'
  }
  let houses = []
  for (let i = 0; i < addresses.length; i++) {
    const limit = addresses[i].indexOf(' ')
    const addr = getAdressWithoutZip(addresses[i], zipcode)
    const house = addresses[i].substr(0, limit)
    ans += addr + ','
    houses.push(house)
  }
  ans = ans.slice(0, ans.length - 1)

  ans += '/'
  for (const house of houses) {
    ans += house + ','
  }
  ans = ans.slice(0, ans.length - 1)
  console.log('test')

  return ans
}

function getAdressWithoutZip(address, zipcode) {
  let begin = 0
  let end = null
  let temp = ''
  let i = address.length - 1
  while (temp != zipcode) {
    temp = address[i] + temp

    i--
  }
  end = i

  temp = ''
  i = 0
  while (address[i] != ' ') {
    i++
  }
  begin = i + 1
  return address.slice(begin, end).trim()
}

const r = '123 Main Street St. Louisville OH 43071,432 Main Long Road St. Louisville OH 43071,786 High Street Pollocksville NY 56432,54 Holy Grail Street Niagara Town ZP 32908,3200 Main Rd. Bern AE 56210,1 Gordon St. Atlanta RE 13000,10 Pussy Cat Rd. Chicago EX 34342,10 Gordon St. Atlanta RE 13000,58 Gordon Road Atlanta RE 13000,22 Tokyo Av. Tedmondville SW 43098,674 Paris bd. Abbeville AA 45521,10 Surta Alley Goodtown GG 30654,45 Holy Grail Al. Niagara Town ZP 32908,320 Main Al. Bern AE 56210,14 Gordon Park Atlanta RE 13000,100 Pussy Cat Rd. Chicago EX 34342,2 Gordon St. Atlanta RE 13000,5 Gordon Road Atlanta RE 13000,2200 Tokyo Av. Tedmondville SW 43098,67 Paris St. Abbeville AA 45521,11 Surta Avenue Goodtown GG 30654,45 Holy Grail Al. Niagara Town ZP 32918,320 Main Al. Bern AE 56215,14 Gordon Park Atlanta RE 13200,100 Pussy Cat Rd. Chicago EX 34345,2 Gordon St. Atlanta RE 13222,5 Gordon Road Atlanta RE 13001,2200 Tokyo Av. Tedmondville SW 43198,67 Paris St. Abbeville AA 45522,11 Surta Avenue Goodville GG 30655,2222 Tokyo Av. Tedmondville SW 43198,670 Paris St. Abbeville AA 45522,114 Surta Avenue Goodville GG 30655,2 Holy Grail Street Niagara Town ZP 32908,3 Main Rd. Bern AE 56210,77 Gordon St. Atlanta RE 13000'
const zipcode = 'OH 430'
console.log(travel(r, zipcode))