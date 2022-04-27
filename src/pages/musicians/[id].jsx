import React from 'react'
import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import Image from 'next/image'
import ReactAudioPlayer from 'react-audio-player'
import { Carousel } from 'react-bootstrap'

import withAuth from '@/hoc/withAuth'
import useMusician from '@/hooks/musician'
import CompsSkeletonProfile from '@/components/skeleton/profile'
import { getUserWithId } from '@/controllers/my/profile/_queries'

export function PagesMusicianShow() {
  // NOW. you are at the [id] page
  // NOW. you will have access to params: { id }
  // and using this id, you will give it to the useMusician
  // so that the hook will dynamically get us different musicians

  const { musician, isError, isLoading, errorMessage } = useMusician()

  console.log(musician)

  if (isError) return <div>{errorMessage}</div>

  return (
    <div id="profile-container">
      <Head>
        <title>BAND AID | PROFILE</title>
      </Head>

      <Container className="edit-profile p-3">
        {
          isLoading ? (
            <CompsSkeletonProfile />
          ) : (
            <>
              <div className="top-section">
                <div className="image-container">
                  <Carousel fade className="edit-carousel-fade">
                    {
                musician.portraits.map((portrait) => (
                  <Carousel.Item key={portrait.id} className="d-flex justify-content-center">
                    <Image
                      className="d-block w-100"
                      src={portrait.file}
                      alt="First slide"
                      width={400}
                      height={400}
                    />
                  </Carousel.Item>

                ))
              }
                  </Carousel>
                </div>

                <div className="details-heading">
                  <div className="text-center">
                    <h2 className="py-3">Profile</h2>
                  </div>

                  <div className="details-table">
                    <dl className="edit-personal-details">
                      <dt>Username:</dt>
                      <dd>{musician.displayName}</dd>

                      <dt>Email:</dt>
                      <dd>{musician.email}</dd>

                      <dt>Instrument:</dt>
                      {
                  musician.instruments.map((instrument) => (
                    <dd style={{ display: 'list-item', listStyleType: 'disc' }} className="instrument-table" key={instrument.id}>{instrument.type}</dd>
                  ))
                }

                      <dt>Currently in A Band:</dt>
                      <dd>{musician.inBand}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bottom">
                <div className="bio-container">
                  <div className="edit-bio p-3">
                    <h6 className="text-center">About Me:</h6>
                    <p>{musician.bio}</p>
                  </div>
                </div>

                <div className="media-container">
                  <div className="edit-media">
                    <h6>Tracks:</h6>
                    {
                musician.tracks.map((track) => (
                  <React.Fragment key={track.id}>
                    <p>{track.name}</p>
                    <ReactAudioPlayer
                      key={track.id}
                      src={track.file}
                      controls
                    />
                  </React.Fragment>
                ))
              }
                  </div>
                </div>
              </div>

            </>
          )
        }
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
