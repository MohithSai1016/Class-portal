CREATE INDEX IF NOT EXISTS idx_notifications_type
ON notifications(notification_type);

CREATE INDEX IF NOT EXISTS idx_notifications_created
ON notifications(created_at);

CREATE INDEX IF NOT EXISTS idx_delivery_status
ON notification_delivery_log(status);
