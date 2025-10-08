import { Schema, model } from "mongoose";

const messageSchema = new Schema(
    {
      name: {
        type: String,
        
        trim: true,
      },
     
      email: {
        type: String,
        required: [true, "email is required"],
       
      },
     
      description: {
        type: String,
        required: [true, "description is required"],
      },
   
    },
    { timestamps: true }
  );
  

 

  export const Message = model("Message", messageSchema);