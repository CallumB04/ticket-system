import Page from "../../components/Page/Page";
import usePageTitle from "../../hooks/usePageTitle";
import Sidebar from "../../layout/Sidebar/Sidebar";

const TicketsPage = () => {
    usePageTitle("Tickets / Booth");

    return (
        <>
            <Sidebar />
            <Page
                title="My Tickets"
                description="View all of your active tickets"
                hasSidebar
            ></Page>
        </>
    );
};

export default TicketsPage;
