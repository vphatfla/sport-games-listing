const getNFLData = async (req, res) => {
    const { date } = req.body

    var param = (date === null || date === '') ? '' : '?' + date

    try {
        const data = await (await fetch("https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard" + param)).json()
        const events = data['events']
        res.status(200).json(events)
    } catch (err) {
        res.status(501).json({ 'message': err })
        console.log(err);

    }
}

module.exports = { getNFLData }