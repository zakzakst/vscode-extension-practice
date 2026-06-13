import * as vscode from 'vscode';
import { openMyFolderDisposables } from '../disposables/openMyFolderDisposables';
import { OpenMyFolderProvider } from '../providers/OpenMyFolderProvider';

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

  // const openMyFolderDisposables = vscode.commands.registerCommand('extension-practice.openMyFolder', () => {
  //   vscode.window.showInformationMessage('openFolderDisposables');
  // });

  const clickedDisposable = vscode.commands.registerCommand('extension-practice.clicked', (myFolder: { label: string; path: string;}) => {
    vscode.window.showInformationMessage(`${myFolder.label}がクリックされました${myFolder.path}`);
  });

  const openGoogleDisposable = vscode.commands.registerCommand('extension-practice.openGoogle', async () => {
    await vscode.env.openExternal(vscode.Uri.parse('https://www.google.com'));
  });

  const showCurrentFolder = vscode.commands.registerCommand('extension-practice.currentFolder', () => {
    const folders = vscode.workspace.workspaceFolders;
    if (!folders || folders.length === 0) {
      vscode.window.showWarningMessage('フォルダが開かれていません');
      return;
    }
    const rootPath = folders[0].uri.fsPath;

    vscode.window.showInformationMessage(rootPath);
  });

  context.subscriptions.push(disposable);
  context.subscriptions.push(countDisposable);
  context.subscriptions.push(uppercaseDisposable);
  context.subscriptions.push(openMyFolderDisposables);
  context.subscriptions.push(clickedDisposable);
  context.subscriptions.push(openGoogleDisposable);
  context.subscriptions.push(showCurrentFolder);

  const provider = new OpenMyFolderProvider();

  vscode.window.registerTreeDataProvider(
    'myFoldersView',
    provider
  );
}


export function deactivate() {}
