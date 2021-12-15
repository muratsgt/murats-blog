import React from 'react';
import styles from "./style.module.scss";
import cn from "classnames";
import Image from 'next/image';
import { useRouter } from 'next/router'

// cards for posts, at the top of homepage
export function CardTop({ post, className, type2 }) {
    const router = useRouter();

    let imageUrl = post.imageUrl ?? "/defaultpic.jpg"
    let shortTitle = post?.title;
    if (post.title?.length > 70)
        shortTitle = post.title?.slice(0, 69) + "..."

    // route to post page
    const handleClick = () => {
        router.push(`/post/${post.id}`)
    }

    return (
        <div
            onClick={handleClick}
            className={cn(styles.container, type2 && styles.type2, className)}
        >
            <div className={styles.hoverEffect} />
            <Image
                className={styles.backimage}
                src={imageUrl}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
            />
            < div className={styles.textbox} >
                <h2>{shortTitle}</h2>
                <h4>{post.author?.name}</h4>
            </ div>
        </div >
    )
}

// cards for posts, below of homepage
export function CardFlat({ post, className, children }) {
    const router = useRouter();

    let imageUrl = post.imageUrl ? post.imageUrl : "/defaultpic.jpg"

    // route to post page
    const handleClick = () => {
        router.push(`/post/${post.id}`)
    }

    return (
        <div onClick={handleClick} className={cn(styles.flat, className)}>
            <div className={styles.hoverEffect} />
            <div className={styles.imagebox}>
                <img
                    src={imageUrl}
                    alt={post.title}
                    width={250}
                    height={200}
                    onError={(e) => e.target.src = "/defaultpic.jpg"}
                />
            </div>
            <div className={styles.flattext}>
                <h2>{post.title}</h2>
                <h4>{post.author?.name}</h4>
            </div>
            {children}
        </div>
    )
}
