const contactType = ['work', 'home', 'personal'];

const sortOrderList = ['asc', 'desc'];

const contactFieldList = [
    "name",
    "phoneNumber",
    "email",
    "isFavourite",
    "contactType",
];

export const ACCESS_TOKEN_TTL = 15*60*1000; // 15 min

export const REFRESH_TOKEN_TTL = 24*30*60*60*1000; 


export {contactType, sortOrderList, contactFieldList };