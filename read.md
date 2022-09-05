## Dependencies  
Express  
Axios

___


## Dev Dependencies
Nodemon  
Typescript  
Ts-node  
Jest  
Ts-jest  
Supertest  
Corresponding types for packages installed

___


## Commands  
npm run dev - Run in dev mode  
npm run start - Run in production  
npm run build - Build typescript  
npm run test - Run tests  

___

## Env variables  
PORT  
GITHUB_ACCESS_TOKEN  
ACCESS_TOKEN  

___

## Endpoints  
 - __GET__  github/repo-single - Get single repository  
### Params  
repo_name - Name of the repository eg. facebook/react(has to be in this format)  
### Headers  
Authorization - ACCESS_TOKEN (from .env file) 

- __GET__  github/repo-multiple - Get multiple repositories  
### Params  
repo_names - Collection of repository names, seperated by commas eg. facebook/react,facebook/react-native(has to be in this format)  
### Headers  
Authorization - ACCESS_TOKEN (from .env file) 





