import React from "react";

export const metadata = {
    title: "Create Token",
    keyword: ["ThrustPad", "Launchpad", "Create Token Tool", "Token Creation Platform"],
};

const layout = ({ children }) => {
    return (
        <>
            <div className="w-full container mx-auto py-4 md:py-12 min-h-[900px]">{children}</div>
        </>
    );
};

export default layout;
