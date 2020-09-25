from sanic import Sanic
from sanic.response import json
import sys
IS_DEV = len(sys.argv) >= 2 and sys.argv[1] == "DEV"

app = Sanic(name="Polylang")

@app.post('/api')
async def index(request, path=""):
    params = request.json
    route = params.get("route")
    print(params)
    if route == "new_snippet":
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

async def init_db():
    return

if IS_DEV:
  from sanic_cors import CORS
  CORS(app)
  app.run(host="localhost", port=8000, debug=True)