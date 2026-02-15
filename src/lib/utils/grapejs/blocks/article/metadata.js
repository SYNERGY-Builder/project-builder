export function articleMetaDataBlock(editor, data) {
    editor.BlockManager.add('article-metadata', {
        label: 'all article metadata',
        category: 'article-metadata',
        content: {
            tagName: 'section',
            attributes: {
                'class': 'article-metadata'
            },
            components: [
                {
                    tagName: 'h1',
                    content: data.title
                },
                {
                    tagName: 'a',
                    content: `<b>DOI:</b> ${data.doi}`,
                    attributes: {
                        href: `https://doi.org/${data.doi}`,
                        target: '_blank',
                        rel: 'noopener noreferrer'
                    }
                },
                {
                    tagName: 'p',
                    content: `
                    <b>Authors:</b> ${data.authors.map((author) =>
                        author.name
                    ).join(', ')}
                    `
                },
                {
                    tagName: 'p',
                    content: `
                    <b>Keywords:</b> ${data.keywords.map((keyword) => keyword).join(', ')}
                    `
                },
                {
                    tagName: 'section',
                    components: [
                        {
                            tagName: 'h3',
                            content: 'abstract:'
                        },
                        (data.abstract.map((abst) => ({
                            tagName: 'p',
                            content: abst.p
                        })))
                    ]
                }
            ]
        }
    })
}

export function articleMetaTitle(editor, data) {
    editor.BlockManager.add('article-metadata-title', {
        label: 'title',
        category: 'article-metadata',
        content: {
            tagName: 'h1',
            content: data.title
        }
    })
}

export function articleMetaDoi(editor, data) {
    editor.BlockManager.add('article-metadata-doi', {
        label: 'doi',
        category: 'article-metadata',
        content: {
            tagName: 'a',
            content: `<b>DOI:</b> ${data.doi}`,
            attributes: {
                href: `https://doi.org/${data.doi}`,
                target: '_blank',
                rel: 'noopener noreferrer'
            }
        }
    })
}

export function articleMetaAuthors(editor, data) {
    editor.BlockManager.add('article-metadata-authors', {
        label: 'authors',
        category: 'article-metadata',
        content: {
            tagName: 'p',
            content: `
            <b>Authors:</b> ${data.authors.map((author) =>
                author.name
            ).join(', ')}
            `
        }
    })
}

export function articleMetaKeywords(editor, data) {
    editor.BlockManager.add('article-metadata-keywords', {
        label: 'keywords',
        category: 'article-metadata',
        content: {
            tagName: 'p',
            content: `
            <b>Keywords:</b> ${data.keywords.map((keyword) => keyword).join(', ')}
            `
        }
    })
}

export function articleMetaAbstract(editor, data) {
    editor.BlockManager.add('article-metadata-abstract', {
        label: 'abstract',
        category: 'article-metadata',
        content: {
            tagName: 'section',
            components: [
                {
                    tagName: 'h3',
                    content: 'abstract:'
                },
                (data.abstract.map((abst) => ({
                    tagName: 'p',
                    content: abst.p
                })))
            ]
        }
    })
}

export function registerArticleMetadataBlocks(editor, data) {
    articleMetaDataBlock(editor, data)
    articleMetaTitle(editor, data)
    articleMetaDoi(editor, data)
    articleMetaAuthors(editor, data)
    articleMetaKeywords(editor, data)
    articleMetaAbstract(editor, data)
}