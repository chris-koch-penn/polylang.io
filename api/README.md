# Requirements
Vercel, the serverless runtime this app will be deployed on, uses Python 3.6 currently.
To install dependencies:
`pip install -r requirements.txt`
To run the database you must install Dynalite first with:
`npm install -g dynalite`
then run
`dynalite --port 8000`

# Running
To start the server in development mode:
`python index.py DEV`.

# Structure
All http requests are POST requests directed through one serverless function handler and one endpoint ("api/") to avoid cold starts and simplify deployment
on Vercel. This has the added benefit of making the serverless functions more
portable to other providers. Specify the "route" paramater on the body of the request to determine where the request will go.

# Database Schema
The database schema has many unused fields currently. These were added in case the feature private code snippets is ever implemented.