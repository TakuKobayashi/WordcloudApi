# coding:utf-8

from flask import Flask
import json

from src.libs import wordcloud

app = Flask(__name__)

@app.route("/", methods=["GET"])
def index():
    base64_image = wordcloud.generate_image(
        "pairsは年収600~　身長170より上　4大卒以上　禁煙者ってのが男性としての人権でどれか一つでもステータスがそこに達してないとないものとして扱われるんだなって気がしました。検索条件設定するから出てこないしね。いいねはたくさん来るわけだし",
        "assets/fonts/TowerGothic.otf"
    )
    return '<img src="data:image/png;base64,' + base64_image + '"/>'

if __name__ == "__main__":
    app.debug = True
    app.host = '0.0.0.0'
    app.threaded = True
    app.run()