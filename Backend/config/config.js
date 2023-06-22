const mongoose  = require('mongoose');

const dbConnection = () => {
<<<<<<< HEAD
    mongoose.connect(process.env.DB_URL/*"mongodb+srv://jaymulani:Jay%40%232000@test.zxamcbr.mongodb.net/Card?retryWrites=true&w=majority"*/, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("Connected to DB"+process.env.DB_URL))
=======
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("Connected to DB"))
>>>>>>> development
        .catch((error) => console.log(error))
}

module.exports = { dbConnection };