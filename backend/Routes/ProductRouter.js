const router = require('express').Router();
const ensureAuthenticated = require('../Middlewares/Auth');
const axios = require('axios');

router.get('/', ensureAuthenticated, async (req, res) => {
    console.log('---- logged in user detail ---', req.user);

    try {
        // Fetch data from external API
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const users = response.data;

        // Send the API response data
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching data from external API:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

module.exports = router;
