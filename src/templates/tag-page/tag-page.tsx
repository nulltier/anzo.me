import React from 'react';
import { graphql } from 'gatsby';
import { NoteFrontmatter } from '../../typings/entities';
import NotesList from '../../components/notes-list/notes-list';

export const pageQuery = graphql`
    query($tag: String) {
        allMarkdownRemark(
            limit: 1000
            sort: { fields: [frontmatter___id], order: DESC }
            filter: {
                frontmatter: { tags: { in: [$tag] } }
                fileAbsolutePath: { regex: "/content/notes/" }
            }
        ) {
            edges {
                node {
                    frontmatter {
                        id
                        path
                        title
                        tags
                        short
                    }
                }
            }
        }
    }
`;

interface TagPageProps {
    data: {
        allMarkdownRemark: {
            edges: {
                node: {
                    frontmatter: NoteFrontmatter;
                };
            }[];
        };
    };
}

const TagPage = ({ data }: TagPageProps): React.ReactElement => {
    const notes = data.allMarkdownRemark.edges.map(({ node: { frontmatter } }) => ({
        ...frontmatter,
        url: `/note/${frontmatter.path}`
    }));
    return <NotesList notes={notes} />;
};

export default TagPage;
