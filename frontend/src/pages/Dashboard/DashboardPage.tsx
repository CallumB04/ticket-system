import Page from "../../components/Page/Page";
import usePageTitle from "../../hooks/usePageTitle";
import Sidebar from "../../layout/Sidebar/Sidebar";

const DashboardPage = () => {
    usePageTitle("dashboard / booth");

    return (
        <>
            <Sidebar />
            <Page
                title="Dashboard"
                description="An overview of your work and your organisation"
                hasSidebar
            ></Page>
        </>
    );
};

export default DashboardPage;
