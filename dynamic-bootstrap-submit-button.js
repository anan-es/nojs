// ---
// dynamic-bootstrap-submit-button
// ---
var nojs_forms;
if (typeof nojs_forms === 'undefined') {
    nojs_forms = document.getElementsByTagName('form');
}

function updateSubmitButtonClass(form) {
    const fields = form.querySelectorAll('input');
    let changedfields = [];
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        if (field.value !== field.originalValue) {
            changedfields.push(field);
        }
    }

    const submitButton = form.querySelector('button[type=submit]');
    if (changedfields.length === 0) {
        submitButton.classList.remove('btn-primary');
    } else {
        submitButton.classList.add('btn-primary');
    }
}

for (let i = 0; i < nojs_forms.length; i++) {
    const form = nojs_forms[i];

    const fields = form.querySelectorAll('input');
    for (let j = 0; j < fields.length; j++) {
        const field = fields[j];
        field.originalValue = field.value;
        field.addEventListener('keyup', function () {
            updateSubmitButtonClass(form);
        });
        field.addEventListener('change', function () {
            updateSubmitButtonClass(form);
        });
    }
    // Set initial state
    updateSubmitButtonClass(form);
}
