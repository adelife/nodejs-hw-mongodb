import express from 'express';
import cors from 'cors';

import { env } from './utils/env.js';

import { getAllContacts, getContactById } from './services/contacts.js';


const PORT = Number(env("PORT", '3000' ));


export const setupServer = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());
    // // app.use(
    // //     pino({
    // //       transport: {
    // //         target: 'pino-pretty',
    // //       },
    // //     }),
    // //   );


    app.get('/contacts', getAllContacts);
    app.get('/contacts/:contactId', getContactById);

    app.use((req, res, next) => {
        res.status(404).json({
            message: 'Not found',
        });
        next();
    });
    app.use((error , req, res, next) => {
console.error(error);
        res.status(500).json({
            message: "Sever error!",
        });
        next();
    });

    


    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });


};