

var formConfig = {
    name: 'form',
    style: 'border: 0px; background-color: transparent;',
    fields: [
        //{ field: 'id', type: 'text', html: { label: 'ID', page: 0, column: 0 } },
        { field: 'stt', type: 'text', html: { label: 'STT', page: 0, column: 0 } },
        { field: 'tenKh', type: 'text', html: { label: 'Tên KH', page: 0, column: 0 } },
        { field: 'chitietSpMau', type: 'text', html: { label: 'Chi tiet SP/Mau', page: 0, column: 0 } },
        { field: 'loai', type: 'text', html: { label: 'Loai', page: 0, column: 0 } },
        { field: 'ngayGiaoHang', type: 'date', options: { format: 'dd/mm/yyyy', }, html: { label: 'Ngay giao hang', page: 0, column: 1 } },
        { field: 'vai', type: 'text', html: { label: 'Vai', page: 0, column: 1 } },
        { field: 'doanhThu', type: 'text', html: { label: 'Doanh thu', page: 0, column: 1 } },
        { field: 'chiPhiNPL', type: 'text', html: { label: 'Chi phi NPL', page: 0, column: 1 } },
        //{ field: 'chiPhiGiaCongMay', type: 'text', html: { label: 'Chi phi gia cong may', page: 2, column: 2 } },
        { field: 'chiPhiDichVu', type: 'text', html: { label: 'Chi phi dich vu', page: 0, column: 2 } },
        //{ field: 'chiPhiChung', type: 'text', html: { label: 'Chi phi chung', page: 0, column: 2 } },
        { field: 'tongCong', type: 'text', html: { label: 'Tong cong', page: 0, column: 2 } }
    ],
    actions: {
        Reset: function () {
            this.clear();
        },
        Save: async function () {
            var errors = this.validate();
            if (errors.length > 0) return;
            if (this.recid == 0) {
                var result = await db.addInvoice(this.record)
                w2ui.grid.add($.extend(true, result, { recid: w2ui.grid.records.length + 1 }));
                w2ui.grid.selectNone();
                this.clear();
                w2popup.close();
            } else {
                var result = await db.saveInvoice(this.record)
                w2ui.grid.set(this.recid, result);
                w2ui.grid.selectNone();
                this.clear();
                w2popup.close();
            }
        }
    }
}

var formChiPhiMayConfig = {
    name: 'formChiPhiMay',
    style: 'border: 0px; background-color: transparent;',
    fields: [
        { field: 'stt', type: 'text', html: { label: 'STT', page: 0, column: 0 } },
        { field: 'tenKh', type: 'text', html: { label: 'Tên khách hàng', page: 0, column: 0 } },
        { field: 'chitietSpMau', type: 'text', html: { label: 'Chi tiết sản phẩm/Màu', page: 0, column: 0 } },
        { field: 'loai', type: 'text', html: { label: 'Loại', page: 0, column: 0 } },
        { field: 'gh', type: 'text', html: { label: 'Ngày giao hàng', page: 0, column: 0 } },
        { field: 'soluong', type: 'text', html: { label: 'Số lượng', page: 0, column: 0 } },
        { field: 'dongia', type: 'text', html: { label: 'Đơn giá', page: 0, column: 0 } },
        { field: 'thanhtien', type: 'text', html: { label: 'Thành tiền', page: 0, column: 0 } },
        { field: 'nhagiacong', type: 'text', html: { label: 'Nhà gia công', page: 0, column: 0 } },
        { field: 'thanggiacong', type: 'text', html: { label: 'Tháng gia công', page: 0, column: 0 } }
    ],
    actions: {
        Reset: function () {
            this.clear();
        },
        Save: async function () {
            var errors = this.validate();
            if (errors.length > 0) return;
            if (this.recid == 0) {
                var result = await db.addInvoice(this.record)
                w2ui.grid.add($.extend(true, result, { recid: w2ui.grid.records.length + 1 }));
                w2ui.grid.selectNone();
                this.clear();
                w2popup.close();
            } else {
                var result = await db.saveInvoice(this.record)
                w2ui.grid.set(this.recid, result);
                w2ui.grid.selectNone();
                this.clear();
                w2popup.close();
            }
        }
    }
}