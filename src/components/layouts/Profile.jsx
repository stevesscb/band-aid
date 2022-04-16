import Container from 'react-bootstrap/Container'

export default function CompsLayoutsProfile() {
  return (
    <div id="myProfileContainer">
      <Container>
        <h2 className="text-center">My Profile</h2>

        <div className="image-container">
          image
        </div>

        <div className="my-details">
          My details
        </div>

        <div className="media-container">
          Tracks
        </div>

        <div className="my-bio">
          Bio
        </div>

      </Container>
    </div>
  )
}
