// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://mail.google.com/mail/u/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// @require http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    var $ = window.jQuery;
    let h;
    window.addEventListener('hashchange', function() {
        clearTimeout(h);
        h = setTimeout(onHashChanged, 1000);
    }, false);


    function onHashChanged()
    {
        let nodes = document.evaluate("//h2[not(@hidden) and contains(.,'[Oktopost]')]", document)
        let subject_node = nodes.iterateNext();
        let el = $("#oktopi");
        if (subject_node) {
            console.log('here i am!');
            if (!el.length) {
                addpi();
            }else{
                doBounce(el,2,'10px',300);
                el.show();
            }
        }else{
            if (el.length) {
                el.hide();
            }
        }
    }

    let hh;
    function addpi()
    {
        clearTimeout(hh);
        hh = setTimeout(
            function(){
                console.log('yar!');
                let dd = $("<div id='oktopi' style='cursor:pointer;position:absolute; right:80px; bottom:40px'>π</div>");
                $("body > div:nth-child(20)").append(dd);
                $(dd).click(decodeIt);
                onHashChanged();
            }, 1000);
    }

    function decodeIt()
    {
        console.log('lets decode some...');
        //let zz = $x("//*[text()[contains(.,'ERR')]]");
        let zz = document.evaluate("//*[text()[contains(.,'ERR') or contains(.,'CRIT') or contains(.,'NOTICE')]]", document);
        let nodes = [];
        let node;
        while (node = zz.iterateNext() ) {
            nodes.push(node)
        }

        for (node of nodes) {
            let txt = node.innerHTML; //textContent
            txt = txt.replaceAll('<wbr>','');
            let text_blocks = [...txt.matchAll(/[0-9A-Za-z\+]{10,}=*/g)];
            text_blocks.forEach(
                (text_block) => {
                    console.log(text_block);
                    try {
                        let decoded = atob(text_block[0]);
                        if (decoded.match(/rror|http|request|not|for|www|file/i)) {
                            decoded = decoded.replaceAll('\n','<br>');
                            node.innerHTML = txt.replaceAll(text_block[0], '<i style="color:#00a700">'+decoded+'</i>');
                            txt = node.innerHTML;
                            console.log('Yay!');
                        }
                    } catch (e) {

                   }
                }
            );
        }
    }

    function doBounce(element, times, distance, speed) {
        for(var i = 0; i < times; i++) {
            element.animate({marginBottom: '+='+distance}, speed)
               .animate({marginBottom: '-='+distance}, speed);
    }
}
    h = setTimeout(onHashChanged, 2000);
})();
