import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const currencyFormatter = (value, fractionDigits = 0, currency = "") => {
    const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: fractionDigits,
    }).format(value);
    return formatted.replace(currency, "");
};

export function shortenAddress(address) {
    if (address.length < 10) {
        // If the address is too short to be shortened, return it as is
        return address;
    }

    const start = address.slice(0, 4);
    const end = address.slice(-4);
    return `${start}.....${end}`;
}

export const isMobileWidth = (width = 640) =>
    window.matchMedia(`(max-width:${width}px)`).matches;
