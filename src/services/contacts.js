import { ContactsColection } from "../db/models/contacts.js";
import {getAllContacts, getContactById, createContacts, deleteContacts, updateContact} from '../controlers/contacts.js';

function getAllContacts(contact){
    return ContactsColection.find();
}

function getContactById(contactId) {
  return ContactsColection.findById(contactId);
}

function createContacts(contact) {
  return ContactsColection.create(contact);
}

function updateContact(contactId, contact) {
  return Student.findByIdAndUpdate(contactId, contact, { new: true });
}

function deleteContacts(studentId) {
  return ContactsColection.findByIdAndDelete(contactId);
}





export {
  getAllContacts,
  getContactById,
  createContacts,
  updateContact,
  deleteContacts,
};










// // export const getAllContacts = async() => {
// //     const contacts = await ContactsColection.find();
// //     return contacts;
// // };

// export const getAllContacts = async( req, res, next) => {
//         try{
//             const contacts = await ContactsColection.find();
//             res.status(200).json({
//                 status: 200,
//                 message : "Successfully found contacts!",
//                 data : contacts,
//             });
//         }catch(error){
//             console.log(error);
//             res.status(500).json({
//                 status: 500,
//                 message: '',
//             });
//             next(error);
//         }
        
// };

// export const getContactById = async( req, res, next) =>{
//     try{
//         const {contactId} = req.params;
//         const contact = await ContactsColection.findById(contactId);
//         if(!contactId){
//             res.status(404).json({
//                 message : 'Contact not found',
//             });
//             return;
//         }

//     res.status(200).json({
//             status: 200,
//             message: `Successfully found contact with id ${contactId}!`,
//             data: contact,
//     });
//     }
//     catch(error){
//    next(error);
//     }


// };