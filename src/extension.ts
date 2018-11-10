"use strict";
import { window, workspace, ExtensionContext, TextEditor, commands, StatusBarItem, StatusBarAlignment } from "vscode";
import { isUndefined } from "util";
import { ActiveEditorTracker } from "./activeEditorTracker";
import { TextEditorComparer } from "./comparers";

interface FileListMap {
  [key: string]: boolean;
}

export async function activate(context: ExtensionContext) {
  if (isUndefined(workspace) || isUndefined(workspace.workspaceFolders)) {
    return;
  }

  const tabagotchi = new Tabagotchi();
  tabagotchi.show();

  const editorTracker = new ActiveEditorTracker();
  let active = window.activeTextEditor;
  let editor = active;
  const openEditors: TextEditor[] = [];
  do {
    if (editor !== null && !isUndefined(editor)) {
      // If we didn't start with a valid editor, set one once we find it
      if (active === undefined) {
        active = editor;
      }

      openEditors.push(editor);
    }

    editor = await editorTracker.awaitNext(1000);
    if (
      editor !== undefined &&
      openEditors.some(_ => TextEditorComparer.equals(_, editor, { useId: true, usePosition: true }))
    ) {
      break;
    }
  } while (
    (active === undefined && editor === undefined) ||
    !TextEditorComparer.equals(active, editor, { useId: true, usePosition: true })
  );

  const fileListMap: FileListMap = openEditors.reduce((acc: FileListMap, editor) => {
    acc[editor.document.fileName] = true;
    return acc;
  }, {});

  window.onDidChangeActiveTextEditor(textEditor => {
    if (isUndefined(textEditor)) {
      return;
    }
    const nameOfFile: string = textEditor.document.fileName;
    fileListMap[nameOfFile] = true;
    const numberOfOpenFiles = getNumberOfOpenFiles();
    const settings = workspace.getConfiguration();
    const tabThreshold: number = settings.get("tabagotchi.tabThreshold") || 5;
    if (numberOfOpenFiles >= tabThreshold) {
      tabagotchi.dance();
      window.showErrorMessage(`You have ${numberOfOpenFiles} files open`);
      window.showInformationMessage(`Take a deep breath and clean your workspace`);
      if (numberOfOpenFiles >= tabThreshold + 5) {
        tabagotchi.annoyed();
      }
    } else {
      tabagotchi.show();
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
    window.showInformationMessage("Number of tab: " + numberOfOpenFiles);
  };

  let disposable = commands.registerCommand("extension.sayNumberOfTabsOpen", displayNumberOfFiles);

  context.subscriptions.push(disposable);
}

var dancingFrames = ["(~ᵔᴥᵔ)~", "(ᵔᴥᵔ)"];
var annoyedFrames = ["(~ᵔᴥᵔ)~", "(ᵔᴥᵔ)", "~(ᵔᴥᵔ~)", "(ᵔᴥᵔ)"];

const animation = function(frames: string[]) {
  var i = 0;

  return function() {
    return frames[(i = ++i % frames.length)];
  };
};

class Tabagotchi {
  private _statusBarItem: StatusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
  private _intervalAnimation: any;

  public show() {
    clearInterval(this._intervalAnimation);
    this._statusBarItem.text = "(ᵔᴥᵔ)";
    this._statusBarItem.show();
  }

  public dance() {
    clearInterval(this._intervalAnimation);
    const spinner = animation(dancingFrames);
    this._intervalAnimation = setInterval(() => {
      this._statusBarItem.text = `${spinner()}`;
    }, 500);
    this._statusBarItem.show();
  }

  public annoyed() {
    clearInterval(this._intervalAnimation);
    const spinner = animation(annoyedFrames);
    this._intervalAnimation = setInterval(() => {
      this._statusBarItem.text = `${spinner()}`;
    }, 500);
    this._statusBarItem.show();
  }
}

export function deactivate() {}
