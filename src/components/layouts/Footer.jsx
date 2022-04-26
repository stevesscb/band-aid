import Container from 'react-bootstrap/Container'
import Link from 'next/link'
import Nav from 'react-bootstrap/Nav'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function CompsLayoutsFooter() {
  const router = useRouter()
  const whitelist = ['/my/profile', '/musicians']

  return (
    <footer className="align-items-center">
      {
      whitelist.filter((urlPiece) => router.pathname.includes(urlPiece)).length > 0 && (
      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-light text-center m-3 grow-btn"
          onClick={() => router.back()}
        >
          Return
        </button>
      </div>
      )
    }

      <Container>

        <div id="footer-links" className="d-flex justify-content-center p-3">
          <Nav.Link as={Link} href="/"><a className="nav-link d-table-cell">Home</a></Nav.Link>
          <Nav.Link as={Link} href="/musicians"><a className="nav-link d-table-cell">Musicians</a></Nav.Link>
          <Nav.Link as={Link} href="/swr"><a className="nav-link d-table-cell">Messages</a></Nav.Link>
          <Nav.Link as={Link} href="/my/profile"><a className="nav-link d-table-cell">Profile</a></Nav.Link>
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
