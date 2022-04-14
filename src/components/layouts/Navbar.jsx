import Link from 'next/link'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { useSession, signIn, signOut } from 'next-auth/react'

import Image from 'next/image'

export default function CompsLayoutsNavbar() {
  const { data: session } = useSession()

  return (
    <Navbar id="navbar" bg="dark" variant="dark" expand="lg">
      <Container>

        <div className="d-flex align-items-center">
          <Navbar.Brand id="bannerLogo" className="navbar-brand text-center">
            <Image
              src="/images/header-img.png"
              alt="Band aids crossed over"
              width={70}
              height={70}
            />
          </Navbar.Brand>
          <div className="text-center align-center">
            <h1 className="mb-0" style={{ color: '#EE4831' }}>BAND-AID</h1>
            <h4 style={{ color: '#EE4831' }}>HONG KONG</h4>
          </div>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="navbar-collapse">
          <Nav className="ms-auto">
            <Nav.Link as={Link} href="/"><a className="nav-link d-table-cell">Home</a></Nav.Link>
            <Nav.Link as={Link} href="/swr"><a className="nav-link d-table-cell">Messages</a></Nav.Link>
            <Nav.Link as={Link} href="/swr"><a className="nav-link d-table-cell">Profile</a></Nav.Link>
            {
              session ? (
                <Nav.Link onClick={() => signOut()}>Sign Out</Nav.Link>
              ) : (
                <Nav.Link onClick={() => signIn()}>Sign In</Nav.Link>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
