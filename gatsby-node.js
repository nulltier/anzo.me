/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions;

    const noteTemplate = path.resolve(`src/templates/note/note.tsx`);
    const pageTemplate = path.resolve(`src/templates/page/page.tsx`);
    const tagPageTemplate = path.resolve(`src/templates/tag-page/tag-page.tsx`);

    const result = await graphql(`
        {
            notes: allMarkdownRemark(
                filter: { fileAbsolutePath: { regex: "/content/notes/" } }
                limit: 1000
            ) {
                edges {
                    node {
                        frontmatter {
                            id
                            path
                            title
                            tags
                        }
                    }
                }
            }
            tags: allMarkdownRemark(
                filter: { fileAbsolutePath: { regex: "/content/notes/" } }
                limit: 1000
            ) {
                group(field: frontmatter___tags) {
                    fieldValue
                }
            }
            pages: allMarkdownRemark(
                filter: { fileAbsolutePath: { regex: "/content/pages/" } }
                limit: 1000
            ) {
                edges {
                    node {
                        frontmatter {
                            path
                            title
                        }
                    }
                }
            }
        }
    `);

    // Handle errors
    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        return;
    }

    result.data.notes.edges.forEach(({ node: note }) => {
        createPage({
            path: `/note/${note.frontmatter.path}`,
            component: noteTemplate,
            context: {
                url: note.frontmatter.path
            }
        });
    });

    result.data.pages.edges.forEach(({ node: page }) => {
        createPage({
            path: `/${page.frontmatter.path}`,
            component: pageTemplate,
            context: {
                url: page.frontmatter.path
            }
        });
    });

    result.data.tags.group.forEach(tag => {
        createPage({
            path: `/tag/${tag.fieldValue.replace(' ', '-')}/`,
            component: tagPageTemplate,
            context: {
                tag: tag.fieldValue
            }
        });
    });
};
