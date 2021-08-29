function formatDuration(seconds) {
	// Complete this function
	if (seconds == 0)
	  return 'now'
  
	let years = 0, days = 0, hours = 0, minutes = 0, result = ''
  
	if (seconds >= 31536000) {
	  years = parseInt(seconds / 31536000)
	  if (years == 1)
		result += `${years} year, `
	  else if (years > 1)
		result += `${years} years, `
  
	  seconds = seconds % 31536000
	}
  
	if (seconds >= 86400) {
	  days = parseInt(seconds / 86400)
	  if (days == 1)
		result += `${days} day, `
	  else if (days > 1)
		result += `${days} days, `
  
	  seconds = seconds % 86400 
	}
  
	if (seconds >= 3600) {
	  hours = parseInt(seconds / 3600)
	  if (hours == 1)
		result += `${hours} hour, `
	  else if (hours > 1)
		result += `${hours} hours, `
  
	  seconds = seconds % 3600
	}
  
	if (seconds >= 60) {
	  minutes = parseInt(seconds / 60)
	  if (minutes == 1)
		result += `${minutes} minute, `
	  else if (minutes > 1)
		result += `${minutes} minutes, `
  
	  seconds = seconds % 60
	}
  
	if (seconds > 0) {
	  if (seconds == 1)
		result += `${seconds} second,`
	  else
		result += `${seconds} seconds,`
	}
  
	if (result[result.length - 2] == ',')
	  result = result.substring(0, result.length - 2)
	else
	  result = result.substring(0, result.length - 1)
  
	for (let i = result.length - 1; i > 0; i--) {
	  if (result[i] == ',') {
		result = result.substring(0, i) + ' and ' + result.substring(i + 2)
		break
	  }
	}
  
	return result
  }