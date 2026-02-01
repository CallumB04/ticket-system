import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home/HomePage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import Navbar from "./layout/Navbar/Navbar";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import OrganisationsPage from "./pages/Organisations/OrganisationsPage";
import TeamsPage from "./pages/Teams/TeamsPage";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                {/* Landing Page */}
                <Route path="/" element={<HomePage />} />
                {/* Application Pages */}
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/organisations" element={<OrganisationsPage />} />
                <Route path="/teams" element={<TeamsPage />} />
                {/* Not found page - all un-routed paths */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
