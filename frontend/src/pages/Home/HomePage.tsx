import { BrainCogIcon, WaypointsIcon, ZapIcon } from "lucide-react";
import Button from "../../components/Button/Button";
import Page from "../../components/Page/Page";
import usePageTitle from "../../hooks/usePageTitle";
import LandingPageDivider from "./components/HomePageDivider";
import HomePageStrip from "./components/HomePageStrip";

const HomePage = () => {
    usePageTitle("booth / AI ticket system");

    return (
        <Page className="max-w-7xl space-y-0">
            {/* landing page */}
            <section className="max-w-3xl space-y-6 pt-24 pb-36">
                <h1 className="text-text-primary text-7xl font-medium">
                    the AI-powered ticket system for cross-functional teams.
                </h1>
                <p className="text-text-secondary max-w-2xl text-lg">
                    helps turn non-technical requests into structured technical
                    solutions. booth uses AI-powered workflows to simplify your
                    organisation wide project management.
                </p>
                <span className="flex items-center gap-3 pt-2">
                    <Button variant="primary" className="h-14 px-7 text-sm">
                        Start for free
                    </Button>
                    <Button variant="secondary" className="h-14 px-7 text-sm">
                        See pricing
                    </Button>
                </span>
            </section>
            <LandingPageDivider variant="secondary" />
            <section className="py-16">
                <span className="flex flex-wrap items-center justify-between gap-8 px-4">
                    <HomePageStrip
                        icon={
                            <ZapIcon
                                size={24}
                                className="text-highlight mt-1 shrink-0"
                            />
                        }
                        title="Smart Inbox"
                        description="Every ticket categorised, prioritised, and assigned the moment it's created"
                    />
                    <HomePageStrip
                        icon={
                            <WaypointsIcon
                                size={24}
                                className="text-highlight mt-1 shrink-0"
                            />
                        }
                        title="Works with your stack"
                        description="Connects to Github, Notion, Granola, Slack and more. Your tools, all in one place"
                    />
                    <HomePageStrip
                        icon={
                            <BrainCogIcon
                                size={24}
                                className="text-highlight mt-1 shrink-0"
                            />
                        }
                        title="Grows with you"
                        description="Your AI is always learning when you use booth, becoming more personalised every day"
                    />
                </span>
            </section>
            <LandingPageDivider variant="primary" />
        </Page>
    );
};

export default HomePage;
