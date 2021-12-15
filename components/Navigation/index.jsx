import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
// import { signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from "next-auth/react"


// top navigation bar
export default function Navigation() {
    const { data: session, status } = useSession();

    const handleSignout = () => {
        signOut();
    }

    return (
        <Navbar className="py-1" sticky="top" collapseOnSelect expand="md" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Murats Blog</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        {status === "authenticated" &&
                            <Navbar.Text>Signed in as: {session.user.email}</Navbar.Text>}
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link href="/editor">Editor</Nav.Link>
                        {status === "authenticated" ?
                            <Button className="mx-3" variant="outline-danger" size="sm" onClick={handleSignout}>Sign out</Button>
                            : <Nav.Link href="/api/auth/signin">Login</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

