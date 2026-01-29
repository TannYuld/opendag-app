import './style.css'
import * as Blockly from 'blockly';
import { htmlGenerator, introPageToolbox as toolbox } from './toolbox';

const nextButton = document.getElementById('nextButton');
let canProceed = false;

function setCanProceed(value: boolean) {
  canProceed = value;
  if (canProceed) {
    nextButton?.classList.add('bg-green-600 text-black hover:cursor-pointer');
    nextButton?.classList.remove('bg-gray-900 text-white hover:cursor-not-allowed');
  } else {
    nextButton?.classList.add('bg-gray-900 text-white hover:cursor-not-allowed');
    nextButton?.classList.remove('bg-green-600 text-black hover:cursor-pointer');
  }
}



const myDarkTheme = Blockly.Theme.defineTheme('dark-mode', {
  base: Blockly.Themes.Classic,
  name: "dark-mode", // Start with the standard look
  componentStyles: {
    // WORKSPACE BACKGROUND
    workspaceBackgroundColour: '#1e1e2e', // Dark blue-grey

    // TOOLBOX (MENU) BACKGROUND
    toolboxBackgroundColour: '#11111b',   // Very dark
    toolboxForegroundColour: '#ffffff',   // Text color

    // FLYOUT (The drawer that opens when you click a category)
    flyoutBackgroundColour: '#252525',
    flyoutOpacity: 0.8,

    // SCROLLBARS
    scrollbarColour: '#f5289100',
    scrollbarOpacity: 1
  },
  fontStyle: {
    family: '"Segoe UI", sans-serif', // Change font
    weight: 'bold',
    size: 12
  }
});

// 2. Apply it when injecting
const workspace = Blockly.inject('blocklyDiv', {
  toolbox: toolbox,
  theme: myDarkTheme, // <--- Apply your theme here
  renderer: 'zelos',
  grid: {
    spacing: 20,
    length: 3,
    colour: '#ccc', // Grid dots color
    snap: true
  }
});

function updatePreview() {

//   console.log("Generator Keys:", Object.keys(htmlGenerator));
// console.log("Button Function:", htmlGenerator['html_button']);
  // 1. Generate the code from blocks
  const innerHTML = htmlGenerator.workspaceToCode(workspace);

  // 2. Wrap it in a full HTML structure
  const fullHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: sans-serif; padding: 20px; }
          /* Optional: Add basic resets or defaults here */
        </style>
      </head>
      <body>
        ${innerHTML}
      </body>
    </html>
  `;

  // 3. Get the iframe
  const iframe = document.getElementById('previewFrame') as HTMLIFrameElement;
  
  // 4. Set the srcdoc attribute (Modern & Fast)
  if (iframe) {
    iframe.srcdoc = fullHTML;
  }
  
  console.log("Generated HTML:", fullHTML);
}

workspace.addChangeListener(updatePreview);

// // 3. Optional: Real-time Code Generation (Log to console)
// import { javascriptGenerator } from 'blockly/javascript';

// workspace.addChangeListener(() => {
//   const code = javascriptGenerator.workspaceToCode(workspace);
//   console.log("Generated Code:\n", code);
// });

