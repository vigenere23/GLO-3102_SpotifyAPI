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

Do not forget to specify the spotify Authorization token specified by `Basic` followed by your Base64 encoded `client_id:client_secret` string, separated by spaces. For more info, please read spotify's [documentation](https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow).
