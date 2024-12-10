const server_url = () => {
    let server_url = 'https://contactmanagerteamone.one';
    console.log(server_url)
    if (server_url === undefined || server_url === null || server_url === '') {
        server_url = 'http://localhost:3000'
    }

    return server_url
}

module.exports = server_url
