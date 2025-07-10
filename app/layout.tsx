import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from "../components/theme-provider";

export const metadata: Metadata = {
  title: 'Plankton Wolf (Beta)',
  description: 'Prepare-se para vender',
  generator: 'Grupo R.A.T',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
