export const calculateButtonWidth = (label) => {
    const labelLength = label.length;
    const minWidth = 50; 
    const maxWidth = 290;
    const factor = 5.5;
    const calculatedWidth = Math.min(maxWidth, minWidth + labelLength * factor);
    return `${calculatedWidth}px`;
}