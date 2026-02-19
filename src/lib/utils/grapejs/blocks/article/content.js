import { dashUnderscoreNormalize } from "$lib/utils/helper";

export function articleContentComponents(data) {
    return [
        data.map((sec) => ({
            tagName: 'section',
            name: `${dashUnderscoreNormalize(sec.heading)} Section`,
            components: [
                {
                    tagName: 'h1',
                    name: `${dashUnderscoreNormalize(sec.heading)}`,
                    content: `${dashUnderscoreNormalize(sec.heading)}`
                },
                sec.body.map((p) => ({
                    tagName: 'p',
                    name: `${dashUnderscoreNormalize(sec.heading)} Content Paragraf`,
                    content: p.p
                }))
            ]
        }))
    ]
}

// Block
export function articleContentDataBlock(editor, data) {
    editor.BlockManager.add('article-content', {
        label: 'all article content',
        category: 'article-content',
        content: {
            tagName: 'div',
            attributes: {
                class: 'article-content'
            },
            components: articleContentComponents(data)
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