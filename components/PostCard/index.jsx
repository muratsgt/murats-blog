import React from 'react';
import styles from "./style.module.scss";
import cn from "classnames";
import Image from 'next/image';
import { useRouter } from 'next/router'

// TODO with motion div
// import { motion } from "framer-motion";

// cards for posts, at the top of homepage
export function CardTop({ post, className, type2, children }) {
    const router = useRouter();
    const { id, title, author, imageUrl } = post;

    // route to post page
    const handleClick = () => {
        router.push(`/post/${id}`)
    }

    return (
        <div
            onClick={handleClick}
            className={cn(styles.container, type2 && styles.type2, className)}
        >
            <Image
                className={styles.backimage}
                src={imageUrl}
                alt={title}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
            />

            < div className={styles.textbox} >
                <h2>{title}</h2>
                <h4>{author?.name}</h4>
            </ div>
        </div >
    )
}

// cards for posts, below of homepage
export function CardFlat({ post, className, type2, children }) {
    const router = useRouter();
    const { id, title, author, imageUrl } = post;
    console.log(`imageUrl`, imageUrl)
    console.log(`author`, author)

    // route to post page
    const handleClick = () => {
        router.push(`/post/${id}`)
    }

    return (
        <div onClick={handleClick} className={cn(styles.flat, type2 && styles.type2, className)}>
            <div className={styles.imagebox}>
                <Image
                    src={imageUrl}
                    alt={title}
                    width={250}
                    height={200}
                    objectFit="cover"
                    objectPosition="center"
                />
            </div>
            <div className={styles.flattext}>
                <h2>{title}</h2>
                <h4>{author?.name}</h4>
            </div>
        </div>
    )
}
