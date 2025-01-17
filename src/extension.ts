import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let distup = vscode.commands.registerCommand("distupdownsrc.distup", () => {
    if (vscode.window.activeTextEditor === undefined) {
      vscode.window.showWarningMessage("No active editor - no dist to UP!");
      return;
    }

    let { fileName } = vscode.window.activeTextEditor.document;
    if (fileName === "untitled") {
      vscode.window.showWarningMessage("Looks like a new file - no dist to UP!");
      return;
    }

    fileName = fileName.split("\\").join("/"); // MS Windows

    const lastIndexOfDist = fileName.lastIndexOf("/dist/");
    if (lastIndexOfDist === -1) {
      vscode.window.showWarningMessage("Path has no /dist/ to UP!");
      return;
    }

    if (fileName.endsWith(".d.ts")) {
      fileName = fileName.substring(0, fileName.length - ".d.ts".length) + ".ts";
    }

    const distUp = fileName.substring(0, lastIndexOfDist) + fileName.substring(lastIndexOfDist + 5);
    // vscode.window.showInformationMessage(`DIST UP! ${distUp}`,);
    vscode.workspace.openTextDocument(vscode.Uri.file(distUp)).then((document) => {
      vscode.window.showTextDocument(document);
    });
  });

  context.subscriptions.push(distup);

  let distupdownsrc = vscode.commands.registerCommand("distupdownsrc.distupdownsrc", () => {
    if (vscode.window.activeTextEditor === undefined) {
      vscode.window.showWarningMessage("No active editor - no dist to UP!");
      return;
    }

    let { fileName } = vscode.window.activeTextEditor.document;
    if (fileName === "untitled") {
      vscode.window.showWarningMessage("Looks like a new file - no dist to UP!");
      return;
    }

    fileName = fileName.split("\\").join("/"); // MS Windows

    const lastIndexOfDist = fileName.lastIndexOf("/dist/");
    if (lastIndexOfDist === -1) {
      vscode.window.showWarningMessage("Path has no /dist/ to UP!");
      return;
    }

    if (fileName.endsWith(".d.ts")) {
      fileName = fileName.substring(0, fileName.length - ".d.ts".length) + ".ts";
    }

    const distUpDownSrc = fileName.substring(0, lastIndexOfDist) + "/src" + fileName.substring(lastIndexOfDist + 5);
    // vscode.window.showInformationMessage(`DIST UP DOWN SRC! ${distUpDownSrc}`);
    vscode.workspace.openTextDocument(vscode.Uri.file(distUpDownSrc)).then((document) => {
      vscode.window.showTextDocument(document);
    });
  });

  context.subscriptions.push(distupdownsrc);
}

export function deactivate() {}
