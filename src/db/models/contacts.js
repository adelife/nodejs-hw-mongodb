import mongoose, { model , Schema } from "mongoose";

const contactsSchema = new Schema({
    name: {
        type: String,
        required: true,
      },
    phoneNumber: {
        type: String,
        required: true,
    },
    email:{
        type: String,
    },
    isFavourite: {
        type: Boolean,
        default: false,
    },
    contactType:{
        type: String,
        enum: ['work', 'home', 'personal'],
        required: true,
        default: 'personal',
        },
    parentId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    },
    {
        timestamps: true,
        versionKey: false,
        },
);

const ContactsColection = model('contacts', contactsSchema);

export {ContactsColection};