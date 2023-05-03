/* eslint-disable */

// Import React package
import React from "react";

// Import component CSS style
import "./App.css";

// Import helper functions
import getWeb3 from "../helpers/getWeb3";

//////////////////////////////////////////////////////////////////////////////////|
//        CONTRACT ADDRESS           &          CONTRACT ABI                      |
//////////////////////////////////////////////////////////////////////////////////|                                                             |
// const CONTRACT_ADDRESS = require("../contracts/SimpleStorage.json").networks[5777].address
// const CONTRACT_ABI = require("../contracts/SimpleStorage.json").abi;
// const CONTRACT_NAME = require("../contracts/SimpleStorage.json").contractName


const CONTRACT_ADDRESS = require("../contracts/cadena.json").networks[5777].address
const CONTRACT_ABI = require("../contracts/cadena.json").abi;
const CONTRACT_NAME = require("../contracts/cadena.json").contractName

export default class App extends React.Component {
  state = { web3Provider: null, accounts: null, networkId: null, contract: null, storageValue: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the network ID
      const networkId = await web3.eth.net.getId();

      // Create the Smart Contract instance
      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3Provider: web3, accounts: accounts, networkId: networkId, contract: contract });
      
      // --------- TO LISTEN TO EVENTS AFTER EVERY COMPONENT MOUNT ---------
      this.handleMetamaskEvent()


      // Get the value from the contract to prove it worked and update storageValue state
      // this.getMethod()
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  // --------- METAMASK EVENTS ---------
  handleMetamaskEvent = async () => {
    window.ethereum.on('accountsChanged', function (accounts) {
      // Time to reload your interface with accounts[0]!
      alert("Incoming event from Metamask: Account changed 🦊")
      window.location.reload()
    })

    window.ethereum.on('networkChanged', function (networkId) {
      // Time to reload your interface with the new networkId
      alert("Incoming event from Metamask: Network changed 🦊")
      window.location.reload()
    })
  }


  // ------------ GET AUCTION INFORMATION FUNCTION ------------
  getCadenaInfo = async () => {
    const { accounts, contract } = this.state;

    // Get the auction information
    const response = await contract.methods.cadenaInfo().call();
    this.setState({ auctionInfo: response })


  // Get the highest price and bidder, and the status of the auction
  const NombreProducto = await contract.methods.obtenerNombreProducto(0).call();
  const obtenerFabricanteProducto = await contract.methods.obtenerFabricanteProducto(0).call();
  const obtenerFechaCaducidadProducto = await contract.methods.obtenerFechaCaducidadProducto(0).call();
  const obtenerDescripcionUltimaEtapaProduccion = await contract.methods.obtenerDescripcionUltimaEtapaProduccion(0).call();
  const obtenerEstadoUltimaEtapaProduccion = await contract.methods.obtenerResponsableUltimaEtapaProduccion(0).call();
  const imageURI = await contract.methods.obtenerUrlImagenProducto(0).call();

  this.setState({ imageURI, NombreProducto, obtenerFabricanteProducto, obtenerFechaCaducidadProducto,obtenerDescripcionUltimaEtapaProduccion,obtenerEstadoUltimaEtapaProduccion })
}




// getCadenaInfo = async (codigoproducto) => {
//   const { accounts, contract } = this.state;

//   // Get the auction information
//   const response = await contract.methods.cadenaInfo(codigoproducto).call();
//   this.setState({ auctionInfo: response })


// const NombreProducto = await contract.methods.obtenerNombreProducto(codigoproducto).call();
// const obtenerFabricanteProducto = await contract.methods.obtenerFabricanteProducto(codigoproducto).call();
// const obtenerFechaCaducidadProducto = await contract.methods.obtenerFechaCaducidadProducto(codigoproducto).call();
// const obtenerDescripcionUltimaEtapaProduccion = await contract.methods.obtenerDescripcionUltimaEtapaProduccion(codigoproducto).call();
// const obtenerEstadoUltimaEtapaProduccion = await contract.methods.obtenerResponsableUltimaEtapaProduccion(codigoproducto).call();
// const imageURI = await contract.methods.obtenerUrlImagenProducto(codigoproducto).call();

// this.setState({ imageURI, NombreProducto, obtenerFabricanteProducto, obtenerFechaCaducidadProducto,obtenerDescripcionUltimaEtapaProduccion,obtenerEstadoUltimaEtapaProduccion })
// }

