import base64
import os
from datetime import datetime

def photo_album_ios_app_secrets():
    certificate_id_base64 = os.getenv('APPLE_DISTRIBUTION_CERTIFICATE_ID_BASE64')
    bundle_id_base64 = os.getenv('PHOTO_ALBUM_IOS_APP_BUNDLE_ID_BASE64')

    certificate_id = base64.b64decode(certificate_id_base64).decode('utf-8')
    bundle_id = base64.b64decode(bundle_id_base64).decode('utf-8')

    return certificate_id, bundle_id

def create_request_body(device_ids):

    current_time = datetime.utcnow()
    name = f"Photo Album {current_time.strftime('%d %b %Y  %H %M')} UTC"

    certificate_id, bundle_id = photo_album_ios_app_secrets()

    return {
        "data": {
            "type": "profiles",
            "attributes": {
                "name": name,
                "profileType": "IOS_APP_ADHOC"
            },
            "relationships": {
                "bundleId": {
                    "data": {
                        "type": "bundleIds",
                        "id": bundle_id
                    }
                },
                "certificates": {
                    "data": [
                        {
                            "type": "certificates", 
                            "id": certificate_id
                        }
                    ]
                },
                "devices": {
                    "data": [
                        {"type": "devices", "id": device_id} for device_id in device_ids
                    ]
                }
            }
        }
    }