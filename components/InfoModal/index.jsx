import React from 'react';
import styles from "./style.module.scss";
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { fetchData } from '../../helper/fetchData';

// info modal pop up
export default function InfoModal({ postId, set, title, message }) {
    const router = useRouter();

    const handleCancel = () => {
        // set modal off
        set(a => !a)
    }
    const handleDelete = () => {
        fetchData(`/api/post/delete?postId=${postId}`)
            .then(res => {
                if (res.error)
                    alert(res.error)
                else {
                    router.push("/myarticles");
                }
            });
    }

    return (
        <div className={styles.container}>
            <div className={styles.messagebox}>
                <span>{title}</span>
                <br /><br />
                {message}
                <br /><br />
                {set &&
                    <div>
                        <Button className='m-2' size="sm" onClick={handleDelete}
                            variant="danger">Delete
                        </Button>
                        <Button className='m-2' size="sm" onClick={handleCancel}
                            variant="outline-primary">Cancel
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}
