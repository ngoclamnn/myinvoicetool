var gridMainConfig = {
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
        // { field: 'id', text: 'ID', sortable: true },
        { field: 'stt', text: 'STT', sortable: true },
        { field: 'tenKh', text: 'Ten KH', sortable: true },
        { field: 'chitietSpMau', text: 'Chi tiet SP/Mau', sortable: true },
        { field: 'loai', text: 'Loại', sortable: true },
        { field: 'ngayGiaoHang', text: 'Ngay giao hang', sortable: true },
        { field: 'vai', text: 'Vai', sortable: true },
        { field: 'doanhThu', text: 'Doanh thu', sortable: true },
        { field: 'chiPhiNPL', text: 'Chi phi Nguyen phu lieu', sortable: true },
        { field: 'chiPhiGiaCongMay', text: 'Chi phi gia cong may', sortable: true },
        { field: 'chiPhiDichVu', text: 'Chi phi dich vu', sortable: true },
        { field: 'chiPhiChung', text: 'Chi phi chung', sortable: true },
        { field: 'tongCong', text: 'Tong cong', sortable: true }
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
        if (event.force == true) {
            var sel = this.getSelection();
            var record = $.extend(true, {}, this.get(sel[0]));
            db.deleteInvoice(record).then(function (response) {
                console.log(response)
            })
        }
    },
}
var chiPhiMayGridConfig = {
    name: 'gridChiPhiMay',
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
        { field: 'stt', text: 'STT', sortable: true, searchable: true },
        { field: 'khachHang', text: 'Khách hàng', sortable: true, searchable: true },
        { field: 'chitietSpMau', text: 'Chi tiết SP/Màu' },
        { field: 'loai', text: 'Loại' },
        { field: 'gh', text: 'GH', render: 'date' },
        { field: 'soluong', text: 'Số lượng', render: 'date' },
        { field: 'dongia', text: 'Đơn giá', render: 'date' },
        { field: 'thanhtien', text: 'Thành tiền', render: 'date' },
        { field: 'nhagiacong', text: 'Nhà gia công', render: 'date' },
        { field: 'thanggiacong', text: 'Tháng gia công', render: 'date' }

    ],
    onDblClick: function (event) {
        gridChiPhiMayRowClicked(event, this);
    },
    onAdd: function (event) {
        gridChiPhiMayRowClicked(event, this, true);
    },
    onEdit: function (event) {
        gridChiPhiMayRowClicked(event, this);
    },
    onDelete: function (event) {
        if (event.force == true) {
            var sel = this.getSelection();
            var record = $.extend(true, {}, this.get(sel[0]));
            db.deleteInvoice(record).then(function (response) {
                console.log(response)
            })
        }
    },


}

var chiPhiChungGridConfig = {
    name: 'gridChiPhiChung',
    columns: [
        { field: 'fname', text: 'First Name', size: '33%', sortable: true, searchable: true },
        { field: 'lname', text: 'Last Name', size: '33%', sortable: true, searchable: true },
        { field: 'email', text: 'Email', size: '33%' },
        { field: 'sdate', text: 'Start Date', render: 'date' }
    ],
    records: [
        { recid: 1, fname: 'John', lname: 'Doe', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
        { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
        { recid: 3, fname: 'Jin', lname: 'Franson', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
        { recid: 4, fname: 'Susan', lname: 'Ottie', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
        { recid: 5, fname: 'Kelly', lname: 'Silver', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
        { recid: 6, fname: 'Francis', lname: 'Gatos', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
        { recid: 7, fname: 'Mark', lname: 'Welldo', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
        { recid: 8, fname: 'Thomas', lname: 'Bahh', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
        { recid: 9, fname: 'Sergei', lname: 'Rachmaninov', email: 'jdoe@gmail.com', sdate: '4/3/2012' }
    ]

}

function gridChiPhiMayRowClicked(event, grid, addNew) {
    var form = w2ui.formChiPhiMay;
    event.onComplete = function () {
        var sel = grid.getSelection();
        if (sel.length == 1 && !addNew) {
            form.recid = sel[0];
            form.record = $.extend(true, {}, grid.get(sel[0]));
            form.refresh();
            $().w2popup('chiPhiMayPopUp', {
                title: 'Edit record 1',
                body: '<div id="chiPhiMayPopUp" style="width: 100%; height: 400px;"></div>',
                style: 'padding: 15px 0px 0px 0px',
                width: 1000,
                height: 500,
                showMax: true,
                onOpen: function (event) {
                    event.onComplete = function () {
                        $('#w2ui-popup #chiPhiMayPopUp').w2render('layout2');
                        w2ui.layout2.html('main', form);
                        // specifying an onOpen handler instead is equivalent to specifying an onBeforeOpen handler, which would make this code execute too early and hence not deliver.
                        //$('#w2ui-popup #form').w2render(form);
                        //$('#w2ui-popup #form .page-2').w2render(gridChiPhiChung);

                    }
                },
                onClose : function (event) {
                    console.log('event: ' + event.type, event);
                }   
            });
        } else {
            form.clear();
            $().w2popup('open', {
                title: 'Add record 1',
                body: '<div id="chiPhiMayPopUp" style="width: 100%; height: 400px;"></div>',
                style: 'padding: 15px 0px 0px 0px',
                width: 1000,
                height: 500,
                showMax: true,
                onOpen: function (event) {
                    event.onComplete = function () {
                        $('#w2ui-popup #chiPhiMayPopUp').w2render('layout');
                        w2ui.layout2.html('main', form);
                        // specifying an onOpen handler instead is equivalent to specifying an onBeforeOpen handler, which would make this code execute too early and hence not deliver.
                        //$('#w2ui-popup #form').w2render(form);
                        //$('#w2ui-popup #form .page-2').w2render(gridChiPhiChung);

                    }
                },
                onClose : function (event) {
                    console.log('event: ' + event.type, event);
                }   
            });
        }
    }
}
