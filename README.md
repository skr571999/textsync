# TextSync

For sharing text in real time using `websocket`. Build using `ReactJS` and `NodeJS` (`ExpressJS`)

## Cloning and Installing

```sh
# to clone the REPO
git clone REPO_URL

# for installing server dependencies
cd FOLDER_NAME
npm install

# for installing website dependencies
cd website
yarn install
```

## Starting App Locally

```sh
# To run ExpressJS server
npm run dev

# To run ReactJS server
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

## TODO

- [x] Update the logo
- [x] Save theme to `localstorage`
- [ ] Handle Connection disconnect bug
  - To update the count of user on disconnect
- [ ] Add a Screen Recording in ReadMe with 2 screens to show the feature of real-time
- [ ] Add Status to show if connected to server or not
- [ ] Add Multiple Document Support
- [ ] Add Document Save Functionality to DB
- [ ] Fix Height Responsiveness
- [ ] Fix the UI(NavBar Buttons)
- [ ] Fix Text syncing when typing fast
- [ ] Convert to PWA and add support to work OffLine
- [ ] Add button to Copy all text
