# coding:utf-8

import json
from src.libs import wordcloud_generator
from src.libs import load_clear_html_text


def generate_from_sentence(event, context):
    input_params = parse_inputs(event);

    if "sentence" not in input_params:
        return {
            "statusCode": 400,
            "headers": {
                'Content-Type': 'application/json',
            },
            "body": {
                "message": "sentence is Nothing",
            },
        }

    base64_image = wordcloud_generator.generate_image(
        input_text=input_params["sentence"],
        font_file_path=input_params["font_file_path"],
        background_color=input_params["background_color"],
        width=input_params["width"],
        height=input_params["height"]
    )

    response = {
        "statusCode": 200,
        "headers": {
            'Content-Type': 'image/png',
        },
        "body": base64_image,
        "isBase64Encoded": True,
    }

    return response


def generate_from_url(event, context):
    input_params = parse_inputs(event);

    if "url" not in input_params:
        return {
            "statusCode": 400,
            "headers": {
                'Content-Type': 'application/json',
            },
            "body": {
                "message": "url is Nothing",
            },
        }

    text = load_clear_html_text.load_text_from_url(input_params["url"]);
    base64_image = wordcloud_generator.generate_image(
        input_text=text,
        font_file_path=input_params["font_file_path"],
        background_color=input_params["background_color"],
        width=input_params["width"],
        height=input_params["height"]
    )

    response = {
        "statusCode": 200,
        "headers": {
            'Content-Type': 'image/png',
        },
        "body": base64_image,
        "isBase64Encoded": True,
    }

    return response


def parse_inputs(event):
    result = {}
    body_parser = {}
    try:
        if event['body'] is not None:
            body_parser = json.loads(event['body'])
            result = body_parser.copy();
    except ValueError:
        pass

    result["font_file_path"] = "/opt/SourceHanCodeJP-Normal.otf";
    if "font" in body_parser:
        result["font_file_path"] = "/opt/" + body_parser["font"];

    result["background_color"] = "white";
    if "background_color" in body_parser:
        result["background_color"] = body_parser["background_color"];

    result["width"] = 400;
    if "width" in body_parser:
        result["width"] = body_parser["width"];

    result["height"] = 200;
    if "height" in body_parser:
        result["height"] = body_parser["height"];

    return result;