# TextSync

For sharing text in real time using `websocket`. Build using `ReactJS` and `NodeJS` (`ExpressJS`)

## Usage

```sh
# to clone the REPO
git clone REPO_URL

# for installing server dependencies
cd FOLDER_NAME
npm i

# for installing website dependencies
cd website
yarn install

# to run server
npm run dev

# to run website
cd website
npm start

# to deploy website to netlify(Manual Deploy)
cd website
npm run build

# to deploy server to heroku(using heroku CLI)
# IF FOR FIRST TIME
heroku create APP_NAME

# to deploy code to heroku
git push heroku main
```

## TODO

- Update the logo
- Handle Connection disconnect bug
  - to update the count of user on disconnect
- Add a Screen Recording in ReadMe with 2 screens to show the feature of real-time
- Add Status to show if connected to server or not
- Add Multiple Document Support
- Add Document Save Functionality to DB
- Fix Height Responsiveness
- Fix the UI(NavBar Buttons)
- Fix Text syncing when typed fast
- Add theme setting save to Local storage
- Convert to PWA and add support to work OffLine
