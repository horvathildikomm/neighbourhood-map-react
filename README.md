## Frontend nanodegree React neighbourhood map
This is the final project for a Udacity nanodegree. The starter code is created by create-react-app.
## Basic functionality
It is a map of different places in Budapest shown on a Google map, with additional information from Wikipedia. The places can be filtered with a dropdown menu, and when on of the places is clicked either from the list or it's marker, the image of the place is shown in an info window on the map.

## How to start the app
Run `yarn install` or `npm install` to install dependencies, after that you can start server with `yarn start` or `npm run start` which also opens up the page in your default browser, or you can go to [localhost:3000].

## Service workers / production build
Create-react-app has a built in offline caching functionality, but the service worker which provides that only works with a production build.
To test the offline functionality first build the application with `yarn build` or `npm run build` then serve the build directory with `yarn serve` or `npm run serve`. You can visit the production page on [localhost:5000].
