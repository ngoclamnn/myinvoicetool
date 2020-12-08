

var formConfig = {
    name: 'form',
    style: 'border: 0px; background-color: transparent;',
    fields: [
        { name: 'id', type: 'text', html: { caption: 'ID',attr: 'readonly', page: 0, column: 0} },   
        { name: 'stt', type: 'text', html: { caption: 'STT', page: 0, column: 0 } },
        { name: 'tenKh', type: 'text', html: { caption: 'Ten KH', page: 0, column: 0} },
        { name: 'chitietSpMau', type: 'text', html: { caption: 'Chi tiet SP/Mau', page: 0, column: 0 } },
        { name: 'loai', type: 'text', html: { caption: 'Loai', page: 0, column: 0 } },
        { name: 'ngayGiaoHang', type: 'text', html: { caption: 'Ngay giao hang', page: 0, column: 1 } },
        { name: 'vai', type: 'text', html: { caption: 'Vai', page: 0, column: 1 } },
        { name: 'doanhThu', type: 'text', html: { caption: 'Doanh thu', page: 1, column: 1 } },
        { name: 'chiPhiNPL', type: 'text', html: { caption: 'Chi phi NPL', page: 0, column: 1 } },
        { name: 'chiPhiGiaCongMay', type: 'text', html: { caption: 'Chi phi gia cong may', page: 0, column: 2 } },
        { name: 'chiPhiDichVu', type: 'text', html: { caption: 'Chi phi dich vu', page: 0, column: 2 } },
        { name: 'chiPhiChung', type: 'text', html: { caption: 'Chi phi chung', page: 0, column: 2 } },
        { name: 'tongCong', type: 'text', html: { caption: 'Tong cong', page: 0, column: 2 } }
    ],
    actions: {
        Reset: function () {
            this.clear();
        },
        Save: function () {
            var errors = this.validate();
            if (errors.length > 0) return;
            if (this.recid == 0) {
                w2ui.grid.add($.extend(true, this.record, { recid: w2ui.grid.records.length + 2 }));
                w2ui.grid.selectNone();
                this.clear();
                w2popup.close();
            } else {
                w2ui.grid.set(this.recid, this.record);
                w2ui.grid.selectNone();
                this.clear();
                w2popup.close();
            }
        }
    }
}