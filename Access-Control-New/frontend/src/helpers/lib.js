function ValidateString(str) {
    if (typeof str !== 'string') return;
    return str;
  }
  
  export const CONVERT_DATE = (str) => {
      const string = ValidateString(str);
      const EMPTY_STRING = " ";
      const arrayDate = string.split(EMPTY_STRING);
      //convert date string format MM/dd/yyyy ---> dd/MM/yyyy
      const date = new Date(arrayDate[0]).toLocaleDateString("en-gb");
      return `${date}${EMPTY_STRING}${arrayDate[1]}`;
  }
  
  export const DATE_TIMEZONE = (str) => {
      const string = ValidateString(str);
      //convert date string format dd/MM/yyyy
      return new Date(string).toLocaleDateString("en-gb");
  }