import Container from 'react-bootstrap/Container'
import Link from 'next/link'
import Nav from 'react-bootstrap/Nav'
import Image from 'next/image'

export default function CompsLayoutsFooter() {
  return (
    <footer className="fixed-bottom align-items-center">
      <Container>

        <div id="footer-links" className="d-flex justify-content-center p-3">
          <Nav.Link as={Link} href="/"><a className="nav-link d-table-cell">Home</a></Nav.Link>
          <Nav.Link as={Link} href="/swr"><a className="nav-link d-table-cell">Messages</a></Nav.Link>
          <Nav.Link as={Link} href="/swr"><a className="nav-link d-table-cell">Profile</a></Nav.Link>
        </div>

        <div id="socials-container">
          <Nav.Link className="d-flex justify-content-around">
            <Image
              src="/images/instagram.png"
              alt="Band aids crossed over"
              width={32}
              height={32}
            />
            <Image
              src="/images/facebook.png"
              alt="Band aids crossed over"
              width={32}
              height={32}
            />
            <Image
              src="/images/gmail.png"
              alt="Band aids crossed over"
              width={32}
              height={32}
            />
            <Image
              src="/images/twitter.png"
              alt="Band aids crossed over"
              width={32}
              height={32}
            />
            <Image
              src="/images/spotify.png"
              alt="Band aids crossed over"
              width={32}
              height={32}
            />
          </Nav.Link>
        </div>

        <div id="copyright-container" className="p-3 text-center">
          <p>Copyight 2021 All rights reserved</p>
        </div>

      </Container>
    </footer>
  )
}
