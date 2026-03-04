import Page from "../../components/Page/Page";
import Sidebar from "../../layout/Sidebar/Sidebar";

const DashboardPage = () => {
    return (
        <>
            <Sidebar />
            <Page
                title="Dashboard"
                description="Welcome to the home of Ticket System"
                hasSidebar
            ></Page>
        </>
    );
};

export default DashboardPage;
