export const formatDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const date = `${dateTime.getFullYear()}.${addLeadingZero(dateTime.getMonth() + 1)}.${addLeadingZero(dateTime.getDate())}`;
    const time = `${addLeadingZero(dateTime.getHours())}:${addLeadingZero(dateTime.getMinutes())}`;
    return `${date} ${time}`;
};

export const addLeadingZero = (number) => {
    return number < 10 ? `0${number}` : number;
};