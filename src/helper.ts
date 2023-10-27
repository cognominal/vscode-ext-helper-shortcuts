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
		"File: open file ": { key: "⌘P", wkey: "Ctrl+P",  id:"workbench.action.files.openFile" },
		
	},
	"Basic Editing": {
		"Cut selection. Cut line on empty selection": { key: "⌘X", id: "editor.action.clipboardCutAction" },
		"Copy Selection": { key: "⌘C", id: "editor.action.clipboardCopyAction" },
	},
	"Multi-cursor and selection ": {
		"Insert cursor above": { key: "⌥⌘↑", id: "editor.action.insertCursorAbove" },
		"Insert cursor below": { key: "⌥⌘↓", id: "editor.action.insertCursorBelow" },
		"": { key: "", id: "" },
		// ⇧⌥I 
		"Insert cursor at end of each line selected": { key: "⇧⌥I", id: "editor.action.insertCursorAtEndOfEachLineSelected" },
		// ⌘L 
		"Select current line": { key: "⌘L", id: "editor.action.selectLines" },
		// ⇧⌘L 
		"Select all occurrences of current selection": { key: "⇧⌘L", id: "editor.action.selectHighlights" },
		// ⌘F2 
		"Select all occurrences of current word": { key: "⌘F2", id: "editor.action.changeAll" },
		// ⌃⇧⌘→ / ← 
		"Expand selection": { key: "⌃⇧⌘→", id: "editor.action.smartSelect.expand" },
		"Shrink selection": { key: "⌃⇧⌘→", id: "editor.action.smartSelect.shrink" },
		// ⇧⌥ + "drag mouse Column (box) selection":
		// ⇧⌥⌘↑ 
		"Column (box) selection up": { key: "⇧⌥⌘↑", id: "editor.action.insertCursorAbove" },
		// ⇧⌥⌘↓ 
		"Column (box) selection down": { key: "⇧⌥⌘↓", id: "editor.action.insertCursorBelow" },
		// ⇧⌥⌘←  
		"Column (box) selection left": { key: "⇧⌥⌘←", id: "editor.action.columnSelectLeft" },
		// ⇧⌥⌘→ 
		"Column (box) selection right": { key: "⇧⌥⌘→", id: "editor.action.columnSelectRight" },
		// ⇧⌥⌘PgUp 
		"Column (box) selection page up": { key: "⇧⌥⌘PgUp", id: "editor.action.columnSelectPageUp"},
		// ⇧⌥⌘PgDn 
		"Column (box) selection page down": { key: "⇧⌥⌘PgDn", id: "editor.action.columnSelectPageDown" }, 
	},
	"Search and replace": {
		"Find": {  key: "⌘F", id: "actions.find" },
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
	},
	"Debug": {
	},
	"Integrated terminal": {
		// ⌃` Show integrated terminal
		// ⌃⇧` Create new terminal
		// ⌘C Copy selection
		// ⌘↑ / ↓ Scroll up/down
		// PgUp / PgDn Scroll page up/down
		// ⌘Home / End Scroll to top/bottom		
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

function subQuickPick(strpicked : string) {
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

