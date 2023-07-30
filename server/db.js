const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const mongoDB = async () =>{
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, async (err, result)=>{
        if (err) console.log("Error");
        else{
            console.log("Connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function(err,data){
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function (err, catData){
                    if (err) console.log(err);
                    else{
                        global.food_items = data;
                        global.foodCategory = catData;
                    }
                })
            })
        }
    })
}

module.exports = mongoDB;