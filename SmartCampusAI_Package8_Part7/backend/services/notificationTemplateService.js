const repository =
    require("../models/NotificationTemplateRepository");

function interpolate(template, variables = {}) {
    return template.replace(
        /{{\s*([a-zA-Z0-9_]+)\s*}}/g,
        (_, key) => {
            return variables[key] === undefined
                ? ""
                : String(variables[key]);
        }
    );
}

async function build(templateKey, variables = {}) {
    const template =
        await repository.findByKey(templateKey);

    if (!template) {
        throw new Error(
            `Notification template not found: ${templateKey}`
        );
    }

    return {
        title: interpolate(
            template.title_template,
            variables
        ),
        message: interpolate(
            template.message_template,
            variables
        ),
        notificationType:
            template.notification_type,
        priority:
            template.priority
    };
}

async function list() {
    return repository.list();
}

async function create(data) {
    if (!data.templateKey ||
        !data.titleTemplate ||
        !data.messageTemplate) {
        throw new Error(
            "templateKey, titleTemplate and messageTemplate are required"
        );
    }

    return repository.create(data);
}

module.exports = {
    build,
    list,
    create
};
