// ---
// nojs-form-fields-text
// ---
var nojs_forms;
if (typeof nojs_forms === 'undefined') {
    nojs_forms = document.getElementsByTagName('form');
}

for (let i = 0; i < nojs_forms.length; i++) {
    const form = nojs_forms[i];
    const elements = form.querySelectorAll(`[data-ifjs-text]`);

    for (let j = 0; j < elements.length; j++) {
        const element = elements[j];
        element.textContent = element.getAttribute('data-ifjs-text');
    }
}
