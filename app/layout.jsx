// app/layout.jsx
import Providers from "@/components/Providers";

export const metadata = {
  title: "Advanced Weather Dashboard",
  description:
    "A modern, advanced weather dashboard built with Next.js and MUI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Providers is a client component that contains MUI ThemeProvider */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
