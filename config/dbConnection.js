import mongoose from 'mongoose'

export default class DBConnection {
  static connect () {
    console.log('DB trying to connect on ' + new Date())

    const options = {
      keepAlive: 1,
      autoReconnect: true,
      poolSize: 10,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
    return mongoose.connect(process.env.DB, options)
  }
}
