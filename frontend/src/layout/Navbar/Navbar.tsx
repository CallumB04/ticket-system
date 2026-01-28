import { twMerge } from "tailwind-merge";

interface NavbarProps {
    className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
    return (
        <nav
            className={twMerge(
                "bg-surface border-b-layout-border h-navbar-height fixed top-0 left-0 flex w-screen items-center border-b px-6",
                className
            )}
        >
            Navbar
        </nav>
    );
};

export default Navbar;
