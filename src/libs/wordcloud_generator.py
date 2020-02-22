# coding:utf-8

from io import BytesIO
from wordcloud import WordCloud
import requests
import xmltodict
import base64
import os


def morphological_analyze(input_text):
    response = requests.post('https://jlp.yahooapis.jp/MAService/V1/parse',
                             data={
                                 "appid": os.environ.get("YAHOO_API_KEY"),
                                 "results": "ma,uniq",
                                 "sentence": input_text,
                             })
    response_dic = xmltodict.parse(response.text)
    return response_dic["ResultSet"]["ma_result"]["word_list"]["word"]


def generate_image(input_text, font_file_path, background_color="white", width=400, height=200):
    analyzed_list = morphological_analyze(input_text)
    words = []
    for analyzed in analyzed_list:
        if analyzed["pos"] == '名詞':
            words.append(analyzed["surface"])
    wc = WordCloud(
        background_color=background_color,
        width=width,
        height=height,
        stopwords={"もの", "これ", "ため", "それ", "ところ", "よう"},
        font_path=font_file_path
    )
    wc.generate(" ".join(words))
    word_cloud_image = wc.to_image()

    buffer = BytesIO()
    word_cloud_image.save(buffer, format="PNG")
    return base64.b64encode(buffer.getvalue()).decode().replace("'", "")
