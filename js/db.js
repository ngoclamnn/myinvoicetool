var dbInvoice = new PouchDB('invoicetool');
var remoteCouch = 'http://admin:Aa123456@ec2-3-0-184-56.ap-southeast-1.compute.amazonaws.com:5984/invoicetool';
function addInvoice(text) {
  var todo = {
    _id: "1",
    title: text,
    document_type: "Invoice",
    products: [
      {
        productId: "2",
        price: 100,
        quantity: 100
      }
    ]
  };
  dbInvoice.put(todo, function callback(err, result) {
    if (!err) {
      console.log('Successfully posted a invoice!');
    } else {
      console.log(`Failed posted a invoice! ${err}`);
    }
  });
}
function map(doc) {
  // join artist data to albums
  if (doc.document_type === 'Invoice') {
    emit(0, null);
    for (var i in doc.products) {
      emit(Number(i) + 1, {_id: doc.products[i].productId});
    }

  }
}
async function getInvoices() {
  try {
    var result = await dbInvoice.query(map, { include_docs: true });
    console.log(result)
  } catch (err) {
    console.log(err);
  }
}
function addProduct(text) {
  var todo = {
    _id: "2",
    name: text,
    price: 200,
    quantity: 200,
    document_type: "Product"
  };
  dbInvoice.put(todo, function callback(err, result) {
    if (!err) {
      console.log('Successfully posted a product!');
    }
    else {
      console.log(`Failed posted a product! ${err}`);
    }
  });
}
(function () {

  'use strict';
  var syncDom = document.getElementById('sync-wrapper');

  // EDITING STARTS HERE (you dont need to edit anything above this line)

  dbInvoice.changes({
    since: 'now',
    live: true
  }).on('change', getInvoices);

  // Initialise a sync with the remote server
  function sync() {
    syncDom.setAttribute('data-sync-state', 'syncing');
    var opts = { live: true };
    dbInvoice.replicate.to(remoteCouch, opts, syncError);
    dbInvoice.replicate.from(remoteCouch, opts, syncError);
  }
  function syncError() {
    syncDom.setAttribute('data-sync-state', 'error');
  }
  if (remoteCouch) {
    sync();
  }

})();
