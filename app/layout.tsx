import type { Metadata } from "next";
import { Poppins } from "next/font/google"
import AppProvider from "./providers";
import { config } from "@fortawesome/fontawesome-svg-core";
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Suspense } from "react";
import GrainOverlay from "@/components/Overlay/grain";
import Bloom from "@/components/Bloom";

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
