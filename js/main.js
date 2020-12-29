
var records;
var db = new Database();
(async function () {
    records = await db.getInvoices();
    console.log("records", records.invoices)
    var i = 1
    records.invoices.forEach(function (element) {
        console.log(element)
        element.recid = i;
        i++;
    })
    var config = {
        layout: {
            name: 'layout',
            padding: 4,
            panels: [
                { type: 'main', size: '100%', resizable: true, minSize: 300 }
            ]
        }
    };

    $(function () {
        // initialization
        'use strict';
        var syncDom = document.getElementById('sync-wrapper');

        // EDITING STARTS HERE (you dont need to edit anything above this line)

        db.dbInvoice.changes({
            since: 'now',
            live: true
        }).on('change', db.dbChanges);

        // Initialise a sync with the remote server
        function sync() {
            syncDom.setAttribute('data-sync-state', 'syncing');
            var opts = { live: true };
            db.dbInvoice.replicate.to(db.remoteCouch, opts, syncError);
            db.dbInvoice.replicate.from(db.remoteCouch, opts, syncError);
        }
        function syncError() {
            syncDom.setAttribute('data-sync-state', 'error');
        }
        if (db.remoteCouch) {
            sync();
        }
        $("#main").w2layout(config.layout);
        $().w2layout(tabConfig.layout);
        $().w2grid(window.gridMainConfig)
        $().w2form(window.formConfig);
        $().w2form(window.formChiPhiMayConfig);
        
        $().w2grid(window.chiPhiMayGridConfig);
        w2ui.grid.records = records.invoices;
        w2ui.layout.html('main', w2ui.grid);
    });
})();

function gridRowClicked(event, grid, addNew) {
    var form = w2ui.form;
    event.onComplete = function () {
        var sel = grid.getSelection();
        if (sel.length == 1 && !addNew) {
            form.recid = sel[0];
            form.record = $.extend(true, {}, grid.get(sel[0]));
            form.refresh();
            $().w2popup('open', {
                title: 'Edit record',
                body: window.tabHtml,
                style: 'padding: 15px 0px 0px 0px',
                width: 1000,
                height: 500,
                showMax: true,
                onOpen: function (event) {
                    event.onComplete = function () {
                        $('#w2ui-popup #main-popup').w2render('layout2');
                        w2ui.layout2.html('main', w2ui.form);
                        // specifying an onOpen handler instead is equivalent to specifying an onBeforeOpen handler, which would make this code execute too early and hence not deliver.
                        //$('#w2ui-popup #form').w2render(form);
                        //$('#w2ui-popup #form .page-2').w2render(gridChiPhiChung);

                    }
                }
            });
        } else {
            form.clear();
            $().w2popup('open', {
                title: 'Add record',
                body: '<div id="form" style="width: 100%; height: 100%;"></div>',
                style: 'padding: 15px 0px 0px 0px',
                width: 1000,
                height: 300,
                showMax: true,
                onOpen: function (event) {
                    event.onComplete = function () {
                        // specifying an onOpen handler instead is equivalent to specifying an onBeforeOpen handler, which would make this code execute too early and hence not deliver.
                        $('#w2ui-popup #form').w2render(form);

                    }
                }
            });
        }
    }
}

