// import { status } from "express/lib/response.js";
import { ContactsColection } from "../db/models/contacts.js";
import createHttpError from 'http-errors';
// import {getAllContacts, getContactById, createContacts} from '../services/contacts.js';

export const getAllContacts = async( _req, res, next) => {
        try{
            const contacts = await ContactsColection.find();
            res.status(200).json({
                status: 200,
                message : "Successfully found contacts!",
                data : contacts,
            });
        }catch(error){
            console.log(error);
            res.status(500).json({
                status: 500,
                message: '',
            });
            next(error);
        }
};


export const getContactById = async( req, res, next) =>{
    
        const {contactId} = req.params;
        const contact = await ContactsColection.findById(contactId);
        if(!contact){
            // res.status(404).json({
            //     status: 404,
            //     message : 'Contact not found',
            // });
            // throw createHttpError(404, 'Contact not found');
            return next(createHttpError(404,"Contact not found"));
        };

    res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
    });
};

export  const createContacts = async(req, res, next) => {
    try{
 const contact = {
    name : req.body.name,
    phoneNumber: req.body.phoneNumber,
    email:req.body.email,
    // isFavourite: Boolean,
    contactType: req.body.contactType,
 };
  const createdContact = await ContactsColection.create(contact);
    
res
  .status(201)
  .send({ 
    status: 201, 
    message: 'Successfully created a contact!', 
    data: createdContact });
  }
  catch(error){
    next(error);
  }
};

export const updateContact = async(req, res, next)=> {
    const {contactId} = req.params;
    const contact = {
        name : req.body.name,
        phoneNumber: req.body.phoneNumber,
        email:req.body.email,
        isFavourite: req.body.isFavourite,
        contactType: req.body.contactType,
    };
    const result = await ContactsColection.findByIdAndUpdate(contactId, contact,  { new:true } );
    if(!result){
        return next(createHttpError(404, 'Contsct not found'));
    };
    res.status(200).send({
        status: 200,
        message : "Successfully patched a contact!",
        data: result,
    });
};
  
export const deleteContacts= async(req, res, next) =>{
    try{
    const {contactId} = req.params;
    const result = await ContactsColection.findByIdAndDelete(contactId);
        if(!result){
            return next(createHttpError(404,"Contact not found"));
        }
        res.status(204).send({
            status: 204,
        });

    }catch(error){
        next(error);
    }
};
