import Page from "../../components/Page/Page";
import usePageTitle from "../../hooks/usePageTitle";
import Sidebar from "../../layout/Sidebar/Sidebar";

const AssistantPage = () => {
    usePageTitle("Assistant / Booth");

    return (
        <>
            <Sidebar />
            <Page
                title="Assistant"
                description="Chat to an AI assistant with knowledge about your organisation"
                hasSidebar
            ></Page>
        </>
    );
};

export default AssistantPage;
