import * as vscode from 'vscode';

export class OpenMyFolderProvider implements vscode.TreeDataProvider<string> {
  getTreeItem(element: string): vscode.TreeItem {
    const item = new vscode.TreeItem(element);

    item.command = {
      command: 'extension-practice.clicked',
      title: 'サイドパネルクリック',
      arguments: [element]
    };

    item.iconPath = new vscode.ThemeIcon('folder');

    return item;
  }

  getChildren(): string[] {
    return [
      'Frontend',
      'Backend',
      'Chrome Extension'
    ];
  }
}