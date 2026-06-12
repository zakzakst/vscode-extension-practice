import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "extension-practice" is now active in the web extension host!');
  const disposable = vscode.commands.registerCommand('extension-practice.helloWorld', () => {
    vscode.window.showInformationMessage('Hello World from extension-practice in a web extension host!');
  });

  const countDisposable = vscode.commands.registerCommand('extension-practice.countSelectedText', () => {
    // vscode.window.showInformationMessage('文字数を数えます');
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage('エディタが開かれていません');
      return ;
    }
    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);
    if (selectedText.length === 0) {
      vscode.window.showWarningMessage('文字数を選択してください');
    }
    vscode.window.showInformationMessage(`選択文字数：${selectedText.length}`);
  });

  const uppercaseDisposable = vscode.commands.registerCommand('extension-practice.toUppercase', async () => {
    // vscode.window.showInformationMessage('大文字変換します');
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage('エディタが開かれていません');
      return ;
    }
    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);
    if (selectedText.length === 0) {
      vscode.window.showWarningMessage('文字数を選択してください');
    }
    const upperText = selectedText.toUpperCase();

    await editor.edit((editBuilder) => {
      editBuilder.replace(selection, upperText);
    });

    vscode.window.showInformationMessage('大文字に変換しました');
  });

  context.subscriptions.push(disposable);
  context.subscriptions.push(countDisposable);
  context.subscriptions.push(uppercaseDisposable);
}


export function deactivate() {}
