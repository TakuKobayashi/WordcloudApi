import json
import requests

def hello(event, context):
    r = requests.get('https://github.com/timeline.json')
    body = {
        "message": "Go Serverless v1.0! Your function executed successfully!",
        "input": event,
        "request_test": r.text
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response

    # Use this code if you don't use the http event with the LAMBDA-PROXY
    # integration
    """
    return {
        "message": "Go Serverless v1.0! Your function executed successfully!",
        "event": event
    }
    """
