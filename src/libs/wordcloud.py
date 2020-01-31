# coding:utf-8

from io import BytesIO

import requests
import xmltodict
from wordcloud import WordCloud
import base64

import os
from os.path import join, dirname
from dotenv import load_dotenv

load_dotenv(verbose=True)

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

def morphological_analyze(input_text):
    response = requests.post('https://jlp.yahooapis.jp/MAService/V1/parse',
                      data={
                          "appid": os.environ.get("YAHOO_API_KEY"),
                          "results": "ma,uniq",
                          "sentence": input_text,
                      })
    response_dic = xmltodict.parse(response.text)
    return response_dic["ResultSet"]["ma_result"]["word_list"]["word"]

def generate_image(input_text, font_file_path):
    analyzed_list = morphological_analyze(input_text)
    words = []
    for analyzed in analyzed_list:
        if analyzed["pos"] == '名詞':
            words.append(analyzed["surface"])
    wc = WordCloud(background_color="white", stopwords={"もの", "これ", "ため", "それ", "ところ", "よう"}, font_path=font_file_path)
    wc.generate(" ".join(words))
    word_cloud_image = wc.to_image()

    buffer = BytesIO()
    word_cloud_image.save(buffer, format="PNG")
    return base64.b64encode(buffer.getvalue()).decode().replace("'", "")
