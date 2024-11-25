// README.md
# Text Wrapper for Nova

A Nova extension that wraps lines of text to a specified width while preserving indentation.

I use this to make HTML paragraphs easier to read while editing the code.

## Features

- Wraps text to configurable line width (default 100 characters)
- Preserves paragraph breaks
- Maintains original indentation
- Respects different indentation levels for different paragraphs

## Usage

1. Separate paragraphs with empty lines. The indent of the first line of each paragraph determines
the indent for all lines in the paragraph.
2. Select the paragraph(s) you want to wrap.
3. Wrap the lines using any of the following:
  - Type the keyboard shortcut (Default: Ctrl-W)
  - Select the Wrap Text item from the Editor menu
  - Bring up the Command Palette (Command-P) and search for "Wrap Text"

## Configuration

You can configure the maximum line width in Nova’s preferences:

1. Open Nova Preferences
2. Go to Extensions
3. Select "Wrap Text"
4. Adjust the "Maximum Line Width" setting
