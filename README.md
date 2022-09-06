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

_To run in production, the application will have to be built_  
_In other words, before running **npm run start**, run **npm run build**_

___

## Env variables  
PORT  
GITHUB_ACCESS_TOKEN  
ACCESS_TOKEN  

___

## Endpoints  
- ### __GET__  github/repo-single - Get single repository  

 #### HEADERS 
key | value
----| -----  
Authorization | ACCESS_TOKEN (from .env file)  

#### PARAMS  
key | description | value(eg)
--- | ----------- | --------  
repo_name | Name of the repository | facebook/react(has to be in this format)  

---

- ### __GET__  github/repo-multiple - Get multiple repositories  

#### HEADERS
key | value
--- | -----  
Authorization | ACCESS_TOKEN (from .env file)  
#### PARAMS  
key | description | value(eg)
--- | ----- | -----------
repo_names | Collection of repository names, seperated by commas | facebook/react,facebook/react-native(has to be in this format)  
organization | Organization name  | facebook
[ _Only one of the params can be supplied at a time_ ]






