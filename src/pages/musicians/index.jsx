import React from 'react'
import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import { Card, Col, Row } from 'react-bootstrap'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'

import withAuth from '@/hoc/withAuth'
import useMusicians from '@/hooks/musicians'

export function PagesMusiciansIndex() {
  const { musicians } = useMusicians()

  return (
    <div id="musicians-container">
      <Head>
        <title>BAND AID | MUSICIANS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Container className="musicians-cards">
        <h4 className="p-3">All Musicians</h4>
        <Row xs={1} md={4} className="g-4">
          {
            musicians.map((musician) => (
              <Col key={musician.id} className="card-body">
                <Link href={`/musicians/${musician.id}`} passHref>
                  <Card className="grow">
                    <div className="card-image ratio ratio-4x3">
                      <Card.Img
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                        variant="top"
                        src={musician.portraits[0].file || <Skeleton height={400} width="80%" />}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title>{musician.displayName || <Skeleton />}</Card.Title>
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
              <Col className="card-body h-100 w-50">
                <Card className="grow" style={{ maxWidth: '400px', maxHeight: '800px' }}>
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

      </Container>

    </div>
  )
}

export default withAuth(PagesMusiciansIndex)
