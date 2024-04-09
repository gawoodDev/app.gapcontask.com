
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => console.log('Connected!'))
   .catch(err => {
      console.log(err)
   });


async function main() {
   const Schema = mongoose.Schema;
   const ObjectId = Schema.ObjectId;


   const mySchema = new Schema({
      author: ObjectId,
      title: String,
      body: String,
      date: Date
   });

   const MyModel = mongoose.model('user', mySchema);



   let datas = await MyModel.find({});

   console.log("datas", datas)


}

main()


console.log("We stay optimistic ")

