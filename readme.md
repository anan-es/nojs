# No JavaScript Snippets

## The boring part 
I'm of the belief that the majority of websites shouldn't require JavaScript to be usable.
Of course, getting rid of JavaScript nowadays is pretty much impossible as plenty of tools have been created over the years that work entirely in the browser and havily rely on it.
There is nothing wrong with having those. But is it really necessary to rely on it constantly?

Creating a website that doesn't rely on JavaScript will (at minimum) make it faster to load, more accessible, and lighter for the browser.
Maybe it's a forgotten art of creating websites that use JavaScript for enhancing their functionality, rather than limiting their use only to browsers with scripting enabled that's appealing to me.

Here's where this collection of snippets comes in.
Btw I've generated many functions present in the snippets with ChatGPT :p

## Goal
The idea would be to create a website that's fully functional without using JavaScript, and then polish it up by adding extra features with the help of using a combination of `<noskript>` tags and short script snippets.

## Usage
Snippets are divided into separate files to allow for picking only the ones that are necessary, prevent the clutter and avoid any additional configuration. They might lazily load at the very end of everything, since (as we already established) the website would be functional without them.

All that has to be done is to pick the desirable snippet from the collection and place a script attribute pointing to it in the HTML document.

---
## Danamic Bootstrap submit button
Removes the `btn-primary` class from the submit buttons in forms on load, only to add them back in when the user alters any of the fields in a form.

This is supposed to help indicate to the user that changes were made in the form and it should now be saved.

## Form fields conditional