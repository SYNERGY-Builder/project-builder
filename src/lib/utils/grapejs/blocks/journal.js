export const journalComponents = (data) => {
    return [
        {
            tagName: 'h1',
            name: 'journal title',
            content: `Journal: ${data.title}`
        },
        {
            tagName: 'p',
            name: 'ISSN',
            content: `ISSN: ${data.issn}`
        },
        {
            tagName: 'p',
            name: 'Publisher',
            content: `Publisher: ${data.publisher}`
        },
        {
            tagName: 'p',
            name: 'Journal Publication',
            content: `Vol ${data.volume} Issue ${data.issue} Year ${data.year}`
        }
    ]
}

// Block
export function journalDataBlock(editor, data) {
    editor.BlockManager.add('journal-data', {
        label: 'all journal data',
        category: 'journal-data',
        content: {
            tagName: 'section',
            attributes: {
                'class': 'journal-section'
            },
            components: journalComponents(data)
        }
    })
}

export function JournalTitleBlock(editor, data) {
    editor.BlockManager.add('journal-title', {
        label: 'journal title',
        category: 'journal-data',
        content: {
            tagName: 'h1',
            content: `Journal: ${data.title}`
        }
    })
}

export function JournalIssnBlock(editor, data) {
    editor.BlockManager.add('journal-issn', {
        label: 'journal issn',
        category: 'journal-data',
        content: {
            tagName: 'p',
            content: `ISSN: ${data.issn}`,
        }
    })
}

export function JournalPublisherBlock(editor, data) {
    editor.BlockManager.add('journal-publisher', {
        label: 'journal publisher',
        category: 'journal-data',
        content: {
            tagName: 'p',
            content: `Publisher: ${data.publisher}`,
        }
    })
}

export function JournalPubBlock(editor, data) {
    editor.BlockManager.add('journal-publication', {
        label: 'journal publication',
        category: 'journal-data',
        content: {
            tagName: 'p',
            content: `Vol ${data.volume} Issue ${data.issue} Year ${data.year}`
        }
    })
}

export function registerJournalBlocks(editor, data) {
    journalDataBlock(editor, data)
    JournalTitleBlock(editor, data)
    JournalIssnBlock(editor, data)
    JournalPublisherBlock(editor, data)
    JournalPubBlock(editor, data)
}