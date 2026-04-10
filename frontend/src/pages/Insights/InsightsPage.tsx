import Page from "../../components/Page/Page";
import usePageTitle from "../../hooks/usePageTitle";
import Sidebar from "../../layout/Sidebar/Sidebar";

const InsightsPage = () => {
    usePageTitle("Insights / Booth");

    return (
        <>
            <Sidebar />
            <Page
                title="Insights"
                description="View AI insights of teams and tickets within your organisation"
                hasSidebar
            ></Page>
        </>
    );
};

export default InsightsPage;
