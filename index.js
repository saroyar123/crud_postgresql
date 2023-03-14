const express = require('express')
const cookieparser=require('cookie-parser')
const bodyParser = require('body-parser')
const router=require('./routes')
const dotenv=require('dotenv')

dotenv.config();

const app = express()

app.use(cookieparser());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.use("/api",router);

app.listen(process.env.PORT||4000, () => {
  console.log(`App running on port ${process.env.PORT}.`)
})