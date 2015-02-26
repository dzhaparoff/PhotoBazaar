function updateDraw(v, draw_els, i) {
	
			var l=i.attr("data-length");
			if(l==null){
				l=i.getTotalLength();
				i.attr("data-length",l);
			}
			if(typeof(l)=="undefined"){
				l=1000;
			}
			i.attr({strokeDasharray:(v*l)+","+l});
			i.attr({display:"block"});
			
			return 4/l;
		
}

function animate_logo() {

	var k = 0;
	var draw = Snap('#logo_svg');
	var draw_els = draw.selectAll("path");
	var j = 0;

	animateLogo = setInterval(function(){
		
		if (k <= 1) {
			var interator = updateDraw(k, draw_els, draw_els[j]);
			k = k + interator;
		}

		if(k > 1) {
			k = 0;
			j = j + 1;
		}

		if ( j == (draw_els.length  ) ) clearInterval(animateLogo);

	},20);
}

$(function(){

animate_logo();

})