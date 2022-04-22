import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import Image from 'next/image'
import ReactAudioPlayer from 'react-audio-player'
import { Carousel } from 'react-bootstrap'

import withAuth from '@/hoc/withAuth'
import useMyProfile from '@/hooks/myProfile'

import CompsModalsProfileEdit from '@/components/modals/ProfileEdit'

export function MyIndex() {
  const { myProfile, isLoading, isError, errorMessage } = useMyProfile()

  console.log(myProfile) // TODO: remove

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>{errorMessage}</div>

  return (
    <div id="profile-container">
      <Head>
        <title>BAND AID | MY PROFILE</title>
      </Head>

      <Container className="edit-profile p-3">
        <div className="top-section">
          <div className="image-container">
            <Carousel fade className="edit-carousel-fade">
              <Carousel.Item className="d-flex justify-content-center">
                <Image
                  className="d-block w-100"
                  src="/images/musician1.jpg"
                  alt="First slide"
                  width={400}
                  height={400}
                />
              </Carousel.Item>

              <Carousel.Item className="d-flex justify-content-center">
                <Image
                  className="d-block w-100"
                  src="/images/musician1.jpg"
                  alt="Second slide"
                  width={400}
                  height={400}
                />
              </Carousel.Item>

              <Carousel.Item className="d-flex justify-content-center">
                <Image
                  className="d-block w-100"
                  src="/images/musician1.jpg"
                  alt="Third slide"
                  width={400}
                  height={400}
                />
              </Carousel.Item>
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
                <dd>JonDoe2022</dd>

                <dt>Email:</dt>
                <dd>jondoe2022@gmail.com</dd>

                <dt>Instrument:</dt>
                <dd>Drums, Vocals</dd>

                <dt>In A Band:</dt>
                <dd>Yes</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bottom">
          <div className="bio-container">
            <div className="edit-bio p-3">
              <h6 className="text-center">About Me:</h6>
              <p>d it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including v</p>
            </div>
          </div>

          <div className="media-container">
            <div className="edit-media">
              <h6>Tracks</h6>
              <ReactAudioPlayer
                src="my_audio_file.ogg"
                autoPlay
                controls
              />
              <ReactAudioPlayer
                src="my_audio_file.ogg"
                autoPlay
                controls
              />
              <ReactAudioPlayer
                src="my_audio_file.ogg"
                autoPlay
                controls
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default withAuth(MyIndex)
