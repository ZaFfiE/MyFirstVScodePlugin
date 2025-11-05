# Case Converter for VS Code

A smart VS Code extension that converts text between different case styles with auto-detection.

## Features

+  **Auto-detection** of source case style
+  **Convert between 9 different case styles**:
  - camelCase
  - PascalCase  
  - snake_case
  - kebab-case
  - CONSTANT_CASE
  - Title Case
  - lower case
  - UPPER CASE
  - Capitalize Words

## Usage

1. Select text in editor
2. Use one of:
   - Right-click -> "Convert Case"
   - `Ctrl+Shift+C` (Windows/Linux) or `Cmd+Shift+C` (Mac)
   - Command Palette -> "Convert Case"
3. Select target style - extension shows detected source style

## Examples

- `helloWorld` -> `hello_world` (camelCase to snake_case)
- `HelloWorld` -> `hello-world` (PascalCase to kebab-case)
- `HELLO_WORLD` -> `Hello World` (CONSTANT_CASE to Title Case)