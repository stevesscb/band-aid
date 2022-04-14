/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head'

export default function Home() {
  return (
    <div id="homePageContainer">
      <Head>
        <title>BAND-AID | HOME</title>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="homePageBanner">
        <div className="white-bg">
          <h4 className="indent-heading">
            <span>WE ARE ON A</span>
            <span>MISSION</span>
            <span>TO CONNECT</span>
            <span>MUSICIANS IN HK!</span>
          </h4>
        </div>
      </div>
    </div>
  )
}
