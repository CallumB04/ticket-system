import { twMerge } from "tailwind-merge";
import Button from "../../components/Button/Button";
import { useUser } from "../../hooks/useUser";
import LinkButton from "../../components/Button/LinkButton";
import { Link } from "react-router-dom";

interface NavbarProps {
    className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
    const { sessionLoading, user, signOut } = useUser();

    return (
        <nav
            className={twMerge(
                "bg-surface border-b-layout-border h-navbar-height fixed top-0 left-0 flex w-screen items-center justify-between border-b px-6",
                className
            )}
        >
            {/* Logo / Brand text */}
            <Link
                to="/"
                className="text-text-primary font-medium tracking-wide"
            >
                Ticket System
            </Link>
            {/* Buttons */}
            {/* When signed out -> Signup / Login */}
            {/* When signed in -> Go to Dashboard */}
            {sessionLoading ? (
                <></>
            ) : user ? (
                <LinkButton to="/dashboard" variant="primary" className="h-11">
                    Go to Dashboard
                </LinkButton>
            ) : (
                <span className="flex gap-2">
                    <Button variant="primary" className="h-11 w-22">
                        Sign up
                    </Button>
                    <Button variant="secondary" className="h-11 w-22">
                        Log in
                    </Button>
                </span>
            )}
        </nav>
    );
};

export default Navbar;
