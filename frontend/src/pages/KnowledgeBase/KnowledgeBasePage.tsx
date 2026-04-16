import Page from "../../components/Page/Page";
import usePageTitle from "../../hooks/usePageTitle";
import Sidebar from "../../layout/Sidebar/Sidebar";

const KnowledgeBasePage = () => {
    usePageTitle("knowledge base / booth");

    return (
        <>
            <Sidebar />
            <Page
                title="Knowledge Base"
                description="What booth knows about your organisation. Review it, correct it, add to it"
                hasSidebar
            ></Page>
        </>
    );
};

export default KnowledgeBasePage;
