import Page from "../../components/Page/Page";
import StatisticCard from "../../components/StatisticCard/StatisticCard";
import usePageTitle from "../../hooks/usePageTitle";
import Sidebar from "../../layout/Sidebar/Sidebar";

const DashboardPage = () => {
    usePageTitle("Dashboard / Booth");

    return (
        <>
            <Sidebar />
            <Page
                title="Dashboard"
                description="Welcome to the home of booth"
                hasSidebar
            >
                {/* Hero Analytics */}
                <div className="flex w-full gap-8">
                    <StatisticCard
                        label="Active Tickets"
                        value={14}
                        className="w-full"
                    />
                    <StatisticCard
                        label="My Tickets"
                        value={5}
                        className="w-full"
                    />
                    <StatisticCard
                        label="Unassigned Tickets"
                        value={3}
                        className="w-full"
                    />
                    <StatisticCard
                        label="Resolved Tickets"
                        value={23}
                        className="w-full"
                    />
                </div>
            </Page>
        </>
    );
};

export default DashboardPage;
