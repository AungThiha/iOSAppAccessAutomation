import base64
import jwt
import os
import time

def apple_secrets():
    key_id_b64 = os.getenv('APPLE_CONNECT_API_KEY_BASE64')
    issuer_id_b64 = os.getenv('APPLE_CONNECT_PRIVATE_KEY_ISSUER_ID_BASE64')
    private_key_b64 = os.getenv('APPLE_CONNECT_PRIVATE_KEY_BASE64')

    key_id = base64.b64decode(key_id_b64).decode('utf-8')
    issuer_id = base64.b64decode(issuer_id_b64).decode('utf-8')
    private_key = base64.b64decode(private_key_b64).decode('utf-8')

    return key_id, issuer_id, private_key

def get_token():
    key_id, issuer_id, private_key = apple_secrets()

    expiration_time = int(time.time()) + 60  # 1 minute from now

    jwt_payload = {
        'iss': issuer_id,
        'iat': int(time.time()),  # Issued at
        'exp': expiration_time,   # Expiration time
        'aud': 'appstoreconnect-v1'
    }

    return jwt.encode(jwt_payload, private_key, algorithm='ES256', headers={'kid': key_id})
