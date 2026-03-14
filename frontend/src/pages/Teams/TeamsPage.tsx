import Page from "../../components/Page/Page";
import usePageTitle from "../../hooks/usePageTitle";
import Sidebar from "../../layout/Sidebar/Sidebar";

const TeamsPage = () => {
    usePageTitle("Teams / Ticket System");

    return (
        <>
            <Sidebar />
            <Page
                title="Teams"
                description="View and manage the teams within your organisations"
                hasSidebar
            ></Page>
        </>
    );
};

export default TeamsPage;
