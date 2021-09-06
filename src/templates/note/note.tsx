import React from 'react';
import { graphql } from 'gatsby';
import { NoteFrontmatter } from '../../typings/entities';
import Tag from '../../components/tag/tag';
import * as styles from './note.module.css';
import Navigation from '../../components/navigation/navigation';

interface NoteProps {
    data: {
        markdownRemark: {
            frontmatter: NoteFrontmatter;
            html: string;
        };
    };
}

export const pageQuery = graphql`
    query($filePath: String!) {
        markdownRemark(fileAbsolutePath: { eq: $filePath }) {
            html
            frontmatter {
                title
                tags
            }
        }
    }
`;

export default function Note({ data }: NoteProps): React.ReactElement {
    const { markdownRemark } = data;
    const { frontmatter, html } = markdownRemark;

    return (
        <div className="content">
            <Navigation />
            <div className={styles.page}>
                <div className={styles.tags}>
                    {frontmatter.tags.map(name => (
                        <Tag key={name} name={name} />
                    ))}
                </div>
                <h1 className={styles.title}>{frontmatter.title}</h1>
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </div>
    );
}
