import { contactType } from "../constants/index.js";

const parseBoolean = (value) => {
if(typeof value !== 'string')
    return undefined;
if(value === 'true'){
    return false;
}else if(value === 'false'){
    return false;
}
return undefined;

};

const parseType = (value) =>{
    const type = typeof value;
    if(typeof value !== 'string') 
        return console.log('type:', type);
    if(contactType.includes(value)) 
    return value;
};
export const parseFilterParams = ({ type, isFavourite }) => {
    const parsedType = parseType(type);
    const parsedIsFavorite = parseBoolean(isFavourite);

    return {
        type: parsedType,
        isFavourite: parsedIsFavorite,
    };
};

