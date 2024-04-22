import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/ui/global.css";
import AuthProvider from "./auth-context";
import StatusBar from "./components/status-bar";
import { ThemeProvider } from "./components/theme-provider";
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gerbang Suara",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* ThemeProvided buat pindah darkmode sama light, fokus salah satu aja dulu */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>

            {/* Navbar atas yang ada realtime aktif tapi ntar gak dipakai realtimenya */}
            <StatusBar />

            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
