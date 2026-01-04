import "./styles/globals.css"
import StoreProvider from "./StoreProvider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  )
}
