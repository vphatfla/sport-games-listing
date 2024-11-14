const getNFLData = async (req, res) => {
    const dates = req.query.dates

    var param = (dates === null || dates === '' || dates == undefined) ? '' : '?dates=' + dates

    try {
        const data = await (await fetch("https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard" + param)).json()
        const events = data['events']
        res.status(200).json(processData(events))
    } catch (err) {
        res.status(501).json({ 'message': err })
        console.log(err);

    }
}

const processData = (events) => {
    var res = []
    for (var e of events) {
        var teams = []
        for (var team of e['competitions'][0]['competitors']) {
            teams.push({
                'homeAway': team['homeAway'],
                'name': team['team']['name'],
                'abbreviation': team['team']['abbreviation'],
                'displayName': team['team']['displayName'],
                'shortDisplayname': team['team']['shortDisplayName'],
                'color': team['team']['color'],
                'alternateColor': team['team']['alternateColor'],
                'logo': team['team']['logo'],
                'score': team['team']['score']
            })
        }

        res.push({
            'id': e['id'],
            'name': e['name'],
            'shortName': e['shortName'],
            'week': e['week']['number'],
            'status': {
                'clock': e['status']['clock'],
                'displayClock': e['status']['displayClock'],
                'period': e['status']['period'],
                'type': e['status']['type']['name'],
                'description': e['status']['type']['description'],
                'detail': e['status']['type']['detail'],
                'shortDetail': e['status']['type']['shortDetail']
            },
            'teams': teams
        })
    }
    return res
}
module.exports = { getNFLData }