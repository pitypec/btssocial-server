import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const Port = process.env.PORT || 3000;

const startServer = (app) => {
  const CONNECTION_URL = process.env.CONNECTION_URL;

  mongoose
    .connect(CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() =>
      app.listen(Port, () => console.log(`server running on port: ${Port}`))
    )
    .catch((err) => console.log(err.message));

  mongoose.set('useFindAndModify', false);
};

export default startServer;
