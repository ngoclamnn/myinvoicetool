var tabHtml = '<div id=\"main-popup\" style=\"width: 100%; height: 100%;\"><\/div>'
var tabConfig = {
    layout: {
        name: 'layout2',
        padding: 4,
        panels: [
            {
                type: 'main', style: "padding: 10px", size: '100%', resizable: true, minSize: 300, tabs: {
                    active: 'tab1',
                    tabs: [
                        { id: 'tab1', text: 'Tab 1' },
                        { id: 'tab2', text: 'Tab 2' },
                        { id: 'tab3', text: 'Tab 3' }
                    ],
                    onClick: function (event) {
                        if (event.target == 'tab1')
                            this.owner.html('main', w2ui.form);
                        if (event.target == 'tab2')
                            this.owner.html('main', w2ui.gridChiPhiMay);
                        if (event.target == 'tab3')
                            this.owner.html('main', w2ui.gridChiPhiChung);
                    }
                }
            }
        ]
    },
}