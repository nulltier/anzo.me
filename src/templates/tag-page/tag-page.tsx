import React from 'react';
import { graphql } from 'gatsby';
import { NoteFrontmatter } from '../../typings/entities';
import NotesList from '../../components/notes-list/notes-list';
import Navigation from '../../components/navigation/navigation';

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

interface TagPageProps {
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

const TagPage = ({ data }: TagPageProps): React.ReactElement => {
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

export default TagPage;
