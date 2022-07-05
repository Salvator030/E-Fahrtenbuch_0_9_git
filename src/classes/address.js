class Address {
  constructor(name,street,hnr,plz,city){
    this.name = name;
    this.street = street;
    this.hnr = hnr;
    this.plz = plz;
    this.city = city;
    this.createdOn = new Date().toISOString().slice(0, 10)
  }
}

module.exports = Address;