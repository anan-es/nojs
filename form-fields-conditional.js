// ---
// ifjs-conditional
// ---
var nojs_forms;
if (typeof nojs_forms === 'undefined') {
    nojs_forms = document.getElementsByTagName('form');
}

function findFields(form, conditionalData) {
    const keyValuePair = conditionalData.split(';');
    let fields = [];
    for (let attribute = 0; attribute < keyValuePair.length; attribute++) {
        const [fieldName, fieldValue] = keyValuePair[attribute].split('=');
        fields.push.apply(fields, form.querySelectorAll(`[name="${fieldName}"]`));
    }
    return fields;
}

function updateElement(element, form) {
    const conditionalData = element.getAttribute('data-ifjs-conditional');
    const keyValuePair = conditionalData.split(';');

    let showElement = false;

    // Check for attributes
    for (let attribute = 0; attribute < keyValuePair.length; attribute++) {
        const [fieldName, fieldValue] = keyValuePair[attribute].split('=');

        // Find fields matching the key
        const targetFields = form.querySelectorAll(`[name="${fieldName}"]`)
        for (let targetField = 0; targetField < targetFields.length; targetField++) {
            const targetFieldElement = targetFields[targetField];
            // If the target field is an unchecked radio button, continue serching
            if (targetFieldElement.type === 'radio' && !targetFieldElement.checked) {
                continue;
            }
            // Check if target element has the specified value
            if (targetFieldElement.value == fieldValue) {
                showElement = true;
                break;
            }
        }
    }

    if (showElement) {
        element.style.display = element.originalDisplayStyle; 
        element.originalDisplayStyle = null;
    } else {
        element.originalDisplayStyle = element.style.display;
        element.style.display = 'none';
    }
}

for (let i = 0; i < nojs_forms.length; i++) {
    const form = nojs_forms[i];
    const elements = form.querySelectorAll(`[data-ifjs-conditional]`);

    for (let j = 0; j < elements.length; j++) {
        const element = elements[j];

        let fields = findFields(form, element.getAttribute('data-ifjs-conditional'));
        for (let field = 0; field < fields.length; field++) {
            let targetField = fields[field];
            targetField.addEventListener('keyup', function() { 
                updateElement(element, form);
            });
            targetField.addEventListener('change', function() {
                updateElement(element, form);
            });
        }
    }
}
