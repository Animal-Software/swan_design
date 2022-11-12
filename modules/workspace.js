const activeCanvas = document.querySelector('#active_view').children[0];
const workspace = document.querySelector('#workspace');
const selectionBox = document.querySelector('#guide');
let canvasBounds, workspaceBounds;
let drawing = false, selecting = false;
let canvas = { startX: 0, startY: 0, endX: 0, endY: 0 };
let select = { startX: 0, startY: 0, endX: 0, endY: 0 };
const updateBounds = () => { canvasBounds = activeCanvas.getBoundingClientRect(), workspaceBounds = workspace.getBoundingClientRect(); };
document.addEventListener('DOMContentLoaded', updateBounds);
const draw = () => {
    const width = canvas.endX - canvas.startX;
    const height = canvas.endY - canvas.startY;
    const rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    rect.setAttribute('x', canvas.startX.toString());
    rect.setAttribute('y', canvas.startY.toString());
    rect.setAttribute('width', width.toString());
    rect.setAttribute('height', height.toString());
    rect.setAttribute('fill', '#ff0005');
    activeCanvas.append(rect);
};
const start = (event) => {
    canvas.startX = Math.floor((event.clientX - canvasBounds.left));
    canvas.startY = Math.floor((event.clientY - canvasBounds.top));
    // console.log("start:", canvas.startX, canvas.startY);
};
const end = (event) => {
    canvas.endX = Math.floor(event.clientX - canvasBounds.left);
    canvas.endY = Math.floor(event.clientY - canvasBounds.top);
    // console.log("end:", canvas.endX, canvas.endY);
    draw();
};
activeCanvas.addEventListener('mousedown', start);
activeCanvas.addEventListener('mouseup', end);
const selectStart = (event) => {
    select.startX = Math.floor(event.clientX - workspaceBounds.left);
    select.startY = Math.floor(event.clientY - workspaceBounds.top);
    selectionBox.style.top = `${select.startY}px`;
    selectionBox.style.left = `${select.startX}px`;
    selecting = true;
    selectionBox.style.display = 'block';
};
const selectSize = (event) => {
    if (!selecting)
        return;
    select.endX = Math.floor(event.clientX - workspaceBounds.left);
    select.endY = Math.floor(event.clientY - workspaceBounds.top);
    const selectWidth = select.endX - select.startX;
    const selectHeight = select.endY - select.startY;
    selectionBox.style.width = `${selectWidth}px`;
    selectionBox.style.height = `${selectHeight}px`;
    // console.log("end:", select.endX, select.endY);
    // TODO: if shift is pressed, check which is bigger, width or height and set the other value to that for 1:1 aspect ratio
};
const selectEnd = () => {
    selecting = false;
    selectionBox.style.width = '0';
    selectionBox.style.height = '0';
    selectionBox.style.display = 'none';
};
workspace.addEventListener('mousedown', selectStart);
workspace.addEventListener('mousemove', selectSize);
workspace.addEventListener('mouseup', selectEnd);
workspace.addEventListener('mouseleave', selectEnd);
// TODO: receive custom event signal from toolbar
// TODO: split workspace functions into tools
