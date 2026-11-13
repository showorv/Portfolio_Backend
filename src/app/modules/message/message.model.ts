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
     
      subject: {
        type: String,
        trim: true,
      },

      description: {
        type: String,
        required: [true, "description is required"],
      },

      isRead: {
        type: Boolean,
        default: false,
      },
   
    },
    { timestamps: true }
  );
  

 

  export const Message = model("Message", messageSchema);