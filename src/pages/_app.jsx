import '@/styles/globals.scss'
import { ToastContainer } from 'react-toastify'
import { appWithTranslation } from 'next-i18next'
import { SessionProvider } from 'next-auth/react'

import appWithSession from '@/hoc/appWithSession'
import CompsLayoutsNavbar from '@/compontents/layouts/Navbar'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <CompsLayoutsNavbar />
        <Component {...pageProps} />
      </SessionProvider>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default appWithSession(appWithTranslation(MyApp))
