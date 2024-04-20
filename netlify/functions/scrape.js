const axios = require('axios');
const response = await axios.get(url, {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'
    }
});


exports.handler = async function(event, context) {
    const searchTerm = event.queryStringParameters.search;
    const url = `https://www.gamivo.com/search/${encodeURIComponent(searchTerm)}`;

    console.log("Fetching URL:", url);  // Log the URL being accessed

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
            }
        });
        console.log("Fetched Successfully");  // Log to confirm the page was fetched

        // Return the complete HTML body for inspection
        return {
            statusCode: 200,
            body: response.data,
            headers: {
                'Content-Type': 'text/html'
            }
        };
    } catch (error) {
        console.error("Error fetching the page:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch the page' })
        };
    }
};
