import base64
import requests
from generate_jwt import get_token

def get_emails(token):
    url = "http://localhost:8080/user/emails"
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

    return response_json

token = token = get_token()
emails = get_emails(token)

# this is a format required by Firebase CLI
# It's without '[' and ']' but still has ','
result = ', '.join(emails) 

print(result)
