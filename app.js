require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");


const connectDB = require('./db/connect');
const authRouter = require('./routes/authRoute');
const profileRouter = require('./routes/profileRoute');
const actRouter = require('./routes/actRoute');
const userSubmittedActRouter = require('./routes/userActRoute');

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/act', actRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/userAct', userSubmittedActRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);



const port = process.env.PORT || 8000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();