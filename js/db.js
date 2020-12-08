function Database() {
  this.dbInvoice = new PouchDB('invoicetool');
  this.remoteCouch = 'http://admin:Aa123456@ec2-3-0-184-56.ap-southeast-1.compute.amazonaws.com:5984/invoicetool';
  this.dbInvoice.setSchema([
    { singular: 'invoice', plural: 'invoices', relations: { products: { hasMany: 'product' } } },
    { singular: 'product', plural: 'products', relations: { invoices: { hasMany: 'invoice' } } }
  ]);
}

Database.prototype.getInvoices = async function () {
  try {
    var result = await this.dbInvoice.rel.find('invoice', "BHS01");
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

Database.prototype.addInvoice = async function (text) {
  var data = {
    id: "BHS01",
    title: text,
    danhSachChiPhi: [
      {
        loaiChiPhi: "Chung",
        productId: 2,
        price: 100,
        quantity: 100
      },
      {
        loaiChiPhi: "HoanPhat",
        productId: 3,
        currentPrice: 100,
        currentQuantity: 100

      },
      {
        loaiChiPhi: "May",
        productId: 4,
        currentPrice: 100,
        currentQuantity: 100
      }
    ],

    products: [
      2, 3, 4
    ]
  };
  try {
    await this.dbInvoice.rel.save('invoice', data);
    console.log("Invoice added")
  }
  catch (err) {
    console.log(err);
  }
}

Database.prototype.addProduct = async function (text) {
  var data = {
    id: 2,
    name: "product 2",
    price: 200,
    quantity: 200
  };
  var data2 = {
    id: 3,
    name: "product 3",
    price: 300,
    quantity: 300
  };
  var data4 = {
    id: 4,
    name: "product 4",
    price: 300,
    quantity: 300
  };
  try {
    await this.dbInvoice.rel.save('product', data);
    await this.dbInvoice.rel.save('product', data2);
    await this.dbInvoice.rel.save('product', data4);
    console.log("Product added")
  }
  catch (err) {
    console.log(err);
  }
}

Database.prototype.dbChanges = function () {
  console.log("database has changed")
}

