const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async function(event, context) {
    const response = await axios.get('https://www.gamivo.com/');
    const $ = cheerio.load(response.data);
    const products = [];
    $('.product-title').each((index, element) => {
        products.push($(element).text().trim());
    });
    return {
        statusCode: 200,
        body: JSON.stringify(products)
    };
};
