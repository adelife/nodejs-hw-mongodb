export const calculatePaginationData = (totalItems , perPage, page) => {
    const totalPages = (totalItems / perPage);
    const hasNextPage = Boolean(totalPages - page);
    const hasPreviousPage = page !== 1;

    return{
        totalPages,
        hasNextPage,
        hasPreviousPage,
    };

};