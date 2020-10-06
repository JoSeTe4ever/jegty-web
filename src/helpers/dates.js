export const getDateFromFirebaseString = (stringDate) => {
    return _getFormatedDate(new Date(stringDate));
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