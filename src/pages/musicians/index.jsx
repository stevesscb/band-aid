import React from 'react'
import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import { Card, Col, Row } from 'react-bootstrap'
import Link from 'next/link'

import withAuth from '@/hoc/withAuth'
import useMusicians from '@/hooks/musicians'

export function PagesMusiciansIndex() {
  // what page are you at?
  // you are the the index page.... it does not have id
  // your primary location for id is the musician itself
  const { musicians } = useMusicians()

  return (
    <div id="musicians-container">
      <Head>
        <title>BAND AID | MUSICIANS</title>
      </Head>

      <Container className="musicians-cards">
        <h4 className="p-3">All Musicians</h4>
        <Row xs={1} md={3} className="g-6">
          {
            musicians.map((musician) => (
              <Col key={musician.id} className="card-body">
                <Link href={`/musicians/${musician.id}`} passHref>
                  <Card className="grow">
                    <Card.Img
                      className="card-image"
                      variant="top"
                      src={musician.portraits[1].file}
                    />
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
            ))
          }
        </Row>

      </Container>

    </div>
  )
}

export default withAuth(PagesMusiciansIndex)
