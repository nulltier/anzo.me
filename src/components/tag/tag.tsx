import React from 'react';
import styles from './tag.module.css';

interface TagProps {
    name: string;
}

export default function Tag({ name }: TagProps): React.ReactElement {
    return (
        <a className={styles.tag} href={`/tag/${name.replace(' ', '-')}`}>
            {name}
        </a>
    );
}
