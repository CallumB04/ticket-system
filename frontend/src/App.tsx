import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home/HomePage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import Navbar from "./layout/Navbar/Navbar";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import TeamsPage from "./pages/Teams/TeamsPage";
import PopupRenderer from "./layout/PopupRenderer/PopupRenderer";
import { RequireUser } from "./contexts/UserContext";
import TicketsPage from "./pages/Tickets/TicketsPage";
import InboxPage from "./pages/Inbox/InboxPage";
import ActivityPage from "./pages/Activity/ActivityPage";
import RequestPage from "./pages/Request/RequestPage";
import KnowledgeBasePage from "./pages/KnowledgeBase/KnowledgeBasePage";
import MyTasksPage from "./pages/MyTasks/MyTasksPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import TestPage from "./pages/Test/TestPage";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            {/* Renders popup at top position of stack (if not empty) */}
            <PopupRenderer />
            <Routes>
                {/* Landing Page */}
                <Route path="/" element={<HomePage />} />
                {/* TESTING PAGE - TODO: REMOVE WHEN DONE */}
                <Route path="/test" element={<TestPage />} />
                {/* Application Pages - Protected Routes, must been logged in */}
                <Route element={<RequireUser />}>
                    {/* Workspace */}
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/inbox" element={<InboxPage />} />
                    <Route path="/my-tasks" element={<MyTasksPage />} />
                    <Route path="/tickets" element={<TicketsPage />} />
                    {/* Create */}
                    <Route path="/request" element={<RequestPage />} />
                    <Route
                        path="/knowledge-base"
                        element={<KnowledgeBasePage />}
                    />
                    {/* Organisation */}
                    <Route path="/teams" element={<TeamsPage />} />
                    <Route path="/activity" element={<ActivityPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Route>
                {/* Not found page - all un-routed paths */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
