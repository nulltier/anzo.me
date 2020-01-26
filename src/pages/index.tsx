import React from 'react';
import { graphql } from 'gatsby';
import { NoteFrontmatter } from '../typings/entities';
import NotesList from '../components/notes-list/notes-list';

export const pageQuery = graphql`
    query {
        allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/content/notes/" } }
            sort: { order: DESC, fields: [frontmatter___id] }
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

interface IndexPageProps {
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

const IndexPage = ({ data }: IndexPageProps): React.ReactElement => {
    const notes = data.allMarkdownRemark.edges.map(({ node: { frontmatter } }) => ({
        ...frontmatter,
        url: `/note/${frontmatter.path}`
    }));
    return <NotesList notes={notes} />;
};

export default IndexPage;
