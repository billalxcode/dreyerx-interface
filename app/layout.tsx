import type { Metadata } from "next";
import { Poppins } from "next/font/google"
import AppProvider from "./providers";
import { config } from "@fortawesome/fontawesome-svg-core";
import '@fortawesome/fontawesome-svg-core/styles.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: [
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900'
  ]
})

config.autoAddCss = false

export const metadata: Metadata = {
  title: "DreyerX Swap Interface",
  description: "Swap ERC20 on DreyerX Mainnet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={poppins.className}
      >
        <AppProvider>
          { children }
        </AppProvider>
      </body>
    </html>
  );
}
