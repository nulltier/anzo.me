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
                        filePath: fileAbsolutePath
                        frontmatter {
                            id
                            title
                            tags
                        }
                    }
                }
            }
            pages: allMarkdownRemark(
                filter: { fileAbsolutePath: { regex: "/content/pages/" } }
                limit: 1000
            ) {
                edges {
                    node {
                        filePath: fileAbsolutePath
                        frontmatter {
                            title
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
        }
    `);

    // Handle errors
    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        return;
    }

    result.data.notes.edges.forEach(({ node: note }) => {
        const pathInfo = path.parse(note.filePath);

        createPage({
            path: `/note/${pathInfo.name}`,
            component: noteTemplate,
            context: {
                filePath: note.filePath
            }
        });
    });

    result.data.pages.edges.forEach(({ node: page }) => {
        const pathInfo = path.parse(page.filePath);

        createPage({
            path: `/${pathInfo.name}`,
            component: pageTemplate,
            context: {
                filePath: page.filePath
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
