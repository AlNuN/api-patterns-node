# API PETSHOP

Making a petshop API to learn Node with Alura's course.

## Setup

Install the dependencies with `npm i`

Create a file named `config/default.json` to set the global variables:

```json
{
  "mysql": {
    "db-name": "name-of-the-database",
    "user": "root",
    "password": "your-password",
    "host": "localhost"
  },
  "api": {
    "port": "3000"
  }
}
```

At root folder create tables app with `node ./api/db/createTables.js` and then run the app with `node ./index.js`. 
