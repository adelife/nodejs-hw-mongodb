import {contactFieldList, sortOrderList } from "../index.js";

const parseSortParams = ({sortOrder, sortBy}, contactFieldList)=>{
const psrsedSortOrder = sortOrderList.includes(sortOrder) ? sortOrder : sortOrderList[0];
const parsedSortBy = contactFieldList.includes(sortBy) ? sortBy : '_id';

return{
    sortBy: parsedSortBy,
    sortOrder: psrsedSortOrder,
};
};

export default parseSortParams;