import { Inter } from 'next/font/google'
import './styles/globals.css'
import { Providers } from './providers/Providers'
import { GeneralSansFont } from './font'
import Sidebar from './components/Layout/Sidebar'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body 
        className={`${GeneralSansFont.variable} ${GeneralSansFont.className}`} 
        suppressHydrationWarning={true}
        >
        <Providers>
          
          <div className="h-screen flex flex-row justify-start bg-[#212121] text-white">
            <Sidebar/>
            <div className="flex-1 h-full overflow-y-auto scrollbar-change">
              <main className="main-wrapper ">
                <Navbar/>
                <div className="container h-full py-2 lg:py-4 px-4 lg:px-4 mx-auto ">
                  {children}
                </div>
                <Footer/>
              </main>
            </div>
          </div>

        </Providers>
      </body>
    </html>
  )
}
