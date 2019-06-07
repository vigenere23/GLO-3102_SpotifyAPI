import express from 'express'
import { SpotifyController } from './controllers/spotifyController'
import { AuthController } from './controllers/authController'

const router = express.Router()

router.get('/', (req, res) => res.status(200).send('API is up and running'))

router.use('/*', AuthController.ensureToken)
router.get('/search', SpotifyController.search)
router.get('/artists/:artistId', SpotifyController.getArtistById)
router.get('/artists/:artistId/similar', SpotifyController.similarArtists)

export { router }
