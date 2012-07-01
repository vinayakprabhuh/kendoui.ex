/*
 * Kendo UI TreeViewEx by CZ
 *
 * Added 2 usefull features:
 *
 * - Auto data-data insertion.
 *
 *      dataSource: {text: 'text', data: {id:5}}
 *
 *      will be
 *
 *      <li class='...' data-data='{id:5}'>text</li>
 *
 * - update method, wich updates only tree structure according to new dataSource
 */

(function($, undefined) {

    var kendo = window.kendo,
        ui = kendo.ui;

    $.extend(window.kendo.ui.TreeView.fn, /** @lends kendo.ui.TreeView.prototype */ {

        update : function ( dataSource ) {

            this.root.empty();

            this.element.html(ui.TreeView.renderGroup({

                    items: dataSource,
                    group: {
                        firstLevel: true,
                        expanded: true
                    },
                    treeview: this.options
                })
            );
        }
    });

    var parentRenderItem = window.kendo.ui.TreeView.renderItem;

    $.extend(window.kendo.ui.TreeView, {

        renderItem : function ( options ) {

            var r = parentRenderItem(options);

            if (options.item.data) {

                var re = /(<li)([^>]*>.*)/;
                var m = re.exec(r);

                r = m[1] + " data-data='" + JSON.stringify(options.item.data) + "'" + m[2]
            }

            if (this.arguments && typeof this.arguments[1].addnode == 'function') {

                this.arguments[1].addnode(r);
            }

            return r;
        }
    });

})(jQuery);