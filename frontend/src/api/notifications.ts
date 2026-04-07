// Models

import { api } from ".";

export type NotificationType = "welcome" | "org-invite"; // TODO: add more types

export type Notification = {
    id: string;
    type: NotificationType;
    description: string;
    read: boolean;
    created_at: string; // ISO string
};

// API Calls

// Fetches all notifications belonging to the signed in user
export const fetchNotifications = async () => {
    const res = await api.get<Notification[]>("/v1/notifications");
    return res.data;
};

// Marks notification as read
export const markNotificationAsRead = async (id: string) => {
    const res = await api.patch<Notification>("/v1/notifications/" + id);
    return res.data;
};
