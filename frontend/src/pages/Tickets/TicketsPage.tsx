import { PlusIcon } from "lucide-react";
import Button from "../../components/Button/Button";
import Dropdown from "../../components/Dropdown/Dropdown";
import Page from "../../components/Page/Page";
import SearchBar from "../../components/SearchBar/SearchBar";
import usePageTitle from "../../hooks/usePageTitle";
import Sidebar from "../../layout/Sidebar/Sidebar";

const TicketsPage = () => {
    usePageTitle("Tickets / Booth");

    return (
        <>
            <Sidebar />
            <Page
                title="My Tickets"
                description="View all of your active and past tickets"
                hasSidebar
            >
                {/* Search bar and key buttons */}
                <div className="flex w-full justify-between gap-8">
                    <SearchBar
                        placeholder="Search for ticket..."
                        className="w-96"
                    />
                    <span className="flex gap-4">
                        <Dropdown
                            options={[
                                { value: "all", label: "All Statuses" },
                                { value: "in-progress", label: "In Progress" },
                                { value: "resolved", label: "Resolved" },
                                { value: "paused", label: "Paused" },
                                { value: "cancelled", label: "Cancelled" },
                            ]}
                            placeholder="Select status..."
                            defaultValue=""
                        />
                        <Dropdown
                            options={[
                                { value: "all", label: "All Priorities" },
                                { value: "low", label: "Low" },
                                { value: "medium", label: "Medium" },
                                { value: "high", label: "High" },
                            ]}
                            placeholder="Select priority..."
                            defaultValue=""
                        />
                        <Button variant="primary">
                            <PlusIcon size={20} />
                            New Ticket
                        </Button>
                    </span>
                </div>
            </Page>
        </>
    );
};

export default TicketsPage;
