import json
import os
import base64
from typing import Dict, Any
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Обрабатывает продажу трека - сохраняет в S3 и возвращает информацию о продаже
    
    Args:
        event: словарь с полями httpMethod, body, headers
        context: объект контекста с атрибутами request_id, function_name
    
    Returns:
        HTTP ответ с информацией о проданном треке
    """
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'isBase64Encoded': False,
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_str = event.get('body', '{}')
    body_data = json.loads(body_str)
    
    file_name = body_data.get('fileName', 'track.mp3')
    price = body_data.get('price', 0)
    audio_data = body_data.get('audioData', '')
    
    track_id = f"track_{context.request_id}"
    
    import boto3
    
    try:
        s3 = boto3.client('s3',
            endpoint_url='https://bucket.poehali.dev',
            aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
        )
        
        audio_bytes = base64.b64decode(audio_data) if audio_data else b''
        
        s3_key = f'tracks/{track_id}/{file_name}'
        s3.put_object(
            Bucket='files',
            Key=s3_key,
            Body=audio_bytes,
            ContentType='audio/mpeg'
        )
        
        cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{s3_key}"
    except Exception as e:
        cdn_url = None
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({
            'trackId': track_id,
            'fileName': file_name,
            'price': price,
            'status': 'active',
            'cdnUrl': cdn_url,
            'soldAt': datetime.utcnow().isoformat(),
            'message': f'Трек "{file_name}" выставлен на продажу за {price} ₽'
        })
    }
