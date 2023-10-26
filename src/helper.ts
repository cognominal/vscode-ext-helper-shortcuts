/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { window, commands, ExtensionContext } from 'vscode';

type Command = {
	key: string;
	id: string;
};

type Category = {
	[command: string]: Command;
};

type Driver = {
	[category: string]: Category;
};


let driver: Driver = {
	"General": {
		"Show Command Palette": { key: "Ctrl+Shift+P", id: "workbench.action.showCommands" },
		"File: open file ": { key: "Ctrl+Shift+P", id: "workbench.action.files.openFile" },

	},
	"Basic Editing": {
		"Cut selection. Cut line on empty selection": { key: "Ctrl+Shift+P", id: "editor.action.clipboardCutAction" },
		"File: open file ": { key: "Ctrl+Shift+P", id: "editor.action.clipboardCopyAction" },
	},
	"Multi-cursor and selection ": {

	},
	"Search and replace": {
	},
	"Rich languages editing": {
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
	subquickPick.items = Object.keys(driver[strpicked]).map(label => ({ label }));
	subquickPick.onDidChangeSelection(selection => {
		
		if (selection[0]) {
			let strpicked: string = selection[0].label
			commands.executeCommand(picked[strpicked].id)
		}
	});
	
	subquickPick.onDidHide(() => subquickPick.dispose());
	subquickPick.show();

}

