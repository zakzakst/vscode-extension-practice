import * as vscode from 'vscode';

type MyFolderItem = {
  label: string;
  path?: string;
  children?: MyFolderItem[];
};

const myFolderItems: MyFolderItem[] = [
  {
    label: 'SITE A',
    children: [
      {
        label: 'Frontend',
        path: 'path/to/frontend',
      },
      {
        label: 'Backend',
        path: 'path/to/backend',
      },
    ],
  },
  {
    label: 'SITE B',
    children: [
      {
        label: 'Frontend',
        path: 'path/to/frontend',
      },
      {
        label: 'Backend',
        path: 'path/to/backend',
      },
    ],
  },
]

export class OpenMyFolderProvider implements vscode.TreeDataProvider<MyFolderItem> {
  getTreeItem(element: MyFolderItem): vscode.TreeItem {
    const collapsibleState = element.children
      ? vscode.TreeItemCollapsibleState.Expanded
      : vscode.TreeItemCollapsibleState.None;

    const item = new vscode.TreeItem(element.label, collapsibleState);

    if (!element.children) {
      item.command = {
        command: 'extension-practice.clicked',
        title: 'サイドパネルクリック',
        arguments: [element]
      };
      item.iconPath = new vscode.ThemeIcon('folder');
      item.contextValue = 'folder';
    }

    return item;
  }

  getChildren(element?: MyFolderItem): MyFolderItem[] {
    if (!element) {
      return myFolderItems;
    }

    return element.children ?? [];
  }
}