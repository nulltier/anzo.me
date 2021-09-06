import React from 'react';
import * as styles from './navigation.module.css';

export default function Navigation(): React.ReactElement {
    const links = [
        {
            url: '/',
            title: 'Home',
            icon: 'https://d1svz1b6z7p08i.cloudfront.net/icons/home.svg'
        },
        {
            url: 'https://github.com/anzome',
            title: 'GitHub',
            icon: 'https://d1svz1b6z7p08i.cloudfront.net/icons/github.svg'
        },
        {
            url: 'https://twitter.com/fort_wrong',
            title: 'Twitter',
            icon: 'https://d1svz1b6z7p08i.cloudfront.net/icons/twitter.svg'
        },
        {
            url: '/credits',
            title: 'Credits',
            icon: 'https://d1svz1b6z7p08i.cloudfront.net/icons/thumbs-up.svg'
        }
    ];

    return (
        <div className={styles.navigation}>
            {links.map(
                ({ url, title, icon }): React.ReactNode => (
                    <a key={url} className={styles.item} href={url} title={title}>
                        <img className={styles.icon} src={icon} />
                    </a>
                )
            )}
        </div>
    );
}
