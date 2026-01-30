import './style.css'
import * as Blockly from 'blockly';
import { htmlGenerator, introPageToolbox as toolbox } from './toolbox';

export class ObservableBool {
	private callback: (newState: boolean) => void;
	private state: boolean;

	public constructor(callBack: (newState: boolean) => void, initialState?: boolean) {
		this.callback = callBack;
		this.state = initialState ?? false;
	}

	public setState(newState: boolean) {
		this.state = newState;
		this.callback(newState);
	}

	public getState(): boolean {
		return this.state;
	}
}

const darkTheme = Blockly.Theme.defineTheme('dark-mode', {
	base: Blockly.Themes.Classic,
	name: "dark-mode",
	componentStyles: {
		workspaceBackgroundColour: '#1e1e2e',

		toolboxBackgroundColour: '#11111b',
		toolboxForegroundColour: '#ffffff',

		flyoutBackgroundColour: '#252525',
		flyoutOpacity: 0.8,

		scrollbarColour: '#f5289100',
		scrollbarOpacity: 1
	},
	fontStyle: {
		family: '"Segoe UI", sans-serif',
		weight: 'bold',
		size: 12
	}
});

export function createBlocklyInstance(): Blockly.WorkspaceSvg {
	return Blockly.inject('blocklyDiv', {
		toolbox: toolbox,
		theme: darkTheme,
		renderer: 'zelos',
		grid: {
			spacing: 20,
			length: 3,
			colour: '#ccc',
			snap: true
		},
		zoom: {
			controls: true,
			wheel: true,
			startScale: 1.0,
			maxScale: 3,
			minScale: 0.3,
			scaleSpeed: 1.05,
			pinch: true
		}
	});
}

export function isPreviewMetHtmlConditions(workspace: Blockly.Workspace, htmlDoc: string): boolean {
	const innerHTML = htmlGenerator.workspaceToCode(workspace);
	return htmlDoc == innerHTML;
}

export function updatePreview(workspace: Blockly.Workspace) {
	const innerHTML = htmlGenerator.workspaceToCode(workspace);

	const fullHTML = `
    <!DOCTYPE html>
    <html>
      	<head>
			<style>
				body { font-family: sans-serif; padding: 20px; }
				button {
					border-radius: 15px;
					border: 2px solid #1C6EA4;
					transition: filter 0.2s ease;
				}
				button:hover {
					cursor: pointer;
				}	
				button:hover {
					filter: brightness(1.1); /* Increases brightness by 10% */
				}
				button:active {
					filter: brightness(0.9);
				}
			</style>
      	</head>
      	<body>
        	${innerHTML}
      	</body>
    </html>
  `;

	const iframe = document.getElementById('previewFrame') as HTMLIFrameElement;

	if (iframe) {
		iframe.srcdoc = fullHTML;
	}
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function initializeAssignmentView(workspaceLocalStorageEntryKey: string, assignmentSolvedStatusEntryKey: string, targetHtml: string) {
	const executeButton = document.getElementById("execute-code") as HTMLElement;
	const resetButton = document.getElementById("reset-code") as HTMLElement;
	const hintButton = document.getElementById("hint-button") as HTMLElement;
	const nextButton = document.getElementById("next-button") as HTMLElement;
	const skipButton = document.getElementById("skip-button") as HTMLElement;

	const savedWorkspaceData = localStorage.getItem(workspaceLocalStorageEntryKey);
	const storedWorkspace: Blockly.WorkspaceSvg | null = savedWorkspaceData ? JSON.parse(savedWorkspaceData) : null;
	const initialState = localStorage.getItem(assignmentSolvedStatusEntryKey) as (boolean | null);

	const workspace = createBlocklyInstance();
	const canProceed = new ObservableBool((newState) => {
		if (newState) {
			assignmentSolved();
		}
	}, initialState ?? false);

	if (storedWorkspace) {
		Blockly.serialization.workspaces.load(storedWorkspace, workspace);
		executeCode();
	}

	if (canProceed.getState()) {
		skipButton.hide();
		hintButton.hide();
	} else {
		nextButton.hide();
		skipButton.hide();
	}

	function assignmentSolved() {
		skipButton.hide();
		hintButton.hide();
		nextButton.show();
		localStorage.setItem(assignmentSolvedStatusEntryKey, "true");
	}

	function getHint() {
		hintButton.hide();
		skipButton.show();
	}

	function executeCode() {
		updatePreview(workspace);
		const state = Blockly.serialization.workspaces.save(workspace);
		localStorage.setItem(workspaceLocalStorageEntryKey, JSON.stringify(state));

		if (isPreviewMetHtmlConditions(workspace, targetHtml)) {
			canProceed.setState(true);
		}
	}

	function resetCode() {
		workspace.clear();
		updatePreview(workspace);
		localStorage.removeItem(workspaceLocalStorageEntryKey);
	}

	executeButton.onclick = executeCode;
	resetButton.onclick = resetCode;
	hintButton.onclick = getHint;
}

HTMLElement.prototype.show = function () {
	this.classList.remove("hidden");
};

HTMLElement.prototype.hide = function () {
	this.classList.add("hidden");
};

