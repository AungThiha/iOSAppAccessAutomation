import jwt
import requests
import time
import base64

# Retrieve the secrets from the environment variables
key_id_b64 = os.getenv('APPLE_CONNECT_API_KEY_BASE64')
issuer_id_b64 = os.getenv('APPLE_CONNECT_PRIVATE_KEY_ISSUER_ID_BASE64')
private_key_b64 = os.getenv('APPLE_CONNECT_PRIVATE_KEY_BASE64')
provisioning_profile_id_b64 = os.getenv('PROVISIONING_PROFILE_ID_BASE64')

# Decode the base64-encoded secrets
key_id = base64.b64decode(key_id_b64).decode('utf-8')
issuer_id = base64.b64decode(issuer_id_b64).decode('utf-8')
private_key = base64.b64decode(private_key_b64).decode('utf-8')
provisioning_profile_id = base64.b64decode(provisioning_profile_id_b64).decode('utf-8')

# JWT expiration time (typically 20 minutes)
expiration_time = int(time.time()) + 60  # 1 minute from now

# Generate JWT
jwt_payload = {
    'iss': issuer_id,
    'iat': int(time.time()),  # Issued at
    'exp': expiration_time,   # Expiration time
    'aud': 'appstoreconnect-v1'
}

token = jwt.encode(jwt_payload, private_key, algorithm='ES256', headers={'kid': key_id})

print(f"JWT: {token}")

url = f"https://api.appstoreconnect.apple.com/v1/profiles/{provisioning_profile_id}"
headers = {
    "Authorization": f"Bearer {token}"
}

response = requests.get(url, headers=headers)
response_json = ''
if response.status_code == 200:
    response_json = response.json()
else:
    print(f"Error: {response.status_code} - {response.text}")
    exit(1)

# Extracting the 'profileContent' from the response
profile_content_base64 = response_json["data"]["attributes"]["profileContent"]

# Decode the base64-encoded content
decoded_content = base64.b64decode(profile_content_base64)

# Write the decoded content to a file
with open("provisioning_profile.mobileprovision", "wb") as file:
    file.write(decoded_content)
