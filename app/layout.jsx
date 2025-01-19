import '@styles/globals.css';
import Navbar from '@components/Navbar';
import Provider from '@components/Provider';
import { Suspense } from "react";

export const metadata = {
  title: 'Promptopia',
  description: 'Discover & Share AI Prompts',
}

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <div className = 'main'>
            <div className = 'gradient' />
          </div>
          <main className = 'app'>
            <Navbar />
            <Suspense fallback = {<Loading />} >
              {children}
            </Suspense>
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout