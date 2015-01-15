function init() {
    var input = document.getElementById("input");
    var math = document.getElementById("math");
//    var permalink = document.getElementById("permalink");
//
    if ("oninput" in input) {
        input.addEventListener("input", reprocess, false);
    } else {
        input.attachEvent("onkeyup", reprocess);
    }

//    if ("addEventListener" in permalink) {
//        permalink.addEventListener("click", function() {
//            window.location.search = "?text=" + encodeURIComponent(input.value);
//        });
//    } else {
//        permalink.attachEvent("click", function() {
//            window.location.search = "?text=" + encodeURIComponent(input.value);
//        });
//    }

//    var match = (/(?:^\?|&)text=([^&]*)/).exec(window.location.search);
//    if (match) {
//        input.value = decodeURIComponent(match[1]);
//    }

    reprocess();

    function reprocess() {
        try {
//            katex.render(input.value, math);

            var output = input.value.replace(
                /([^\$]*)\$([^\$]*)\$([^\$]*)/g,
                function($0, $1, $2, $3) {
//                    console.log(" " + $0+" "+$1+" "+$2+" "+$3);

                    var ret =
                        ( $1 ? "<span>" + $1 + "</span>" : "" ) +
                        ( $2 ? katex.renderToString($2)  : "" ) +
                        ( $3 ? "<span>" + $3 + "</span>" : "" )
                    return ret
                });
            // inline typesetting
            //var html = katex.renderToString("\\displaystyle {" + formula + "}");
            math.innerHTML = output;

        } catch (e) {
            if (e.__proto__ == katex.ParseError.prototype) {
                console.error(e);
            } else {
                throw e;
            }
        }
    }
}

init();
