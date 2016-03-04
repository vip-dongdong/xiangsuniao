window.onload=function(){
	var bird={
		x:100,
		y:264,
		w:25,
		h:25,
	}
	var ctx=document.querySelector('#canvas').getContext('2d');
	var a=1;
	var guandaos=[
		{
			top:{x:300,y:0,w:60,h:300},
			bottom:{x:300,y:420,w:60,h:300}
		},
		{
			top:{x:510,y:0,w:60,h:300},
			bottom:{x:510,y:420,w:60,h:300}
		}

 	]
 	//引背景图
 	var imgbg=new Image();
	imgbg.src='images/bg.png';
	imgbg.onload=function(){
		ctx.drawImage(imgbg,0,0,320,504);
 	}
 	 //引入小鸟的图片
 	var birdbg=new Image();
	birdbg.src='images/1.png';
	birdbg.onload=function(){
		ctx.drawImage(birdbg,bird.x,bird.y);
	}
	ctx.drawImage(birdbg,bird.x,bird.y);
	//引入地面的背景图
 	var dimianbg=new Image();
	dimianbg.src='images/ground.png';
	dimianbg.onload=function(){
		ctx.drawImage(dimianbg,0,504)
	}
	

 
  	var draw=function(){
 		ctx.clearRect(0,0,320,584);
 		ctx.drawImage(dimianbg,0,504);
 		ctx.drawImage(imgbg,0,0,320,504);
		ctx.drawImage(birdbg,bird.x,bird.y);
  		//鸟的速度
 		a+=0.05;
 		bird.y+=a*a;
  		//ctx.fillRect(bird.x,bird.y,bird.w,bird.h);
 	 	 // 检测矩形之间的碰撞
		var recvsrec =  function(rect0,rect1){
		    if (rect0.x >= rect1.x && rect0.x >= rect1.x + rect1.w) {
		      return false;
		    } else if (rect0.x <= rect1.x && rect0.x + rect0.w <= rect1.x) {
		      return false;
		    } else if (rect0.y >= rect1.y && rect0.y >= rect1.y + rect1.h) {
		      return false;
		    } else if (rect0.y <= rect1.y && rect0.y + rect0.h <= rect1.y) {
		      return false;
		    }
		    return true;
		};
  		//画管道
 		var vs;
 		for(var i=0;i<guandaos.length;i++){
 			var z=guandaos[i];
 			z.top.x-=3;
 			z.bottom.x-=3;
 			//引入top柱子图片
  			var zhuup=new Image();
			zhuup.src='images/g-up.png';
			zhuup.onload=function(){
				ctx.drawImage(zhuup,z.top.x,z.top.y,z.top.w,z.top.h)
			}
	       ctx.drawImage(zhuup,z.top.x,z.top.y,z.top.w,z.top.h);
 			//引入bottom柱子图片
 			var zhubottom=new Image();
			zhubottom.src='images/g-down.png';
			zhubottom.onload=function(){
				ctx.drawImage(zhubottom,z.bottom.x,z.bottom.y,z.bottom.w,z.bottom.h)
			}
			ctx.drawImage(zhubottom,z.bottom.x,z.bottom.y,z.bottom.w,z.bottom.h);
  			// ctx.fillRect(z.top.x,z.top.y,z.top.w,z.top.h);
 			// ctx.fillRect(z.bottom.x,z.bottom.y,z.bottom.w,z.bottom.h);
 			//柱子的循环来回
 			if(z.top.x<= -z.top.w){
 				z.top.x=400;
 				z.bottom.x=400;
 				z.top.h=Math.random()*200+100;
 				z.bottom.y=z.top.h+120;
 				z.bottom.h=568-z.top.h-120;
 			}
 			//判断 是否碰到 柱子
 			 if(recvsrec(bird,z.top)||recvsrec(bird,z.bottom)){
 				vs=true;
	 		
 				start1.style.display="block";
	 		}

 		}

        if(vs){
 			return;
 		}
		//边界的判断
		if(bird.y>=568-80){
 			ctx.fillRect(140,528,bird.w,bird.h);
 			start1.style.display="block";
 			
 			var overbg=new Image();
				overbg.src='images/over.jpg';
				overbg.onload=function(){
					ctx.drawImage(overbg,-24,0,380,500);
 				}
 			return;
  		}else if(bird.y<0){
 			ctx.fillRect(140,0,bird.w,bird.h);

  		}else{
 			window.requestAnimationFrame(draw);

  		}
 	}

	

	//var  r=requestAnimationFrame(draw);

	canvas.onclick=function(){
		bird.y-=30;
		a=1;
  	}
	start.onclick=function(){
  		requestAnimationFrame(draw);
 		start.style.display="none";
 	}
 	start1.onclick=function(){
  		location.reload();
 		
 	}


	//requestAnimationFrame(draw);



}