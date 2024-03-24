require("dotenv").config();
const connectDB = require("./db/conn") // database connect
const Product = require("./models/product"); // Schema require

const ProductJson = require("./products.json") // json data connect


const start = async () => {
    try{
await connectDB(process.env.MONGO_URL)
await Product.deleteMany(); // delete all data
await Product.create(ProductJson)
console.log("Connection successful...")
    } catch(error){
console.log(error)
    }
}

start()
