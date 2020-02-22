import requests
from bs4 import BeautifulSoup


def load_text_from_url(url):
    response = requests.get(url);
    soup = BeautifulSoup(response.text, 'lxml');
    if soup.find("body") is None:
        text = response.text;
    else:
        [s.decompose() for s in soup('style')];
        [s.decompose() for s in soup('script')];
        body = soup.find("body");
        text = body.get_text().strip();

    return text;