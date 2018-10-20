"use strict";
import * as vscode from "vscode";
import { isUndefined } from "util";

interface FileListMap {
  [key: string]: boolean;
}

export function activate(context: vscode.ExtensionContext) {
  let window = vscode.window;
  let workspace = vscode.workspace;
  if (isUndefined(workspace) || isUndefined(workspace.workspaceFolders)) {
    return;
  }

  const fileListMap: FileListMap = {};

  window.onDidChangeActiveTextEditor(textEditor => {
    if (isUndefined(textEditor)) {
      return;
    }
    const nameOfFile: string = textEditor.document.fileName;
    fileListMap[nameOfFile] = true;
    const numberOfOpenFiles = getNumberOfOpenFiles();
    if (numberOfOpenFiles >= 10) {
      vscode.window.showErrorMessage(`You have ${numberOfOpenFiles} files open`);
      vscode.window.showInformationMessage(`Take a deep breath and clean your workspace`);
    }
  });

  workspace.onDidCloseTextDocument(document => {
    const nameOfFile: string = document.fileName;
    fileListMap[nameOfFile] = false;
  });

  const getNumberOfOpenFiles = () => {
    return Object.keys(fileListMap).filter(fileName => fileListMap[fileName]).length;
  };

  const displayNumberOfFiles = () => {
    const numberOfOpenFiles = getNumberOfOpenFiles();
    vscode.window.showInformationMessage("Number of tab: " + numberOfOpenFiles);
  };

  let disposable = vscode.commands.registerCommand("extension.sayNumberOfTabsOpen", displayNumberOfFiles);

  context.subscriptions.push(disposable);
}

export function deactivate() {}
