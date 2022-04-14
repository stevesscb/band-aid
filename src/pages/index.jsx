/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import { Card, Col, Row } from 'react-bootstrap'

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

      <Container className="cards">
        <h6>Newest Members</h6>
        <Row xs={1} md={4} className="g-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Col>
              <Card>
                <Card.Img className="card-image" variant="top" src="/images/musician1.jpg" />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit longer.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

    </div>
  )
}
