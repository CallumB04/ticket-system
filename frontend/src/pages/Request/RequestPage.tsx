import Page from "../../components/Page/Page";
import usePageTitle from "../../hooks/usePageTitle";
import Sidebar from "../../layout/Sidebar/Sidebar";

const RequestPage = () => {
    usePageTitle("new request / booth");

    return (
        <>
            <Sidebar />
            <Page
                title="New Request"
                description="Make a request and booth will turn it into structured tickets for the right teams"
                hasSidebar
            ></Page>
        </>
    );
};

export default RequestPage;
