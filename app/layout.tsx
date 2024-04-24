"use client"

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (

          <html lang="en">
          <head>
              <title>Bred Tour</title>
              <link rel="icon" href="/favicon.ico"/>
          </head>
          <body style={{position: "relative"}}>
          {children}
          </body>
          </html>

  );
}
