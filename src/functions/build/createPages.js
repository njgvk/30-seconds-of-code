/**
 * Creates individual snippet pages.
 */
const createSnippetPages = (snippets, snippetPage, createPage, commonContext) => {
  snippets.forEach(snippet => {
    createPage({
      path: `${snippet.node.slug}`,
      component: snippetPage,
      context: {
        snippet: snippet.node,
        ...commonContext,
      },
    });
  });
};

/**
 * Tell plugins to add pages.
 * Takes a query string and a templates object.
 * Creates pages by running individual methods.
 */
const createPages = (query, templates) => ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql(query)
    .then(result => {
      if (result.errors) throw result.errors;

      const commonContext = {
        logoSrc: result.data.file.childImageSharp.original.src,
      };

      createSnippetPages(
        result.data.allSnippet.edges,
        templates['SnippetPage'],
        createPage,
        commonContext
      );

      return null;
    });
};

export default createPages;