function cursor(n)
{
    var doc = content.document;

    function highlight(entries, entryi, arrow)
    {
        // LIs are interspersed with comments
        var li = entries[entryi * 2 + 1];
        services.console.logStringMessage("this is " + li);

        // LI needs changes in attributes
        li.setAttribute('class', 'g knavi');
        li.setAttribute('style', 'position: relative;');

        // Add arrow
        li.appendChild(arrow);
    }

    function douse(entries, entryi)
    {
        // LIs are interspersed with comments
        var li = entries[entryi * 2 + 1];

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
    var entries = ol.childNodes;

    for (var i = 0; i < entries.length; i++) {
        services.console.logStringMessage("this is " + i + " " + entries[i]);
    }

    // Move arrow
    var entryi = ol.getAttribute('entryi');
    if (entryi == null) {
        entryi = 0;
        ol.setAttribute('entryi', entryi);
        highlight(entries, entryi, arrow);
    } else {
        entryi = parseInt(entryi);

        if (entryi + n >= 0 && (entryi + n) * 2 + 1 < entries.length) {
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
    var entries = ol.childNodes;

    // Get current entry
    var entryi = ol.getAttribute('entryi');

    // Find anchor
    var li = entries[entryi * 2 + 1];
    // Elements are interspersed with text
    var a = li.firstChild.childNodes[3].firstChild;
    buffer.followLink(a);
}
