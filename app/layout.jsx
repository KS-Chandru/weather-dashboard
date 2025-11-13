import Providers from "@/components/Providers";

export const metadata = {
  title: "Weather Dashboard",
  description: "Weather dashboard built with Next.js and MUI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
