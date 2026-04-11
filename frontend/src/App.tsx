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
import InsightsPage from "./pages/Insights/InsightsPage";
import ActivityPage from "./pages/Activity/ActivityPage";
import RequestPage from "./pages/Request/RequestPage";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            {/* Renders popup at top position of stack (if not empty) */}
            <PopupRenderer />
            <Routes>
                {/* Landing Page */}
                <Route path="/" element={<HomePage />} />
                {/* Application Pages - Protected Routes, must been logged in */}
                <Route element={<RequireUser />}>
                    {/* Personal */}
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/tickets" element={<TicketsPage />} />
                    <Route path="/inbox" element={<InboxPage />} />
                    {/* AI */}
                    <Route path="/request" element={<RequestPage />} />
                    <Route path="/insights" element={<InsightsPage />} />
                    {/* Organisation */}
                    <Route path="/teams" element={<TeamsPage />} />
                    <Route path="/activity" element={<ActivityPage />} />
                </Route>
                {/* Not found page - all un-routed paths */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
