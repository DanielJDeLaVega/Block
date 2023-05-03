var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var cadena = artifacts.require("./cadena.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(cadena);
};
