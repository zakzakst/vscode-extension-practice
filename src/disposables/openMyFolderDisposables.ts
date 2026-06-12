import * as vscode from 'vscode';

type MyFolder = {
  name: string;
  path: string;
}

export const openMyFolderDisposables = vscode.commands.registerCommand('extension-practice.openMyFolder', async () => {
  const config = vscode.workspace.getConfiguration('extension-practice');
  const myFolders = config.get<MyFolder[]>('myFolders', []);
  const myFolderNames = myFolders.map((myFolder) => myFolder.name);

  const selectedName = await vscode.window.showQuickPick(myFolderNames);
  if (!selectedName) {
    return;
  }
  const selectedMyFolder = myFolders.find((myFolder) => myFolder.name === selectedName);
  if (!selectedMyFolder) {
    return;
  }
  vscode.window.showInformationMessage(selectedMyFolder.path);
  await vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(selectedMyFolder.path), true);
});