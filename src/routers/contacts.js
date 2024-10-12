import { Router } from 'express';
import {
  getAllContacts,
  getContactById,
  createContacts,
  updateContact,
  deleteContacts,
  //   changeContactPhoto,
} from '../controlers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { contactSchema, updatecontactSchema } from '../validations/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();
router.use(authenticate);

router.get('/contacts', ctrlWrapper(getAllContacts));
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactById));
router.post(
  '/contacts',
  upload.single('photo'),
  validateBody(contactSchema),
  ctrlWrapper(createContacts),
);
router.patch(
  '/contacts/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(updatecontactSchema),
  ctrlWrapper(updateContact),
);
router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContacts));

//
// router.patch('/contacts/:contactId/avatar', ctrlWrapper(changeContactPhoto));

export default router;
