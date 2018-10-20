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
  });

  workspace.onDidCloseTextDocument(document => {
    const nameOfFile: string = document.fileName;
    fileListMap[nameOfFile] = false;
  });

  const displayNumberOfFiles = () => {
    const listOfFiles = Object.keys(fileListMap).filter(fileName => fileListMap[fileName]);
    vscode.window.showInformationMessage("Number of tab: " + listOfFiles.length);
  };

  let disposable = vscode.commands.registerCommand("extension.sayNumberOfTabsOpen", displayNumberOfFiles);

  context.subscriptions.push(disposable);
}

export function deactivate() {}
