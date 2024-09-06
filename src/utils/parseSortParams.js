import { sortOrderList} from "../constants/index.js";

export const parseSortParams = ({sortOrder, sortBy}, contactFieldList )=> {
    const psrsedSortOrder = sortOrderList.includes(sortOrder) ? sortOrder : sortOrderList[0];
    const parsedSortBy = contactFieldList.includes(sortBy) ? sortBy : contactFieldList[0];

return{
    sortBy: parsedSortBy,
    sortOrder: psrsedSortOrder,
};
};

