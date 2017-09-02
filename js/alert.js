/* alert.js
 * Extends jQuery alert function so it can be invoked as
 *   $.alert(message,title)
 * See https://coding.abel.nu/2012/01/jquery-ui-replacement-for-alert
 * 
 * I added this so I could tell the player when they won or lost a round
 * 
 * Modified to position the dialog box in the middle of the viewport
 */

$.extend({ alert: function(message, title) {
    $("<div><div/>").dialog( {
        buttons: { 
            "Ok" : function() {
                $(this).dialog("close");
            }
        },
        close: function (event, ui) { $(this).remove(); },
        resizable: false,
        title: title,
        modal: true
    }).text(message);
}
});