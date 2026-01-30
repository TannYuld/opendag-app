import { initializeAssignmentView } from "../main";

const WorkspaceLocalStorageEntryKey = "assignment-1-ws";
const AssignmentSolvedStatusEntryKey = "assignment-1-can-proceed";

initializeAssignmentView(WorkspaceLocalStorageEntryKey, AssignmentSolvedStatusEntryKey, "yoow");