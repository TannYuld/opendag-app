import * as Blockly from 'blockly';
import { FieldColour, registerFieldColour } from '@blockly/field-colour';

registerFieldColour();

// --- CSS WRAPPER (The Aggregator) ---
Blockly.Blocks['css_style_wrapper'] = {
    init: function () {
        this.appendStatementInput("STYLES_STACK")
            .setCheck("CSS_PROPERTY")
            .appendField("Style Group");
        this.setOutput(true, "CSS");
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
        this.setPreviousStatement(true, "CSS_PROPERTY");
        this.setNextStatement(true, "CSS_PROPERTY");
        this.setColour(350);
    }
};

Blockly.Blocks['css_bg_color'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Background")
            .appendField(new FieldColour("#0000ff"), "BG_VAL");
        this.setPreviousStatement(true, "CSS_PROPERTY");
        this.setNextStatement(true, "CSS_PROPERTY");
        this.setColour(30);
    }
};

Blockly.Blocks['css_border_color'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Border")
            .appendField(new FieldColour("#ffea00ff"), "BORDER_COLOR_VAL");
        this.setPreviousStatement(true, "CSS_PROPERTY");
        this.setNextStatement(true, "CSS_PROPERTY");
        this.setColour(30);
    }
};

Blockly.Blocks['css_font_size'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Font size")
            .appendField(new Blockly.FieldNumber(16), "FONT_SIZE_VAL")
            .appendField("px");
        this.setPreviousStatement(true, "CSS_PROPERTY");
        this.setNextStatement(true, "CSS_PROPERTY");
        this.setColour(180);
    }
};

Blockly.Blocks['css_border_width'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Border width")
            .appendField(new Blockly.FieldNumber(1), "BORDER_WIDTH_VAL")
            .appendField("px");
        this.setPreviousStatement(true, "CSS_PROPERTY");
        this.setNextStatement(true, "CSS_PROPERTY");
        this.setColour(180);
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
        this.setColour(180);
    }
};

Blockly.Blocks['css_height'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Height")
            .appendField(new Blockly.FieldNumber(100), "HEIGHT_VAL")
            .appendField("px");
        this.setPreviousStatement(true, "CSS_PROPERTY");
        this.setNextStatement(true, "CSS_PROPERTY");
        this.setColour(270);
    }
};

Blockly.Blocks['css_layout'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Layout direction")
            .appendField(new Blockly.FieldDropdown([["Horizontal", "HORIZONTAL"], ["Vertical", "VERTICAL"]]), "LAYOUT_VAL");
        this.setPreviousStatement(true, "CSS_PROPERTY");
        this.setNextStatement(true, "CSS_PROPERTY");
        this.setColour(310);
    }
};

// --- HTML BLOCKS (Containers) ---
Blockly.Blocks['html_div'] = {
    init: function () {
        this.appendValueInput("STYLES")
            .setCheck("CSS")
            .appendField("Container (div)");
        this.appendStatementInput("CHILDREN")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("A generic container block");
    }
};

Blockly.Blocks['html_center'] = {
    init: function () {
        this.appendValueInput("STYLES")
            .setCheck("CSS")
            .appendField("Center container");
        this.appendStatementInput("CHILDREN")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(140);
    }
};

Blockly.Blocks['html_left'] = {
    init: function () {
        this.appendValueInput("STYLES")
            .setCheck("CSS")
            .appendField("Left container");
        this.appendStatementInput("CHILDREN")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
    }
};

