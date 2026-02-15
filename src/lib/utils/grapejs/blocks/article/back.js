export function articleBackData(editor, data) {
    editor.BlockManager.add('article-back', {
        label: 'all article back',
        category: 'article-back',
        content: {
            tagName: 'div',
            attributes: {
                class: 'article-back'
            },
            components: [
                (data.map((sec) => ({
                    tagName: 'section',
                    attributes: {
                        class: `${sec.heading}-section`
                    },
                    components: [
                        {
                            tagName: 'h1',
                            content: sec.heading.replace(/[-_]+/g, ' ')
                        },
                        sec.body[0].id ?
                            {
                                tagName: 'ol',
                                components: [
                                    sec.body.map((cite) => ({
                                        tagName: 'li',
                                        content: cite.citation
                                    }))
                                ]
                            }
                            :
                            sec.body.map((p) => ({
                                tagName: 'p',
                                content: p.p
                            }))
                    ]
                })))
            ]
        }
    })
}

export function articleBackSectionBlocks(editor, data) {
    data.forEach((section) => {
        editor.BlockManager.add(`section-${section.heading}`, {
            label: section.heading.replace(/[-_]+/g, ' '),
            category: 'article-back',
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
                    section.body[0].id ?
                        {
                            tagName: 'ol',
                            components: [
                                section.body.map((cite) => ({
                                    tagName: 'li',
                                    content: cite.citation
                                }))
                            ]
                        }
                        :
                        section.body.map((p) => ({
                            tagName: 'p',
                            content: p.p
                        }))
                ]
            }
        });
    });
}

export function registerArticleBackBlocks(editor, data) {
    articleBackData(editor, data)
    articleBackSectionBlocks(editor, data)
}