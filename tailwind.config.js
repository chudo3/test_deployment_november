/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            screens: {
                md: '860px',
                sm: '640px',
            },
            minHeight: {
                'full-viewport': 'calc(var(--vh, 1vh) * 100)',
            },
            zIndex: {
                max: "99999999999",
            },
            colors: {
                "app-grey-10": "#E9EAEA",
                "app-grey-100": "#2d2d2d",
                "app-happyverse-slider-label": "#373936",
                "app-layout": "#292c34",
                "metrics-page-container": "#f8f8f8",
                "metrics-page-button": "#63ac54",
                "app-border-button": "#d0d5dd",
                "app-default-font": "#999999",
                "app-bg": "#fafafa",
                'app-info-block-bg': "#eef0ff",
            },
            backgroundImage: {
                "assessment-default": "linear-gradient(to bottom, #f4f4f4, #eaeaea)",
                "assessment-excellent": "linear-gradient(to bottom, #2bae64, #b7e3ca)",
                "assessment-ok": "linear-gradient(to bottom, #95dd2a, #daf4b6)",
                "assessment-growth": "linear-gradient(to bottom, #f3c929, #faeab6)",
                "assessment-pain": "linear-gradient(to bottom, #ffb8c1, #ffe7eb)",
                "assessment-emergency": "linear-gradient(to bottom, #fe5c54, #ffc9c6)",
            },
            fontSize: {
                xxs: "10px",
            },
            lineHeight: {
                xxs: "12px",
            },
        },
    },
    plugins: [],
};
