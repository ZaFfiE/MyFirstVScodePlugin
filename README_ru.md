# Case Converter для VS Code

Умное расширение для VS Code, которое преобразует текст между различными стилями написания с автоматическим определением исходного стиля.

## Возможности

+  **Автоопределение** исходного стиля написания
+  **Преобразование между 9 стилями написания**:
  - camelCase
  - PascalCase  
  - snake_case
  - kebab-case
  - CONSTANT_CASE
  - Title Case
  - lower case
  - UPPER CASE
  - Capitalize Words
+  **Визуальная обратная связь** с показом пути преобразования

## Использование

1. Выделите текст в редакторе
2. Используйте один из способов:
   - Правый клик -> "Convert Case"
   - `Ctrl+Shift+C` (Windows/Linux) или `Cmd+Shift+C` (Mac)
   - Command Palette -> "Convert Case"
3. Выберите целевой стиль - расширение покажет определенный исходный стиль

## Примеры

- `helloWorld` -> `hello_world` (camelCase в snake_case)
- `HelloWorld` -> `hello-world` (PascalCase в kebab-case)
- `HELLO_WORLD` -> `Hello World` (CONSTANT_CASE в Title Case)
