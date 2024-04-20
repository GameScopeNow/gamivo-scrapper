const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async function(event, context) {
    // Obtener el título del juego desde la URL query string
    const gameTitle = event.queryStringParameters.title;
    const url = `https://www.gamivo.com/product/${encodeURIComponent(gameTitle)}`;

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const price = $('.current-price__value').first().text().trim();

        return {
            statusCode: 200,
            body: JSON.stringify({price}),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch price' })
        };
    }
};
