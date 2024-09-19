// Function to get the value of a CSS variable from :root or any element
const getCssVariable = (variableName) => {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}

// Handle class function to apply CSS variables dynamically
const handleClass = (element, cls) => {
    const [prefix, value, variation, variation2] = cls.split('-');
    if (prefix === 'bg') {
        // Create a CSS variable name dynamically (e.g., --color-blue-light)
        const cssVarName = `--bg-${value}${variation ? '-' + variation : ''}${variation2 ? '-' + variation2 : ''}`;
        const cssVarValue = getCssVariable(cssVarName);

        // Check if the CSS variable value exists before applying it
        if (cssVarValue) {
            element.style.setProperty('background-color', cssVarValue);
        } else {
            console.warn(`CSS variable ${cssVarName} is not defined.`);
        }
    }
}

const handleElement = (element) => {
    const classes = element.className.split(' ');
    for (const cls of classes) {
        if (cls.startsWith('bg-')) {
            handleClass(element, cls);
        }
    }
}

const handleElements = () => {
    const elements = document.querySelectorAll('.frame *'); // Select all child elements of .frame
    for (const element of elements) {
        handleElement(element);
    }
}

handleElements();
