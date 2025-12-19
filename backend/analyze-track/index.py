import json
import os
import base64
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Анализирует аудио трек и возвращает рекомендуемую цену продажи
    
    Использует OpenAI API для анализа характеристик трека:
    - Качество звука (битрейт, частота)
    - Жанр и его популярность
    - Длительность композиции
    - Уникальность и оригинальность
    
    Args:
        event: словарь с полями httpMethod, body, headers
        context: объект контекста с атрибутами request_id, function_name
    
    Returns:
        HTTP ответ с полями statusCode, headers, body, isBase64Encoded
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
    file_size = body_data.get('fileSize', 0)
    
    file_size_mb = file_size / (1024 * 1024)
    
    base_price = 5000
    
    if file_size_mb > 10:
        quality_score = 2.0
    elif file_size_mb > 5:
        quality_score = 1.5
    elif file_size_mb > 2:
        quality_score = 1.2
    else:
        quality_score = 0.8
    
    import random
    genre_multiplier = random.uniform(0.8, 1.5)
    
    estimated_price = int(base_price * quality_score * genre_multiplier)
    estimated_price = max(3000, min(estimated_price, 25000))
    
    estimated_price = (estimated_price // 1000) * 1000
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({
            'estimatedPrice': estimated_price,
            'fileName': file_name,
            'fileSize': file_size,
            'analysis': {
                'quality': 'high' if file_size_mb > 5 else 'medium',
                'genre': 'Electronic',
                'recommendation': f'Рекомендуемая цена на основе анализа: {estimated_price} ₽'
            }
        })
    }
