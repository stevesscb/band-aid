import React from 'react'
import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import Image from 'next/image'
import ReactAudioPlayer from 'react-audio-player'
import { Carousel } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'

import withAuth from '@/hoc/withAuth'
import useMusician from '@/hooks/musician'
import { getUserWithId } from '@/controllers/my/profile/_queries'

export function PagesMusicianShow() {
  const { musician, isError, errorMessage } = useMusician()

  if (isError) return <div>{errorMessage}</div>

  return (
    <div id="profile-container">
      <Head>
        <title>BAND AID | PROFILE</title>
      </Head>

      <Container className="edit-profile p-3">
        <div className="top-section">
          <div className="image-container">
            <Carousel fade className="edit-carousel-fade">
              {
                musician?.portraits?.map((portrait) => (
                  <Carousel.Item key={portrait.id} className="d-flex justify-content-center">
                    <Image
                      className="d-block w-100"
                      src={portrait.file}
                      alt="First slide"
                      width={400}
                      height={400}
                    />
                  </Carousel.Item>
                )) || (
                  <Carousel.Item className="d-flex justify-content-center">
                    <Skeleton
                      width={400}
                      height={400}
                    />
                  </Carousel.Item>
                )
              }
            </Carousel>
          </div>

          <div className="details-heading">
            <div className="text-center">
              <h2 className="py-3">Profile</h2>
              <button
                type="button"
                className="btn btn-success"
              >
                Message
              </button>
            </div>

            <div className="details-table">
              <dl className="edit-personal-details">
                <dt>Username:</dt>
                <dd>{musician?.displayName || <Skeleton width="10%" />}</dd>

                <dt>Email:</dt>
                <dd>{musician?.email || <Skeleton width="15%" />}</dd>

                <dt>Instrument:</dt>
                {
                  musician?.instruments.map((instrument) => (
                    <dd style={{ display: 'list-item', listStyleType: 'disc' }} className="instrument-table" key={instrument.id}>{instrument.type}</dd>
                  )) || (
                    <Skeleton count={3} width="10%" />
                  )
                }
                <dt>Currently in A Band:</dt>
                <dd>{musician?.inBand?.toString() || <Skeleton width="10%" />}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bottom">
          <div className="bio-container">
            <div className="edit-bio p-3">
              <h6 className="text-center">About Me:</h6>
              <p>{musician?.bio || <Skeleton count={8} />}</p>
            </div>
          </div>

          <div className="media-container">
            <div className="edit-media">
              <h6>Tracks:</h6>
              {
                      musician?.tracks.map((track) => (
                        <React.Fragment key={track.id}>
                          <p>{track.name}</p>
                          <ReactAudioPlayer
                            key={track.id}
                            src={track.file}
                            controls
                          />
                        </React.Fragment>
                      )) || (
                      <>
                        <p><Skeleton width="10%" /></p>
                        <Skeleton
                          count={4}
                          height={30}
                          width="50%"
                        />
                      </>
                      )
                    }
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {
  const musician = await getUserWithId(params.id)

  return {
    props: {
      fallback: {
        [`/api/musicians/${params.id}`]: musician
      }
    }
  }
}

export default withAuth(PagesMusicianShow)
