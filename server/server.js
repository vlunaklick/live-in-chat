import express from 'express'
import cors from 'cors'
import { userRouter } from './routers/user.router.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
	optionSuccessStatus: 200,
	exposedHeaders: 'Authorization',
}

app.use(cors(corsOptions))

app.use(cookieParser())
app.set('port', 3005 || process.env.PORT)

app.use('/users', userRouter)

app.listen(app.get('port'), () => {
	console.log(`Listening on port ${app.get('port')}`)
})
