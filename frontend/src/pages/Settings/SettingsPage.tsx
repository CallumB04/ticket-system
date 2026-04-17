import Page from "../../components/Page/Page";
import usePageTitle from "../../hooks/usePageTitle";
import Sidebar from "../../layout/Sidebar/Sidebar";

const SettingsPage = () => {
    usePageTitle("settings / booth");

    return (
        <>
            <Sidebar />
            <Page
                title="Settings"
                description="View and manage settings for your organisation and teams"
                hasSidebar
            ></Page>
        </>
    );
};

export default SettingsPage;
