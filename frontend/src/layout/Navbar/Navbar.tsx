import { twMerge } from "tailwind-merge";
import Button from "../../components/Button/Button";
import LinkButton from "../../components/Button/LinkButton";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { usePopup } from "../../contexts/PopupContext";
import SignupLoginPopup from "../Popups/SignupLoginPopup";

interface NavbarProps {
    className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
    const { sessionLoading, user } = useUser();
    const { pushPopup, popPopup } = usePopup();

    return (
        <nav
            className={twMerge(
                "bg-surface border-b-layout-border h-navbar-height fixed top-0 left-0 flex w-screen items-center border-b px-4 sm:px-6",
                className
            )}
        >
            <span className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4">
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
                    <LinkButton
                        to="/dashboard"
                        variant="primary"
                        className="h-11"
                    >
                        Go to Dashboard
                    </LinkButton>
                ) : (
                    <span className="flex gap-2">
                        <Button
                            variant="primary"
                            className="h-11 w-22"
                            onClick={() =>
                                pushPopup(
                                    <SignupLoginPopup
                                        closePopup={popPopup}
                                        initialState="signup"
                                    />
                                )
                            }
                        >
                            Sign up
                        </Button>
                        <Button
                            variant="secondary"
                            className="h-11 w-22"
                            onClick={() =>
                                pushPopup(
                                    <SignupLoginPopup
                                        closePopup={popPopup}
                                        initialState="login"
                                    />
                                )
                            }
                        >
                            Log in
                        </Button>
                    </span>
                )}
            </span>
        </nav>
    );
};

export default Navbar;
