interface LayoutProps {
  children: React.ReactNode
  isAuthenticated?: boolean
  showFooter?: boolean
}

export default function Layout({ children, isAuthenticated = false, showFooter = true }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}