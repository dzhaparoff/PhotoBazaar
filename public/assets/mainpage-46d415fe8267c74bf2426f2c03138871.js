function updateDraw(v, draw_els, i) {

    var l = i.attr("data-length");
    if (l == null) {
        l = i.getTotalLength();
        i.attr("data-length", l);
    }
    if (typeof(l) == "undefined") {
        l = 1000;
    }
    i.attr({
        strokeDasharray: (v * l) + "," + l
    });
    i.attr({
        display: "block"
    });

    return 4 / l;

}

function animate_logo() {

    var k = 0;
    var draw = Snap('#logo_svg');
    var draw_els = draw.selectAll("path");
    var j = 0;

    animateLogo = setInterval(function() {

        if (k <= 1) {
            var interator = updateDraw(k, draw_els, draw_els[j]);
            k = k + interator;
        }

        if (k > 1) {
            k = 0;
            j = j + 1;
        }

        if (j == (draw_els.length)) clearInterval(animateLogo);

    }, 20);
}

$(function() {

    animate_logo();

    var framerate_throttle = false,
        $element = $('body');
    bg = $element.find('.bg_image'),
    animation_func = _.throttle(animate_on_scroll, 10),
    animation_mobile_func = _.throttle(animate_on_scroll_mobile, 10)

    window.addEventListener("mousemove", function(e) {
        animation_func(e);
    }, false);

    window.addEventListener('deviceorientation', function(eventData) {
        animate_on_scroll_mobile(eventData)
    }, false);

    function animate_on_scroll(e) {

        var offsetXp = (1 - (document.body.clientWidth - e.clientX) / document.body.clientWidth);
        var offsetYp = (1 - (document.body.clientHeight - e.clientY) / document.body.clientHeight);

        var offsetX = -(offsetXp * 9 - 4.5).toFixed(2);
        var offsetY = -(offsetYp * 9 - 4.5).toFixed(2);

        bg.css({
            transform: 'translate3d(' + offsetX + '%, ' + offsetY + '%, 0)'
        });

    }

    function animate_on_scroll_mobile(eventData) {

        var yTilt = ((1 - (-eventData.beta + 90) / 180) * 9 - 4.5).toFixed(2);
        var xTilt = ((1 - (-eventData.gamma + 90) / 180) * 9 - 4.5).toFixed(2);

        bg.css({
            transform: 'translate3d(' + xTilt + '%, ' + yTilt + '%, 0)'
        });

    }

})
;
