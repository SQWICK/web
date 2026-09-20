var canv;
var ctx;

canv = document.getElementById("canvas");
ctx = canv.getContext('2d');

function drawAll(ctx,width, height){
    const cx = width/2;
    const cy = height/2;
    ctx.clearRect(0,0,width,height);

    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;

    drawKrug(ctx, cx, cy, cx/2);
    drawTre(ctx, cx,cy,cx-25);
    drawPrym(ctx, cx, cy, cx);
    drawLines(ctx, width, height);
}


function bukvi(ctx, x, y, buk){
    ctx.font = "bold 16px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText(buk, x, y);
}

function drawKrug(ctx, cx, cy, radius) {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx, cy - radius);
    ctx.arc(cx, cy, radius, -Math.PI / 2, 0);
    ctx.lineTo(cx, cy);
    ctx.closePath();

    ctx.fillStyle = "#0ABAB5";
    ctx.fill();
    ctx.stroke();
}

function drawTre(ctx, cx, cy, R) {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + R, cy);
    ctx.lineTo(cx, cy+12 + R / 2);
    ctx.closePath();
    ctx.fillStyle = "#0ABAB5";
    ctx.fill();
    ctx.stroke();
}

function drawPrym(ctx, cx, cy, R) {
    const x = cx - R / 2;
    const y = cy;
    const w = R / 2;
    const h = R-15;

    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fillStyle = "#0ABAB5";
    ctx.fill();
    ctx.stroke();
}

function drawLines(ctx, width, height){
    const cx = width/2;
    const cy = height/2;
    // os' x
    ctx.beginPath();
    ctx.moveTo(5, cy);
    ctx.lineTo(width, cy);
    //strelki
    ctx.moveTo(width-10,cy-5);
    ctx.lineTo(width,cy);
    ctx.moveTo(width-10,cy+5);
    ctx.lineTo(width,cy);
    //text
    bukvi(ctx,width-10, cy-10,"X");
    ctx.stroke();
    ctx.closePath();
    

    //os' y
    ctx.beginPath();
    ctx.moveTo(cx, height);
    ctx.lineTo(cx, 0);
    //strelki
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx-5, 10);
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx+5, 10);
    //text
    bukvi(ctx,cx+10, 15, "Y");
    ctx.stroke();
    ctx.closePath();


    //nasechki x i podp
    const nasX = [
        {x: 20, label: "-R"},
        {x: cx/2, label: "-R/2"},
        {x: cx*1.5, label: "R/2"},
        {x: cx*2-25, label: "R"},
    ];

    ctx.beginPath();
    for (const i of nasX){
        ctx.moveTo(i.x, cy-7);
        ctx.lineTo(i.x, cy+7);
    }
    ctx.stroke();

    for(const i of nasX){
        bukvi(ctx, i.x-10,cy-10, i.label);
    }



    //nasechki y i podp
    const nasY = [
        {y: cy*1.5, label: "-R/2"},
        {y: cy*2-15, label: "-R"},
        {y: 25, label: "R"},
        {y: cy/2, label: "R/2"},
    ];
    ctx.beginPath();
    for (const i of nasY){
        ctx.moveTo(cx-7, i.y);
        ctx.lineTo(cx+7, i.y);
    }
    ctx.stroke();

    for(const i of nasY){
        bukvi(ctx, cx+10, i.y+4, i.label);
    }

}





drawAll(ctx, 600,600);








// //R_i_razmetki_X
    // ctx.beginPath();
    // nasechki_x(ctx,20,cy);
    // bukvi(ctx,13,cy-10,"-R");
    // nasechki_x(ctx,cx/2,cy);
    // bukvi(ctx, cx/2-17, cy-10, "-R/2");
    // nasechki_x(ctx,cx*1.5,cy);
    // bukvi(ctx,cx*1.5-12, cy-10, "R/2");
    // nasechki_x(ctx,cx*2-20,cy);
    // bukvi(ctx,cx*2-25, cy-10, "R");
    // ctx.stroke();
    // ctx.closePath();

    // //R_i_razmetki_Y
    // ctx.beginPath();
    // nasechki_y(ctx,cx,cy*1.5);
    // bukvi(ctx,cx+10,cy*1.5+4, "-R/2");
    // nasechki_y(ctx,cx,cy*2-15);
    // bukvi(ctx,cx+10, cy*2-11, "-R");
    // nasechki_y(ctx, cx, 25);
    // bukvi(ctx,cx+10,30,"R");
    // nasechki_y(ctx, cx, cy/2);
    // bukvi(ctx, cx+10, cy/2+6, "R/2");
    // ctx.stroke();
    // ctx.closePath();


    // function nasechki_x(ctx,x,y){
//     ctx.moveTo(x,y-7);
//     ctx.lineTo(x,y+7);
// }

// function nasechki_y(ctx,x,y){
//     ctx.moveTo(x-7,y);
//     ctx.lineTo(x+7,y);
// }
