import { app } from './app'

app.listen(9090,() => {
  console.log('Server is listening at http://localhost:9090')
})

export default app;
