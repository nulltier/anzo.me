import React from 'react';
import { graphql } from 'gatsby';
import { PageFrontmatter } from '../../typings/entities';
import * as styles from './page.module.css';
import Navigation from '../../components/navigation/navigation';

interface PageProps {
    data: {
        markdownRemark: {
            frontmatter: PageFrontmatter;
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
            }
        }
    }
`;

export default function Page({ data }: PageProps): React.ReactElement {
    const { markdownRemark } = data;
    const { frontmatter, html } = markdownRemark;

    return (
        <div className="content">
            <Navigation />
            <div className={styles.page}>
                <h1 className={styles.title}>{frontmatter.title}</h1>
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </div>
    );
}
