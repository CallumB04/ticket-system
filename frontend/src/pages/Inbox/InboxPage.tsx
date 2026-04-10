import Page from "../../components/Page/Page";
import usePageTitle from "../../hooks/usePageTitle";
import Sidebar from "../../layout/Sidebar/Sidebar";

const InboxPage = () => {
    usePageTitle("Inbox / Booth");

    return (
        <>
            <Sidebar />
            <Page
                title="Inbox"
                description="View all of the active tickets in your organisation"
                hasSidebar
            ></Page>
        </>
    );
};

export default InboxPage;
