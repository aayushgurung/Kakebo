/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        base: "16px", // Sets the default font size to 16px
        "display-1": "96px", // Largest size
        "display-2": "76px",
        "display-3": "60px",
        "heading-1": "48px",
        "heading-2": "38px",
        "heading-3": "30px",
        "body-lg": "24px",
        "body-md": "20px",
        "body-sm": "14px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        black100: "#12202E",
        black80: "rgba(18, 32, 46, 0.85)",
        black50: "#212529",
        white100: "#FAFCFF",
        white80: "#F7FBFF",
        back60: "#FCFEFF",
        prim10: "#28B1D4",
        second30: "#2470C1",
        blue40: "#EAF2FB",
        blue100: "#28B1D4",
        blue300: "#6FA7E2",
        blue400: "#5395DD",
        blue500: "#287bd4",
        blue700: "#1c5797",
        accent50: "#EAF7FB",
        accent100: "#BCE7F2",
        accent200: "#9CDBEB",
        accent300: "#6FCBE2",
        accent400: "#53C1DD",
        accent500: "#28B1D4",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
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
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "#FCFEFF",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          //   accent: "#EAF2FB",
          //   "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
