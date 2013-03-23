function _find(e, name)
{
    for (var i = 0; i < e.childNodes.length; i++) {
        if (e.childNodes[i].nodeName == name) {
            return e.childNodes[i];
        }
    }
}

function _entries(ol)
{
    var entries = new Array();
    for (var i = 0; i < ol.childNodes.length; i++) {
        if (ol.childNodes[i].nodeName == 'LI') {
            entries.push(ol.childNodes[i]);
        }
    }
    return entries;
}

function cursor(n)
{
    var doc = content.document;

    function highlight(entries, entryi, arrow)
    {
        // LIs are interspersed with comments
        var li = entries[entryi];

        // LI needs changes in attributes
        li.setAttribute('class', 'g knavi');
        li.setAttribute('style', 'position: relative;');

        // Add arrow
        li.appendChild(arrow);
    }

    function douse(entries, entryi)
    {
        // LIs are interspersed with comments
        var li = entries[entryi];

        // Revert LI attributes
        li.setAttribute('class', 'g');
        li.removeAttribute('style');

        // Remove arrow
        li.removeChild(li.lastChild);
    }

    // Create Google's arrow
    var arrow = doc.createElement('span');
    arrow.appendChild(doc.createTextNode('►'));
    arrow.setAttribute('id', 'knavm');
    arrow.setAttribute('style', 'padding-top: 0px;');

    // Get results
    var ol = doc.getElementById('rso');
    entries = _entries(ol);

    // Move arrow
    var entryi = ol.getAttribute('entryi');
    if (entryi == null) {
        entryi = 0;
        ol.setAttribute('entryi', entryi);
        highlight(entries, entryi, arrow);
    } else {
        entryi = parseInt(entryi);

        if (entryi + n >= 0 && entryi + n < entries.length) {
            entryi += n;
            ol.setAttribute('entryi', entryi);

            douse(entries, entryi - n);
            highlight(entries, entryi, arrow);
        }
    }
}

function open()
{
    var doc = content.document;

    // Get results
    var ol = doc.getElementById('rso');
    var entries = _entries(ol);

    // Get current entry
    var entryi = ol.getAttribute('entryi');

    // Get entry
    var li = entries[entryi];

    // Find anchor
    var div = _find(li, 'DIV');
    if (div) {
        var h3 = _find(div, 'H3');
        var a = _find(h3, 'A');
    } else {
        var a = _find(li, 'A');
    }

    // Follow link
    buffer.followLink(a);
}
