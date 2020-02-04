import React from 'react';
import { graphql } from 'gatsby';
import { NoteFrontmatter } from '../typings/entities';
import NotesList from '../components/notes-list/notes-list';
import Navigation from '../components/navigation/navigation';

export const pageQuery = graphql`
    query {
        allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/content/notes/" } }
            sort: { order: DESC, fields: [frontmatter___id] }
        ) {
            edges {
                node {
                    fileAbsolutePath
                    frontmatter {
                        id
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
                    fileAbsolutePath: string;
                    frontmatter: NoteFrontmatter;
                };
            }[];
        };
    };
}

const IndexPage = ({ data }: IndexPageProps): React.ReactElement => {
    const notes = data.allMarkdownRemark.edges.map(
        ({ node: { frontmatter, fileAbsolutePath } }) => {
            const fileName = fileAbsolutePath.split(/\/|\./).slice(-2, -1);

            return {
                ...frontmatter,
                url: `/note/${fileName}`
            };
        }
    );
    return (
        <div className="content">
            <Navigation />
            <NotesList notes={notes} />
        </div>
    );
};

export default IndexPage;
