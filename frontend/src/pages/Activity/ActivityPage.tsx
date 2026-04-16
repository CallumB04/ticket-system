import Page from "../../components/Page/Page";
import usePageTitle from "../../hooks/usePageTitle";
import Sidebar from "../../layout/Sidebar/Sidebar";

const ActivityPage = () => {
    usePageTitle("activity / booth");

    return (
        <>
            <Sidebar />
            <Page
                title="Activity"
                description="An overview of everything happening across your organisation"
                hasSidebar
            ></Page>
        </>
    );
};

export default ActivityPage;
