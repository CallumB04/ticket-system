import Page from "../../components/Page/Page";
import usePageTitle from "../../hooks/usePageTitle";
import Sidebar from "../../layout/Sidebar/Sidebar";

const ActivityPage = () => {
    usePageTitle("Activity / Booth");

    return (
        <>
            <Sidebar />
            <Page
                title="Activity"
                description="View activity of members and teams within your organisation"
                hasSidebar
            ></Page>
        </>
    );
};

export default ActivityPage;
