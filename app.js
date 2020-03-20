const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const ctx = canvas.getContext("2d");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2C2C2";
const CANVAS_SIZE = 700;
canvas.width=canvas.offsetWidth;
canvas.height=canvas.offsetHeight;

ctx.fillStyle="white";
ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle=INITIAL_COLOR;
ctx.fillStyle=INITIAL_COLOR;
ctx.lineWidth=2.5;

let painting = false;
let filling = false;


function stopPainting(){
    painting = false;
}

function startPainting(){
    painting=true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){//painting이 false인 상태
        //Create a nsew path
        ctx.beginPath();
        //Moves the pen to the coordinates specified by x and y
        ctx.moveTo(x,y);
    }else{
        //Draws a line from the current drawing position to the position spedified by x and y
        ctx.lineTo(x,y);
        //Draws the shape by stroking its outline
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle=color;
}

function handleRangeChange(event){
    ctx.lineWidth = event.target.value;
}

function handleModeClick(){
    if(filling){
        filling = false;
        mode.innerText="Fill";
    } else{
        filling = true;
        mode.innerText="Paint";
    }

}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href=image;
    link.download = "PaintJS[EXPORT]";
    link.click();
}
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => 
    color.addEventListener('click', handleColorClick)
 );   


if(range){
    range.addEventListener("input", handleRangeChange);
    
}

if(mode){
    mode.addEventListener("click", handleModeClick);

}

if(saveBtn){
    saveBtn.addEventListener('click', handleSaveClick);
}