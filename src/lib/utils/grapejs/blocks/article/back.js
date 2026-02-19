import { dashUnderscoreNormalize } from "$lib/utils/helper";

export const articleBackComponents = (data) => {
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
                sec.body[0].id ?
                    {
                        tagName: 'ol',
                        name: 'List of References',
                        components: [
                            ...sec.body.map((cite) => ({
                                tagName: 'li',
                                name: `${dashUnderscoreNormalize(sec.heading)}' List - ${cite.id}`,
                                content: cite.citation
                            }))
                        ]
                    }
                    :
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
export function articleBackDataBlock(editor, data) {
    editor.BlockManager.add('article-back', {
        label: 'all article back',
        category: 'article-back',
        content: {
            tagName: 'div',
            attributes: {
                class: 'article-back'
            },
            components: articleBackComponents(data)
        }
    })
}

export function articleBackSectionBlocks(editor, data) {
    data.forEach((section) => {
        editor.BlockManager.add(`section-${section.heading}`, {
            label: dashUnderscoreNormalize(section.heading),
            category: 'article-back',
            content: {
                tagName: 'section',
                attributes: {
                    class: `${section.heading}-section`
                },
                components: [
                    {
                        tagName: 'h1',
                        content: dashUnderscoreNormalize(section.heading)
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
    articleBackDataBlock(editor, data)
    articleBackSectionBlocks(editor, data)
}