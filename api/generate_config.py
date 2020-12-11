import json
import os
from pathlib import Path
Path("./.chalice").mkdir(exist_ok=True)

data = {
    "version": "2.0",
    "app_name": "polylang",
    "environment_variables": {
        "POLYLANG_AWS_ACCESS_KEY_ID": os.environ.get('AWS_ACCESS_KEY_ID', 'fake'),
        "POLYLANG_AWS_SECRET_ACCESS_KEY": os.environ.get('AWS_SECRET_ACCESS_KEY', 'fake'),
        "JWT_SECRET_KEY": os.environ.get('JWT_SECRET_KEY', 'fake')
    },
    "stages": {
        "dev": {
            "api_gateway_stage": "api"
        }
    }
}

with open('./.chalice/config.json', 'w') as outfile:
    json.dump(data, outfile)