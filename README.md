# SpotifyAPI

This routing server handles the authorization and tokenization process needed to contact the Spotify's API. For now, only the routes needed by [GLO3102-uBeat](https://github.com/vigenere23/GLO3102-uBeat) are opened. To see exactly which routes are opened, please read the [wiki](https://github.com/vigenere23/GLO3102-SpotifyAPI/wiki).

## Installation

```bash
yarn install
```

## Start

### Dev (nodemon)

```bash
yarn dev
```

### Production

```bash
yarn serve
```

## Environment variables

You must create a `.env` file with the following fields:

* `SPOTIFY_AUTHORIZATION` : should contain your Spotify Authorization token (Basic \<base64 encoded client_id:client_secret\>).
  * For more info, please read the [documentation](https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow).
