!function(){
	var Donut3D={};
	
	function pieTop(d, rx, ry, ir ){
		if(d.endAngle - d.startAngle == 0 ) return "M 0 0";
		var sx = rx*Math.cos(d.startAngle),
			sy = ry*Math.sin(d.startAngle),
			ex = rx*Math.cos(d.endAngle),
			ey = ry*Math.sin(d.endAngle);
			
		var ret =[];
		ret.push("M",sx,sy,"A",rx,ry,"0",(d.endAngle-d.startAngle > Math.PI? 1: 0),"1",ex,ey,"L",ir*ex,ir*ey);
		ret.push("A",ir*rx,ir*ry,"0",(d.endAngle-d.startAngle > Math.PI? 1: 0), "0",ir*sx,ir*sy,"z");
		return ret.join(" ");
	}

	function pieOuter(d, rx, ry, h ){
		var startAngle = (d.startAngle > Math.PI ? Math.PI : d.startAngle);
		var endAngle = (d.endAngle > Math.PI ? Math.PI : d.endAngle);
		
		var sx = rx*Math.cos(startAngle),
			sy = ry*Math.sin(startAngle),
			ex = rx*Math.cos(endAngle),
			ey = ry*Math.sin(endAngle);
			
			var ret =[];
			ret.push("M",sx,h+sy,"A",rx,ry,"0 0 1",ex,h+ey,"L",ex,ey,"A",rx,ry,"0 0 0",sx,sy,"z");
			return ret.join(" ");
	}

	function pieInner(d, rx, ry, h, ir ){
		var startAngle = (d.startAngle < Math.PI ? Math.PI : d.startAngle);
		var endAngle = (d.endAngle < Math.PI ? Math.PI : d.endAngle);
		
		var sx = ir*rx*Math.cos(startAngle),
			sy = ir*ry*Math.sin(startAngle),
			ex = ir*rx*Math.cos(endAngle),
			ey = ir*ry*Math.sin(endAngle);

			var ret =[];
			ret.push("M",sx, sy,"A",ir*rx,ir*ry,"0 0 1",ex,ey, "L",ex,h+ey,"A",ir*rx, ir*ry,"0 0 0",sx,h+sy,"z");
			return ret.join(" ");
	}

	// function getPercent(d){
	// 	return (d.endAngle-d.startAngle > 0.2 ? 
	// 			Math.round(1000*(d.endAngle-d.startAngle)/(Math.PI*2))/10+'%' : '');
	// }	
	function getPercent(d){
		return Math.round(1000*(d.endAngle-d.startAngle)/(Math.PI*2))/10+'%';
	}	

	function sumTotal(d){
		var res = 0;
		for (i in d){
			res += d[i].value;
		}
		return res;
	}

	Donut3D.transition = function(id, data, rx, ry, h, ir){
		function arcTweenInner(a) {
		  var i = d3.interpolate(this._current, a);
		  this._current = i(0);
		  return function(t) { return pieInner(i(t), rx+0.5, ry+0.5, h, ir);  };
		}
		function arcTweenTop(a) {
		  var i = d3.interpolate(this._current, a);
		  this._current = i(0);
		  return function(t) { return pieTop(i(t), rx, ry, ir);  };
		}
		function arcTweenOuter(a) {
		  var i = d3.interpolate(this._current, a);
		  this._current = i(0);
		  return function(t) { return pieOuter(i(t), rx-.5, ry-.5, h);  };
		}
		function textTweenX(a) {
		  var i = d3.interpolate(this._current, a);
		  this._current = i(0);
		  return function(t) { return 0.6*rx*Math.cos(0.5*(i(t).startAngle+i(t).endAngle));  };
		}
		function textTweenY(a) {
		  var i = d3.interpolate(this._current, a);
		  this._current = i(0);
		  return function(t) { return 0.6*rx*Math.sin(0.5*(i(t).startAngle+i(t).endAngle));  };
		}
		
		var _data = d3.layout.pie().sort(null).value(function(d) {return d.value;})(data);
		
		d3.select("#"+id).selectAll(".innerSlice").data(_data)
			.transition().duration(750).attrTween("d", arcTweenInner); 
			
		d3.select("#"+id).selectAll(".topSlice").data(_data)
			.transition().duration(750).attrTween("d", arcTweenTop); 
			
		d3.select("#"+id).selectAll(".outerSlice").data(_data)
			.transition().duration(750).attrTween("d", arcTweenOuter); 	
			
		d3.select("#"+id).selectAll(".percent").data(_data).transition().duration(750)
			.attrTween("x",textTweenX).attrTween("y",textTweenY).text(getPercent); 	

	}
	
	Donut3D.draw=function(id, data, x /*center x*/, y/*center y*/, 
			rx/*radius x*/, ry/*radius y*/, h/*height*/, ir/*inner radius*/){
	
		var _data = d3.layout.pie().sort(null).value(function(d) {return d.value;})(data);
		
		var slices = d3.select("#"+id).append("g").attr("transform", "translate(" + x + "," + y + ")")
			.attr("class", "slices");
			
		slices.selectAll(".innerSlice").data(_data).enter().append("path").attr("class", "innerSlice")
			.style("fill", function(d) { return d3.hsl(d.data.color).darker(0.7); })
			.attr("d",function(d){ return pieInner(d, rx+0.5,ry+0.5, h, ir);})
			.each(function(d){this._current=d;});
		
		slices.selectAll(".topSlice").data(_data).enter().append("path").attr("class", "topSlice")
			.style("fill", function(d) { return d.data.color; })
			.style("stroke", function(d) { return d.data.color; })
			.attr("d",function(d){ return pieTop(d, rx, ry, ir);})
			.attr("index", function(d, i) { return i; })
			.on("mouseover", function(d){
					d3.select(this)
					.style("fill", d3.hsl(d.data.color).brighter(0.3));
			})
			.on("mouseout", function(d){
					d3.select(this)
					.style("fill", function(d) { return d.data.color; });
			})
			.on("click", function(d,i){
				alert(d.value);
			})
			.each(function(d){this._current=d;});
		
		slices.selectAll(".outerSlice").data(_data).enter().append("path").attr("class", "outerSlice")
			.style("fill", function(d) { return d3.hsl(d.data.color).darker(0.7); })
			.attr("d",function(d){ return pieOuter(d, rx-.5,ry-.5, h);})
			.attr("index", function(d, i) { return i; })
			.on("mouseover", function(d){
					d3.select(this)
					.style("fill", d3.hsl(d.data.color).brighter(0.3));
			})
			.on("mouseout", function(d){
					d3.select(this)
					.style("fill", function(d) { return d3.hsl(d.data.color).darker(0.7); });
			})
			.on("click", function(d,i){
				alert(d.value);
			})
			.each(function(d){this._current=d;});

		var changeColor = 0;

		slices.selectAll(".percent").data(_data).enter().append("text").attr("class", "percent")
			.attr("x",function(d){
				return d.endAngle-d.startAngle > 0.2 ? (0.6*rx*Math.cos(0.5*(d.startAngle+d.endAngle))):(1.2*rx*Math.cos(0.5*(d.startAngle+d.endAngle)));
			})
			.attr("y",function(d){ 
				return d.endAngle-d.startAngle > 0.2 ? (0.6*ry*Math.sin(0.5*(d.startAngle+d.endAngle))):(1.2*ry*Math.sin(0.5*(d.startAngle+d.endAngle)));
			})
			.attr("fill",function(d){if (d.endAngle-d.startAngle > 0.2) return "white"; else return "black"})
			.text(getPercent).each(function(d){this._current=d;});
	}

	Donut3D.draw2=function(id, data, x /*center x*/, y/*center y*/, 
			rx/*radius x*/, ry/*radius y*/, h/*height*/, ir/*inner radius*/){
	
		var _data = d3.layout.pie().sort(null).value(function(d) {return d.value;})(data);
		var _data2 = data;
		
		var slices = d3.select("#"+id).append("g").attr("transform", "translate(" + x + "," + y + ")")
			.attr("class", "slices");

		slices.selectAll(".tagColor").data(_data2).enter().append("rect").attr("class", "tagColor")
			.attr("transform", "translate(" + 0 + "," + -13 + ")")
			.attr("x",-10)
			.attr("y",function(d) { return d.posY; })
		 	.attr("width",16)
			.attr("height",16)
			.attr("rx",3)
			.attr("ry",3)
		  	.attr("fill",function(d) { return d.color; });

		slices.selectAll(".tagName").data(_data2).enter().append("text").attr("class", "tagName")
		 	.attr("x", 10)
			.attr("y",function(d) { return d.posY; })
		  	.text(function(d) { return d.label; })
		  	.attr("name", function(d, i) { return "item_"+i; });

		slices.selectAll(".tagValue").data(_data2).enter().append("text").attr("class", "tagValue")
		 	.attr("transform", "translate(" + 145 + "," + 0 + ")")
		 	.attr("x",function(d) { return d.posX; })
			.attr("y",function(d) { return d.posY; })
		  	.text(function(d) { return d.value; });

		slices.selectAll(".tagLine").data([0]).enter().append("rect").attr("class", "tagLine")
			.attr("transform", "translate(" + 0 + "," + 95 + ")")
			.attr("x",10)
			.attr("y",35)
			.attr("width",150)
			.attr("height",2)
			.attr("fill", "#C0C0C0")
			.attr("opacity",.4);

		slices.selectAll(".tagTotal").data([0]).enter().append("text").attr("class", "tagTotal")
		 	.attr("transform", "translate(" + 0 + "," + 0 + ")")
		 	.attr("x",10)
			.attr("y",150)
		  	.text("Total");

		slices.selectAll(".tagResult").data([0]).enter().append("text").attr("class", "tagResult")
		 	.attr("transform", "translate(" + 145 + "," + 0 + ")")
		 	.attr("x",-5)
			.attr("y",150)
		  	.text(sumTotal(data));
	}

	this.Donut3D = Donut3D;
}();
