import { BotIcon, CheckIcon, InboxIcon } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface HomePageDemoMockupProps {
    className?: string;
}

type DemoView = "request" | "inbox";

interface ChatMessage {
    role: "user" | "booth";
    text: string;
}

const conversation: ChatMessage[] = [
    {
        role: "user",
        text: "one of our clients just told me the new dashboard is broken on mobile, and the report export is really slow with bigger datasets. can we fix both?",
    },
    {
        role: "booth",
        text: "got it, two separate issues. for the mobile dashboard, are they seeing layout breaks, things missing, or errors?",
    },
    {
        role: "user",
        text: "layout. buttons overlap and charts get cut off",
    },
    {
        role: "booth",
        text: "noted. and for export, slow at all sizes or only on larger ones?",
    },
    {
        role: "user",
        text: "only bigger ones. sometimes takes minutes",
    },
    {
        role: "booth",
        text: "perfect. drafting two tickets now. anything else from this?",
    },
    {
        role: "user",
        text: "yeah, a few people asked if they can favourite reports",
    },
];

interface DemoTicket {
    id: string;
    title: string;
    type: "bug" | "feature";
    priority: "high" | "mid" | "low";
    assignee: string;
    needsReview?: boolean;
}

const tickets: DemoTicket[] = [
    {
        id: "2041",
        title: "fix dashboard responsiveness on mobile (button overlap, chart clipping)",
        type: "bug",
        priority: "mid",
        assignee: "@callum",
    },
    {
        id: "2042",
        title: "investigate export performance for large datasets",
        type: "bug",
        priority: "mid",
        assignee: "@kacper",
    },
    {
        id: "2043",
        title: "add favourite reports feature",
        type: "feature",
        priority: "low",
        assignee: "unassigned",
        needsReview: true,
    },
];

