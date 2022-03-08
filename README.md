# LiveCollab

For having a live Collaborating. Build using `ReactJS` and `ExpressJS` with websocket

## Cloning and Installing

```sh
# to clone the REPO
git clone REPO_URL
cd FOLDER_NAME

# for installing server dependencies
cd server
npm install

# for installing website dependencies
cd website
yarn install
```

## Starting App Locally

```sh
# To Start ExpressJS server
cd server
npm run dev

# To Start ReactJS server
cd website
npm start
```

## Deploying/Building

```sh
# To deploy website to netlify(Manual Deploy)
cd website
npm run build

# To deploy server to heroku(using heroku CLI)
heroku create APP_NAME # IF FOR FIRST TIME

git push heroku main # to deploy code to heroku
```
