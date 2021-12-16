import styles from './style.module.scss';
import {
    FacebookShareButton, FacebookIcon,
    LinkedinShareButton, RedditShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    LinkedinIcon,
    TwitterIcon,
    WhatsappIcon,
    RedditIcon
} from "react-share";
import { useState, useEffect } from 'react';

/**
 * Returns a div of social media buttons to share the current page
 *
 * @version 1.0
 * @author  Murat
 */
export default function ShareButtons() {
    const [windowUrl, setUrl] = useState(process.env.VERCEL_URL)
    useEffect(() => {
        setUrl(window.location.href)
    }, [])
    return (
        <div className={styles.shareicons}>
            <LinkedinShareButton url={windowUrl}>
                <LinkedinIcon round size={32} />
            </LinkedinShareButton>
            <TwitterShareButton url={windowUrl}>
                <TwitterIcon round size={32} />
            </TwitterShareButton>
            <WhatsappShareButton url={windowUrl}>
                <WhatsappIcon round size={32} />
            </WhatsappShareButton>
            <FacebookShareButton url={windowUrl}>
                <FacebookIcon round size={32} />
            </FacebookShareButton>
            <RedditShareButton url={windowUrl}>
                <RedditIcon round size={32} />
            </RedditShareButton>
        </div>
    )
}
