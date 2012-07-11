/*
 *# Kendo UI Sidebar by CZ
 *
 * Sidebar allows you to create:
 *  -
 *
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
 *        position: ['right', 'center']
 *    });
 * });
 *
 *
 * Kendo UI Complete v2012.1.322 (http://kendoui.com)
 * Copyright 2012 Telerik AD. All rights reserved.
 *
 */

(function( $ ){

    var kendo = window.kendo,
        ui = kendo.ui,
        extend = $.extend,
        Widget = ui.Widget;

    var parent = window.kendo.ui.Menu.renderItem;

    $.extend(ui.Menu, {

        renderItem: function ( options ) {

            var r = parent(options);
            var injects = "";

            if (options.item.data) {

                injects = " data-data='" + JSON.stringify(options.item.data) + "'";
            }

            if (injects.length > 0) {

                var re = /(<li)([^>]*>.*)/;
                var m = re.exec(r);

                r = m[1] + injects + m[2];
            }

            return r;
        }
    });

    var hiding = false;
    var showing = true;
    var canHide = true;
    var bound = 25;
    var  showHideProps = {left: '0px'};

    var Sidebar = ui.Menu.extend({/** @lends kendo.ui.Menu.prototype */

        options: {
            name: "Sidebar",
            delay: 200,
            orientation: 'horizontal',
            position: ['left', 'center']
        },

        init: function(element, options) {

            var that = this;

            if (options.position[0] == 'left') {

                options.direction = 'right';
            }
            else if (options.position[1] == 'right') {

                options.direction = 'left';
            }

            if (options.position[1] == 'bottom') {

                options.direction = 'top';
            }
            else if (options.position[1] == 'top') {

                options.direction = 'bottom';
            }

            ui.Menu.fn.init.call(that, element, options);

            that.element.addClass('k-sidebar');

            that.initPosition(options.position);
            that.initShowHideProps(options);

            that.hide();

            $(document).bind('mousemove', function(e){

                    if (
                        e.pageX > parseInt(that.element.css('left')) - bound
                        && e.pageX < parseInt(that.element.css('left')) + that.element.width() + bound
                        && e.pageY > parseInt(that.element.css('top')) - bound
                        && e.pageY < parseInt(that.element.css('top')) + that.element.height() + bound
                        ) {

                            that.show(e);
                    }
                    else {

                        that.hide(e);
                    }

                return false;
            });

            that.element.children('li').bind('mouseleave', function(e) {

                canHide = true;
            });

            that.element.children('li').bind('mouseenter', function(e) {

                canHide = false;
            });

            var items = that.element.find('.k-item');

            $.each(options.dataSource, function(i, el) {

                if (el.click != undefined) {

                    jQuery(items[i]).click( function(e) {

                        el.click.call($(e.target).parents('li'), e);
                    });
                }
            });
        },

        hide: function () {

            if (showing && !hiding && canHide) {

                hiding = true;
                this.element.animate(
                    showHideProps.hide,
                    this.options.delay,
                    this.options.animation.close.effects || 'linear',
                    function() {

                        hiding = false;
                        showing = false;
                });
            }
        },

        show: function (e) {

            if (hiding == false && showing == false) {

                showing = true;
                this.element.animate(
                    showHideProps.show,
                    this.options.delay,
                    this.options.animation.open.effects || 'linear'
                );
            }
        },

        initPosition: function (position) {

            // X coords
            if (position[0] == 'left') {

                this.element.css('left', 0);
            }
            else if(position[0] == 'right') {

                this.element.css('right', 0);
            }
            else if (position[0] == 'center') {

                this.element.css('left', ( $(document).width() - this.element.width() ) / 2);
            }
            else {

                this.element.css('left', position[0]);
            }

            // Y coords
            if (position[1] == 'top') {

                this.element.css('top', 0);
            }
            else if(position[1] == 'bottom') {

                this.element.css('bottom', 0);
            }
            else if (position[1] == 'center') {

                this.element.css('top', ( $(document).height() - this.element.height() ) / 2);
            }
            else {

                this.element.css('top', position[1]);
            }
        },

        initShowHideProps: function(options) {

            if (this.options.orientation == 'horizontal') {

                if (this.options.position[1] == 'top') {

                    showHideProps = {

                        hide: {top: '-' +  ( this.element.height() * 80 / 100 ) + 'px'},
                        show: {top: '+0px'}
                    };
                }
                else if (this.options.position[1] == 'bottom') {

                    showHideProps = {

                        hide: {top: '+' + $(document).height() - ( this.element.height() * 20 / 100 ) + 'px'},
                        show: {top: $(document).height() - this.element.height() + 'px'}
                    };
                }
            }

            if (this.options.orientation == 'vertical') {

                if (this.options.position[0] == 'left') {

                    showHideProps = {

                        hide: {left: '-' +  ( this.element.width() * 90 / 100 ) + 'px'},
                        show: {left: '0px'}
                    };
                }
                else if (this.options.position[0] == 'right') {

                    showHideProps = {

                        hide: {right: '-' + ( this.element.width() - this.element.width() * 10 / 100 ) + 'px'},
                        show: {right: '0px'}
                    };
                }
            }
        }
    });

    ui.plugin(Sidebar);

})(jQuery);