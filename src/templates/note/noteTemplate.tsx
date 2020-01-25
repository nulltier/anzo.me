import React from 'react';
import { graphql } from 'gatsby';
import styles from './note.module.css';

interface Frontmatter {
    title: string;
    tags: string[];
}

interface Note {
    data: {
        markdownRemark: {
            frontmatter: Frontmatter;
            html: string;
        };
    };
}

export const pageQuery = graphql`
    query($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                path
                title
                tags
            }
        }
    }
`;

export default function NoteTemplate({ data }: Note): React.ReactElement {
    const { markdownRemark } = data;
    const { frontmatter, html } = markdownRemark;

    return (
        <React.Fragment>
            <div className={styles.page}>
                <h1 className={styles.title}>{frontmatter.title}</h1>
                <h2>
                    {frontmatter.tags.map(
                        (tag: string): React.ReactElement => (
                            <code key={tag}>{tag}</code>
                        )
                    )}
                </h2>
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </React.Fragment>
    );
}
