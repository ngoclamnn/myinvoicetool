var formConfig =  {
    name: 'form',
    style: 'border: 0px; background-color: transparent;',
    fields: [
        { name: 'recid', type: 'text', html: { caption: 'ID', attr: 'size="10" readonly' } },
        { name: 'fname', type: 'text', required: true, html: { caption: 'First Name', attr: 'size="40" maxlength="40"' } },
        { name: 'lname', type: 'text', required: true, html: { caption: 'Last Name', attr: 'size="40" maxlength="40"' } },
        { name: 'email', type: 'email', html: { caption: 'Email', attr: 'size="30"' } },
        { name: 'sdate', type: 'date', html: { caption: 'Date', attr: 'size="10"' } }
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