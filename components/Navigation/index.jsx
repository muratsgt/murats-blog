import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { useSession, signOut } from "next-auth/react"
import { useRef } from 'react';
import { useRouter } from 'next/router';

// top navigation bar
export default function Navigation() {
    const { data: session, status } = useSession();
    const searchRef = useRef();
    const router = useRouter();

    const handleSignout = () => {
        signOut();
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchRef.current.value)
            return
        router.push(`/search?text=${encodeURI(searchRef.current.value)}`)
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
                    <Form onSubmit={handleSearch} className="d-flex mx-3">
                        <FormControl
                            size='sm'
                            type="search"
                            placeholder="Search"
                            className="m-2"
                            aria-label="Search"
                            ref={searchRef}
                        />
                        <Button onClick={handleSearch} size='sm' variant="outline-light" className="m-2">🔎︎</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

