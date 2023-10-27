/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { window, commands, ExtensionContext } from 'vscode';
const os = require('os');
let platform = os.platform();


type Command = {
	key?: string; // keybinding for macos
	lkey?: string; // keybinding for linux
	wkey?: string; // keybinding for windows
	id?: string;   // command id
};

type Category = {
	[command: string]: Command;
};

type Driver = {
	[category: string]: Category;
};



let driver: Driver = {
	"General": {
		"Show Command Palette": { key: "F1", id: "workbench.action.showCommands" },
		"File: open file ": { key: "⌘P", wkey: "Ctrl+P", id: "workbench.action.files.openFile" },

	},
	"Basic Editing": {
		"Cut selection. Cut line on empty selection": { key: "⌘X", id: "editor.action.clipboardCutAction" },
		"Copy Selection": { key: "⌘C", id: "editor.action.clipboardCopyAction" },
	},
	"Multi-cursor and selection ": {
		"Insert cursor above": { key: "⌥⌘↑", id: "editor.action.insertCursorAbove" },
		"Insert cursor below": { key: "⌥⌘↓", id: "editor.action.insertCursorBelow" },
		"": { key: "", id: "" },
		"Insert cursor at end of each line selected": { key: "⇧⌥I", id: "editor.action.insertCursorAtEndOfEachLineSelected" },
		"Select current line": { key: "⌘L", id: "editor.action.selectLines" },
		"Select all occurrences of current selection": { key: "⇧⌘L", id: "editor.action.selectHighlights" },
		"Select all occurrences of current word": { key: "⌘F2", id: "editor.action.changeAll" },
		"Expand selection": { key: "⌃⇧⌘→", id: "editor.action.smartSelect.expand" },
		"Shrink selection": { key: "⌃⇧⌘→", id: "editor.action.smartSelect.shrink" },
		"Column (box) selection up": { key: "⇧⌥⌘↑", id: "editor.action.insertCursorAbove" },
		"Column (box) selection down": { key: "⇧⌥⌘↓", id: "editor.action.insertCursorBelow" },
		"Column (box) selection left": { key: "⇧⌥⌘←", id: "editor.action.columnSelectLeft" },
		"Column (box) selection right": { key: "⇧⌥⌘→", id: "editor.action.columnSelectRight" },
		"Column (box) selection page up": { key: "⇧⌥⌘PgUp", id: "editor.action.columnSelectPageUp" },
		"Column (box) selection page down": { key: "⇧⌥⌘PgDn", id: "editor.action.columnSelectPageDown" },
	},
	"Search and replace": {
		"Find": { key: "⌘F", id: "actions.find" },
	},
	"Rich languages editing": {
		"Show all symbols": { id: "workbench.action.gotoSymbol" },
	},
	"Navigation": {
	},
	"Editor management": {
	},
	"File management": {
	},
	"Display": {
		"Toggle full screen": { key: "⌃⌘F", id: "workbench.action.toggleFullScreen" },
		"Toggle editor layout (horizontal/vertical)": { key: "⌥⌘0", id: "workbench.action.toggleEditorGroupLayout" },
		"Zoom in": { key: "⌘=", id: "workbench.action.zoomIn" },
		"Zoom out": { key: "⇧⌘-", id: "workbench.action.zoomOut" },
		"Toggle Sidebar visibility": { key: "⌘B", id: "workbench.action.toggleSidebarVisibility" },
		"Show Explorer / Toggle focus": { key: "⇧⌘E", id: "workbench.view.explorer" },
		"Show Search": { key: "⇧⌘F", id: "workbench.view.search" },
		"Show Source Control": { key: "⌃⇧G", id: "workbench.view.scm" },
		"Show Debug": { key: "⇧⌘D", id: "workbench.view.debug" },
		"Show Extensions": { key: "⇧⌘X", id: "workbench.view.extensions" },
		"Replace in files": { key: "⇧⌘H", id: "workbench.action.replaceInFiles" },
		"Toggle Search details": { key: "⇧⌘J", id: "search.action.toggleQueryDetails" },
		"Show Output panel": { key: "⇧⌘U", id: "workbench.action.output.toggleOutput" },
		"Open Markdown preview": { key: "⇧⌘V", id: "markdown.showPreview" },
		"Open Markdown preview to the side": { key: "⌘K V", id: "markdown.showPreviewToSide" },
		"Zen Mode (Esc Esc to exit)": { key: "⌘K Z", id: "workbench.action.toggleZenMode" },
	},
	"Debug": {
		"Toggle breakpoint": { key: "F9", id: "editor.debug.action.toggleBreakpoint" },
		"Start/Continue": { key: "F5", id: "workbench.action.debug.start" },
		"Step into": { key: "F11", id: "workbench.action.debug.stepInto" },
		"Step out": { key: "⇧F11", id: "workbench.action.debug.stepOut" },
		"Step over": { key: "F10", id: "workbench.action.debug.stepOver" },
		"Stop": { key: "⇧F5", id: "workbench.action.debug.stop" },
		"Show hover": { key: "⌘K ⌘I", id: "editor.debug.action.showDebugHover" },
	},
	"Integrated terminal": {
		"Show integrated terminal": { key: "⌃`", id: "workbench.action.terminal.toggleTerminal" },
		"Create new terminal": { key: "⌃⇧`", id: "workbench.action.terminal.new" },
		"Copy selection": { key: "⌘C", id: "workbench.action.terminal.copySelection" },
		"Scroll up": { key: "⌘↑", id: "workbench.action.terminal.scrollUp" },
		"Scroll down": { key: "⌘↓", id: "workbench.action.terminal.scrollDown" },
		"Scroll page up": { key: "PgUp", id: "workbench.action.terminal.scrollUpPage" },
		"Scroll page down": { key: "PgDn", id: "workbench.action.terminal.scrollDownPage" },
		"Scroll to top": { key: "⌘Home", id: "workbench.action.terminal.scrollToTop" },
		"Scroll to bottom": { key: "⌘End", id: "workbench.action.terminal.scrollToBottom" },
	}
}


export function helperShortcuts(context: ExtensionContext) {
	const quickPick = window.createQuickPick();
	quickPick.items = Object.keys(driver).map(label => ({ label }));

	quickPick.onDidChangeSelection(selection => {
		quickPick.hide();

		if (selection[0]) {
			let strpicked: string = selection[0].label
			subQuickPick(strpicked)
			quickPick.hide();
		}
	});
	quickPick.onDidHide(() => quickPick.dispose());
	quickPick.show();
};

function subQuickPick(strpicked: string) {
	let picked: Category = driver[strpicked];
	const subquickPick = window.createQuickPick();
	subquickPick.items = Object.keys(picked).map(label => {
		let description: string = "";
		if (platform == "darwin") {
			description = picked[label].key || "";
		} else if (platform == "win32") {
			description = picked[label].wkey || "";
		} else if (platform == "linux") {
			// if missing linux key, use windows key if any
			description = picked[label].lkey || picked[label].wkey || "";
		}
		return { label, description }
	}
	);
	subquickPick.onDidChangeSelection(selection => {

		if (selection[0]) {
			let strpicked: string = selection[0].label
			if (picked[strpicked].id) {
				const commandId = picked[strpicked].id;
				if (commandId) {
					commands.executeCommand(commandId);
				}
			}
		}
	});

	subquickPick.onDidHide(() => subquickPick.dispose());
	subquickPick.show();

}

