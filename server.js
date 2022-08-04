const path = require('path');
const dotenv = require("dotenv");
const express = require("express");
const userRoutes = require("./routes/userRoutes.js")
const questionRoutes = require("./routes/questionRoutes.js")

const { errorHandler, notFound } = require("./middlewares/errorMiddleware.js")
const connectDB = require('./utils/db.js');


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/build')));


app.use("/api/user/", userRoutes);
app.use("/api/question/", questionRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;


app.listen(PORT, console.log(`Server is up and running in ${process.env.MODE} mode on port ${process.env.PORT}`))