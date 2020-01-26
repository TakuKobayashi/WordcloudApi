import requests

def sentence(input_text):
    r = requests.get('https://github.com/timeline.json')
    return r.text