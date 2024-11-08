function wrapText(text, maxWidth = 100) {
//    console.log('this is wrapText()');

    // Preserve trailing newlines by capturing them before splitting paragraphs
    const trailingNewlines = text.match(/\n*$/)[0];

    // Trim only trailing whitespace, preserve leading
    const textWithoutTrailing = text.replace(/\s+$/, '');

    // Split into paragraphs while preserving separators
    const paragraphs = textWithoutTrailing.split(/(\n\s*\n)/);
//    console.log(`Found ${Math.ceil(paragraphs.length/2)} paragraphs.`);

    const wrapped = paragraphs.map((paragraph, index) => {
        // If this is a paragraph separator, return it as-is
        if (paragraph.match(/^\n\s*\n$/)) return paragraph;

        // Skip empty paragraphs but preserve their newlines
        if (!paragraph.trim()) return paragraph;

        // Detect indentation of first line, ignoring any leading newlines
        const firstLineMatch = paragraph.replace(/^\n+/, '').match(/^(\s*)/);
        const firstLineIndent = firstLineMatch ? firstLineMatch[1] : '';
//        console.log(`firstLineIndent is ${firstLineIndent.length}`);

        // Get all non-empty lines for analyzing indentation
        const paragraph_lines = paragraph
            .replace(/^\n+/, '')  // Remove leading newlines before splitting
            .trimEnd()
            .split('\n');
//        console.log(`this paragraph has ${paragraph_lines.length} lines.`);

        // Normalize whitespace within paragraph while preserving indentation
        let words = paragraph_lines
            .map(line => line.trim())
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim()
            .split(' ');

        let lines = [];
        let currentLine = [];
        let currentLength = 0;
        let isFirstLine = true;

        const getEffectiveWidth = () => maxWidth - firstLineIndent.length;

        for (let word of words) {
            const effectiveWidth = getEffectiveWidth();

            // Check if adding this word would exceed maxWidth
            if (currentLength + word.length + (currentLine.length > 0 ? 1 : 0) > effectiveWidth) {
                // Start a new line
                lines.push(firstLineIndent + currentLine.join(' '));
                currentLine = [word];
                currentLength = word.length;
                isFirstLine = false;
            } else {
                currentLine.push(word);
                currentLength += word.length + (currentLine.length > 1 ? 1 : 0);
            }
        }

        // Add the last line
        if (currentLine.length > 0) {
            lines.push(firstLineIndent + currentLine.join(' '));
        }

        return lines.join('\n');
    }).join('');

    // Restore trailing newlines
    return wrapped + trailingNewlines;
}

exports.activate = function() {
    // Register the command
    nova.commands.register('wrap-text.wrapSelection', (editor) => {
        const selectedRange = editor.selectedRange;
        const selectedText = editor.getTextInRange(selectedRange);

        if (selectedText) {
            // Get max width from preferences
            const maxWidth = nova.config.get('wrap-text.maxWidth') || 100;

            // Apply wrapping
            const wrappedText = wrapText(selectedText, maxWidth);

            // Replace selected text
            editor.edit(edit => {
                edit.replace(selectedRange, wrappedText);
            });
        }
    });
};
