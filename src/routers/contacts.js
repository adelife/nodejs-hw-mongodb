import { Router } from 'express';
import { getAllContacts, getContactById, createContacts, updateContact, deleteContacts } from "../controlers/contacts.js";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { contactSchema } from '../validations/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContacts));
router.get('/contacts/:contactId',isValidId, ctrlWrapper(getContactById));
router.post('/contacts',validateBody(contactSchema), ctrlWrapper(createContacts));
router.patch('/contacts/:contactId', isValidId, validateBody(contactSchema), ctrlWrapper(updateContact));
router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContacts));


export default router;
