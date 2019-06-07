import '@babel/polyfill'
import { app } from './app'

const PORT = process.env.PORT || 9090

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`)
})

export default app
