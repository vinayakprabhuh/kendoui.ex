/*
 *# Kendo UI MenuEx by CZ
 *
 * MenuEx allows you to create:
 *  - context menus
 *  - hook to click event of menu node
 *  - extra data assigned to menu node
 *  - addnode callback (envoked when html of node generated)
 *
 *## Auto data-data insertion.
 *
 * {text: 'text', data: {id:5}}
 *
 * will be
 *
 * <li class='...' data-data='{id:5}'>text</li>
 *
 *## Node click callback
 *
 * {text: 'text', click: 'alert(this)' }
 *
 *## addnode callback
 *
 *  addnode: function ( e ) {
 *      console.log(e);
 *  }
 *
 *## All extra options
 *
 * - anchor - selector to elements menu will be linked
 * - event  - jQuery event triggers context menu (default: 'contexmenu')
 * - delay  - delay before menu will hide
 *
 *## Example
 *
 * $(document).ready(function()  {
 *      $('#testMenu').kendoMenuEx({
 *      dataSource: [
 *            {
 *                text: 'item #1',
 *                imageUrl: "../../content/shared/icons/sports/baseball.png",
 *                data: {id: 5, extra: 'extradata'},
 *                click: 'showalert(this)'
 *            }
 *        ],
 *        select: function(el) {
 *            console.log(el);
 *        },
 *        orientation: 'vertical',
 *        anchor: '#mySpan, #myButton',
 *        delay: 1500,
 *        addnode: function(el) { console.log(el); }
 *    });
 * });
 *
 *
 * Kendo UI Complete v2012.1.322 (http://kendoui.com)
 * Copyright 2012 Telerik AD. All rights reserved.
 *
 */

(function( $ ){

    var parent = window.kendo.ui.Menu.renderItem;

    window.kendo.ui.Menu.renderItem = function ( a ) {

        var r = parent(a);
        var injects = "";

        if (a.item.data) {
            injects = " data-data='" + $.toJSON(a.item.data) + "'";
        }

        if (a.item.click) {
            injects += " onclick='" + a.item.click + "'";
        }

        if (injects.length > 0) {
            var re = /(<li)([^>]*>.*)/;
            var m = re.exec(r);

            r = m[1] + injects + m[2];
        }

        if (typeof this.arguments[1].addnode == 'function') {
            this.arguments[1].addnode(r);
        }

        return r;

    }


    $.fn.kendoMenuEx = function(options){

        var kendomenu = this.kendoMenu(options);

        var hiding = false;

        this.addClass('k-context-menu');

        kendomenu.closeex = function () {
            kendomenu.fadeOut(function() { hiding = false; });
        };

        kendomenu.openex = function (anchor, e) {
            if (hiding == false) {
                console.log(e);
                kendomenu.css({'top': e.pageY, 'left': e.pageX});
                kendomenu.fadeIn();
            }
        }

        if (options.anchor){

            event = options.event || 'contextmenu'

            $(options.anchor).bind(event, function(e){
                kendomenu.openex(options.anchor, e);
                return false;
            });

            this.bind('mouseleave', function() {
                hiding = true;
                delay = options.delay || 1000;
                setTimeout(function(){ kendomenu.closeex() }, delay);
            });
        }

        return this;
    };

})(jQuery);