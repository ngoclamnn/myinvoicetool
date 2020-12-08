
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
        },
        grid: {
            name: 'grid',
            show: {
                toolbar: true,
                toolbarReload: false,
                toolbarColumns: false,
                toolbarSearch: false,
                toolbarAdd: true,
                toolbarDelete: true,
                toolbarSave: false,
                toolbarInput: false,
                searchAll: false,
                toolbarEdit: true
            },
            records: records.invoices,
            columns: [
                { field: 'id', text: 'ID', size: '50px', sortable: true },
                { field: 'stt', text: 'STT', size: '50px', sortable: true },
                { field: 'tenKh', text: 'Ten KH', size: '50px', sortable: true },
                { field: 'chitietSpMau', text: 'Chi tiet SP/Mau', size: '50%', sortable: true },
                { field: 'loai', text: 'Loai', size: '50%', sortable: true },
                { field: 'ngayGiaoHang', text: 'Ngay giao hang', size: '50%', sortable: true },
                { field: 'vai', text: 'Vai', size: '50%', sortable: true },
                { field: 'doanhThu', text: 'Doanh thu', size: '50%', sortable: true },
                { field: 'chiPhiNPL', text: 'Chi phi Nguyen phu lieu', size: '50%', sortable: true },
                { field: 'chiPhiGiaCongMay', text: 'Chi phi gia cong may', size: '50%', sortable: true },
                { field: 'chiPhiDichVu', text: 'Chi phi dich vu', size: '50%', sortable: true },
                { field: 'chiPhiChung', text: 'Chi phi chung', size: '50%', sortable: true },
                { field: 'tongCong', text: 'Tong cong', size: '50%', sortable: true }
            ],
            onDblClick: function (event) {
                gridRowClicked(event, this);
            },
            onAdd: function (event) {
                gridRowClicked(event, this, true);
            },
            onEdit: function (event) {
                gridRowClicked(event, this);
            },
            onDelete: function (event) {
                console.log('delete has default behavior');
            },
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
        $('#main').w2layout(config.layout);
        w2ui.layout.html('main', $().w2grid(config.grid));
    });
})();

function gridRowClicked(event, grid, addNew) {
    if (w2ui.form) {
        w2ui.form.destroy();
    }
    var form = $().w2form(window.formConfig);
    console.log(event);
    event.onComplete = function () {
        var sel = grid.getSelection();
        console.log(sel);
        if (sel.length == 1 && !addNew) {
            form.recid = sel[0];
            form.record = $.extend(true, {}, grid.get(sel[0]));
            form.refresh();
            $().w2popup('open', {
                title: 'Edit record',
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

