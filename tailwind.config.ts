import { Span } from "next/dist/trace";
import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",

                active: {
                    background: "hsl(var(--active-contract-background))",
                },
                idle: {
                    background: "hsl(var(--idle-background))",
                },
                needassignment: {
                    background: "hsl(var(--need-assignment-background))",
                },
                parentalleave: {
                    background: "hsl(var(--parental-leave-background))",
                },

                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    "1": "hsl(var(--chart-1))",
                    "2": "hsl(var(--chart-2))",
                    "3": "hsl(var(--chart-3))",
                    "4": "hsl(var(--chart-4))",
                    "5": "hsl(var(--chart-5))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            gridTemplateColumns: {
                customers: "auto, repeat(12, minmax(0, 1fr))",
            },
            gridColumn: {
                "span-13": "span 13 / span 13",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
    safelist: [
        "col-span-1",
        "col-span-2",
        "col-span-3",
        "col-span-4",
        "col-span-5",
        "col-span-6",
        "col-span-7",
        "col-span-8",
        "col-span-9",
        "col-span-10",
        "col-span-11",
        "col-span-12",
        "col-span-13",
        "row-span-1",
        "row-span-2",
        "row-span-3",
        "row-span-4",
        "row-span-5",
        "row-span-6",
        "row-span-7",
        "row-span-8",
        "row-span-9",
        "row-span-10",
        "row-span-11",
        "row-span-12",
        "row-span-13",
        "row-span-14",
        "row-span-15",
    ],
} satisfies Config;
