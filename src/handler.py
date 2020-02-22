# coding:utf-8

import json
import subprocess
from src.libs import wordcloud_generator


def wc_generate(event, context):
    base64_image = wordcloud_generator.generate_image(
        "pairsは年収600~　身長170より上　4大卒以上　禁煙者ってのが男性としての人権でどれか一つでもステータスがそこに達してないとないものとして扱われるんだなって気がしました。検索条件設定するから出てこないしね。いいねはたくさん来るわけだし",
        "/opt/TowerGothic.otf"
    )

    response = {
        "statusCode": 200,
        "headers": {
            'Content-Type': 'text/html',
        },
        "body": '<html><body><img src="data:image/png;base64,' + base64_image + '"/></body></html>'
    }

    return response
