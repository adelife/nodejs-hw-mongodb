import { Router } from 'express';
import { getAllContacts, getContactById, createContacts, updateContact, deleteContacts } from "../controlers/contacts.js";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { contactSchema, updatecontactSchema } from '../validations/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import {auth} from "../middlewares/auth.js";

const router = Router();

router.get('/contacts', auth, ctrlWrapper(getAllContacts));
router.get('/contacts/:contactId', auth, isValidId, ctrlWrapper(getContactById));
router.post('/contacts', auth, validateBody(contactSchema), ctrlWrapper(createContacts));
router.patch('/contacts/:contactId', auth, isValidId,  validateBody(updatecontactSchema), ctrlWrapper(updateContact));
router.delete('/contacts/:contactId', auth, isValidId, ctrlWrapper(deleteContacts));


export default router;
