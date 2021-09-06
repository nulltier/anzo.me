import React from 'react';
import { NoteFrontmatter } from '../../typings/entities';
import NotePreview from '../note-preview/note-preview';
import * as styles from './notes-list.module.css';

interface Preview extends NoteFrontmatter {
    url: string;
}

interface NotesListProps {
    notes: Preview[];
}

function NotesList({ notes }: NotesListProps): React.ReactElement {
    return (
        <div className={styles.notesList}>
            {notes.map(
                (n): React.ReactNode => (
                    <NotePreview key={n.id} {...n} />
                )
            )}
        </div>
    );
}

export default NotesList;
