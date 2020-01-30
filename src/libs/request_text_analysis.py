import requests
import xmltodict
import os
from os.path import join, dirname
from dotenv import load_dotenv

load_dotenv(verbose=True)

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

def sentence(input_text):
    r = requests.post('https://jlp.yahooapis.jp/MAService/V1/parse',
                      data={
                          "appid": os.environ.get("YAHOO_API_KEY"),
                          "results": "ma,uniq",
                          "sentence": input_text,
                      })
    return xmltodict.parse(r.text)