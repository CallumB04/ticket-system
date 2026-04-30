import Button from "../../components/Button/Button";
import Page from "../../components/Page/Page";
import usePageTitle from "../../hooks/usePageTitle";
import LandingPageDivider from "./components/HomePageDivider";

const HomePage = () => {
    usePageTitle("booth / AI ticket system");

    return (
        <Page className="space-y-0">
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
            <section className="py-12">
                <p className="text-text-disabled text-center text-sm tracking-wide uppercase">
                    trusted by 1,234+ teams worldwide
                </p>
                <span className="mt-6 flex flex-wrap items-center justify-center gap-12">
                    <p className="text-text-secondary text-xl font-medium tracking-tight">
                        test company
                    </p>
                    <p className="text-text-secondary text-xl font-medium tracking-tight">
                        test company
                    </p>
                    <p className="text-text-secondary text-xl font-medium tracking-tight">
                        test company
                    </p>
                    <p className="text-text-secondary text-xl font-medium tracking-tight">
                        test company
                    </p>
                    <p className="text-text-secondary text-xl font-medium tracking-tight">
                        test company
                    </p>
                    <p className="text-text-secondary text-xl font-medium tracking-tight">
                        test company
                    </p>
                    <p className="text-text-secondary text-xl font-medium tracking-tight">
                        test company
                    </p>
                </span>
            </section>
            <LandingPageDivider variant="primary" />
        </Page>
    );
};

export default HomePage;
