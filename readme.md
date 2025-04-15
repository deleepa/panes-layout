# Panes Layout

A simple library to create responsive pane layouts for web pages.

## Dependencies

**Important:** This library relies on **Bootstrap 5** for its core styling and potentially some JavaScript components. You **must** include Bootstrap 5 (CSS and JS) in your project _before_ including the Panes Layout files.

## Installation & Usage

Your setup should look like this:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panes Layout Example</title>

    <!-- 1. Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- 2. Panes Layout CSS -->
    <link rel="stylesheet" href="path/to/dist/panes.min.css">

</head>
<body>

    <!-- Your HTML Structure (see below) -->

    <!-- 1. Bootstrap JS (Optional, but recommended) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <!-- 2. Panes Layout JS -->
    <script src="path/to/dist/panes.min.js"></script>
</body>
</html>
```

Your HTML should be strucutred in this way for the panes to work:

```
<div class="panes-container">
    <div class="pane p-3 border bg-light">
        <h2>Pane 1</h2>
        <p>This is the content for the first pane.</p>
        <p>It can contain any HTML elements.</p>
    </div>
    <div class="pane p-3 border">
        <h2>Pane 2</h2>
        <p>This is the second pane.</p>
        <button class="btn btn-primary">A Button</button>
    </div>
    <div class="pane p-3 border bg-secondary-subtle">
        <h2>Pane 3</h2>
        <p>And the third pane.</p>
    </div>
    <!-- Add more panes as needed -->
</div>
```
