// 获取画布信息
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
// 重置画布背景
resetCanvas();
// 设置默认样式和全局样式
var colorLine,lineWidth=4,move = false,imgData,r;
lineColor();widthLine(),drawBrush();
// 设置颜色
function lineColor(){
	var ele = document.getElementsByClassName('ys')[0].getElementsByTagName('li');
	for (var i = 0; i < ele.length; i++) {
		// 点击线条粗细时获取线条粗细的信息
		ele[i].onclick = function(){
			// 清除所有样式
			for (var i = 0; i < ele.length; i++) {
				ele[i].removeAttribute('class');
			}
			// 给点击元素添加样式并获取其值
			this.setAttribute('class','colorOn');
			// 获取对应的id值
			colorLine = this.getAttribute('id');
			// 设置填充和绘制样式
			ctx.strokeStyle = colorLine;
			ctx.fillStyle = colorLine;
		}
	}
}
// 设置线条宽度
function widthLine(){
	var ele = document.getElementsByClassName('cx')[0].getElementsByTagName('li');
	for (var i = 0; i < ele.length; i++) {
		// 点击线条粗细时获取线条粗细的信息
		ele[i].onclick = function(){
			// 清除所有样式
			for (var i = 0; i < ele.length; i++) {
				ele[i].removeAttribute('class');
			}
			// 给点击元素添加样式并获取其值
			this.setAttribute('class','on');
			// 获取对应的alt属性值
			lineWidth = this.childNodes[1].getAttribute('alt');
			ctx.lineWidth = lineWidth;
		}
	}
}
// 保存
save.onclick=function(){
	chose();
	this.setAttribute('class','on');
	// 保存画布信息
	var imgdata = canvas.toDataURL();
	// 调用保存函数
	Download(imgdata);
	alert('保存完成!');
	// 创建一个新的img元素，将其放入底部
	var newImg = document.createElement('img');
	var footer = document.getElementById('footer');
	// 把canvas信息传递给img
	newImg.setAttribute('src',imgdata);
	newImg.style.width = '200px';
	footer.appendChild(newImg);
	resetCanvas();
}
// 清空画布
clear.onclick=function(){
	chose();
	// 清空画布
	this.setAttribute('class','on');
	resetCanvas();
}
// 选中那种工具或形状或图像
function chose(){
	var aLi = document.getElementById('all').getElementsByTagName('li');
	// 清除所有选中样式
	for (var i = 0; i < aLi.length; i++) {
		aLi[i].removeAttribute('class');
	}
}
// 绘制形状函数
var xz = document.getElementsByClassName('xz')[0].getElementsByTagName('li');
for (var i = 0; i < xz.length; i++) {
	xz[i].onclick=function(){
		chose();
		// 获取选中的id，选择需要执行的函数
		var xzID = this.getAttribute('id');
		var x1,y1,x2,y2;
		this.setAttribute('class','on');
			// 判断选取的是什么形状 执行对应的绘制操作
			switch(xzID){
				case 'line':{//直线
					drawLine(x1,y1,x2,y2);
					break;
				}
				case 'arc':{//空心圆
					drawArc(x1,y1,x2,y2);
					break;
				}
				case 'rect':{//举行
					drawRect(x1,y1,x2,y2);
					break;
				}
				case 'poly':{//三角形
					drawpoly(x1,y1,x2,y2);
					break;
				}
				case 'arcfill':{//实心圆
					drawArcFill(x1,y1,x2,y2);
					break;
				}
				case 'rectfill':{//实心矩阵
					drawRectFill(x1,y1,x2,y2);
					break;
				}
			}
	}
}
// 选择绘制工具
var gj = document.getElementsByClassName('gj')[0].getElementsByTagName('li');
for (var i = 0; i < gj.length; i++) {
	gj[i].onclick=function(){
		chose();
		// 获取对应id属性值
		var gjID = this.getAttribute('id');
		this.setAttribute('class','on');
		// 执行相应操作
		switch(gjID){
			// 画笔工具
			case 'brush':{
				drawBrush();
				break;
			}
			// 橡皮擦工具
			case 'eraser':{
				drawEraser();
				break;
			}
			// 油漆工具
			case 'paint':{
				drawPaint();
				break;
			}
			// 吸取工具
			case 'straw':{
				drawStraw();
				break;
			}
			// 文字输入工具
			case 'text':{
				drawText();
				break;
			}
			// 放大镜工具
			case 'magnifier':{
				drawMagnifier();
				break;
			}
		}
	}
}
// 绘制线条函数
function drawLine(x1,y1,x2,y2){
	// 按下去的位置为线条的起始点
	canvas.onmousedown=function(evt){
		imgData = ctx.getImageData(0,0,1000,500);
		var e = window.event||evt;
		x1 = e.pageX - this.offsetLeft;
		y1 = e.pageY - this.offsetTop;
		move = true;
	}
	// 移动时开始绘制
	canvas.onmousemove=function(evt){
		var e = window.event||evt;
		if (move) {
			ctx.clearRect(0,0,1000,500);
			ctx.putImageData(imgData,0,0);
			y2 = e.pageY - this.offsetTop;
			x2 = e.pageX - this.offsetLeft;
			ctx.beginPath();
			ctx.moveTo(x1,y1);
			ctx.lineTo(x2,y2);
			ctx.stroke();
		}
	}
	canvas.onmouseup=function(){
		move = false;
	}
	canvas.onmouseout=function(){
		move=false;
	}
}
// 绘制空心圆函数
function drawArc(x1,y1,x2,y2){
	canvas.onmousedown=function(evt){
		imgData = ctx.getImageData(0,0,1000,500);
		var e = window.event||evt;
		x1 = e.pageX - this.offsetLeft;
		y1 = e.pageY - this.offsetTop;
		move = true;
	}
	canvas.onmousemove=function(evt){
		var e = window.event||evt;
		if (move) {
			ctx.clearRect(0,0,1000,500);
			ctx.beginPath();
			y2 = e.pageY - this.offsetTop;
			x2 = e.pageX - this.offsetLeft;
			r = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
			ctx.putImageData(imgData,0,0);
			ctx.arc(x1,y1,r,0,Math.PI*2,false);
			ctx.stroke();
		}
	}
	canvas.onmouseup=function(){
		move = false;
	}
	canvas.onmouseout=function(){
		move=false;
	}
}
// 绘制矩形函数
function drawRect(x1,y1,x2,y2){
	// 开始绘制 并获取对应信息
	ctx.beginPath();
	canvas.onmousedown=function(evt){
		// 获取canvas当前的绘制信息
		imgData = ctx.getImageData(0,0,1000,500);
		// 获取坐标信息
		var e = window.event||evt;
		x1 = e.pageX - this.offsetLeft;
		y1 = e.pageY - this.offsetTop;
		move = true;
	}
	canvas.onmousemove=function(evt){
		var e = window.event||evt;
		if (move) {
			// 清除画布
			ctx.clearRect(0,0,1000,500);
			y2 = e.pageY - this.offsetTop;
			x2 = e.pageX - this.offsetLeft;
			// 把之前保存的画布信息重新绘制在canvas中
			ctx.putImageData(imgData,0,0);
			// 绘制当前绘制的矩形
			ctx.strokeRect(x1,y1,x2-x1,y2-y1);
		}
	}
	// 关闭开关
	canvas.onmouseup=function(){
		move = false;
	}
	canvas.onmouseout=function(){
		move=false;
	}
	ctx.closePath();
}
// 绘制三角形形函数
function drawpoly(x1,y1,x2,y2){
	canvas.onmousedown=function(evt){
		imgData = ctx.getImageData(0,0,1000,500);
		var e = window.event||evt;
		x1 = e.pageX - this.offsetLeft;
		y1 = e.pageY - this.offsetTop;
		move = true;
	}
	canvas.onmousemove=function(evt){
		var e = window.event||evt;
		x2 = e.pageX - this.offsetLeft;
		y2 = e.pageY - this.offsetTop;
		// 判断初始坐标和终点坐标关系，描绘出对应的图像
		if (x2-x1==0) {
			var x3 = x1;
		}else if(x2>x1){
			var x3 = x1*2-x2;
		}else{
			var x3 = x1*2-x2;
		}
		var y3 = y2;
		if (move) {
			// 开始绘制
			ctx.clearRect(0,0,1000,500);
			ctx.putImageData(imgData,0,0);
			ctx.beginPath();
			ctx.moveTo(x1,y1);
			ctx.lineTo(x2,y2);
			ctx.lineTo(x3,y3);
			ctx.closePath();
			ctx.stroke();
		}
	}
	canvas.onmouseup=function(){
		move = false;
	}
	canvas.onmouseout=function(){
		move=false;
	}
}
// 绘制实心圆函数
function drawArcFill(x1,y1,x2,y2){
	canvas.onmousedown=function(evt){
		imgData = ctx.getImageData(0,0,1000,500);
		var e = window.event||evt;
		x1 = e.pageX - this.offsetLeft;
		y1 = e.pageY - this.offsetTop;
		move = true;
	}
	canvas.onmousemove=function(evt){
		var e = window.event||evt;
		if (move) {
			ctx.clearRect(0,0,1000,500);
			y2 = e.pageY - this.offsetTop;
			x2 = e.pageX - this.offsetLeft;
			r = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
			ctx.putImageData(imgData,0,0);
			ctx.beginPath();
			ctx.arc(x1,y1,r,0,Math.PI*2,false);
			ctx.fill();
		}
	}
	canvas.onmouseup=function(){
		move = false;
	}
	canvas.onmouseout=function(){
		move=false;
	}
}
// 绘制填充矩形函数
function drawRectFill(x1,y1,x2,y2){
	ctx.beginPath();
	canvas.onmousedown=function(evt){
		imgData = ctx.getImageData(0,0,1000,500);
		var e = window.event||evt;
		x1 = e.pageX - this.offsetLeft;
		y1 = e.pageY - this.offsetTop;
		move = true;
	}
	canvas.onmousemove=function(evt){
		var e = window.event||evt;
		if (move) {
			ctx.clearRect(0,0,1000,500);
			y2 = e.pageY - this.offsetTop;
			x2 = e.pageX - this.offsetLeft;
			ctx.putImageData(imgData,0,0);
			ctx.fillRect(x1,y1,x2-x1,y2-y1);
		}
	}
	canvas.onmouseup=function(){
		move = false;
	}
	canvas.onmouseout=function(){
		move=false;
	}
	ctx.closePath();
}
// 画笔工具函数
function drawBrush(){
	canvas.onmousedown=function(evt){
		// 兼容事件
		var e = window.event||evt;
		// 获取坐标
		x1 = e.pageX - this.offsetLeft;
		y1 = e.pageY - this.offsetTop;
		// 表示可以移动
		move = true;
		// 开始绘制
		ctx.closePath();
		ctx.beginPath();
		ctx.moveTo(x1,y1);
	}
	canvas.onmousemove=function(evt){
		var e = window.event||evt;
		x2 = e.pageX - this.offsetLeft;
		y2 = e.pageY - this.offsetTop; 
		// 移动绘制
		if(move){
			ctx.lineTo(x2,y2);
			ctx.stroke();
		 }
	}
	// 关闭可以移动的开关
	canvas.onmouseup=function(){
			move=false;
	}
	canvas.onmouseout=function(){
			move=false;
	}
}
// 橡皮擦工具函数
function drawEraser(){
	canvas.onmousedown=function(evt){
		move = true;
	}
	// 移动时开始清除对应区域的画布
	canvas.onmousemove=function(evt){
		var e = window.event||evt;
		x2 = e.pageX - this.offsetLeft;
		y2 = e.pageY - this.offsetTop; 
		if(move){
			// 设置橡皮擦大小为线宽的平方
			ctx.clearRect(x2,y2,lineWidth*lineWidth,lineWidth*lineWidth);
		 }
	}
	canvas.onmouseup=function(){
			move=false;
	}
	canvas.onmouseout=function(){
			move=false;
	}
}
// 油漆工具函数
function drawPaint(){
	canvas.onmousedown = function(){
		ctx.fill();
	}
}
// 吸取颜色工具函数
function drawStraw(){
	// 鼠标按下时吸取
	canvas.onmousedown=function(evt){
		var e =window.event||evt;
		X = e.pageX - this.offsetLeft;
		Y = e.pageY - this.offsetTop; 
		// 找到对应的像素点
		var imageData=ctx.getImageData(X,Y,1,1);
		var xqData=imageData.data;
		// 吸取当前坐标上的颜色
		var color='rgba('+xqData[0]+','+xqData[1]+','+xqData[2]+','+xqData[3]+')';
		// 把颜色设置为填充绘制颜色
		ctx.strokeStyle=color;
		ctx.fillStyle=color;
	}
}
// 文字输入工具
function drawText(){
	canvas.onmousedown=function(evt){
		var e =window.event||evt;
		X = e.pageX - this.offsetLeft;
		Y = e.pageY - this.offsetTop; 
		var word=window.prompt('输入文本','例如:你好！');
		// 如果有输入内容 则显示
		if(word){
			// 设置字体大小
			var fontSize = (lineWidth*lineWidth+12)+'px';
			ctx.font = ''+fontSize+' 微软雅黑';
			ctx.fillText(word,X,Y);
		}
		
	}
}
// 放大镜工具函数
function drawMagnifier(){
	// 设置缩放比例
	var multiple=window.prompt('输入缩放比例','');
	var X=1000*multiple/100;
	var Y=500*multiple/50;
	// 创建一个图像
	var imgdata = canvas.toDataURL();
	var newImg = document.createElement('img');
	// 把canvas信息传递给img
	newImg.setAttribute('src',imgdata);
	ctx.fillStyle = '#ccc';
	ctx.fillRect(0,0,1000,500);
	ctx.fillStyle = colorLine;
	// 选择缩放位置
	ctx.drawImage(newImg,0,0,1000,500,0,0,X,Y);
}
// 保存图片函数 (图像信息)
function Download(imgdata){
	// 确定图片的类型 
	var type ='png';
	// 将mime-type改为image/octet-stream,强制让浏览器下载
	var fixtype=function(type){
	    type=type.toLocaleLowerCase().replace(/jpg/i,'jpeg');
	    var r=type.match(/png|jpeg|bmp|gif/)[0];
	    return 'image/'+r;
	};
	imgdata=imgdata.replace(fixtype(type),'image/octet-stream');
	// 将图片保存到本地
	var savaFile=function(data,filename){
	    var save_link=document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
	    save_link.href=data;
	    save_link.download=filename;
	    var event=document.createEvent('MouseEvents');
	    event.initMouseEvent('click',true,false,window,0,0,0,0,0,false,false,false,false,0,null);
	    save_link.dispatchEvent(event);
	};
	var filename=''+new Date().getDate()+'.'+type;  
	// 设置文件名
	savaFile(imgdata,filename);
}
// 重置画布信息
function resetCanvas(){
	ctx.clearRect(0,0,1000,500);
	ctx.fillStyle = '#fff';
	ctx.fillRect(0,0,1000,500);
	ctx.fillStyle = colorLine||'#000';
}

