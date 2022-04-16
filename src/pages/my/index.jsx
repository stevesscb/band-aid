import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import { Carousel } from 'react-bootstrap'
import Image from 'next/image'
import { Button, Switch } from '@mui/material'
import ButtonGroup from '@mui/material/ButtonGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import ReactAudioPlayer from 'react-audio-player'

export default function MyIndex() {
  return (
    <div id="profile-container">
      <Head>
        <title>BAND AID | MY PROFILE</title>
      </Head>

      <Container className="profile p-3">
        <div className="carousel-container">

          <Carousel fade className="carousel-fade">
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

        <div className="details-section">
          <h2 className="text-center pt-3">My Profile</h2>

          <div className="section1">

            <ul className="personal-details">
              <li>Username:</li>
              <li>Email:</li>
              <li>Age:</li>
              <li>Instrument:</li>
            </ul>

            <div className="details-buttons">
              <ButtonGroup
                orientation="vertical"
                aria-label="vertical outlined button group"
              >
                <FormControlLabel
                  value="top"
                  control={<Switch color="primary" />}
                  label="In a Band?"
                  labelPlacement="top"
                />
                <Button size="medium">
                  Edit
                </Button>
              </ButtonGroup>
            </div>

          </div>

          <div className="profile-section2">
            <div className="media">
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

          <div className="bio p-3">
            <h6 className="text-center">About Me:</h6>
            <p>d it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including v</p>
          </div>

        </div>

      </Container>
    </div>
  )
}
