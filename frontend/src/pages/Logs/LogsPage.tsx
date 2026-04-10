import Page from "../../components/Page/Page";
import usePageTitle from "../../hooks/usePageTitle";
import Sidebar from "../../layout/Sidebar/Sidebar";

const LogsPage = () => {
    usePageTitle("Logs / Booth");

    return (
        <>
            <Sidebar />
            <Page
                title="Logs"
                description="View logs of AI usage within your organisation"
                hasSidebar
            ></Page>
        </>
    );
};

export default LogsPage;
