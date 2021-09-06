import React from 'react';
import * as styles from './note-preview.module.css';
import Tag from '../tag/tag';

interface PostPreviewProps {
    id: string;
    title: string;
    path: string;
    tags: string[];
    short: string;
    url: string;
}

function NotePreview({ title, tags, short, url }: PostPreviewProps): React.ReactElement {
    return (
        <div className={styles.notePreview}>
            <div className={styles.tagList}>
                {tags.map(name => (
                    <Tag name={name} key={name} />
                ))}
            </div>
            <h2>
                <a href={url}>{title}</a>
            </h2>
            <div dangerouslySetInnerHTML={{ __html: short }} />
        </div>
    );
}

export default NotePreview;
