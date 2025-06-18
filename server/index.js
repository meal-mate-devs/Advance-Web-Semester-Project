const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes.js');
const userRoutes = require('./routes/user.routes.js');
const recipeRoutes = require('./routes/recipie.routes.js');
const chefRoutes = require('./routes/chef.routes.js');
const courseRoutes = require('./routes/course.routes.js');
const { connectDB } = require('./connection/mongoDb.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
console.log(JWT_SECRET)
connectDB();
app.get("/", (req, res) => {
    res.status(200).json({ message: "server is running !" });
})
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use('/api/recipes', recipeRoutes);
app.use('/api/chefs', chefRoutes);
app.use('/api/courses', courseRoutes);


app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

