# Requirements
The serverless runtime this app will be deployed on uses Python 3.8.
To install dependencies:
```
pip install -r requirements.txt
npm install -g dynalite
```
Then in the main directory run:
```
npm run db
npm run server
npm run dev
```
in three seperate terminals to start the database, the server, and the frontend.

In order to run a production instance, create a file named `.env` containing the following variables:
```
AWS_ACCESS_KEY_ID="<your_key_here>"
AWS_SECRET_ACCESS_KEY="<your_key_here>"
AWS_DEFAULT_REGION="<your_region_here>"
JWT_SECRET_KEY="<your_key_here>"
```

This will deploy 

# Structure
All http requests are POST requests directed through one serverless function handler and one endpoint ("/") to avoid cold starts. Specify the "route" paramater on the body of the request to determine where the request will go.

# Database Schema
The database schema has many unused fields currently. These were added in case accounts and private code snippets are ever implemented.