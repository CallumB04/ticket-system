import Page from "../../components/Page/Page";
import usePageTitle from "../../hooks/usePageTitle";
import Sidebar from "../../layout/Sidebar/Sidebar";

const OrganisationsPage = () => {
    usePageTitle("Organisations / Ticket System");

    return (
        <>
            <Sidebar />
            <Page
                title="Organisations"
                description="View and manage your organisations"
                hasSidebar
            ></Page>
        </>
    );
};

export default OrganisationsPage;
