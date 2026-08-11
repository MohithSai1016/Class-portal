INSERT INTO notification_templates
(
    template_key,
    title_template,
    message_template,
    notification_type,
    priority
)
VALUES
(
    'certificate_issued',
    'Certificate Issued',
    'Your certificate {{certificateTitle}} has been issued by {{organization}}.',
    'Academic',
    'Normal'
)
ON DUPLICATE KEY UPDATE
    title_template = VALUES(title_template),
    message_template = VALUES(message_template),
    notification_type = VALUES(notification_type),
    priority = VALUES(priority);
