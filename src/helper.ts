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
		"Quick Open, Go to File…": { key: "⌘P", wkey: "Ctrl+P", id: "workbench.action.quickOpen" },
		"New window/instance": { key: "⌘N", wkey: "Ctrl+Shift+N", id: "workbench.action.newWindow" },
		"Close window/instance": { key: "⌘W", wkey: "Ctrl+Shift+W", id: "workbench.action.closeWindow" },
		"User Settings": { key: "⌘,", id: "workbench.action.openSettings" },
		"Keyboard Shortcuts": { key: "⌘K ⌘S", id: "workbench.action.openGlobalKeybindings" },
	},
	"Basic Editing": {
		"Cut selection. Cut line on empty selection": { key: "⌘X", id: "editor.action.clipboardCutAction" },
		"Copy Selection": { key: "⌘C", id: "editor.action.clipboardCopyAction" },
	},
	"Multi-cursor and selection ": {
		"click Insert cursor": { key: "⌥Click" },
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
		"Replace": { key: "⌥⌘F", id: "editor.action.startFindReplaceAction" },
		"Find next": { key: "⌘G", id: "editor.action.nextMatchFindAction" },
		"Find previous": { key: "⇧⌘G", id: "editor.action.previousMatchFindAction" },
		"Select all occurrences of Find match": { key: "⌘F2", id: "editor.action.selectHighlights" },
		"Add selection to next Find match": { key: "⌘D", id: "editor.action.addSelectionToNextFindMatch" },
		"Move last selection to next Find match": { key: "", id: "editor.action.moveSelectionToNextFindMatch" },
	},
	"Rich languages editing": {
		"Trigger parameter hints": { key: "⌘Space", id: "editor.action.triggerParameterHints" },
		"Format document": { key: "⇧⌥F", id: "editor.action.formatDocument" },
		"Format selection": { key: "⌘K ⌘F", id: "editor.action.formatSelection" },
		"Go to Definition": { key: "F12", id: "editor.action.goToDeclaration" },
		"Peek Definition": { key: "⌥F12", id: "editor.action.peekDefinition" },
		"Open Definition to the side": { key: "⌘K F12", id: "editor.action.revealDefinitionAside" },
		"Quick Fix": { key: "⌘.", id: "editor.action.quickFix" },
		"Show References": { key: "⇧F12", id: "editor.action.referenceSearch.trigger" },
		"Rename Symbol": { key: "F2", id: "editor.action.rename" },
		"Trim trailing whitespace": { key: "⌘K ⌘X", id: "editor.action.trimTrailingWhitespace" },
		"Change file language": { key: "⌘K M", id: "workbench.action.editor.changeLanguageMode" },
	},
	"Navigation": {
		"Show all Symbols": { key: "⌘T", id: "workbench.action.showAllSymbols" },
		"Go to Line...": { key: "⌃G", id: "workbench.action.gotoLine" },
		"Go to File...": { key: "⌘P", id: "workbench.action.quickOpen" },
		"Go to Symbol...": { key: "⇧⌘O", id: "workbench.action.gotoSymbol" },
		"Show Problems panel": { key: "⇧⌘M", id: "workbench.action.showErrorsWarnings" },
		"Go to next error or warning": { key: "F8", id: "editor.action.marker.next" },
		"Go to /previous error or warning": { key: "⇧F8", id: "editor.action.marker.prev" },
		"Navigate editor group history": { key: "⌃⇧Tab", id: "workbench.action.openPreviousEditor" },
		"Go back/forward": { key: "⌃-", id: "workbench.action.navigateBack" },
		"Go forward": { key: "⌃⇧-", id: "workbench.action.navigateForward" },
		"Toggle Tab moves focus": { key: "⌃⇧M", id: "workbench.action.toggleTabFocusMode" },
	},
	"Editor management": {
		"Close editor": { key: "⌘W", id: "workbench.action.closeActiveEditor" },
		"Close folder": { key: "⌘K F", id: "workbench.action.closeFolder" },
		"Split editor": { key: "⌘\\", id: "workbench.action.splitEditor" },
		"Focus into 1st editor subgroup": { key: "⌘1", id: "workbench.action.focusFirstEditorGroup" },
		"Focus into 2nd editor subgroup": { key: "⌘2", id: "workbench.action.focusSecondEditorGroup" },
		"Focus into previous editor group": { key: "⌘K ⌘←", id: "workbench.action.focusPreviousGroup" },
		"Focus into next editor group": { key: "⌘K ⌘→", id: "workbench.action.focusNextGroup" },
		"Move editor left": { key: "⌘K ⇧⌘←", id: "workbench.action.moveEditorLeftInGroup" },
		"Move editor right": { key: "⌘K ⇧⌘→", id: "workbench.action.moveEditorRightInGroup" },
		"Move active editor group left": { key: "⌘K ⌘←", id: "workbench.action.moveActiveEditorGroupLeft" },
		"Move active editor group right": { key: "⌘K ⌘→", id: "workbench.action.moveActiveEditorGroupRight" },
	},
	"File management": {
		"New File": { key: "⌘N", id: "explorer.newFile" },
		"Open File...": { key: "⌘O", id: "explorer.openFile" },
		"Save": { key: "⌘S", id: "explorer.save" },
		"Save As...": { key: "⇧⌘S", id: "explorer.saveAs" },
		"Save All": { key: "⌥⌘S", id: "explorer.saveAll" },
		"Close": { key: "⌘W", id: "explorer.close" },
		"Close All": { key: "⌘K ⌘W", id: "explorer.closeAll" },
		"Reopen closed editor": { key: "⌘⇧T", id: "explorer.reopenClosedEditor" },
		"Keep preview mode editor open": { key: "⌘K Enter", id: "explorer.keepPreviewEditor" },
		"Open next": { key: "⌘K →", id: "explorer.openNext" },
		"Open previous": { key: "⌘K ←", id: "explorer.openPrevious" },
		"Copy path of active file": { key: "⌘K P", id: "explorer.copyPathOfActiveFile" },
		"Reveal active file in Finder": { key: "⌘K R", id: "explorer.revealActiveFileInFinder" },
		"Show active file in new window/instance": { key: "⌘K O", id: "explorer.showInNewWindow" },
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

