import { Navbar, Container, Nav } from 'react-bootstrap';
import { useSession, signOut } from "next-auth/react"

// top navigation bar
export default function Navigation() {
    const { data: session, status } = useSession();

    const handleSignout = () => {
        signOut();
    }

    return (
        <Navbar className="py-0" sticky="top" collapseOnSelect expand="xl" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Murats Blog</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        {status === "authenticated" &&
                            <Navbar.Text>Signed in as: {session.user.email}</Navbar.Text>}
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link className="me-3" href="/myarticles">My Posts</Nav.Link>
                        <Nav.Link className="me-3" href="/editor">Editor</Nav.Link>
                        {status === "authenticated" ?
                            <Nav.Link onClick={handleSignout}>Sign out</Nav.Link>
                            : <Nav.Link href="/api/auth/signin">Login</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

