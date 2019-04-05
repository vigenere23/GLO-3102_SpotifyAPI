import express from 'express'
import { SpotifyController } from './spotifyController'

const router = express.Router()

router.get('/', (req, res) => res.status(200).send('API is up and running'))

router.use('/*', SpotifyController.ensureToken)
router.get('/search', SpotifyController.search)
router.get('/similar', SpotifyController.similar)

export { router }
