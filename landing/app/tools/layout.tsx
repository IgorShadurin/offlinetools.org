import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export const metadata = {
  /** every child will inherit this title setup */
  title: {
    default: 'OfflineTools',          // when a page has no own title
    template: '%s | OfflineTools'     // when it does
  },
  description:
      'Developer utilities that run completely in the browser'
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
} 