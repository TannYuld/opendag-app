import { createBlocklyInstance, updatePreview } from "./main";

const executeButton = document.getElementById("execute-code") as HTMLElement;
const resetButton = document.getElementById("reset-code") as HTMLElement;

const workspace = createBlocklyInstance();

executeButton.onclick = () => {updatePreview(workspace);}
resetButton.onclick = () => {
    workspace.clear();
    updatePreview(workspace);
}