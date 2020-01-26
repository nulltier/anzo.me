import React from 'react';
import styles from './navigation.module.css';

export default function Navigation(): React.ReactElement {
    const links = [
        {
            url: '/',
            title: 'Home',
            icon: 'https://anzo.me.s3.amazonaws.com/icons/home.svg'
        },
        {
            url: '/credits',
            title: 'Credits',
            icon: 'https://anzo.me.s3.amazonaws.com/icons/thumbs-up.svg'
        },
        {
            url: 'https://github.com/anzome',
            title: 'GitHub',
            icon: 'https://anzo.me.s3.amazonaws.com/icons/github.svg'
        },
        {
            url: 'https://twitter.com/fort_wrong',
            title: 'Twitter',
            icon: 'https://anzo.me.s3.amazonaws.com/icons/twitter.svg'
        }
    ];

    return (
        <div key="navigation" className={styles.navigation}>
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
