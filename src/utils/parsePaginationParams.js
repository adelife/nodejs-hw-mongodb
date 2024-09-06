function parseNumber(maybeNumber, defaultValue) {
    if (typeof maybeNumber !== 'string') {
      return defaultValue;
    }
  
    const parsedNumber = parseInt(maybeNumber);
  
    if (Number.isNaN(parsedNumber)) {
      return defaultValue;
    }
  
    return parsedNumber;
  }
  
 export const parsePaginationParams =  ({ page, perPage}) => {
    
  
    const parsedPage = parseNumber(page, 1);
    const parsedPerPage = parseNumber(perPage, 10);
  
    return {
      page: parsedPage,
      perPage: parsedPerPage,
    };
  };
  
 
  
  