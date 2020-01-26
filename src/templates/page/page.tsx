import React from 'react';
import { graphql } from 'gatsby';
import { PageFrontmatter } from '../../typings/entities';
import styles from './page.module.css';

interface PageProps {
    data: {
        markdownRemark: {
            frontmatter: PageFrontmatter;
            html: string;
        };
    };
}

export const pageQuery = graphql`
    query($url: String) {
        markdownRemark(frontmatter: { path: { eq: $url } }) {
            html
            frontmatter {
                path
                title
            }
        }
    }
`;

export default function Page({ data }: PageProps): React.ReactElement {
    const { markdownRemark } = data;
    const { frontmatter, html } = markdownRemark;

    return (
        <React.Fragment>
            <div className={styles.page}>
                <h1 className={styles.title}>{frontmatter.title}</h1>
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </React.Fragment>
    );
}