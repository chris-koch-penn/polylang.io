from chalice import Chalice
from chalicelib import get_code_snippet, update_code_snippet, create_code_snippet
from uuid import uuid4
import jwt
import os

app = Chalice(app_name='polylang')
# app = Flask("Polylang")
# CORS(app)

@app.route('/', methods=["GET", "POST"], cors=True)
def index():
    params = app.current_request.json_body
    if not params: return { "Error": "No params in body."}
    route = params.get("route")
    if route == "get_snippet":
        snippet = get_code_snippet(params['snippet_id'])
        return snippet.to_dict()
    elif route == "new_snippet":
        return new_snippet(params)
    elif route == "update_snippet":
        return update_snippet(params)
    return { "Error": "Route not found."}

def new_snippet(params):
    uid = str(uuid4()).replace('-', '')
    token = createJWT(uid)
    create_code_snippet(uid, params["code"], params["owner"], params["lang"], 
                        params["org"], params["private"])
    return { "id": uid, "token": token }

def update_snippet(params):
    snippet_id = decodeJWT(params["token"])['snippet_id']
    update_code_snippet(snippet_id, params["code"])
    return {"res": "Success"}

def createJWT(snippet_id):
    """Create and sign a JWT for guest's to store in their browser.
        This JWT allows them to later edit any snippets they created without having
        to have an account."""
    key = os.environ.get("JWT_SECRET_KEY", "fake_key")
    jwt_res = jwt.encode({"snippet_id": snippet_id}, key, algorithm='HS256')
    return jwt_res.decode("utf-8")

def decodeJWT(token):
    key = os.environ.get("JWT_SECRET_KEY", "fake_key")
    return jwt.decode(token, key, algorithms=['HS256'])
