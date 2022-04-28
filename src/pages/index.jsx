/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-page-custom-font */
import React from 'react'
import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import { Card, Col, Row, Carousel } from 'react-bootstrap'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'

import useMusicians from '@/hooks/musicians'

export default function Home() {
  const { musicians } = useMusicians()

  return (
    <div id="homePageContainer">

      <Head>
        <title>BAND-AID | HOME</title>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
          {
            musicians.map((musician) => (
              <Col key={musician.id} className="card-body">
                <Link href={`/musicians/${musician.id}`} passHref>
                  <Card className="grow h-100">
                    <div className="card-image ratio ratio-4x3">
                      <Card.Img
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                        variant="top"
                        src={musician.portraits[0].file}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title>{musician.displayName}</Card.Title>
                      <Card.Text>
                        <React.Fragment key={musician.id}>
                          <dt>Instruments:</dt>{
                            musician.instruments.map((instrument) => (
                              <React.Fragment key={instrument.id}>
                                <dd>
                                  {instrument.type}
                                </dd>
                              </React.Fragment>
                            ))
                            }
                          <dt>In a band?</dt>
                          <dd>{musician.inBand.toString()}</dd>
                        </React.Fragment>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            )) || (
              <Col className="card-body">
                <Card className="grow">
                  <Card.Img>
                    <Skeleton
                      width={400}
                      height={400}
                    />
                  </Card.Img>
                  <Card.Body>
                    <Skeleton count={8} />
                  </Card.Body>
                </Card>
              </Col>
            )
          }
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
