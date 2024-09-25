import { Router } from 'express';
import { getAllContacts, getContactById, createContacts, updateContact, deleteContacts } from "../controlers/contacts.js";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { contactSchema, updatecontactSchema } from '../validations/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import {authenticate} from "../middlewares/authenticate.js";

const router = Router();

router.get('/contacts', authenticate, ctrlWrapper(getAllContacts));
router.get('/contacts/:contactId', authenticate, isValidId, ctrlWrapper(getContactById));
router.post('/contacts', authenticate, validateBody(contactSchema), ctrlWrapper(createContacts));
router.patch('/contacts/:contactId', authenticate, isValidId,  validateBody(updatecontactSchema), ctrlWrapper(updateContact));
router.delete('/contacts/:contactId', authenticate, isValidId, ctrlWrapper(deleteContacts));


export default router;
