import "./globals.css"
import type { ReactNode } from "react"

export const metadata = {
  title: "Medical Assistant",
  description: "Student dashboard for report handling",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="overflow-x-hidden w-full max-w-full">
      <body className="overflow-x-hidden w-full max-w-full bg-white text-black m-0 p-0">
        <div className="overflow-x-hidden w-full max-w-full min-h-screen">
          <main className="overflow-x-hidden w-full max-w-full px-2 sm:px-4 lg:px-6 py-2 sm:py-4">
            <div className="overflow-x-hidden w-full max-w-full">{children}</div>
          </main>
        </div>
      </body>
    </html>
  )
}
