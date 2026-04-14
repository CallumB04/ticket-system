import { PlusIcon } from "lucide-react";
import Button from "../../components/Button/Button";
import Page from "../../components/Page/Page";
import SearchBar from "../../components/SearchBar/SearchBar";
import usePageTitle from "../../hooks/usePageTitle";
import Sidebar from "../../layout/Sidebar/Sidebar";
import Navigator from "../../components/Navigator/Navigator";
import { useState } from "react";

const TicketsPage = () => {
    usePageTitle("Tickets / Booth");

    const [statusView, setStatusView] = useState<string>("");
    const [priorityView, setPriorityView] = useState<string>("");

    return (
        <>
            <Sidebar />
            <Page
                title="My Tickets"
                description="View all of your active and past tickets"
                hasSidebar
            >
                {/* Search bar and key buttons */}
                <div className="flex w-full justify-between gap-4">
                    <SearchBar
                        placeholder="Search for ticket..."
                        containerClassName="w-full"
                        className="w-full"
                    />
                    <Button variant="primary" className="min-w-max">
                        <PlusIcon size={20} />
                        New Ticket
                    </Button>
                </div>
                {/* Navigators */}
                <div className="flex gap-4">
                    {/* Ticket Status Navigator */}
                    <Navigator
                        options={[
                            {
                                label: "All",
                                onClick: () => setStatusView(""),
                            },
                            {
                                label: "In Progress",
                                onClick: () => setStatusView("in-progress"),
                            },
                            {
                                label: "Paused",
                                onClick: () => setStatusView("paused"),
                            },
                            {
                                label: "Resolved",
                                onClick: () => setStatusView("resolved"),
                            },
                            {
                                label: "Cancelled",
                                onClick: () => setStatusView("cancelled"),
                            },
                        ]}
                        defaultOptionLabel="All"
                    />
                    {/* Ticket Priority Navigator */}
                    <Navigator
                        options={[
                            {
                                label: "All",
                                onClick: () => setPriorityView(""),
                            },
                            {
                                label: "Low",
                                onClick: () => setPriorityView("low"),
                            },
                            {
                                label: "Medium",
                                onClick: () => setPriorityView("medium"),
                            },
                            {
                                label: "High",
                                onClick: () => setPriorityView("high"),
                            },
                        ]}
                        defaultOptionLabel="All"
                    />
                </div>
            </Page>
        </>
    );
};

export default TicketsPage;
