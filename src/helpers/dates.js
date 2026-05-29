export const getDateFromSeconds = (value) => {
    if (!value) {
        return new Date();
    }

    if (value.seconds !== undefined) {
        return new Date(value.seconds * 1000);
    }

    if (typeof value === 'number') {
        return new Date(value * 1000);
    }

    return new Date(value);
};

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

