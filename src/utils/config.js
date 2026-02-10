import dotenv from 'dotenv'

dotenv.config()

const PORT =3003
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

//muuttujat exportataan app.js fileen
//app.js filessä muista referoida config.PORT tyyliin
export default {
  PORT,
  MONGODB_URI
}