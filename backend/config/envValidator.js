function validateEnvironment() {

    const required = [

        "PORT",

        "DB_HOST",

        "DB_USER",

        "DB_PASSWORD",

        "DB_NAME",

        "JWT_SECRET"

    ];

    const missing = required.filter(

        key => !process.env[key]

    );

    if (missing.length) {

        console.error(

            "Missing environment variables:",

            missing.join(", ")

        );

        process.exit(1);

    }

}

module.exports = validateEnvironment;