const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config({ path: "../../config.env" });
// // MONGOOSE
const mongoose = require("mongoose");

const productModel = require("./Model/productModel");

const Men = JSON.parse(fs.readFileSync(`./utils/data/men.json`, "utf-8"));
const Women = JSON.parse(fs.readFileSync(`./utils/data/women.json`, "utf-8"));
// AS not in callback so I am using synchronous function

// JSON.parse convert into obj form
// const Reviews = JSON.parse(
//   fs.readFileSync(`${__dirname}/reviews.json`, "utf-8")
// );

// console.log(process.env.DATABASE);

// const DB = process.env.DATABASE;
const DB =
  "mongodb+srv://muhammadammarmubashir:8gZ61keZXKHEDKQw@cluster0.wlzikoh.mongodb.net/test?retryWrites=true&w=majority";
////// Connection to Database
mongoose.connect(DB).then((con) => {
  // console.log(con.connections);
  console.log("Connected to Database Successfully!");
});

const importData = async () => {
  try {
    await productModel.create(Men);

    console.log("Data Successfully Loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    const products = await productModel.deleteMany();

    console.log("Data Successfully Deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Command
/// node import-dev-data --import/--delete
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

// console.log(process.argv);
