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

if not excluded_profile_id or excluded_profile_id.isspace():
    print(f"ID of the profile to be excluded from deletion needs to be passed in as an argument")
    exit(1)

token = get_token()
profiles = get_profiles(token)

if not profiles:
    print("No profiles found to process")
    exit(0)

profile_ids = [profile.get[id] for profile in profiles if profile.get('id')]

if excluded_profile_id not in profile_ids:
    print(f"Profile ID to be excluded not found in profiles. No deletions performed.")
    exit(0)

for profile_id in profile_ids:
    if profile_id != excluded_profile_id:
        delete_profile(token, profile_id) 
