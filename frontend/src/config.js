let server_url = process.env.SERVER_URL;

if (server_url === undefined || server_url === null || server_url === '') {
    server_url = 'localhost:3000/api'
}

module.exports = server_url
