// Models

export type TicketStatus =
    | "resolved"
    | "in-progress"
    | "unassigned"
    | "paused"
    | "cancelled";

export type TicketPriority = "low" | "medium" | "high";

export type Ticket = {
    id: string;
    status: TicketStatus;
    priority: TicketPriority;
    title: string;
    description: string;
    created_at: string; // ISO string
};
