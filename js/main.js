// widget configuration
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
        columns: [                
            { field: 'recid', caption: 'ID', size: '50px', sortable: true },
            { field: 'fname', caption: 'First Name', size: '30%', sortable: true },
            { field: 'lname', caption: 'Last Name', size: '30%', sortable: true },
            { field: 'email', caption: 'Email', size: '40%' },
            { field: 'sdate', caption: 'Start Date', size: '120px' }
        ],
        records: [
            { recid: 1, fname: 'John', lname: 'doe', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 3, fname: 'Jin', lname: 'Franson', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 4, fname: 'Susan', lname: 'Ottie', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 5, fname: 'Kelly', lname: 'Silver', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 6, fname: 'Francis', lname: 'Gatos', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 7, fname: 'Mark', lname: 'Welldo', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 8, fname: 'Thomas', lname: 'Bahh', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 9, fname: 'Sergei', lname: 'Rachmaninov', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 20, fname: 'Jill', lname: 'Doe', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 21, fname: 'Frank', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 22, fname: 'Peter', lname: 'Franson', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 23, fname: 'Andrew', lname: 'Ottie', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 24, fname: 'Manny', lname: 'Silver', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 25, fname: 'Ben', lname: 'Gatos', email: 'jdoe@gmail.com', sdate: '4/3/2012' }
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
                width: 500,
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
                width: 500,
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

$(function () {
    // initialization
    $('#main').w2layout(config.layout);
    w2ui.layout.content('main', $().w2grid(config.grid));
});