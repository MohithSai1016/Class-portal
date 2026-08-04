function success(res, message, data = {}) {

    return res.status(200).json({

        success: true,

        message,

        data

    });

}

function created(res, message, data = {}) {

    return res.status(201).json({

        success: true,

        message,

        data

    });

}

function error(res, message, status = 500) {

    return res.status(status).json({

        success: false,

        message

    });

}

module.exports = {

    success,

    created,

    error

};