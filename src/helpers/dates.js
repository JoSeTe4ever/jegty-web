export const getDateFromFirebaseString = (stringDate) => {
    const intDate = parseInt(stringDate)
    return _getFormatedDate(new Date(intDate));
}

const _getFormatedDate = (dateObject) => {
    var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return dateObject.toLocaleDateString("en-UK", options);
}