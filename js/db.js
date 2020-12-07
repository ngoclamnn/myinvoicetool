









export default class Database {
    
  constructor() {
    this.dbInvoice = new PouchDB('invoicetool');
    this.remoteCouch = 'http://admin:Aa123456@ec2-3-0-184-56.ap-southeast-1.compute.amazonaws.com:5984/invoicetool';
    this.dbInvoice.setSchema([
      { singular: 'invoice', plural: 'invoices', relations: { products: { hasMany: 'product' } } },
      { singular: 'product', plural: 'products', relations: { invoices: { hasMany: 'invoice' } } }
    ]);
  }

  async get getInvoices() {
    try {
        var result = await dbInvoice.rel.find('invoice', "BHS01");
        return result;
    } catch (err) {
        console.log(err);
        return undefined;
    }
  } 

  async get addInvoice(text) {
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
      await dbInvoice.rel.save('invoice', data);
      console.log("Invoice added")
    }
    catch (err) {
      console.log(err);
    }
  }

  async get addProduct(text) {
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
      await dbInvoice.rel.save('product', data);
      await dbInvoice.rel.save('product', data2);
      await dbInvoice.rel.save('product', data4);
      console.log("Product added")
    }
    catch (err) {
      console.log(err);
    }
  }

  get dbChanges(){
    console.log("database has changed")
  }
  
  get monthlyPayment() {
      let monthlyRate = this.rate / 100 / 12;
      return this.principal * monthlyRate / (1 - (Math.pow(1/(1 + monthlyRate),
              this.years * 12)));
  }
  
  get amortization() {
      let monthlyPayment = this.monthlyPayment;
      let monthlyRate = this.rate / 100 / 12;
      let balance = this.principal;
      let amortization = [];
      for (let y=0; y<this.years; y++) {
          let interestY = 0;
          let principalY = 0;
          for (let m=0; m<12; m++) {
              let interestM = balance * monthlyRate;
              let principalM = monthlyPayment - interestM;
              interestY = interestY + interestM;
              principalY = principalY + principalM;
              balance = balance - principalM;
          }
          amortization.push({principalY, interestY, balance});
      }
      return amortization;
  }
  
}
