function bakcalc() {
    const element = document.getElementById('pieChart');
    element.innerText = '';
	var wholes = document.getElementById('whole_game').value;
	var bs = document.getElementById('bangker').value;
	var ps = document.getElementById('player').value;
	var ts = document.getElementById('tie').value; //input 태그 안에있는 값들 가져오기
	
	var whole = Number(wholes)
	var b = Number(bs)
	var p = Number(ps)
	var t = Number(ts) //숫자로 변환
	
	if (b + p + t == whole) {
		var bl = (b / (whole + 1)) * 100;
		var bw = ((b + 1) / (whole + 1)) * 100;
		var abl = Math.abs(45.86 - bl);
		var abw = Math.abs(45.86 - bw);
		var b_list = [abl, abw];
		b_list.sort(function (a, b) {
			return a - b;
		});
		var b_result = Math.min(...b_list)
		console.log(bl, bw)
		console.log(b_list) 
		console.log('뱅커: ' + b_result)
		//여기까지가 뱅커 리스트
		
		var pl = (p / (whole + 1)) * 100;
		var pw = ((p + 1) / (whole + 1)) * 100;
		var apl = Math.abs(44.62 - pl);
		var apw = Math.abs(44.62 -pw);
		var p_list = [apl, apw];
		p_list.sort(function (a, b) {
			return a - b;
		});
		var p_result = Math.min(...p_list)
		console.log(p_list) 
		console.log('플레이어: ' + p_result) 
		//여기 까지가 플레이어 리스트
		
		var tl = (t / (whole + 1)) * 100
		var tw = ((t + 1) / (whole + 1)) * 100
		var atl = Math.abs(9.528 - tl);
		var atw = Math.abs(9.528 - tw);
		var t_list = [atl, atw];
		t_list.sort(function (a, b) {
			return a - b;
		});
		var t_result = Math.min(...t_list)
		console.log(t_list)
		console.log('타이: ' +t_result)
		//타이 리스트
		
		var final_list = [b_result, p_result, t_result]
		final_list.sort(function (a, b) {
			return a - b;
		}); //오름차순 정렬
		console.log("final_list:",final_list)
		
		if (final_list[0] == b_result){
			var win ="뱅커"
			if(final_list[1] == p_result){
				var center = "플레이어"
				var lose = "타이"
				console.log(win, center, lose)
			}
			else if(final_list[2] == p_result){
				var center = "타이"
				var lose = "플레이어"
				console.log(win, center, lose)
			}
		}
		else if(final_list[1] == b_result){
			var center = "뱅커"
			if(final_list[0] == p_result){
				var win = "플레이어"
				var lose = "타이"
				console.log(win, center, lose)
			}
			else if (final_list[2] == p_result){
				var win = "타이"
				var lose = "플레이어"
				console.log(win, center, lose)
			}
		}
		else if(final_list[2]== b_result){
			var lose = "뱅커"
			if (final_list[0] == p_result){
				var win = "플레이어"
				var center = "타이"
				console.log(win, center, lose)
			}
			else if(final_list[1] == p_result){
				var win = "타이"
				var center = "플레이어"
				console.log(win, center, lose)
			}
		}
		
		var num = Number(b_result * p_result * t_result)
		var ar = num/b_result
		var br = num/p_result
		var cr = num/t_result
		var d = ar+br+cr
		var b3 = ((ar/d) * 100);
		var p3 = ((br/d) * 100);
		var t3 = ((cr/d) * 100);
		var round_b = Math.round(b3 * 100) / 100;
		var round_p = Math.round(p3 * 100) / 100;
		var round_t = Math.round(t3 * 100) / 100;
		// console.log(round_b, round_p, round_t)
		// document.getElementById("presult").innerHTML = "플레이어: " + round_p +"%";
		// document.getElementById("bresult").innerHTML = "뱅커: " + round_b+"%";
		// document.getElementById("tresult").innerHTML = "타이: " + round_t+"%";
		$(function(){
		  $("#pieChart").drawPieChart([
			{ title: "뱅커",         value : round_b,  color: "#bf1932" },
			{ title: "플레이어", value:  round_p,   color: "#1956bf" },
			{ title: "타이",         value : round_t,    color: "#18a82b" }
		  ]);
		});

		/*!
		 * jquery.drawPieChart.js
		 * Version: 0.3(Beta)
		 * Inspired by Chart.js(http://www.chartjs.org/)
		 *
		 * Copyright 2013 hiro
		 * https://github.com/githiro/drawPieChart
		 * Released under the MIT license.
		 */
		;(function($, undefined) {
		  $.fn.drawPieChart = function(data, options) {
			var $this = this,
			  W = $this.width(),
			  H = $this.height(),
			  centerX = W/2,
			  centerY = H/2,
			  cos = Math.cos,
			  sin = Math.sin,
			  PI = Math.PI,
			  settings = $.extend({
				segmentShowStroke : true,
				segmentStrokeColor : "#fff",
				segmentStrokeWidth : 1,
				baseColor: "#fff",
				baseOffset: 15,
				edgeOffset: 30,//offset from edge of $this
				pieSegmentGroupClass: "pieSegmentGroup",
				pieSegmentClass: "pieSegment",
				lightPiesOffset: 12,//lighten pie's width
				lightPiesOpacity: .3,//lighten pie's default opacity
				lightPieClass: "lightPie",
				animation : true,
				animationSteps : 90,
				animationEasing : "easeInOutExpo",
				tipOffsetX: -15,
				tipOffsetY: -45,
				tipClass: "pieTip",
				beforeDraw: function(){  },
				afterDrawed : function(){  },
				onPieMouseenter : function(e,data){  },
				onPieMouseleave : function(e,data){  },
				onPieClick : function(e,data){  }
			  }, options),
			  animationOptions = {
				linear : function (t){
				  return t;
				},
				easeInOutExpo: function (t) {
				  var v = t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t;
				  return (v>1) ? 1 : v;
				}
			  },
			  requestAnimFrame = function(){
				return window.requestAnimationFrame ||
				  window.webkitRequestAnimationFrame ||
				  window.mozRequestAnimationFrame ||
				  window.oRequestAnimationFrame ||
				  window.msRequestAnimationFrame ||
				  function(callback) {
					window.setTimeout(callback, 1000 / 60);
				  };
			  }();

			var $wrapper = $('<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>').appendTo($this);
			var $groups = [],
				$pies = [],
				$lightPies = [],
				easingFunction = animationOptions[settings.animationEasing],
				pieRadius = Min([H/2,W/2]) - settings.edgeOffset,
				segmentTotal = 0;

			//Draw base circle
			var drawBasePie = function(){
			  var base = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
			  var $base = $(base).appendTo($wrapper);
			  base.setAttribute("cx", centerX);
			  base.setAttribute("cy", centerY);
			  base.setAttribute("r", pieRadius+settings.baseOffset);
			  base.setAttribute("fill", settings.baseColor);
			}();

			//Set up pie segments wrapper
			var pathGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
			var $pathGroup = $(pathGroup).appendTo($wrapper);
			$pathGroup[0].setAttribute("opacity",0);

			//Set up tooltip
			var $tip = $('<div class="' + settings.tipClass + '" />').appendTo('body').hide(),
			  tipW = $tip.width(),
			  tipH = $tip.height();

			for (var i = 0, len = data.length; i < len; i++){
			  segmentTotal += data[i].value;
			  var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
			  g.setAttribute("data-order", i);
			  g.setAttribute("class", settings.pieSegmentGroupClass);
			  $groups[i] = $(g).appendTo($pathGroup);
			  $groups[i]
				.on("mouseenter", pathMouseEnter)
				.on("mouseleave", pathMouseLeave)
				.on("mousemove", pathMouseMove)
				.on("click", pathClick);

			  var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			  p.setAttribute("stroke-width", settings.segmentStrokeWidth);
			  p.setAttribute("stroke", settings.segmentStrokeColor);
			  p.setAttribute("stroke-miterlimit", 2);
			  p.setAttribute("fill", data[i].color);
			  p.setAttribute("class", settings.pieSegmentClass);
			  $pies[i] = $(p).appendTo($groups[i]);

			  var lp = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			  lp.setAttribute("stroke-width", settings.segmentStrokeWidth);
			  lp.setAttribute("stroke", settings.segmentStrokeColor);
			  lp.setAttribute("stroke-miterlimit", 2);
			  lp.setAttribute("fill", data[i].color);
			  lp.setAttribute("opacity", settings.lightPiesOpacity);
			  lp.setAttribute("class", settings.lightPieClass);
			  $lightPies[i] = $(lp).appendTo($groups[i]);
			}

			settings.beforeDraw.call($this);
			//Animation start
			triggerAnimation();

			function pathMouseEnter(e){
			  var index = $(this).data().order;
			  $tip.text(data[index].title + ": " + data[index].value).fadeIn(200);
			  if ($groups[index][0].getAttribute("data-active") !== "active"){
				$lightPies[index].animate({opacity: .8}, 180);
			  }
			  settings.onPieMouseenter.apply($(this),[e,data]);
			}
			function pathMouseLeave(e){
			  var index = $(this).data().order;
			  $tip.hide();
			  if ($groups[index][0].getAttribute("data-active") !== "active"){
				$lightPies[index].animate({opacity: settings.lightPiesOpacity}, 100);
			  }
			  settings.onPieMouseleave.apply($(this),[e,data]);
			}
			function pathMouseMove(e){
			  $tip.css({
				top: e.pageY + settings.tipOffsetY,
				left: e.pageX - $tip.width() / 2 + settings.tipOffsetX
			  });
			}
			function pathClick(e){
			  var index = $(this).data().order;
			  var targetGroup = $groups[index][0];
			  for (var i = 0, len = data.length; i < len; i++){
				if (i === index) continue;
				$groups[i][0].setAttribute("data-active","");
				$lightPies[i].css({opacity: settings.lightPiesOpacity});
			  }
			  if (targetGroup.getAttribute("data-active") === "active"){
				targetGroup.setAttribute("data-active","");
				$lightPies[index].css({opacity: .8});
			  } else {
				targetGroup.setAttribute("data-active","active");
				$lightPies[index].css({opacity: 1});
			  }
			  settings.onPieClick.apply($(this),[e,data]);
			}
			function drawPieSegments (animationDecimal){
			  var startRadius = -PI/2,//-90 degree
				  rotateAnimation = 1;
			  if (settings.animation) {
				rotateAnimation = animationDecimal;//count up between0~1
			  }

			  $pathGroup[0].setAttribute("opacity",animationDecimal);

			  //draw each path
			  for (var i = 0, len = data.length; i < len; i++){
				var segmentAngle = rotateAnimation * ((data[i].value/segmentTotal) * (PI*2)),//start radian
					endRadius = startRadius + segmentAngle,
					largeArc = ((endRadius - startRadius) % (PI * 2)) > PI ? 1 : 0,
					startX = centerX + cos(startRadius) * pieRadius,
					startY = centerY + sin(startRadius) * pieRadius,
					endX = centerX + cos(endRadius) * pieRadius,
					endY = centerY + sin(endRadius) * pieRadius,
					startX2 = centerX + cos(startRadius) * (pieRadius + settings.lightPiesOffset),
					startY2 = centerY + sin(startRadius) * (pieRadius + settings.lightPiesOffset),
					endX2 = centerX + cos(endRadius) * (pieRadius + settings.lightPiesOffset),
					endY2 = centerY + sin(endRadius) * (pieRadius + settings.lightPiesOffset);
				var cmd = [
				  'M', startX, startY,//Move pointer
				  'A', pieRadius, pieRadius, 0, largeArc, 1, endX, endY,//Draw outer arc path
				  'L', centerX, centerY,//Draw line to the center.
				  'Z'//Cloth path
				];
				var cmd2 = [
				  'M', startX2, startY2,
				  'A', pieRadius + settings.lightPiesOffset, pieRadius + settings.lightPiesOffset, 0, largeArc, 1, endX2, endY2,//Draw outer arc path
				  'L', centerX, centerY,
				  'Z'
				];
				$pies[i][0].setAttribute("d",cmd.join(' '));
				$lightPies[i][0].setAttribute("d", cmd2.join(' '));
				startRadius += segmentAngle;
			  }
			}

			var animFrameAmount = (settings.animation)? 1/settings.animationSteps : 1,//if settings.animationSteps is 10, animFrameAmount is 0.1
				animCount =(settings.animation)? 0 : 1;
			function triggerAnimation(){
			  if (settings.animation) {
				requestAnimFrame(animationLoop);
			  } else {
				drawPieSegments(1);
			  }
			}
			function animationLoop(){
			  animCount += animFrameAmount;//animCount start from 0, after "settings.animationSteps"-times executed, animCount reaches 1.
			  drawPieSegments(easingFunction(animCount));
			  if (animCount < 1){
				requestAnimFrame(arguments.callee);
			  } else {
				settings.afterDrawed.call($this);
			  }
			}
			function Max(arr){
			  return Math.max.apply(null, arr);
			}
			function Min(arr){
			  return Math.min.apply(null, arr);
			}
			return $this;
		  };
		})(jQuery);

	}
	else{
		console.log("맞지 않음")
		alert("값을 다시 한번 확인해 주세요.")
	}
}
