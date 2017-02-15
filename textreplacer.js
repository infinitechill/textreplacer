// very basic chrome plugin to search an html document and replace
// all instances of a string with another string



RegExp.escape= function(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

// get each doument item and store it into an array
function Load(Id) {
    var key = Id.toString();
    key = 'replacetextkey'.key;
    // recall items local storage
    chrome.storage.local.get(key, function(result){
        // escape both retrieved strings
        escapedReplace = RegExp.escape(result.key.replacethis);
        escapedReplacement = RegExp.escape(result.key.replacement);
        // retrieve all items from page into an array
        var elements = document.getElementsByTagName('*');
        // recursively traverse array element by element
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            // traverse each elements nodes
            for (var j = 0; j < element.childNodes.length; j++) {
                var node = element.childNodes[j];
                // if the node is of type text      
                if (node.nodeType === 3) {
                    // grab the text
                    var text = node.nodeValue;
                    // create temporary copy of string but replace all instances of word
                    // make string to replace into new regular expression
                    var replacedText = text.replace(new RegExp(escapedReplace, "i", "g"), escapedReplacement);
                    // if new text is different than old text then replace 
                    if (replacedText !== text) {
                        element.replaceChild(document.createTextNode(replacedText), node);
                    }
                }
            }
        }
    });
}

// load 
Load("myKey");