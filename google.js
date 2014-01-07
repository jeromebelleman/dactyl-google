function _find(e, name)
{
    for (var i = 0; i < e.childNodes.length; i++) {
        child = e.childNodes[i];
        if (child.nodeType == 1) { // Text nodes don't have getAttribute()
            attr = child.getAttribute('style');
            // Headings in LI which aren't displayed have no A
            if (child.nodeName == name && !(attr && attr == 'display:none')) {
                return child;
            }
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
        var style = li.getAttribute('style');
        if (style) {
            li.setAttribute('oldstyle', style);
            style = style + ';';
        } else {
            style = '';
        }
        li.setAttribute('style', style + 'position: relative;');

        // Add arrow
        li.appendChild(arrow);
    }

    function douse(entries, entryi)
    {
        // LIs are interspersed with comments
        var li = entries[entryi];

        // Revert LI attributes
        var oldstyle = li.getAttribute('oldstyle');
        if (oldstyle) {
            li.setAttribute('style', oldstyle);
        } else {
            li.removeAttribute('style');
        }

        // Remove arrow
        li.removeChild(li.lastChild);
    }

    // Create Google's arrow
    var arrow = doc.createElement('span');
    arrow.appendChild(doc.createTextNode('►'));
    var style = 'position:absolute;left: -13px; top: 2px; ';
    style += 'font: 11px arial,sans-serif;';
    arrow.setAttribute('style', style);

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
    var a, h3, div;
    div = _find(li, 'DIV');
    h3 = _find(div, 'H3');
    if (!h3) {
        div = _find(div, 'DIV');
        h3 = _find(div, 'H3');
    }
    a = _find(h3, 'A');

    // Follow link
    buffer.followLink(a);
}
