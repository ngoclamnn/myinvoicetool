(function() {

  'use strict';
  var syncDom = document.getElementById('sync-wrapper');

  // EDITING STARTS HERE (you dont need to edit anything above this line)

  var dbInvoice = new PouchDB('invoicetool');
  var remoteCouch = 'http://admin:Aa123456@ec2-3-0-184-56.ap-southeast-1.compute.amazonaws.com:5984/invoicetool';

  var dbProduct = new PouchDB('products');
  var remoteCouch = 'http://admin:Aa123456@ec2-3-0-184-56.ap-southeast-1.compute.amazonaws.com:5984/products';

  var dbProperties = new PouchDB('properties');
  var remoteCouch = 'http://admin:Aa123456@ec2-3-0-184-56.ap-southeast-1.compute.amazonaws.com:5984/properties';



  dbInvoice.changes({
    since: 'now',
    live: true
  }).on('change', showInvoices);

  // We have to create a new todo document and enter it in the database
  function addInvoice(text) {
    var todo = {
      _id: new Date().toISOString(),
      title: text,
      completed: false
    };
    dbInvoice.put(todo, function callback(err, result) {
      if (!err) {
        console.log('Successfully posted a todo!');
      }
    });
  }
  // Show the current list of todos by reading them from the database
  function showInvoices() {
    dbInvoice.allDocs({include_docs: true, descending: true}, function(err, doc) {
      redrawTodosUI(doc.rows);
    });
  }

  // Initialise a sync with the remote server
  function sync() {
    syncDom.setAttribute('data-sync-state', 'syncing');
    var opts = {live: true};
    dbInvoice.replicate.to(remoteCouch, opts, syncError);
    dbInvoice.replicate.from(remoteCouch, opts, syncError);
  }

  // EDITING STARTS HERE (you dont need to edit anything below this line)

  // There was some form or error syncing
  function syncError() {
    syncDom.setAttribute('data-sync-state', 'error');
  }




  if (remoteCouch) {
    sync();
  }

})();
