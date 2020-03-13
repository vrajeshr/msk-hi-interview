
# Simple chat web app
Simple chat application using node.js (express) and socket.io.

## Prerequisites
Install Node.JS
  
## Run instructions

1. Clone repo. Open a terminal to project location

2. Navigate to the folder in a terminal window and run the following 

```
npm install
npm start
```


3. Open another terminal window and navigate to the backend/ folder

4. Run the following command

```
cd backend/
nodemon app.js --ignore *.json
```

If Nodemon doesn't automatically install, run the following command and run 
```
npm install -g nodemon
```

5. Navigate to http://localhost:3000/, or the URL found on the first terminal window