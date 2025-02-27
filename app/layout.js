export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 text-white flex items-center justify-center">
        <main className="w-full max-w-4xl p-6">{children}</main>
      </body>
    </html>
  );
}
