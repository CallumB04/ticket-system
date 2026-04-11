// Models

export type TicketStatus =
    | "resolved"
    | "in-progress"
    | "unassigned"
    | "paused"
    | "cancelled";

export type Ticket = {
    id: string;
    status: TicketStatus;
    title: string;
    description: string;
    created_at: string; // ISO string
};
