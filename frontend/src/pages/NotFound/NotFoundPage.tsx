import Page from "../../components/Page/Page";
import usePageTitle from "../../hooks/usePageTitle";

const NotFoundPage = () => {
    usePageTitle("Page not found / Ticket System");

    return <Page title="404" description="Page not found" hasSidebar></Page>;
};

export default NotFoundPage;
