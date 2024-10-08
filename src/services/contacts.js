import { ContactsColection } from "../db/models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";


const getContacts = async ({page, perPage, sortBy = '_id', sortOrder, filter = {}}) => {
    const skip = (page-1) * perPage;
    const contactQuery =  ContactsColection.find();

    if (filter.userId){
      contactQuery.where("userId").equals(filter.userId);  //new
      };

    if(filter.type){
      contactQuery.where("contactType").equals(filter.type);
    };
    if(filter.isFavourite){
      contactQuery.where("isFavourite").equals(filter.isFavourite);
    };

    
    const totalItems = await ContactsColection.find().merge(contactQuery).countDocuments();
    const data = await contactQuery.skip(skip).limit(perPage).sort({[sortBy] : sortOrder}).exec();

    const {totalPages, hasNextPage, hasPreviousPage} = calculatePaginationData({ 
      total :  totalItems,
      page,
      perPage
    });

    return{
      data,
      totalItems,
      page,
      perPage,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    };
  };

// function getAllContacts(contact){
//     return ContactsColection.find();
// }

function getContactById(contactId) {
  return ContactsColection.findById(contactId);
}

function createContacts(contact) {
  return ContactsColection.create(contact);
}

export const updateContact = async (filter, data, options = {}) => {
  const result = await ContactsColection.findOneAndUpdate( filter, data, {
      includeResultMetadata: true,
      ...options,
  });

  if (!result || !result.value) return null;

  const isNew = data && data.lastErrorObject && data.lastErrorObject.upserted;

  return {
      data: result.value,
      isNew,
  };
};


// function updateContact(contactId, contact) {
//   return ContactsColection.findByIdAndUpdate(contactId, contact, { new: true });
// }

function deleteContacts(contactId) {
  return ContactsColection.findByIdAndDelete(contactId);
}





export {
  getContacts,
  getContactById,
  createContacts,
  // updateContact,
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