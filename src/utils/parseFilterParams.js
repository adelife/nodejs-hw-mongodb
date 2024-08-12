import { contactType } from "../constants";

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
const parseFilterParams = ({ type, isFavourite }) => {
    const parsedType = contactType.includes(type) ? type : null;
    const parsedIsFavorite = parseBoolean(isFavourite);

    return {
        type: parsedType,
        isFavourite: parsedIsFavorite,
    };
};

export default parseFilterParams;