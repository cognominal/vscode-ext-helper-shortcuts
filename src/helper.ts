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
§        "Show Command Palette": { key: "F1", wkey: "F1", id: "workbench.action.showCommands" },
        "File: open file ": { key: "⌘P", wkey: "Ctrl+P", id: "workbench.action.files.openFile" },
        "Quick Open, Go to File…": { key: "⌘P", wkey: "Ctrl+P", id: "workbench.action.quickOpen" },
        "New window/instance": { key: "⌘N", wkey: "Ctrl+Shift+N", id: "workbench.action.newWindow" },
        "Close window/instance": { key: "⌘W", wkey: "Ctrl+Shift+W", id: "workbench.action.closeWindow" },
        "User Settings": { key: "⌘,", wkey: "Ctrl+,", id: "workbench.action.openSettings" },
        "Keyboard Shortcuts": { key: "⌘K ⌘S", wkey: "Ctrl+K Ctrl+S", id: "workbench.action.openGlobalKeybindings" },
    },
	"Basic Editing": {
		"Cut selection. Cut line on empty selection": { key: "⌘X", wkey: "Ctrl+X", id: "editor.action.clipboardCutAction" },
		"Copy Selection": { key: "⌘C", wkey: "Ctrl+C", id: "editor.action.clipboardCopyAction" },
		"Copy line (empty selection": { key: "⌘C", wkey: "Ctrl+C", id: "editor.action.clipboardCopyAction" },
		"Move line down": { key: "⌥↓", wkey: "Alt+Down", id: "editor.action.moveLinesDownAction" },
		"Move line up": { key: "⌥↑", wkey: "Alt+Up", id: "editor.action.moveLinesUpAction" },
		"Copy line down": { key: "⇧⌥↓", wkey: "Shift+Alt+Down", id: "editor.action.copyLinesDownAction" },
		"Copy line up": { key: "⇧⌥↑", wkey: "Shift+Alt+Up", id: "editor.action.copyLinesUpAction" },
		"Delete line": { key: "⇧⌘K", wkey: "Shift+Ctrl+K", id: "editor.action.deleteLines" },
		"Insert line below": { key: "⌘Enter", wkey: "Ctrl+Enter", id: "editor.action.insertLineAfter" },
		"Insert line above": { key: "⇧⌘Enter", wkey: "Shift+Ctrl+Enter", id: "editor.action.insertLineBefore" },
		"Jump to matching bracket": { key: "⇧⌘\\", wkey: "Shift+Ctrl+\\", id: "editor.action.jumpToBracket" },
		"Indent line": { key: "⌘]", wkey: "Ctrl+]", id: "editor.action.indentLines" },
		"outdent line": { key: "⌘[", wkey: "Ctrl+[", id: "editor.action.outdentLines" },
		"Go to beginning of line": { key: "Home", wkey: "Home", id: "cursorHome" },
		"Go end of line": { key: "End", wkey: "End", id: "cursorEnd" },
		"Go to beginning of file": { key: "⌘↑", wkey: "Ctrl+Up", id: "cursorTop" },
		"Go to end of file": { key: "⌘↓", wkey: "Ctrl+Down", id: "cursorBottom" },
		"Scroll line up": { key: "⌃PgUp", wkey: "Ctrl+PgUp", id: "scrollLineUp" },
		"Scroll page down": { key: "⌘PgDown", wkey: "Ctrl+PgDown", id: "scrollPageDown" },
		"Fold region": { key: "⌥⌘[", wkey: "Alt+Ctrl+[", id: "editor.fold" },
		"Unfold region": { key: "⌥⌘]", wkey: "Alt+Ctrl+]", id: "editor.unfold" },
		"Fold all subregions": { key: "⌘K ⌘[", wkey: "Ctrl+K Ctrl+[", id: "editor.foldRecursively" },
		"Unfold all subregions": { key: "⌘K ⌘]", wkey: "Ctrl+K Ctrl+]", id: "editor.unfoldRecursively" },
		"Fold all regions": { key: "⌘K ⌘0", wkey: "Ctrl+K Ctrl+0", id: "editor.foldAll" },
		"Unfold all regions": { key: "⌘K ⌘J", wkey: "Ctrl+K Ctrl+J", id: "editor.unfoldAll" },
		"Add line comment": { key: "⌘/", wkey: "Ctrl+/", id: "editor.action.addCommentLine" },
		"Remove line comment": { key: "⌘K ⌘U", wkey: "Ctrl+K Ctrl+U", id: "editor.action.removeCommentLine" },
		"Toggle line comment": { key: "⌘/", wkey: "Ctrl+/", id: "editor.action.commentLine" },
		"Toggle block comment": { key: "⇧⌥A", wkey: "Shift+Alt+A", id: "editor.action.blockComment" },
		"Toggle word wrap": { key: "⌥Z", wkey: "Alt+Z", id: "editor.action.toggleWordWrap" },		
	},
	"Multi-cursor and selection ": {
		"click Insert cursor": { key: "⌥Click", wkey: "Alt+Click" },
		"Insert cursor above": { key: "⌥⌘↑", wkey: "Alt+Ctrl+Up", id: "editor.action.insertCursorAbove" },
		"Insert cursor below": { key: "⌥⌘↓", wkey: "Alt+Ctrl+Down", id: "editor.action.insertCursorBelow" },
		"Insert cursor at end of each line selected": { key: "⇧⌥I", wkey: "Shift+Alt+I", id: "editor.action.insertCursorAtEndOfEachLineSelected" },
		"Select current line": { key: "⌘L", wkey: "Ctrl+L", id: "editor.action.selectLines" },
		"Select all occurrences of current selection": { key: "⇧⌘L", wkey: "Shift+Ctrl+L", id: "editor.action.selectHighlights" },
		"Select all occurrences of current word": { key: "⌘F2", wkey: "Ctrl+F2", id: "editor.action.changeAll" },
		"Expand selection": { key: "⌃⇧⌘→", wkey: "Ctrl+Shift+Alt+→", id: "editor.action.smartSelect.expand" },
		"Shrink selection": { key: "⌃⇧⌘→", wkey: "Ctrl+Shift+Alt+→", id: "editor.action.smartSelect.shrink" },
		"Column (box) selection up": { key: "⇧⌥⌘↑", wkey: "Shift+Alt+Ctrl+Up", id: "editor.action.insertCursorAbove" },
		"Column (box) selection down": { key: "⇧⌥⌘↓", wkey: "Shift+Alt+Ctrl+Down", id: "editor.action.insertCursorBelow" },
		"Column (box) selection left": { key: "⇧⌥⌘←", wkey: "Shift+Alt+Ctrl+←", id: "editor.action.columnSelectLeft" },
		"Column (box) selection right": { key: "⇧⌥⌘→", wkey: "Shift+Alt+Ctrl+→", id: "editor.action.columnSelectRight" },
		"Column (box) selection page up": { key: "⇧⌥⌘PgUp", wkey: "Shift+Alt+Ctrl+PgUp", id: "editor.action.columnSelectPageUp" },
		"Column (box) selection page down": { key: "⇧⌥⌘PgDn", wkey: "Shift+Alt+Ctrl+PgDn", id: "editor.action.columnSelectPageDown" },
	},	
	"Search and replace": {
		"Find": { key: "⌘F", wkey: "Ctrl+F", id: "actions.find" },
		"Replace": { key: "⌥⌘F", wkey: "Alt+Ctrl+F", id: "editor.action.startFindReplaceAction" },
		"Find next": { key: "⌘G", wkey: "Ctrl+G", id: "editor.action.nextMatchFindAction" },
		"Find previous": { key: "⇧⌘G", wkey: "Shift+Ctrl+G", id: "editor.action.previousMatchFindAction" },
		"Select all occurrences of Find match": { key: "⌘F2", wkey: "Ctrl+F2", id: "editor.action.selectHighlights" },
		"Add selection to next Find match": { key: "⌘D", wkey: "Ctrl+D", id: "editor.action.addSelectionToNextFindMatch" },
		"Move last selection to next Find match": { key: "", wkey: "", id: "editor.action.moveSelectionToNextFindMatch" },
		"Toggle case-sensitive": { key: "⌥⌘C", wkey: "Alt+C", id: "toggleSearchCaseSensitive" },
		"Toggle regex": { key: "⌥⌘R", wkey: "Alt+R", id: "toggleSearchRegex" },
		"Toggle whole word": { key: "⌥⌘W", wkey: "Alt+W", id: "toggleSearchWholeWord" },
	},
	"Rich languages editing": {
		"Trigger parameter hints": { key: "⌘Space", wkey: "Ctrl+Space", id: "editor.action.triggerParameterHints" },
		"Format document": { key: "⇧⌥F", wkey: "Shift+Alt+F", id: "editor.action.formatDocument" },
		"Format selection": { key: "⌘K ⌘F", wkey: "Ctrl+K Ctrl+F", id: "editor.action.formatSelection" },
		"Go to Definition": { key: "F12", wkey: "F12", id: "editor.action.goToDeclaration" },
		"Peek Definition": { key: "⌥F12", wkey: "Alt+F12", id: "editor.action.peekDefinition" },
		"Open Definition to the side": { key: "⌘K F12", wkey: "Ctrl+K F12", id: "editor.action.revealDefinitionAside" },
		"Quick Fix": { key: "⌘.", wkey: "Ctrl+.", id: "editor.action.quickFix" },
		"Show References": { key: "⇧F12", wkey: "Shift+F12", id: "editor.action.referenceSearch.trigger" },
		"Rename Symbol": { key: "F2", wkey: "F2", id: "editor.action.rename" },
		"Trim trailing whitespace": { key: "⌘K ⌘X", wkey: "Ctrl+K Ctrl+X", id: "editor.action.trimTrailingWhitespace" },
		"Change file language": { key: "⌘K M", wkey: "Ctrl+K M", id: "workbench.action.editor.changeLanguageMode" },
	},
		"Navigation": {
		"Show all Symbols": { key: "⌘T", wkey: "Ctrl+T", id: "workbench.action.showAllSymbols" },
		"Go to Line...": { key: "⌃G", wkey: "Ctrl+G", id: "workbench.action.gotoLine" },
		"Go to File...": { key: "⌘P", wkey: "Ctrl+P", id: "workbench.action.quickOpen" },
		"Go to Symbol...": { key: "⇧⌘O", wkey: "Shift+Ctrl+O", id: "workbench.action.gotoSymbol" },
		"Show Problems panel": { key: "⇧⌘M", wkey: "Shift+Ctrl+M", id: "workbench.action.showErrorsWarnings" },
		"Go to next error or warning": { key: "F8", wkey: "F8", id: "editor.action.marker.next" },
		"Go to /previous error or warning": { key: "⇧F8", wkey: "Shift+F8", id: "editor.action.marker.prev" },
		"Navigate editor group history": { key: "⌃⇧Tab", wkey: "Ctrl+Shift+Tab", id: "workbench.action.openPreviousEditor" },
		"Go back/forward": { key: "⌃-", wkey: "Ctrl+-", id: "workbench.action.navigateBack" },
		"Go forward": { key: "⌃⇧-", wkey: "Ctrl+Shift+-", id: "workbench.action.navigateForward" },
		"Toggle Tab moves focus": { key: "⌃⇧M", wkey: "Ctrl+Shift+M", id: "workbench.action.toggleTabFocusMode" },
	},
	"Editor management": {
		"Close editor": { key: "⌘W", wkey: "Ctrl+W", id: "workbench.action.closeActiveEditor" },
		"Close folder": { key: "⌘K F", wkey: "Ctrl+K F", id: "workbench.action.closeFolder" },
		"Split editor": { key: "⌘\\", wkey: "Ctrl+\\", id: "workbench.action.splitEditor" },
		"Focus into 1st editor subgroup": { key: "⌘1", wkey: "Ctrl+1", id: "workbench.action.focusFirstEditorGroup" },
		"Focus into 2nd editor subgroup": { key: "⌘2", wkey: "Ctrl+2", id: "workbench.action.focusSecondEditorGroup" },
		"Focus into previous editor group": { key: "⌘K ⌘←", wkey: "Ctrl+K Ctrl+←", id: "workbench.action.focusPreviousGroup" },
		"Focus into next editor group": { key: "⌘K ⌘→", wkey: "Ctrl+K Ctrl+→", id: "workbench.action.focusNextGroup" },
		"Move editor left": { key: "⌘K ⇧⌘←", wkey: "Ctrl+K Shift+Ctrl+←", id: "workbench.action.moveEditorLeftInGroup" },
		"Move editor right": { key: "⌘K ⇧⌘→", wkey: "Ctrl+K Shift+Ctrl+→", id: "workbench.action.moveEditorRightInGroup" },
		"Move active editor group left": { key: "⌘K ⌘←", wkey: "Ctrl+K Ctrl+←", id: "workbench.action.moveActiveEditorGroupLeft" },
		"Move active editor group right": { key: "⌘K ⌘→", wkey: "Ctrl+K Ctrl+→", id: "workbench.action.moveActiveEditorGroupRight" },
	},
		"File management": {
		"New File": { key: "⌘N", wkey: "Ctrl+N", id: "explorer.newFile" },
		"Open File...": { key: "⌘O", wkey: "Ctrl+O", id: "explorer.openFile" },
		"Save": { key: "⌘S", wkey: "Ctrl+S", id: "explorer.save" },
		"Save As...": { key: "⇧⌘S", wkey: "Shift+Ctrl+S", id: "explorer.saveAs" },
		"Save All": { key: "⌥⌘S", wkey: "Alt+Ctrl+S", id: "explorer.saveAll" },
		"Close": { key: "⌘W", wkey: "Ctrl+W", id: "explorer.close" },
		"Close All": { key: "⌘K ⌘W", wkey: "Ctrl+K Ctrl+W", id: "explorer.closeAll" },
		"Reopen closed editor": { key: "⌘⇧T", wkey: "Ctrl+Shift+T", id: "explorer.reopenClosedEditor" },
		"Keep preview mode editor open": { key: "⌘K Enter", wkey: "Ctrl+K Enter", id: "explorer.keepPreviewEditor" },
		"Open next": { key: "⌘K →", wkey: "Ctrl+K →", id: "explorer.openNext" },
		"Open previous": { key: "⌘K ←", wkey: "Ctrl+K ←", id: "explorer.openPrevious" },
		"Copy path of active file": { key: "⌘K P", wkey: "Ctrl+K P", id: "explorer.copyPathOfActiveFile" },
		"Reveal active file in Finder": { key: "⌘K R", wkey: "Ctrl+K R", id: "explorer.revealActiveFileInFinder" },
		"Show active file in new window/instance": { key: "⌘K O", wkey: "Ctrl+K O", id: "explorer.showInNewWindow" },
	},	
	"Display": {
		"Toggle full screen": { key: "⌃⌘F", wkey: "Ctrl+Win+F", id: "workbench.action.toggleFullScreen" },
		"Toggle editor layout (horizontal/vertical)": { key: "⌥⌘0", wkey: "Alt+Ctrl+0", id: "workbench.action.toggleEditorGroupLayout" },
		"Zoom in": { key: "⌘=", wkey: "Ctrl+=", id: "workbench.action.zoomIn" },
		"Zoom out": { key: "⇧⌘-", wkey: "Shift+Ctrl+-", id: "workbench.action.zoomOut" },
		"Toggle Sidebar visibility": { key: "⌘B", wkey: "Ctrl+B", id: "workbench.action.toggleSidebarVisibility" },
		"Show Explorer / Toggle focus": { key: "⇧⌘E", wkey: "Shift+Ctrl+E", id: "workbench.view.explorer" },
		"Show Search": { key: "⇧⌘F", wkey: "Shift+Ctrl+F", id: "workbench.view.search" },
		"Show Source Control": { key: "⌃⇧G", wkey: "Ctrl+Shift+G", id: "workbench.view.scm" },
		"Show Debug": { key: "⇧⌘D", wkey: "Shift+Ctrl+D", id: "workbench.view.debug" },
		"Show Extensions": { key: "⇧⌘X", wkey: "Shift+Ctrl+X", id: "workbench.view.extensions" },
		"Replace in files": { key: "⇧⌘H", wkey: "Shift+Ctrl+H", id: "workbench.action.replaceInFiles" },
		"Toggle Search details": { key: "⇧⌘J", wkey: "Shift+Ctrl+J", id: "search.action.toggleQueryDetails" },
		"Show Output panel": { key: "⇧⌘U", wkey: "Shift+Ctrl+U", id: "workbench.action.output.toggleOutput" },
		"Open Markdown preview": { key: "⇧⌘V", wkey: "Shift+Ctrl+V", id: "markdown.showPreview" },
		"Open Markdown preview to the side": { key: "⌘K V", wkey: "Ctrl+K V", id: "markdown.showPreviewToSide" },
		"Zen Mode (Esc Esc to exit)": { key: "⌘K Z", wkey: "Ctrl+K Z", id: "workbench.action.toggleZenMode" },
	},
		"Debug": {
		"Toggle breakpoint": { key: "F9", wkey: "F9", id: "editor.debug.action.toggleBreakpoint" },
		"Start/Continue": { key: "F5", wkey: "F5", id: "workbench.action.debug.start" },
		"Step into": { key: "F11", wkey: "F11", id: "workbench.action.debug.stepInto" },
		"Step out": { key: "⇧F11", wkey: "Shift+F11", id: "workbench.action.debug.stepOut" },
		"Step over": { key: "F10", wkey: "F10", id: "workbench.action.debug.stepOver" },
		"Stop": { key: "⇧F5", wkey: "Shift+F5", id: "workbench.action.debug.stop" },
		"Show hover": { key: "⌘K ⌘I", wkey: "Ctrl+K Ctrl+I", id: "editor.debug.action.showDebugHover" },
	},
	"Integrated terminal": {
		"Show integrated terminal": { key: "⌃`", wkey: "Ctrl+`", id: "workbench.action.terminal.toggleTerminal" },
		"Create new terminal": { key: "⌃⇧`", wkey: "Ctrl+Shift+`", id: "workbench.action.terminal.new" },
		"Copy selection": { key: "⌘C", wkey: "Ctrl+C", id: "workbench.action.terminal.copySelection" },
		"Scroll up": { key: "⌘↑", wkey: "Ctrl+Up", id: "workbench.action.terminal.scrollUp" },
		"Scroll down": { key: "⌘↓", wkey: "Ctrl+Down", id: "workbench.action.terminal.scrollDown" },
		"Scroll page up": { key: "PgUp", wkey: "PgUp", id: "workbench.action.terminal.scrollUpPage" },
		"Scroll page down": { key: "PgDn", wkey: "PgDn", id: "workbench.action.terminal.scrollDownPage" },
		"Scroll to top": { key: "⌘Home", wkey: "Ctrl+Home", id: "workbench.action.terminal.scrollToTop" },
		"Scroll to bottom": { key: "⌘End", wkey: "Ctrl+End", id: "workbench.action.terminal.scrollToBottom" },
	},	
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

