import { cn } from "../../lib/utils";
import Link from "next/link";
import React from "react";
import LoadingIcon from "../custom_icons/LoadingIcon";

const PrimaryButton = ({ text, as, href, loading = false, className, ...props }) => {
    return (
        <>
            {loading ? (
                <span className="flex mt-6 justify-center p-2 cursor-progress items-center text-sm lg:text-base text-gray-200 space-x-2">
                    <LoadingIcon className="animate-spin" />
                    <span>Fetching best price</span>
                </span>
            ) : as === "link" && href !== undefined ? (
                <Link
                    href={href}
                    className={cn(
                        "bg-accent w-full rounded-xl hover:bg-primary-600 border ring-2 ring-[#8F9298]/30 transition-all duration-75 border-white/[16%] px-5 font-medium pt-[0.625rem] pb-3 text-base text-white block",
                        className
                    )}
                >
                    {text}
                </Link>
            ) : as === "span" ? (
                <span
                    className={cn(
                        "bg-accent hover:bg-primary-600 w-full disabled:opacity-50 disabled:cursor-not-allowed rounded-xl border ring-2 ring-[#8F9298]/30 transition-all duration-75 border-white/[16%] px-5 font-medium pt-[0.625rem] pb-3 text-base text-white block",
                        className
                    )}
                >
                    {text}
                </span>
            ) : (
                <button
                    {...props}
                    className={cn(
                        "bg-accent hover:bg-primary-600 w-full disabled:opacity-50 disabled:cursor-not-allowed rounded-xl border ring-2 ring-[#8F9298]/30 transition-all duration-75 border-white/[16%] px-5 font-medium pt-[0.625rem] pb-3 text-base text-white block",
                        className
                    )}
                >
                    {text}
                </button>
            )}
        </>
    );
};

export default PrimaryButton;
