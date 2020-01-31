# coding:utf-8

import json
import subprocess
from src.libs import wordcloud

def generate(event, context):
    res = subprocess.check_output('ls /opt/')
    print(res)
    base64_image = wordcloud.generate_image(
        "pairsは年収600~　身長170より上　4大卒以上　禁煙者ってのが男性としての人権でどれか一つでもステータスがそこに達してないとないものとして扱われるんだなって気がしました。検索条件設定するから出てこないしね。いいねはたくさん来るわけだし",
        "/opt/fonts/TowerGothic.otf"
    )
    body = {
        "base64_image_png": base64_image
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response
