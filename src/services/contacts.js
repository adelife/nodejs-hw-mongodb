import { ContactsColection } from "../db/models/contacts.js";


// export const getAllContacts = async() => {
//     const contacts = await ContactsColection.find();
//     return contacts;
// };

export const getAllContacts = async( req, res, next) => {
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
    try{
        const {contactId} = req.params;
        const contact = await ContactsColection.findById(contactId);
        if(!contactId){
            res.status(404).json({
                message : 'Contact not found',
            });
            return;
        }

    res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
    });
    }
    catch(error){
   next(error);
    }


};