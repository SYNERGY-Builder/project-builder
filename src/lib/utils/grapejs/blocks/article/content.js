export function articleContentDataBlock(editor, data) {
    editor.BlockManager.add('article-content', {
        label: 'all article content',
        category: 'article-content',
        content: {
            tagName: 'div',
            attributes: {
                class: 'article-content'
            },
            components: [
                ...(data.map((sec) => ({
                    tagName: 'section',
                    attributes: {
                        class: `${sec.heading}-section`
                    },
                    components: [
                        {
                            tagName: 'h1',
                            content: sec.heading.replace(/[-_]+/g, ' ')
                        },
                        ...sec.body.map((p) => ({
                            tagName: 'p',
                            content: p.p
                        }))
                    ]
                })))
            ]
        }
    })
}

export function articleContentSectionBlocks(editor, data) {
    data.forEach((section) => {
        editor.BlockManager.add(`section-${section.heading}`, {
            label: section.heading.replace(/[-_]+/g, ' '),
            category: 'article-content',
            content: {
                tagName: 'section',
                attributes: {
                    class: `${section.heading}-section`
                },
                components: [
                    {
                        tagName: 'h1',
                        content: section.heading.replace(/[-_]+/g, ' ')
                    },
                    ...section.body.map((p) => ({
                        tagName: 'p',
                        content: p.p
                    }))
                ]
            }
        });
    });
}

export function registerArticleContentBlocks(editor, data) {
    articleContentDataBlock(editor, data)
    articleContentSectionBlocks(editor, data)
}