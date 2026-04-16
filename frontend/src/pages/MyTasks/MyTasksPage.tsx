import Page from "../../components/Page/Page";
import usePageTitle from "../../hooks/usePageTitle";
import Sidebar from "../../layout/Sidebar/Sidebar";

const MyTasksPage = () => {
    usePageTitle("my tasks / booth");

    return (
        <>
            <Sidebar />
            <Page
                title="My Tasks"
                description="Everything assigned to you, across every team"
                hasSidebar
            ></Page>
        </>
    );
};

export default MyTasksPage;
