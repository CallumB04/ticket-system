import Page from "../../components/Page/Page";
import usePageTitle from "../../hooks/usePageTitle";
import Sidebar from "../../layout/Sidebar/Sidebar";

const NotFoundPage = () => {
    usePageTitle("page not found / booth");

    return (
        <>
            <Sidebar />
            <Page title="404" description="Page not found" hasSidebar></Page>
        </>
    );
};

export default NotFoundPage;
