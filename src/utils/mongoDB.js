import mongoose from "mongoose"

export default async function connect(){
    try{
         mongoose.connect(process.env.MONGO_URL)
         const connection = mongoose.connection;

         connection.on('connected', ()=> console.log('mongoose connedted successfully'))
         connection.on('error', (error)=> console.log('mongoDB connection error'))

    }catch(error){
        console.log(error);
    }
}