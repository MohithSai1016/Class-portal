function info(message) {

    console.log(`[INFO] ${message}`);

}

function warning(message) {

    console.warn(`[WARNING] ${message}`);

}

function error(message) {

    console.error(`[ERROR] ${message}`);

}

module.exports = {

    info,

    warning,

    error

};