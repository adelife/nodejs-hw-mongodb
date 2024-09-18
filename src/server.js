import express from 'express';
import cors from 'cors';
// import pino from 'pino-http';
import contactsRouter from './routers/contacts.js';
import authRouters from "./routers/auth.js";
import { env } from './utils/env.js';


import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
// import { getAllContacts, getContactById } from './services/contacts.js';


const PORT = Number(env("PORT", '3000' ));


export const setupServer = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());
    // app.use(
    //     pino({
    //       transport: {
    //         target: 'pino-pretty',
    //       },
    //     }),
    //   );


    // app.get('/contacts', getAllContacts);
    // app.get('/contacts/:contactId', getContactById);

    app.use(authRouters);

    app.use(contactsRouter);

    app.use('*', notFoundHandler);

    app.use(errorHandler);

//     app.use((req, res, next) => {
//         res.status(404).json({
//             message: 'Not found',
//         });
//         next();
//     });
//     app.use((error , req, res, next) => {
// console.error(error);
//         res.status(500).json({
//             message: "Sever error!",
//         });
//         next();
//     });

    


    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });


};