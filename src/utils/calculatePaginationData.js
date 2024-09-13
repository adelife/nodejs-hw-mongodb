export const calculatePaginationData = ({total , perPage, page}) => {
    const totalPages =  Math.ceil(total / perPage);
    // const hasNextPage = Boolean((totalPages - page) > 0);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page !== 1;

    return{
        page,
        perPage,
        total,
        totalPages,
        hasNextPage,
        hasPreviousPage,
    };

};