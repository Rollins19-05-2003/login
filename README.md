# STEPS

## Backend
1. In root folder, do npx-create-react-app frotnend
2. Inside backend folder, do npm init -y
3. Install necessary library - 
    - express
    - jsonwebtoken
    - bcrypt
    - joi
    - body-parser
    - dotenv
    - mongoose
    - cors
4. create index.js and build your app and test PORT connectivity.
5. Create folder structure : 
    - models
    - Controllers
    - Routes
    - Middlewares
6. Setup and Connect your DB.
7. Create userSchema 
8. In index.js file, app.use() bodyParser, cors..
9. Create a AuthRouter and setup login signup routes and test from postman.
10. Create signupValidation and loginValidation middleware using JOI and make necessary changes in authRouter.js
11. create login and signup controllers.
12. test in postman and now let's fetch an dummy data for the authenticated user.
13. create auth.js and create a ensureAuthenticated() function that verify (jwt.verify()) header auth with our env secret key.
14. app.use('/data', DataRouter); in index.js which will only show data when ensureAuthenticated() function is authenticated.


## Frontend
1. Install react-router-dom and react-toastify.
2. In index.js, wrap you app inside <BrowserRouter> and import 'react-toastify/ReactToastify.css';
3. Create pages folder, and inside it create login, signup and home file.
4. for signup :
    - create a form structure 
    - create onChange and handleSignUp function
5. similarly for login, just one extra thing is that you have to add token and loggedInUser to localStorage.setItem();
5. In Home page, get the loggedInUser name from localStorage and handleLogout() by removing the details from the localStorage.
6. In useEffect called fetchProducts() and implement fetchProducts().
7. Implement private Routing by refreshHandler();


