// ---
// nojs-form-fields-autofill
// ---
var nojs_forms;
if (typeof nojs_forms === 'undefined') {
    nojs_forms = document.getElementsByTagName('form');
}
var nojs_autocomplete_forms = [];
const autocomplete_delay_ms = 1000;

// Function to serialize parameters for GET requests
function serializeParams(params) {
    return Object.keys(params)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
}

function sendXmlHttpRequest(url, params) {
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Create a promise for handling the asynchronous request
    return new Promise((resolve, reject) => {
        // Define the HTTP request method (GET or POST) and URL
        const method = params.method || 'GET';
        const paramString = method === 'GET' ? serializeParams(params.data) : null;

        xhr.open(method, method === 'GET' ? `${url}?${paramString}` : url, true);

        // Set up the callback for when the request is complete
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Parse the XML response and convert it to an object
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(xhr.responseText, 'text/xml');
                    const result = xmlToObj(xmlDoc.documentElement);
                    resolve(result);
                } else {
                    reject(new Error(`Request failed with status ${xhr.status}`));
                }
            }
        };

        // Set the Content-Type header for POST requests
        if (method === 'POST') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }

        // Send the request with the appropriate data
        xhr.send(method === 'POST' ? paramString : null);
    });
}

// Function to convert XML to an object
function xmlToObj(xml) {
    const obj = {};

    // If the XML has child nodes, process them
    if (xml.hasChildNodes()) {
        for (let i = 0; i < xml.childNodes.length; i++) {
            const child = xml.childNodes[i];

            // Check if the child is an element node
            if (child.nodeType === 1) {
                const nodeName = child.nodeName;
                const nodeValue = child.textContent;

                // If the node has no child nodes, assign its value directly
                if (!child.childNotes) {
                    obj[nodeName] = nodeValue;
                } else {
                    // If the node has child nodes, recursively convert them
                    const childObj = xmlToObj(child);
                    if (obj[nodeName]) {
                        // If the node already exists in the object, convert it to an array
                        if (!Array.isArray(obj[nodeName])) {
                            obj[nodeName] = [obj[nodeName]];
                        }
                        obj[nodeName].push(childObj);
                    } else {
                        obj[nodeName] = childObj;
                    }
                }
            }
        }
    }

    return obj;
}

function updateRelatedFields(parentId, formsObject, replacements) {
    formsObject.forEach((field) => {
        field.relatedFields.forEach((relatedField) => {
            if (relatedField.parent === parentId && replacements[relatedField.name]) {
                relatedField.field.value = replacements[relatedField.name];
                relatedField.value = replacements[relatedField.name];
            }
        });
    });
}

function updateTriggerFieldValue(triggerName, formsObject, value) {
    formsObject.forEach((field) => {
        if (field.name === triggerName) {
            field.value = value;
        }
    });
}

function performRequest(triggerUrl, triggerId, formsObject) {
    const params = {
        method: 'GET',
        data: {},
    };
    formsObject.filter((field) => field.id === triggerId && field.value)
    .forEach((field) => params.data[field.name] = field.value);
    sendXmlHttpRequest(triggerUrl, params)
        .then((response) => {
            if (!response.error) {
                updateRelatedFields(triggerId, formsObject, response)
            }
            console.log('Response:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function addRegexChangeListener(element, triggerUrl, triggerId, triggerName, triggerRegexString, run) {
    // Create a regular expression object from the provided regexString
    const regex = triggerRegexString ? new RegExp(triggerRegexString) : null;
    let timeoutId = null;

    let updateFunction = function (timeout) {
        clearTimeout(timeoutId);
        const inputValue = element.value;

        // Check if the input value matches the regular expression
        if (!regex || regex.test(inputValue)) {
            updateTriggerFieldValue(triggerName, nojs_autocomplete_forms, inputValue);
            // Call the run() function when there is a match
            if (triggerUrl && inputValue) {
                if (timeout) {
                    timeoutId = setTimeout(function () {
                        performRequest(triggerUrl, triggerId, nojs_autocomplete_forms);
                    }, autocomplete_delay_ms);
                    return;
                }
                performRequest(triggerUrl, triggerId, nojs_autocomplete_forms);
            }
        }
    };

    // Add an input event listener to the input field
    element.addEventListener('input', function() { updateFunction(true) });
    element.addEventListener('focusout', function() { updateFunction(false) });
}

for (let i = 0; i < nojs_forms.length; i++) {
    const form = nojs_forms[i];
    const elements = form.querySelectorAll(`[data-ifjs-autocomplete-trigger]`);

    for (let j = 0; j < elements.length; j++) {
        const element = elements[j];
        const triggerId = element.getAttribute('data-ifjs-autocomplete-trigger'); // Trigger group (the identifier relatedElements refer to)
        const triggerName = element.getAttribute('data-ifjs-autocomplete-name') ?? triggerId; // Variable name used in requests
        const triggerUrl = element.getAttribute('data-ifjs-autocomplete-trigger-url');
        const triggerRegexString = element.getAttribute('data-ifjs-autocomplete-trigger-regex');
        const relatedFields = form.querySelectorAll(`[data-ifjs-autocomplete-parent="${triggerId}"]`);
        const relatedFieldsObjects = Array.from(relatedFields).map((relatedField) => ({
            field: relatedField,
            name: relatedField.getAttribute('data-ifjs-autocomplete-name'), // Variable name used in responces
            parent: triggerId
        }));
        nojs_autocomplete_forms.push({
            id: triggerId,
            field: element,
            name: triggerName,
            url: triggerUrl,
            triggerRegex: triggerRegexString,
            relatedFields: relatedFieldsObjects,
        });
        addRegexChangeListener(
            element,
            triggerUrl,
            triggerId,
            triggerName,
            triggerRegexString,
            performRequest
        )
    }
}