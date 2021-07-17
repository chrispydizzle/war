import startApp from './app'
import { PORT } from './config'

require('@babel/register')

startApp().then(app => {
  app.listen(PORT, () => {
    console.log('Server listening on port', PORT)
  })
})
