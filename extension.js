const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Case Converter is now active!');

    // запускаем команду
    let disposable = vscode.commands.registerCommand('case_converter.convert', function () {
        const editor = vscode.window.activeTextEditor;
        
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found!');
            return;
        }

        const selection = editor.selection;
        const text = editor.document.getText(selection);

        if (!text || text.trim().length === 0) {
            vscode.window.showErrorMessage('Please select some text to convert.');
            return;
        }

        // Определяем исходный стиль
        const sourceCase = detectCase(text);
        
        // Показываем окно, и меняем case
        showCasePicker(editor, selection, text, sourceCase);
    });

    context.subscriptions.push(disposable);
}

// определяем вид текста
function detectCase(text) {
    if (/^[a-z]+([A-Z][a-z]*)*$/.test(text)) return 'camelCase';
    if (/^[A-Z][a-z]*([A-Z][a-z]*)*$/.test(text)) return 'PascalCase';
    if (/^[a-z]+(_[a-z]+)*$/.test(text)) return 'snake_case';
    if (/^[A-Z]+(_[A-Z]+)*$/.test(text)) return 'CONSTANT_CASE';
    if (/^[a-z]+(-[a-z]+)*$/.test(text)) return 'kebab-case';
    if (/^[A-Z][a-z]*( [A-Z][a-z]*)*$/.test(text)) return 'Title Case';
    if (/^[A-Z ]+$/.test(text)) return 'UPPER CASE';
    if (/^[a-z ]+$/.test(text)) return 'lower case';
    
    return 'unknown';
}


function showCasePicker(editor, selection, originalText, sourceCase) {
    const cases = [
        { label: 'camelCase', description: 'helloWorld' },
        { label: 'PascalCase', description: 'HelloWorld' },
        { label: 'snake_case', description: 'hello_world' },
        { label: 'kebab-case', description: 'hello-world' },
        { label: 'CONSTANT_CASE', description: 'HELLO_WORLD' },
        { label: 'Title Case', description: 'Hello World' },
        { label: 'lower case', description: 'hello world' },
        { label: 'UPPER CASE', description: 'HELLO WORLD' },
        { label: 'Capitalize Words', description: 'Hello World' }
    ];

    // показываем из чего мы переводим
    const sourceInfo = sourceCase !== 'unknown' ? ` (from ${sourceCase})` : '';

    // окно выбора
    vscode.window.showQuickPick(cases, {
        placeHolder: `Select target case style${sourceInfo}`
    }).then(selectedCase => {
        if (selectedCase) {
            // меняем текст
            const convertedText = convertCase(originalText, selectedCase.label);
            // пробуем изменить в файле
            applyConversion(editor, selection, convertedText, sourceCase, selectedCase.label);
        }
    });
}

function convertCase(text, targetCase) {
    let words = [];
    
    if (text.includes('_')) {
        words = text.split('_');
    } else if (text.includes('-')) {
        words = text.split('-');
    } else if (text.includes(' ')) {
        words = text.split(' ');
    } else if (/([a-z])([A-Z])/.test(text)) {
        words = text.split(/(?=[A-Z])/);
    } else {
        words = [text];
    }
    
    words = words.filter(word => word.length > 0)
                .map(word => word.trim())
                .filter(word => word.length > 0);

    if (words.length === 0) return text;

    switch (targetCase) {
        case 'camelCase':
            return words.map((word, index) => 
                index === 0 ? word.toLowerCase() : capitalize(word.toLowerCase())
            ).join('');
            
        case 'PascalCase':
            return words.map(word => capitalize(word.toLowerCase())).join('');
            
        case 'snake_case':
            return words.map(word => word.toLowerCase()).join('_');
            
        case 'kebab-case':
            return words.map(word => word.toLowerCase()).join('-');
            
        case 'CONSTANT_CASE':
            return words.map(word => word.toUpperCase()).join('_');
            
        case 'Title Case':
            return words.map(word => capitalize(word.toLowerCase())).join(' ');
            
        case 'lower case':
            return words.map(word => word.toLowerCase()).join(' ');
            
        case 'UPPER CASE':
            return words.map(word => word.toUpperCase()).join(' ');
            
        case 'Capitalize Words':
            return words.map(word => capitalize(word.toLowerCase())).join(' ');
            
        default:
            return text;
    }
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function applyConversion(editor, selection, convertedText, sourceCase, targetCase) {
    // пытаемся поменять файл
    editor.edit(editBuilder => {
        editBuilder.replace(selection, convertedText);
    }).then(success => {
        if (success) {
            // если получилось выведем информацию о замене
            const conversionInfo = sourceCase && targetCase ? 
                ` (${sourceCase} → ${targetCase})` : '';
            vscode.window.showInformationMessage(`Converted: ${convertedText}${conversionInfo}`);
        } else {
            vscode.window.showErrorMessage('Failed to convert text');
        }
    });
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};