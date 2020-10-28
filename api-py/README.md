# Requirements
The serverless runtime this app will be deployed on uses Python 3.8 currently.
To install dependencies:
`pip install -r requirements.txt`
To run the database you must install Dynalite first with:
`npm install -g dynalite`
then in the main directory run 
`npm run db`
`npm run server`
`npm run dev`
in three seperate terminals to start the database, the server, and the frontend.

# Structure
All http requests are POST requests directed through one serverless function handler and one endpoint ("api/") to avoid cold starts and simplify deployment
on Vercel. This has the added benefit of making the serverless functions more
portable to other providers. Specify the "route" paramater on the body of the request to determine where the request will go.

# Database Schema
The database schema has many unused fields currently. These were added in case the feature private code snippets is ever implemented.