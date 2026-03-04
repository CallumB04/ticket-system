import Page from "../../components/Page/Page";
import Sidebar from "../../layout/Sidebar/Sidebar";

const OrganisationsPage = () => {
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
