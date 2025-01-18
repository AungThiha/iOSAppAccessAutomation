import base64
import requests
from create_provisioning_profile_request_body import create_request_body
from generate_jwt import get_token

def fetch_device_ids(token):
    url = "https://api.appstoreconnect.apple.com/v1/devices?fields[devices]=udid&filter[platform]=IOS"
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

    data = response_json["data"]
    device_ids = [item["id"] for item in data]
    return device_ids

def create_provisioning_profile(token, device_ids):
    url = "https://api.appstoreconnect.apple.com/v1/profiles"
    headers = {
        "Authorization": f"Bearer {token}"
    }

    request_body = create_request_body(device_ids)

    response = requests.post(url, headers=headers, json=request_body)
    if response.status_code == 201:
        response_json = response.json()
    else:
        print(f"Error: {response.status_code} - {response.text}")
        exit(1)

    attributes = response_json["data"]["attributes"]
    profile_id = attributes["id"]
    profile_content_base64 = attributes["profileContent"]
    decoded_content = base64.b64decode(profile_content_base64)
    return profile_id, decoded_content

token = get_token()
device_ids = fetch_device_ids(token)
profile_id, profile_content = create_provisioning_profile(token, device_ids)

with open("provisioning_profile.mobileprovision", "wb") as file:
    file.write(profile_content)

print(profile_id)