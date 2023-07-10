# No JavaScript Snippets

## The boring part 
I'm of the belief that the majority of websites shouldn't require JavaScript to be usable.
Of course, getting rid of JavaScript nowadays is pretty much impossible as plenty of tools have been created over the years that work entirely in the browser and heavily rely on it.
There is nothing wrong with having those. But is it really necessary to rely on it constantly?

Creating a website that doesn't rely on JavaScript will (at minimum) make it faster to load, more accessible, and lighter for the browser.
Maybe it's a forgotten art of creating websites that use JavaScript for enhancing their functionality, rather than limiting their use only to browsers with scripting enabled that's appealing to me.

Here's where this collection of snippets comes in.
Btw I've generated many functions present in the snippets with ChatGPT :p

## Goal
The idea would be to create a website that's fully functional without using JavaScript, and then polish it up by adding extra features with the help of using a combination of `<noskript>` tags and short script snippets.

## How to use 
Snippets are divided into separate files to allow for picking only the ones that are necessary, prevent the clutter and avoid any additional configuration. They might lazily load at the very end of everything, since (as we already established) the website would be functional without them anyway.

All that has to be done is to pick the desirable snippet from the collection and place a script attribute pointing to it in the HTML document.

---
## Dynamic Bootstrap submit button
Removes the `btn-primary` class from the submit buttons in forms on load, and therefore removing their highlight, only to add them back in when the user alters any of the fields in a form.

This is supposed to help indicate to the user that changes were made in the form, and it should now be saved.

### Usage
1. Add the script to the page.\
   `<script src="https://cdn.jsdelivr.net/gh/anan-es/nojs/dist/dynamic-bootstrap-submit-button.js"></script>`
   
2. Submit buttons in forms will now get grayed out on page load.

## Form fields conditional
Hides the fields marked with `data-ifjs-conditional` if the fields with names marked in the parameter have specified values.

### Usage
1. Add the script to the page.\
   `<script src="https://cdn.jsdelivr.net/gh/anan-es/nojs/dist/form-fields-conditional.js"></script>`

2. To hide an HTML element in the form if `<input type="checkbox" value="checked" name="somecheckbox">` in that form is checked, add an attribute `data-ifjs-conditional="somecheckbox=checked"` to the element that's supposed to be hidden.

3. You can specify multiple conditions by separating them with a semicolon. For example to hide the HTML element in the form mentioned before if `somecheckbox` is checked AND `someradio` has an option with `value="option1"` selected,
 use a `data-ifjs-conditional="somecheckbox=checked;someradio=option1"` attribute on the element that is supposed to be hidden.

 ## Form fields text
 Replaces the text inside HTML elements with a different one if JavaScript is enabled.

 ### Usage
1. Add the script to the page.\
   `<script src="https://cdn.jsdelivr.net/gh/anan-es/nojs/dist/form-fields-text.js"></script>`

2. Add the `data-ifjs-text="Some alternative text"` to the desired text element (like a label).