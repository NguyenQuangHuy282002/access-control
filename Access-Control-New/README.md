## Access Control App

### Run Backend
- Create file backend/.env
- Copy env.example to env
- Example env.example : 
 `
    DB_NAME = example;
    DB_URL = mongodb://127.0.0.1:27017;
    PORT = 4000;
  `
- cd backend `npm start`

### Run Frontend
- Create file frontend/.env
- Copy env.example to env
- Example env.example: 
`
  REACT_APP_BASE_URL = http://localhost:4000/api
`
- cd frontend `npm start`

### Github Workflow
- Create branch: `dev/<feature>`
- Create pull request: `[module] <description>`
