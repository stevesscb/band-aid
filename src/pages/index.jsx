/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import { Card, Col, Row } from 'react-bootstrap'
import Link from 'next/link'

import getMusicians from '@/hooks/musicians'

export default function Home() {
  const { user, isLoading, isError, errorMessage } = getMusicians()

  console.log(user)

  return (
    <div id="homePageContainer">

      <Head>
        <title>BAND-AID | HOME</title>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="homePageBanner">
        <div className="white-bg">
          <Container>
            <h4 className="indent-heading">
              <span>WE ARE ON A</span>
              <span className=" animate__animated animate__backInLeft">MISSION</span>
              <span>TO CONNECT</span>
              <span className=" animate__animated animate__backInRight">MUSICIANS IN HK!</span>
            </h4>
          </Container>
        </div>
      </div>

      <Container className="cards">
        <h6>Newest Members</h6>

        <Row xs={1} md={4} className="g-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Col key={idx} className="card-body">
              <Link href="/musicians/" passHref>
                <Card className="grow">
                  <Card.Img className="card-image" variant="top" src="/images/musician1.jpg" />
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a longer card with supporting text below as a natural
                      lead-in to additional content. This content is a little bit longer.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>

        <div className="d-flex justify-content-center p-3">
          <Link href="/musicians" passHref>
            <button
              type="button"
              className="grow-btn btn btn-light"
            >
              See all Musicians
            </button>
          </Link>
        </div>
      </Container>

      <div className="homePageBannerBottom">
        <div className="bg-bottom">
          <Container>
            <h6 className="indent-heading-bottom">
              <span>Sign up TODAY</span>
              <span>to join the FASTEST growing</span>
              <span>COMMUNITY in HONG KONG!</span>
            </h6>
          </Container>
        </div>
      </div>
    </div>
  )
}
