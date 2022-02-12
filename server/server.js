import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.set('port', 3005 || process.env.PORT)

app.listen(app.get('port'), () => {
	console.log(`Listening on port ${app.get('port')}`)
})
