import Page from "../../components/Page/Page";
import usePageTitle from "../../hooks/usePageTitle";
import Sidebar from "../../layout/Sidebar/Sidebar";

const TeamsPage = () => {
    usePageTitle("teams / booth");

    return (
        <>
            <Sidebar />
            <Page
                title="Teams"
                description="View and manage the teams in your organisation and the people in them"
                hasSidebar
            ></Page>
        </>
    );
};

export default TeamsPage;
