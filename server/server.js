import express from 'express'
import cors from 'cors'
import { userRouter } from './routers/user.router.js'

const app = express()

app.use(express.json())
app.use(cors())
app.set('port', 3005 || process.env.PORT)

app.use('/users', userRouter)

app.listen(app.get('port'), () => {
	console.log(`Listening on port ${app.get('port')}`)
})
