import Page from "../../components/Page/Page";
import Sidebar from "../../layout/Sidebar/Sidebar";

const TeamsPage = () => {
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
