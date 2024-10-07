// import { status } from "express/lib/response.js";
import { ContactsColection } from "../db/models/contacts.js";
import createHttpError from 'http-errors';
// import {getAllContacts, getContactById, createContacts} from '../services/contacts.js';
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import {parseSortParams} from "../utils/parseSortParams.js";
import {parseFilterParams} from "../utils/parseFilterParams.js";
// import { contactSchema } from "../validations/contacts.js";
import { contactFieldList } from "../constants/index.js";
import {getContacts} from '../services/contacts.js';

export const getAllContacts = async( req, res, next) => {
    const { _id: userId } = req.user;

    const {page, perPage} = parsePaginationParams(req.query);
    const {sortBy, sortOrder} = parseSortParams(req.query, contactFieldList);
    const filter = { ...parseFilterParams(req.query),userId};

        try{
            const contacts = await getContacts({
                page,
                perPage,
                sortBy,
                sortOrder,
                filter,
                userId: req.user._id,
            });

            res.status(200).json({
                status: 200,
                message: "Successfully found contacts!",
                data: contacts,
                // {
                //     "data" : [contacts],
                //     "page": 2,
                //     "perPage": 4,
                //     "totalItems": 6,
                //     "totalPages": 2,
                //     "hasPreviousPage": true,
                //     "hasNextPage": false
                //         }
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
        const { _id: userId } = req.user;
        const {contactId} = req.params;
        const contact = await ContactsColection.findOne({_id:contactId, userId});
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
    const {_id: userId } = req.user;
    try{
//  const contact = {
//     name : req.body.name,
//     phoneNumber: req.body.phoneNumber,
//     email:req.body.email,
//     // isFavourite: Boolean,
//     contactType: req.body.contactType,
//     userId: req.user._id,
//  };
  const createdContact = await ContactsColection.create({...req.body, userId});
    
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
    const { _id: userId } = req.user;
    const {contactId} = req.params;
    // const contact = {
    //     name : req.body.name,
    //     phoneNumber: req.body.phoneNumber,
    //     email:req.body.email,
    //     isFavourite: req.body.isFavourite,
    //     contactType: req.body.contactType,
    // };
    const result = await ContactsColection.findOneAndUpdate( {_id:contactId, userId, ...req.body,  new:true} );
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
    const { _id: userId } = req.user;
    try{
    const {contactId} = req.params;
    const result = await ContactsColection.findOneAndDelete({_id:contactId, userId});
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
