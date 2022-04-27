import React from 'react'
import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import Image from 'next/image'
import ReactAudioPlayer from 'react-audio-player'
import { Carousel } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'

import withAuth from '@/hoc/withAuth'
import useMyProfile from '@/hooks/myProfile'

import CompsModalsProfileEdit from '@/components/modals/ProfileEdit'
import CompsSkeletonProfile from '@/components/skeleton/profile'

export function MyIndex() {
  const { myProfile, isLoading, isError, errorMessage } = useMyProfile()

  if (isError) return <div>{errorMessage}</div>

  return (
    <div id="profile-container">
      <Head>
        <title>BAND AID | MY PROFILE</title>
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
                      myProfile?.portraits?.map((portrait) => (
                        <Carousel.Item key={portrait.id} className="d-flex justify-content-center">
                          <Image
                            className="d-block w-100"
                            src={portrait.file}
                            alt="First slide"
                            width={400}
                            height={400}
                          />
                        </Carousel.Item>

                      )) || <Skeleton />
                    }
                  </Carousel>
                </div>

                <div className="details-heading">
                  <div className="text-center">
                    <h2 className="py-3">My Profile</h2>
                    <CompsModalsProfileEdit />
                  </div>

                  <div className="details-table">
                    <dl className="edit-personal-details">
                      <dt>Username:</dt>
                      <dd>{myProfile?.displayName || <Skeleton />}</dd>

                      <dt>Email:</dt>
                      <dd>{myProfile.email}</dd>

                      <dt>Instrument:</dt>
                      {
                        myProfile.instruments.map((instrument) => (
                          <dd style={{ display: 'list-item', listStyleType: 'disc' }} className="instrument-table" key={instrument.id}>{instrument.type}</dd>
                        ))
                      }
                      <dt>Currently in A Band:</dt>
                      <dd>{myProfile.inBand.toString()}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bottom">
                <div className="bio-container">
                  <div className="edit-bio p-3">
                    <h6 className="text-center">About Me:</h6>
                    <p>{myProfile.bio}</p>
                  </div>
                </div>

                <div className="media-container">
                  <div className="edit-media">
                    <h6>Tracks:</h6>
                    {
                      myProfile.tracks.map((track) => (
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

export default withAuth(MyIndex)
