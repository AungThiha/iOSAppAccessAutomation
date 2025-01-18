import base64
import requests
import sys
from generate_jwt import get_token

def get_profiles(token):
    url = f"https://api.appstoreconnect.apple.com/v1/profiles?filter[profileType]=IOS_APP_ADHOC&fields[profiles]=name"
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

    profiles = response_json["data"]
    return profiles

def delete_profile(token, proifile_id):
    url = f"https://api.appstoreconnect.apple.com/v1/profiles/{proifile_id}"
    headers = {
        "Authorization": f"Bearer {token}"
    }

    response = requests.delete(url, headers=headers)
    if response.status_code != 204:
        print(f"Error: {response.status_code} - {response.text}")
        exit(1)
        
excluded_profile_id = sys.argv[1]
token = get_token()
profiles = get_profiles(token)
for profile in profiles:
    profile_id = profile["id"]
    if profile_id != excluded_profile_id:
        delete_profile(token, profile_id) 
