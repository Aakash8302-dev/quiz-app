const express = require("express");
const userRoutes = require("./routes/userRoutes.js")
const questionRoutes = require("./routes/questionRoutes.js")

const { errorHandler, notFound } = require("./middlewares/errorMiddleware.js")
const dotenv = require("dotenv");
const connectDB = require('./utils/db.js');

connectDB();
const app = express();
app.use(express.json());

dotenv.config();

app.get("/", (req, res) => {
    res.json("Server is running");
});


app.use("/api/user/", userRoutes);
app.use("/api/question/", questionRoutes);


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;


app.listen(PORT, console.log(`Server is up and running in ${process.env.MODE} mode on port ${process.env.PORT}`))