crearProducto = async (codigoProducto,nombre,fabricante,fechaCaducidad,_imagen) => {
  const { accounts, contract } = this.state;

  // Bid at an auction for X value
  await contract.methods.crearProducto(codigoProducto,nombre,fabricante,fechaCaducidad,_imagen).
  send({ from: accounts[0], codigoProducto: this.state.codigoProducto,nombre:this.state.nombre,fabricante:this.state.fabricante,
    fechaCaducidad:this.state.fechaCaducidad, _imagen:this.state._imagen });

    const NombreProducto = await contract.methods.obtenerNombreProducto(codigoProducto).call();
    const obtenerFabricanteProducto = await contract.methods.obtenerFabricanteProducto(codigoProducto).call();
    const obtenerFechaCaducidadProducto = await contract.methods.obtenerFechaCaducidadProducto(codigoProducto).call();
    const obtenerDescripcionUltimaEtapaProduccion = await contract.methods.obtenerDescripcionUltimaEtapaProduccion(codigoProducto).call();
    const obtenerEstadoUltimaEtapaProduccion = await contract.methods.obtenerResponsableUltimaEtapaProduccion(codigoProducto).call();
    const imageURI = await contract.methods.obtenerUrlImagenProducto(codigoProducto).call();  
    

  // Update state with the result.
  this.setState({ imageURI, NombreProducto, obtenerFabricanteProducto, obtenerFechaCaducidadProducto,obtenerDescripcionUltimaEtapaProduccion,obtenerEstadoUltimaEtapaProduccion })
};


registrarEtapaProduccion = async (codigoProducto,descripcion) => {
  const { accounts, contract } = this.state;

  // Bid at an auction for X value
  await contract.methods.crearProducto(codigoProducto,nombre,fabricante,fechaCaducidad,_imagen).
  send({ from: accounts[0], codigoProducto: this.state.codigoProducto,descripcion:this.state.descripcion});

   
};

  render() {
    if (!this.state.web3Provider) {
      return <div className="App-no-web3">
        <h3>No Web3 connection... 🧐</h3>
        <p>Jump to the next chapter to configure the Web3 Provider.</p>
        <h3>Let's go! ⏭️</h3>
      </div>;
    }
    return (
      <div className="App">

        {/* ---- Context Information: Account & Network ---- */}
      <div className="Auction-header">
          <div className="Header-context-information">
            <p> Network connected: {this.state.networkId}</p>
            <p> Your address: {this.state.accounts[0]}</p>
          </div>
      </div>


      {/* ---- Auction information ---- */}
<div className="Auction-component-1">
  <div className="Auction-component-body">
    <h2 id="inline">Cadena information</h2>
    {/* <input placeholder="insert product" onChange={(e) => this.setState({ codigoproducto : e.target.value })}></input>
      <button id="button-send" onClick={this.getCadenaInfo}>agregarProducto</button> */}
    <button id="button-call" onClick={this.getCadenaInfo}> GET INFORMATION</button>
   {
      this.state.cadenaInfo &&
      <>
        <div className="Auction-information">
          {/* Auction Image */}
          <div className="Auction-information-img">
            {this.state.imageURI && <img src={this.state.imageURI}></img>}
            {this.state.imageURI && <p><u>Descargar imágen</u> &nbsp;&nbsp; <u>Solicitar más imágenes</u></p>}
          </div>
          {/* Auction information */}
          <div className="Auction-information-text">

            {/* Basic Information */}
            <p><b>descripcion:</b> {this.state.cadenaInfo[0]}</p>
            <p><b>Duration:</b> {this.state.cadenaInfo[1]} seconds</p>
            <p><b>Duration:</b> {this.state.cadenaInfo[2]} seconds</p>
            


          </div>
        </div>
      </>
    }
  </div>
</div>





{/* ---- Auction actions ---- */}
<div className="Auction-component-2">
  <div className="Auction-component-body">
    <div className="Auction-actions">
      <h2>crearProducto</h2>

      {/* Input & Button to bid */}
      <input placeholder="codigoproducto" onChange={(e) => this.setState({ codigoproducto : e.target.codigoproducto })}></input>
      <input placeholder="nombre" onChange={(e) => this.setState({ nombre : e.target.nombre })}></input>
      <input placeholder="fabricante" onChange={(e) => this.setState({ fabricante : e.target.fabricante })}></input>
      <input placeholder="fechaCaducidad" onChange={(e) => this.setState({ fechaCaducidad : e.target.fechaCaducidad })}></input>
      <input placeholder="_imagen" onChange={(e) => this.setState({ _imagen : e.target._imagen })}></input>
      <button id="button-send" onClick={this.crearProducto}>crearProducto</button>

    </div>
  </div>
</div>


<div className="Auction-component-2">
  <div className="Auction-component-body">
    <div className="Auction-actions">
      <h2>registrarEtapaProduccion</h2>
      <input placeholder="codigoproducto" onChange={(e) => this.setState({ codigoproducto : e.target.value })}></input>
      <input placeholder="descripcion" onChange={(e) => this.setState({ descripcion : e.target.descripcion })}></input>
      <button id="button-send" onClick={this.registrarEtapaProduccion}>registrarEtapaProduccion</button>


      </div>
  </div>
</div>

      </div>
    );
  }
}