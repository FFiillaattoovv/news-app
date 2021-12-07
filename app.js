const http = require('http')

const PORT = 3000

const server = http.createServer((req, res) => {
    console.log('Server request')
    res.setHeader('Content-Type', 'application-json')

    const data = JSON.stringify([
        {name: 'Bob', age: 27},
        {name: 'John', age: 19},
    ])

    res.end(data)
})

server.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`Listening port ${PORT}`)
})