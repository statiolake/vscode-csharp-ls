import { ExtensionContext, workspace } from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions
} from "vscode-languageclient/node";

let client: LanguageClient;

export function activate(context: ExtensionContext) {
  const config = workspace.getConfiguration("csharp-ls");
  const serverPath = config.get<string>("server.path")!;

  const serverOptions: ServerOptions = {
    command: serverPath
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "csharp" }]
  };

  client = new LanguageClient(
    "csharp-ls",
    "C# Language Server",
    serverOptions,
    clientOptions
  );

  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  return client?.stop();
}
