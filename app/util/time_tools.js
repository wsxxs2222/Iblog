function timeFormatter(date) {
    const year  = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth is zero-indexed
    const day   = String(date.getDate()).padStart(2, '0');

    const sqlDate = `${year}-${month}-${day}`;
    return sqlDate;
};

export {timeFormatter};