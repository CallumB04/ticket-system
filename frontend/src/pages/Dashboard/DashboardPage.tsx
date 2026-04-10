import Page from "../../components/Page/Page";
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
            ></Page>
        </>
    );
};

export default DashboardPage;
