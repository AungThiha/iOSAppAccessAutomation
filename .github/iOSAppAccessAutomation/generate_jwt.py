import base64
import jwt
import os
import time

def secrets():
    key_id_b64 = os.getenv('IOS_GITHUB_WORKFLOW_PRIVATE_KEY_ID_BASE64')
    issuer_id_b64 = os.getenv('IOS_GITHUB_WORKFLOW_PRIVATE_KEY_ISSUER_ID_BASE64')
    private_key_b64 = os.getenv('IOS_GITHUB_WORKFLOW_PRIVATE_KEY_BASE64')

    key_id = base64.b64decode(key_id_b64).decode('utf-8')
    issuer_id = base64.b64decode(issuer_id_b64).decode('utf-8')
    private_key = base64.b64decode(private_key_b64).decode('utf-8')

    return key_id, issuer_id, private_key

def get_token():
    key_id, issuer_id, private_key = secrets()

    expiration_time = int(time.time()) + 60  # 1 minute from now

    jwt_payload = {
        'iss': issuer_id,
        'iat': int(time.time()),
        'exp': expiration_time
    }

    return jwt.encode(jwt_payload, private_key, algorithm='RS256', headers={'kid': key_id})

