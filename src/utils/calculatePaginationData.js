export const calculatePaginationData = ( total, perPage, page) => {
    const totalPages = Math.ceil(total/ perPage);
    const hasNextPage = Boolean(totalPages - page);
    const hasPreviousPage = page !== 1;

    return{
        totalPages,
        hasNextPage,
        hasPreviousPage,
    };

};