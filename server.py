# coding:utf-8

from flask import Flask

from src.libs import request_text_analysis

app = Flask(__name__)

@app.route("/", methods=["GET"])
def index():
    sentence = request_text_analysis.sentence("pairsは年収600~　身長170より上　4大卒以上　禁煙者ってのが男性としての人権でどれか一つでもステータスがそこに達してないとないものとして扱われるんだなって気がしました。検索条件設定するから出てこないしね。いいねはたくさん来るわけだし")
    print(sentence)
    return sentence

if __name__ == "__main__":
    app.debug = True
    app.host = '0.0.0.0'
    app.threaded = True
    app.run()