const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async function(event, context) {
    // Obtener el término de búsqueda desde la URL query string
    const searchTerm = event.queryStringParameters.search;
    const url = `https://www.gamivo.com/search/${encodeURIComponent(searchTerm)}`;

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        // Asumiendo que queremos el precio del primer producto listado en los resultados de búsqueda
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
