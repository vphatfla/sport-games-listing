const User = require("../models/User");

const setProfile = async (req, res) => {
    try {
        const { username, name, favoriteSport, favoriteTeam } = req.body;

        if (!username) {
            res.status(400).json({ 'message': "Username is required" });
            return;
        }

        const user = await User.findOne({ username: username })

        if (!user) {
            res.status(400).json({ 'message': "Username is not found" });
            return;
        }

        if (name) user.name = name;

        if (favoriteSport) user.favoriteSport = favoriteSport;

        if (favoriteTeam) user.favoriteTeam = favoriteTeam;

        await user.save();

        res.status(200).json({ "username": user.username, "name": user.name, "favoriteSport": user.favoriteSport, "favoriteTeam": user.favoriteTeam });
        return;
    } catch (error) {
        console.log("ERROR: profile update faialed", error);
        res.status(500).json({ "message": "Profile update failed ", error })
        return
    }
}

const getProfile = async (req, res) => {
    try {
        const { username } = req.body;

        if (!username) {
            res.status(400).json({ 'message': "Username is required" });
            return;
        }

        const user = await User.findOne({ username: username })

        if (!user) {
            res.status(400).json({ 'message': "Username is not found" });
            return;
        }

        res.status(200).json({ "username": user.username, "name": user.name, "favoriteSport": user.favoriteSport, "favoriteTeam": user.favoriteTeam });
        return;
    } catch (error) {
        console.log("ERROR: profile search failed", error);
        res.status(501).json({ "message": "Profile search failed ", error })
        return
    }
}

module.exports = { setProfile, getProfile }