function formatTime(start, end) {

    return `${start.substring(0,5)} - ${end.substring(0,5)}`;

}

function compareTime(a, b){

    return a.localeCompare(b);

}

module.exports = {

    formatTime,

    compareTime

};