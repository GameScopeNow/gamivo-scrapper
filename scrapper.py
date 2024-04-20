import requests
from bs4 import BeautifulSoup

def scrape_gamivo():
    url = "https://www.gamivo.com/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Supongamos que queremos extraer los nombres de los productos
    products = [div.text for div in soup.find_all('div', {'class': 'product-title'})]
    return products

if __name__ == "__main__":
    products = scrape_gamivo()
    print(products)
