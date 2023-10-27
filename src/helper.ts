/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { window, commands, ExtensionContext } from 'vscode';

type Command = {
	key?: string; // keybinding, probably useless
	id: string;
};

type Category = {
	[command: string]: Command;
};

type Driver = {
	[category: string]: Category;
};


//  { key: "", id: "" },
let driver: Driver = {
	"General": {
		"Show Command Palette": { key: "F1", id: "workbench.action.showCommands" },
		"File: open file ": { key: "⌘P", id: "workbench.action.files.openFile" },

	},
	"Basic Editing": {
		"Cut selection. Cut line on empty selection": { key: "⌘X", id: "editor.action.clipboardCutAction" },
		"Copy Selection": { key: "⌘C", id: "editor.action.clipboardCopyAction" },
	},
	"Multi-cursor and selection ": {
		"Insert cursor above": { key: "⌥⌘↑", id: "editor.action.insertCursorAbove" },
		"Insert cursor below": { key: "⌥⌘↓", id: "editor.action.insertCursorBelow" },
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
	subquickPick.items = Object.keys(picked).map(label => ({ label, description: picked[label].key }));
	subquickPick.onDidChangeSelection(selection => {
		
		if (selection[0]) {
			let strpicked: string = selection[0].label
			commands.executeCommand(picked[strpicked].id)
		}
	});
	
	subquickPick.onDidHide(() => subquickPick.dispose());
	subquickPick.show();

}

