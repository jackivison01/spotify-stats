# Spotify Stats
React app that allows you to check your live Spotify stats via the Spotify API

User logs in through Spotify SSO, once logged in, the user is presented with the main application which allows navigation to the different pages.

# Set up

Follow the steps on this page to set up an app and client ID: [Spotify Web API](https://developer.spotify.com/documentation/web-api/tutorials/getting-started)

Create a new .env file and add your client ID to the variables and a redirect URL of your choosing.

E.g. `VITE_SPOTIFY_REDIRECT_URL="http://localhost:5173/callback`

To run, navigate to main source folder and run the following:
```bash
npm install -g pnpm
pnpm install
pnpm run dev
```

# Features

## Sidebar/navigation
* Home page
* Account/profile
* Recently played

## Pages
* Account page - where you can see the following
    * Name
    * Profile Photo
    * Recently Played track
    * Top 3 artists
    * Top 3 songs
    * Top 3 albums
        * You can see filter these to short term (4 weeks), medium term (6 months), and long term (1 year)
* Currently playing/previously played
    * Track that is currently played
    * Last 5 tracks
        * Option to view further history