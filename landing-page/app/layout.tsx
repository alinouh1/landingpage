import type { Metadata } from "next";
import "./globals.css";
import "./playbook.css";

export const metadata: Metadata = {
  title: "Growth Station · Brand & Growth Playbook",
  description: "Strategy Before Execution. Growth Beyond Borders.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&family=Cairo:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
