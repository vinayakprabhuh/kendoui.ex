/*
 * Kendo UI TreeViewEx by CZ
 *
 * TreeViewEx is a hook to renderItem of kendo.ui.TreeView.
 *
 * Treeview generates html code of all items of dataSource and then inserts it to wrapper object by jQuery.html().
 * We don't have an access to DOM objects to assign to them additional data.
 *
 * So I made callback with html string. It called when html string generated. You may want to change it.
 *
 *  ...
 *      addnode: function (htmlstring) {
 *          //change htmlstring
 *          //carefull with groups
 *
 *          return htmlstring
 *      }
 *  ...
 *
 * And added auto data-data insertion.
 *
 * {text: 'text', data: {id:5}}
 *
 * will be
 *
 * <li class='...' data-data='{id:5}'>text</li>
 *
 *
 * Kendo UI Complete v2012.1.322 (http://kendoui.com)
 * Copyright 2012 Telerik AD. All rights reserved.
 *
 */

(function( $ ){

    var parent = window.kendo.ui.TreeView.renderItem;

    window.kendo.ui.TreeView.renderItem = function ( a ) {

        var r = parent(a);

        if (a.item.data) {
            var re = /(<li)([^>]*>.*)/;
            var m = re.exec(r);

            r = m[1] + " data-data='" + $.toJSON(a.item.data) + "'" + m[2]

        }

        if (this.arguments && typeof this.arguments[1].addnode == 'function') {
            this.arguments[1].addnode(r);
        }

        return r;

    }

    window.kendo.ui.TreeView.fn.update = function ( dataSource ) {

        this.root.empty();

        this.element.html(window.kendo.ui.TreeView.renderGroup({
				items: dataSource,
				group: {
					firstLevel: true,
					expanded: true
				},
				treeview: this.options
            })
        );
    }

})(jQuery)