import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
// import { signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from 'next/router';


// top navigation bar
export default function Navigation() {
    // const { data: session, status } = useSession();
    const router = useRouter();
    let isActive = (pathname) => (router.pathname === pathname);

    return (
        <Navbar className="py-0" sticky="top" collapseOnSelect expand="md" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Murats Blog</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav  className="ms-auto">
                        <Navbar.Text>
                            Signed in as: Mark Otto
                        </Navbar.Text>
                        <Nav.Link href="/editor">Editor</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

