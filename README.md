# Welcome to kendoui.ex

Here, I tried to extend Awesome Kendo UI with missed functionality.

## Kendo UI TreeView Hook

Kendo UI has TreeView widget. This widget doesn’t has an ability to link extra data to tree node (usefull when you click it). O_O. 
I tried to correct it a little bit. Works only with TreeViews with dataSource.

Treeview generates html code of all items of dataSource and then inserts it to wrapper object by jQuery.html().
We don't have an access to DOM objects to assign to them additional data.

So I made callback with html string. It called when html string generated. You may want to change it.

	addnode: function (htmlstring) {
		//change htmlstring
		//carefull with groups

		return htmlstring
	}


And added auto data-data insertion.

	{text: 'text', data: {id:5}}

will be

	<li class='...' data-data='{id:5}'>text</li>


### Usage

1. Link to page necessary files

    <script type="text/javascript" src="../../../js/treeview.ex/jquery.json-2.3.min.js"></script>
    <script type="text/javascript" src="../../../js/treeview.ex/kendo.treeview.ex.js"></script>

2. Create TreeView as usual, except the "data" attribute. Place to "data" all necessary data (usually an id, etc.)

	$(document).ready(function() {
	    var tv = $("#treeview").kendoTreeView({

	        dataSource: [
	            {
	                data: {id: 'item-id', extra: 'extra-data'},
	                text: 'node #1'
	            },
	            {
	                text: 'node #2'
	            }
	        ],

3. Catch the data by click with

            select: function(e) {

                if ($(e.node).data('data')) {
                    console.log($(e.node).data('data').id, $(e.node).data('data').extra);
                    alert("Node id: " + ($(e.node).data('data').id));
                }
            }

        });
    });


4. Thats all