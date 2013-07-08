# Welcome to kendoui.ex

Here, I tried to extend Awesome Kendo UI with missed functionality.

[Examples](http://insanio.github.io/kendoui.ex/examples/web/)

## Kendo UI Menu Ex

MenuEx allows you to create:
- context menus
- hook to click event of menu node
- extra data assigned to menu node

### Auto data-data insertion

		{
		    text: 'text',
		    data: {id:5}
		}

will be

		<li class='...' data-data='{id:5}'>text</li>

### Node click callback

		{
		    text: 'text',
		    data: {id:5},
            click: function (event) {

                alert("this item id: " + this.data('data').id);
            }
		}

### All extra options

- anchor - selector to elements menu will be linked
- event  - jQuery event triggers context menu (default: 'contexmenu')
- delay  - delay before menu will hide (default: 1000)

### Example

		$(document).ready(function()  {
			$('#testMenu').kendoMenuEx({
				dataSource: [
				{
					text: 'item #1',
					imageUrl: "../../content/shared/icons/sports/baseball.png",
					data: {id: 5, extra: 'extradata'},
                    click: function (event) {

                        alert("this item id: " + this.data('data').id);
                    }
				}],
                anchor: '#myDiv, #myTree li',
                delay: 1500,
                event: 'contextmenu'
		    });
	    });


## Kendo UI Sidebar

Sidebar allows you to create sidebar docked to screen edge. Based on Menu.

### Example

        $(function()  {
                var cm = $('#sidebar').kendoSidebar({
                dataSource: [
                    {
                        text: 'item #1',
                        imageUrl: "../../content/shared/icons/sports/baseball.png",
                        data: {id: 5, extra: 'extradata'},
                        click: function (e) {

                            alert("this item id: " + this.data('data').id);
                        }
                    },
                    {text: 'item #2', imageUrl: "../../content/shared/icons/sports/golf.png"},
                    {text: 'item #3', imageUrl: "../../content/shared/icons/sports/swimming.png",
                        items: [
                            {text: 'item #31', imageUrl: "../../content/shared/icons/16/video.png"},
                            {text: 'item #32', imageUrl: "../../content/shared/icons/16/photo.png"}
                        ]
                    }
                ],
                orientation: 'horizontal',
                position: ['center', 'bottom'] // [[left, center, right], [top, center, bottom]]
            });
        });

### License

Copyright (c) 2011-2013, Constantine Zykov

Dual licensed under the [MIT license](https://github.com/insanio/kendoui.ex/blob/master/MIT-license.txt) and [GPL license](https://github.com/insanio/kendoui.ex/blob/master/GPL-license.txt).
