import type { Metadata } from "next";
import { Manrope } from "next/font/google"
import AppProvider from "./providers";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Suspense } from "react";
import GrainOverlay from "@/components/Overlay/grain";
import Bloom from "@/components/Bloom";
import '@fortawesome/fontawesome-svg-core/styles.css'

const manrope = Manrope({
  subsets: ['latin'],
  weight: [
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800'
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
        className={manrope.className}
      >
        <Suspense>
          <AppProvider>
            <GrainOverlay />
            <Bloom />
            {children}
          </AppProvider>
        </Suspense>
      </body>
    </html>
  );
}
