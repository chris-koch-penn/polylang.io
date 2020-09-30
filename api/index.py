from db import CodeTable, get_code_snippet, update_code_snippet, create_code_snippet
from sanic import Sanic
from sanic.response import json
import sys
import jwt
import os
IS_DEV = len(sys.argv) >= 2 and sys.argv[1] == "DEV"

app = Sanic(name="Polylang")

@app.post('/api')
async def index(request, path=""):
    params = request.json
    route = params.get("route")
    print(params)
    if route == "get_snippet":
        return await get_snippet(params)
    elif route == "new_snippet":
        return await new_snippet(params)
    elif route == "update_snippet":
        return await update_snippet(params)
    else:
        return json({'Error': "Route not found."})

async def new_snippet(params):
    print(params)
    return json({'hello': params})

async def update_snippet(params):
    print(params)
    return json({'hello': params})

async def get_snippet(params):
    print(params)
    return json({'hello': params})

def createJWT(snippet_id):
    """Create and sign a JWT for guest's to store in their browser.
        This JWT allows them to later edit any snippets they created without having
        to have an account."""
    key = os.environ.get("JWT_SECRET_KEY", "fake_key")
    jwt_res = jwt.encode({"snippet_id": snippet_id}, key, algorithm='HS256')
    return jwt_res.decode("utf-8")


if IS_DEV:
    from sanic_cors import CORS
    CORS(app)
    app.run(host="localhost", port=8000, debug=True)