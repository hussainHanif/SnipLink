import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "sniplink.copyAndShare",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;

      const selectedText = editor.document.getText(editor.selection);
      if (!selectedText) {
        vscode.window.showInformationMessage("No code selected.");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/share", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: selectedText }),
        });

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }

        const data = (await response.json()) as { url: string };

        if (data?.url) {
          await vscode.env.clipboard.writeText(data.url);

          const action = await vscode.window.showInformationMessage(
            "SnipLink copied to clipboard!",
            "Open in Browser"
          );

          if (action === "Open in Browser") {
            vscode.env.openExternal(vscode.Uri.parse(data.url));
          }
        } else {
          vscode.window.showErrorMessage("Failed to generate SnipLink.");
        }
      } catch (err: any) {
        vscode.window.showErrorMessage(`Error: ${err.message}`);
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
