// import { ContactsColection } from "../db/models/contacts.js";


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
//         }
// };