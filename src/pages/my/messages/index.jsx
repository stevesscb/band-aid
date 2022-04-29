import Head from 'next/head'
import Container from 'react-bootstrap/Container'

export default function MyMessagesIndex() {
  return (
    <div id="musicians-container">

      <Head>
        <title> My Messages</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Container className="musicians-cards">

        <h1
          className="animate__animated animate__pulse pt-5 text-center"
          style={{ color: 'white' }}
        >Coming soon...</h1>

      </Container>

    </div>
  )
}
