# Running
To start the server in development mode:
`python index.py DEV`.

# Structure
All http requests are POST requests directed through one serverless function handler and one endpoint ("api/") to avoid cold starts and simplify deployment
on Vercel. This has the added benefit of making the serverless functions more
portable to other providers. Specify the "route" paramater on the body of the request to determine where the request will go.