Blockly.Blocks['html_right'] = {
    init: function () {
        this.appendValueInput("STYLES")
            .setCheck("CSS")
            .appendField("Right container");
        this.appendStatementInput("CHILDREN")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(180);
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
        this.setColour(360);
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

export const htmlGenerator = new Blockly.Generator('HTML');

htmlGenerator.scrub_ = function (block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : htmlGenerator.blockToCode(nextBlock);
    return code + nextCode;
};

// --- CSS GENERATORS ---
function generateCss(block: any, name: string, callback: (value: any) => string): string {
    const value = block.getFieldValue(name);
    return callback(value);
}

htmlGenerator.forBlock['css_style_wrapper'] = function (block: any, generator: any) {
    const styles = generator.statementToCode(block, 'STYLES_STACK');
    return [styles.trim(), 0];
};

htmlGenerator.forBlock['css_font_size'] = (block) => {
    return generateCss(block, "FONT_SIZE_VAL", (fontSize) => {
        return `font-size: ${fontSize}px; `;
    })
};

htmlGenerator.forBlock['css_color'] = (block) => {
    return generateCss(block, "COLOR_VAL", (color) => {
        return `color: ${color}; `;
    })
};

htmlGenerator.forBlock['css_bg_color'] = (block) => {
    return generateCss(block, "BG_VAL", (color) => {
        return `background-color: ${color}; `;;
    });
};

htmlGenerator.forBlock['css_border_color'] = (block) => {
    return generateCss(block, "BORDER_COLOR_VAL", (color) => {
        return `border-color: ${color}; `;;
    });
};

htmlGenerator.forBlock['css_border_width'] = (block) => {
    return generateCss(block, "BORDER_WIDTH_VAL", (width) => {
        return `border-width: ${width}px; `;
    });
};

htmlGenerator.forBlock['css_width'] = (block) => {
    return generateCss(block, "WIDTH_VAL", (width) => {
        return `width: ${width}px; `;
    });
};

htmlGenerator.forBlock['css_height'] = (block) => {
    return generateCss(block, "HEIGHT_VAL", (height) => {
        return `height: ${height}px; `;
    });
};

htmlGenerator.forBlock["css_layout"] = (block) => {
    return generateCss(block, "LAYOUT_VAL", (layout) => {
        return `display: flex; flex-direction: ${layout == "HORIZONTAL" ? "row": "column"}; `;
    })
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

htmlGenerator.forBlock['html_left'] = function (block: any, generator: any) {
    const styles = generator.valueToCode(block, 'STYLES', 0) || '';
    const children = generator.statementToCode(block, 'CHILDREN');

    const useColumn = styles.split('; ').map((part: string) => part.replace(';', '')).reverse().includes("flex-direction: column");

    let extraStyle = `display: flex; ${useColumn ? "align-items: flex-start; " : "justify-content: flex-start; "}`;

    return `<div style="${styles.trim()} ${extraStyle}">${children}</div>\n`;
};

htmlGenerator.forBlock['html_right'] = function (block: any, generator: any) {
    const styles = generator.valueToCode(block, 'STYLES', 0) || '';
    const children = generator.statementToCode(block, 'CHILDREN');

    const useColumn = styles.split('; ').map((part: string) => part.replace(';', '')).reverse().includes("flex-direction: column");
    
    let extraStyle = `display: flex; ${useColumn ? "align-items: flex-end; " : "justify-content: flex-end; "}`;

    return `<div style="${styles.trim()} ${extraStyle}">${children}</div>\n`;
};

htmlGenerator.forBlock['html_center'] = function (block: any, generator: any) {
    const styles = generator.valueToCode(block, 'STYLES', 0) || '';
    const children = generator.statementToCode(block, 'CHILDREN');

    const useColumn = styles.split('; ').map((part: string) => part.replace(';', '')).reverse().includes("flex-direction: column");

    let extraStyle = `display: flex; ${useColumn ? "align-items: center; " : "justify-content: center; "}`;

    return `<div style="${styles.trim()} ${extraStyle}">${children}</div>\n`;
};

// --- HELPER: Process CSS Inputs ---
htmlGenerator.scrub_ = function (block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();

    let nextCode: any = '';
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
            name: "Interactive Elements",
            colour: "#4C97FF",
            contents: [
                { kind: "block", type: "html_p" },
                { kind: "block", type: "html_button" },
                { kind: "block", type: "html_a" },
            ]
        },
        {
            kind: "category",
            name: "Containers",
            colour: "#FFBF00",
            contents: [
                { kind: "block", type: "html_div" },
                { kind: "block", type: "html_center" },
                { kind: "block", type: "html_left" },
                { kind: "block", type: "html_right" },
            ]
        },
        // MAYBE: in the feature, text and href fields can be extended to its own blocks.
        // {
        //     kind: "category",
        //     name: "Actions",
        //     colour: "#FFBF00",
        //     contents: [

        //     ]
        // },
        {
            kind: "category",
            name: "Style",
            colour: "#32a850",
            contents: [
                { kind: "block", type: "css_style_wrapper" },
                { kind: "block", type: "css_color" },
                { kind: "block", type: "css_bg_color" },
                { kind: "block", type: "css_border_color" },
                { kind: "block", type: "css_border_width" },
                { kind: "block", type: "css_width" },
                { kind: "block", type: "css_height" },
                { kind: "block", type: "css_font_size" },
                { kind: "block", type: "css_layout" },
            ]
        }
    ]
};