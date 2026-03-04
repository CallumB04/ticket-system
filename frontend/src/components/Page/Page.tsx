import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import PageHeader from "./PageHeader";
import PageDescription from "./PageDescription";

interface PageProps {
    className?: string;
    children?: ReactNode;
    title?: string;
    description?: string;
    hasSidebar?: boolean;
}

const Page = ({
    className,
    children,
    title,
    description,
    hasSidebar,
}: PageProps) => {
    return (
        <main
            className={twMerge(
                "mt-navbar-height flex min-h-[calc(100vh-var(--navbar-height))] justify-center p-4 sm:p-8",
                hasSidebar && "lg:ml-sidebar-width"
            )}
        >
            <div className={twMerge("w-full max-w-7xl space-y-8", className)}>
                <div className="space-y-2">
                    {title && <PageHeader>{title}</PageHeader>}
                    {description && (
                        <PageDescription>{description}</PageDescription>
                    )}
                </div>
                {children}
            </div>
        </main>
    );
};

export default Page;
