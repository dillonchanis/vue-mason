const fs = require('fs')
const stream = fs.createWriteStream('init.txt')

stream.once('open', (fd) => {
	stream.write('Hello World!\n')

	stream.end()
})