const HomePageDemoMockup = ({ className }: HomePageDemoMockupProps) => {
    const [view, setView] = useState<DemoView>("request");

    return (
        <div className={twMerge("px-4 py-16", className)}>
            <div className="border-layout-border bg-surface mx-auto w-full max-w-5xl overflow-hidden rounded-md border shadow-sm">
                {/* Window title bar */}
                <div className="border-b-layout-border bg-surface-muted flex items-center gap-3 border-b px-4 py-3">
                    <span className="bg-text-disabled size-2.5 rounded-full" />
                    <span className="bg-text-disabled size-2.5 rounded-full" />
                    <span className="bg-text-disabled size-2.5 rounded-full" />
                    <span className="text-text-tertiary ml-2 truncate font-mono text-xs">
                        booth/{view}
                    </span>
                </div>
                {/* Body: minimal sidebar + main; sidebar collapses to top tabs on mobile */}
                <div className="flex min-h-120 flex-col sm:flex-row">
                    <aside className="border-b-layout-border bg-surface-muted sm:border-r-layout-border flex shrink-0 flex-row gap-1 border-b p-2 sm:w-52 sm:flex-col sm:border-r sm:border-b-0 sm:p-4">
                        <button
                            type="button"
                            onClick={() => setView("request")}
                            className={twMerge(
                                "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded px-2 py-1.5 text-left text-sm transition-colors sm:flex-none sm:justify-start",
                                view === "request"
                                    ? "bg-highlight/10 text-highlight"
                                    : "text-text-secondary hover:text-text-primary"
                            )}
                        >
                            <BotIcon
                                size={14}
                                className={
                                    view === "request" ? "text-highlight" : ""
                                }
                            />
                            new request
                        </button>
                        <button
                            type="button"
                            onClick={() => setView("inbox")}
                            className={twMerge(
                                "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded px-2 py-1.5 text-left text-sm transition-colors sm:flex-none sm:justify-between",
                                view === "inbox"
                                    ? "bg-highlight/10 text-highlight"
                                    : "text-text-secondary hover:text-text-primary"
                            )}
                        >
                            <span className="flex items-center gap-2">
                                <InboxIcon
                                    size={14}
                                    className={
                                        view === "inbox" ? "text-highlight" : ""
                                    }
                                />
                                inbox
                            </span>
                            <span className="bg-highlight text-btn-primary-text rounded px-1.5 font-mono text-[10px]">
                                3
                            </span>
                        </button>
                    </aside>
                    {view === "request" ? (
                        <div className="flex flex-1 flex-col p-3 sm:p-5">
                            <div className="border-b-layout-border mb-4 flex items-center justify-between border-b pb-3">
                                <h4 className="text-text-primary text-sm font-medium">
                                    new request
                                </h4>
                            </div>
                            <div className="flex flex-1 flex-col gap-3">
                                {conversation.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={twMerge(
                                            "flex max-w-[90%] gap-2 sm:max-w-[85%]",
                                            msg.role === "user"
                                                ? "ml-auto flex-row-reverse"
                                                : "mr-auto"
                                        )}
                                    >
                                        <div
                                            className={twMerge(
                                                "rounded-md px-3 py-2 text-sm",
                                                msg.role === "user"
                                                    ? "bg-highlight/10 text-text-primary"
                                                    : "bg-surface-muted text-text-primary"
                                            )}
                                        >
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                {/* AI completion banner */}
                                <button
                                    type="button"
                                    onClick={() => setView("inbox")}
                                    className="border-highlight bg-highlight/5 hover:bg-highlight/10 mt-2 flex cursor-pointer flex-wrap items-center gap-x-2 gap-y-1 self-start rounded-md border px-3 py-2 transition-colors"
                                >
                                    <CheckIcon
                                        size={14}
                                        className="text-highlight shrink-0"
                                    />
                                    <span className="text-highlight text-sm">
                                        created 3 tickets in the smart inbox
                                    </span>
                                    <span className="text-text-tertiary font-mono text-[11px] tracking-wider uppercase sm:ml-2">
                                        view →
                                    </span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 p-3 sm:p-5">
                            <div className="border-b-layout-border mb-4 flex items-center justify-between border-b pb-3">
                                <h4 className="text-text-primary text-sm font-medium">
                                    inbox
                                </h4>
                                <span className="text-text-tertiary font-mono text-[11px] tracking-wider uppercase">
                                    3 new
                                </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                {tickets.map((ticket) => (
                                    <div
                                        key={ticket.id}
                                        className="border-layout-border hover:border-surface-border-hover flex flex-col gap-2 rounded border px-3 py-2.5 transition-colors"
                                    >
                                        <div className="flex items-start gap-2">
                                            <span className="text-text-tertiary mt-0.5 shrink-0 font-mono text-xs">
                                                {ticket.id}
                                            </span>
                                            <span className="text-text-primary min-w-0 flex-1 text-sm wrap-break-word">
                                                {ticket.title}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span
                                                className={twMerge(
                                                    "rounded px-2 py-0.5 font-mono text-[10px] uppercase",
                                                    ticket.type === "bug"
                                                        ? "bg-danger/15 text-danger"
                                                        : "bg-highlight/15 text-highlight"
                                                )}
                                            >
                                                {ticket.type}
                                            </span>
                                            <span
                                                className={twMerge(
                                                    "rounded px-2 py-0.5 font-mono text-[10px] uppercase",
                                                    ticket.priority ===
                                                        "high" &&
                                                        "bg-ticket-priority-high/20 text-ticket-priority-high",
                                                    ticket.priority === "mid" &&
                                                        "bg-ticket-priority-medium/20 text-ticket-priority-medium",
                                                    ticket.priority === "low" &&
                                                        "bg-ticket-priority-low/20 text-ticket-priority-low"
                                                )}
                                            >
                                                {ticket.priority}
                                            </span>
                                            <span className="text-text-tertiary font-mono text-[11px]">
                                                {ticket.assignee}
                                            </span>
                                            {ticket.needsReview && (
                                                <span className="border-highlight text-highlight ml-auto rounded border px-2 py-0.5 font-mono text-[10px] uppercase">
                                                    needs review
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePageDemoMockup;
