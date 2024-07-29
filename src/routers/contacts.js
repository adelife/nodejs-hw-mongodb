import { Router } from 'express';
import { getAllContacts, getContactById, createContacts, deleteContacts } from "../controlers/contacts.js";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContacts));
router.get('/contacts/:contactId',ctrlWrapper(getContactById));
router.post('/contacts', ctrlWrapper(createContacts));
router.delete('/contacts/:contactId',ctrlWrapper(deleteContacts));


export default router;
