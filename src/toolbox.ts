import * as Blockly from 'blockly';
import { FieldColour, registerFieldColour } from '@blockly/field-colour';

registerFieldColour();

// --- CSS WRAPPER (The Aggregator) ---
Blockly.Blocks['css_style_wrapper'] = {
    init: function () {
        this.appendStatementInput("STYLES_STACK")
            .setCheck("CSS_PROPERTY") // Only accepts CSS property blocks
            .appendField("Style Group");
        this.setOutput(true, "CSS"); // Plugins into HTML blocks
        this.setColour(230);
        this.setTooltip("Groups multiple CSS properties together");
    }
};

// --- CSS PROPERTIES (Now Stackable Statements) ---

Blockly.Blocks['css_color'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Color")
            .appendField(new FieldColour("#ff0000"), "COLOR_VAL");
        // Changed: No longer setOutput. Now it stacks.
        this.setPreviousStatement(true, "CSS_PROPERTY");
        this.setNextStatement(true, "CSS_PROPERTY");
        this.setColour(230);
    }
};

Blockly.Blocks['css_bg_color'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Background")
            .appendField(new FieldColour("#0000ff"), "BG_VAL");
        this.setPreviousStatement(true, "CSS_PROPERTY");
        this.setNextStatement(true, "CSS_PROPERTY");
        this.setColour(230);
    }
};

Blockly.Blocks['css_width'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Width")
            .appendField(new Blockly.FieldNumber(100), "WIDTH_VAL")
            .appendField("px");
        this.setPreviousStatement(true, "CSS_PROPERTY");
        this.setNextStatement(true, "CSS_PROPERTY");
        this.setColour(230);
    }
};

// --- HTML BLOCKS (Containers) ---

Blockly.Blocks['html_div'] = {
    init: function () {
        this.appendValueInput("STYLES")
            .setCheck("CSS")
            .appendField("Container (div)");
        this.appendStatementInput("CHILDREN")
            .setCheck(null); // Accepts any block as a child
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("A generic container block");
    }
};

Blockly.Blocks['html_p'] = {
    init: function () {
        this.appendValueInput("STYLES")
            .setCheck("CSS")
            .appendField("Paragraph (p)");
        this.appendDummyInput()
            .appendField("Text:")
            .appendField(new Blockly.FieldTextInput("Hello World"), "TEXT_CONTENT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
    }
};

Blockly.Blocks['html_button'] = {
    init: function () {
        this.appendValueInput("STYLES")
            .setCheck("CSS")
            .appendField("Button");
        this.appendDummyInput()
            .appendField("Label:")
            .appendField(new Blockly.FieldTextInput("Click Me"), "LABEL");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(20);
    }
};

Blockly.Blocks['html_a'] = {
    init: function () {
        this.appendValueInput("STYLES")
            .setCheck("CSS")
            .appendField("Link (a)");
        this.appendDummyInput()
            .appendField("URL:")
            .appendField(new Blockly.FieldTextInput("https://google.com"), "URL")
            .appendField("Text:")
            .appendField(new Blockly.FieldTextInput("Go to Google"), "TEXT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
    }
};

// You don't need the "CustomGenerator" interface hack anymore 
// because 'forBlock' is a standard property!
export const htmlGenerator = new Blockly.Generator('HTML');

// --- HELPER: Process CSS Inputs ---
// 'scrub_' is a special internal method, so it STILL goes directly on the object.
htmlGenerator.scrub_ = function (block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : htmlGenerator.blockToCode(nextBlock);
    return code + nextCode;
};

// --- CSS GENERATORS ---
// NOTICE: We now use .forBlock['...']

htmlGenerator.forBlock['css_style_wrapper'] = function (block: any, generator: any) {
    // It's cleaner to use the 'generator' argument passed in, 
    // but using 'htmlGenerator' from the outer scope works too.
    const styles = generator.statementToCode(block, 'STYLES_STACK');
    return [styles.trim(), 0];
};

htmlGenerator.forBlock['css_color'] = function (block: any) {
    const color = block.getFieldValue('COLOR_VAL');
    return `color: ${color}; `;
};

htmlGenerator.forBlock['css_bg_color'] = function (block: any) {
    const color = block.getFieldValue('BG_VAL');
    return `background-color: ${color}; `;
};

htmlGenerator.forBlock['css_width'] = function (block: any) {
    const width = block.getFieldValue('WIDTH_VAL');
    return `width: ${width}px; `;
};

// --- HTML GENERATORS ---

htmlGenerator.forBlock['html_div'] = function (block: any, generator: any) {
    const styles = generator.valueToCode(block, 'STYLES', 0) || '';
    const children = generator.statementToCode(block, 'CHILDREN');
    return `<div style="${styles.trim()}">\n${children}\n</div>\n`;
};

htmlGenerator.forBlock['html_p'] = function (block: any, generator: any) {
    const styles = generator.valueToCode(block, 'STYLES', 0) || '';
    const text = block.getFieldValue('TEXT_CONTENT');
    return `<p style="${styles.trim()}">${text}</p>\n`;
};

htmlGenerator.forBlock['html_button'] = function (block: any, generator: any) {
    const styles = generator.valueToCode(block, 'STYLES', 0) || '';
    const label = block.getFieldValue('LABEL');
    return `<button style="${styles.trim()}">${label}</button>\n`;
};

htmlGenerator.forBlock['html_a'] = function (block: any, generator: any) {
    const styles = generator.valueToCode(block, 'STYLES', 0) || '';
    const url = block.getFieldValue('URL');
    const text = block.getFieldValue('TEXT');
    return `<a href="${url}" style="${styles.trim()}">${text}</a>\n`;
};

// --- HELPER: Process CSS Inputs ---
htmlGenerator.scrub_ = function (block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();

    // Ensure we don't crash if nextBlock exists but has no code
    let nextCode:any = '';
    if (nextBlock && !opt_thisOnly) {
        nextCode = htmlGenerator.blockToCode(nextBlock);
    }

    return code + nextCode;
};

export const introPageToolbox = {
    kind: "categoryToolbox",
    contents: [
        {
            kind: "category",
            name: "Elements",
            colour: "#4C97FF",
            contents: [
                { kind: "block", type: "html_div" },
                { kind: "block", type: "html_p" },
                { kind: "block", type: "html_button" },
                { kind: "block", type: "html_a" },
            ]
        },
        {
            kind: "category",
            name: "Actions",
            colour: "#FFBF00",
            contents: [

            ]
        },
        {
            kind: "category",
            name: "Style",
            colour: "#32a850",
            contents: [
                { kind: "block", type: "css_style_wrapper" },
                { kind: "block", type: "css_color" },
                { kind: "block", type: "css_bg_color" },
                { kind: "block", type: "css_width" },
            ]
        }
    ]
};