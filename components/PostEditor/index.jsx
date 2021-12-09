import { useState } from 'react';
import styles from "./style.module.scss";
import cn from "classnames";
import Image from 'next/image';
import { useRouter } from 'next/router'
import { Form, Button, Row, Col } from 'react-bootstrap';
import { postData } from '../../helper/fetchData';

// TODO add buttons

// Editor for Posts
export default function PostEditor({ post, setPosting, className }) {
    const router = useRouter();
    // const { id, title, content, author, imageUrl } = post;
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [content, setContent] = useState("");

    // on submit -> save post to DB
    const handleSubmit = (e) => {
        e.preventDefault();
        setPosting(true);
        const entry = {
            title: title,
            imageUrl: imageUrl,
            content: content
        }
        try {
            postData("/api/post", entry)
                .then(() => router.push("/"));
        } catch (error) {
            console.log(`error: `, error)
            setPosting(false);
        }
    }

    // handle onchange for inputs
    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        if (name == "title")
            setTitle(e.target.value);
        else if (name == "image")
            setImageUrl(e.target.value);
        else if (name == "content")
            setContent(e.target.value);
    }

    return (
        <div className={cn(styles.container, className)}>
            <form className={styles.formbox} onSubmit={handleSubmit}>
                <label htmlFor="">
                    Title:
                    <input type="text" value={title} onChange={handleChange} name="title" />
                </label>
                <label htmlFor="">
                    Image Url (optional):
                    <input type="text" value={imageUrl} onChange={handleChange} name="image" />
                </label>
                <label htmlFor="">
                    Content:
                    <textarea value={content} onChange={handleChange} name="content" rows="15" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}



// <Form onSubmit={handleSubmit}>
// <Form.Group className="mb-3" controlId="validationCustom01">
//     <Form.Label>Title</Form.Label>
//     <Form.Control
//         required
//         value={title}
//         onChange={e => setTitle(e.value)}
//         type="text"
//         placeholder="title here..." />
// </Form.Group>
// <Form.Group className="mb-3" controlId="validationCustom02">
//     <Form.Label>Image Url (optional)</Form.Label>
//     <Form.Control
//         value={imageUrl}
//         onChange={e => setImageUrl(e.value)}
//         type="text"
//         placeholder="title here..." />
// </Form.Group>
// <Form.Group className="mb-3" controlId="validationCustom03">
//     <Form.Label>Content</Form.Label>
//     <Form.Control
//         required
//         value={content}
//         onChange={e => setContent(e.value)}
//         placeholder="content here..."
//         as="textarea"
//         rows={7} />
// </Form.Group>
// <Row>
//     <Col>
//         <Button variant="primary" type="submit">
//             Save
//         </Button>
//     </Col>
//     <Col>
//         <Button variant="dark" type="button">
//             Publish
//         </Button>
//     </Col>
// </Row>
// </Form>