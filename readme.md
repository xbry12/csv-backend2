# Express app created with lazy-cli express

The express app is organized as follows:
```
/routes
  - users.js
app.js
run.js
```

**routes** - express.js allows you to organize your endpoints using [routers](https://expressjs.com/en/guide/routing.html) to help keep your project more organized.  This routes folder is where we create our different express routers.  For example, the `routes.users.js` file exports a router that contains multiple endpoints related to the users. If this was an e-commerce site, you may have another router in the routes folder containing all the product related endpoints.

**app.js** is where we define the main  express app.  If you need to add any middlewares, this should be  done here.  This is also where we import any routers we define in the `routes` folder

To run the express app use:
```
npm start
```
