import { useState } from 'react';
import styles from "./style.module.scss";
import cn from "classnames";
import { useRouter } from 'next/router'
import { postData } from '../../helper/fetchData';

// TODO add buttons

// Editor for Posts
export default function PostEditor({ post, setPosting, className }) {
    const router = useRouter();
    // const { id, title, content, author, imageUrl } = post;
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [content, setContent] = useState("");
    const [isError, setError] = useState(false);

    // on submit -> save post to DB
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(false);
        setPosting(true);
        const entry = {
            title: title,
            imageUrl: imageUrl,
            content: content
        }
        try {
            postData("/api/post", entry)
                .then(() => setTimeout(() => router.push("/"), 3000));
        } catch (error) {
            console.log(`error: `, error)
            setPosting(false);
            setError(true);
        }
    }

    // handle onchange for inputs
    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.id;
        if (name == "title")
            setTitle(e.target.value);
        else if (name == "image")
            setImageUrl(e.target.value);
        else if (name == "content")
            setContent(e.target.value);
    }

    return (
        <div className={cn(styles.container, className)}>
            {isError && <h3>Sorry, there was an error saving the post</h3>}
            <form className={styles.formbox} onSubmit={handleSubmit}>
                <label htmlFor="title"> Title </label>
                <input required type="text" value={title} onChange={handleChange} id="title" />
                <label htmlFor="image"> Image Url (optional) </label>
                <input type="text" value={imageUrl} onChange={handleChange} id="image" />
                <label htmlFor="content"> Content </label>
                <textarea required value={content} onChange={handleChange} id="content" rows="11" />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}