// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract cadena {
    
    // Estructura que representa una etapa de la cadena de producción del alimento
    struct Etapa {
        string descripcion;
        address responsable;
        bool completada;
    }
    
    // Estructura que representa el producto
    struct Producto {
        string nombre;
        string fabricante;
        uint fechaCaducidad;
        Etapa historialProduccion;
        bool completado;
        string imagenURL;
    }
    

   
    // Historial de los productos
    mapping (uint256 => Producto) productos;
    
    constructor() {
        productos[0] = Producto("nombreProducto1", "nombreFabricante1", 123455, Etapa("1", address(0), false), false, "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.es%2Ffotos%2Fleche&psig=AOvVaw1tJ7AeOzxVSeO0k3-1jw_T&ust=1683224771435000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCPDlvYbj2f4CFQAAAAAdAAAAABAE");
        productos[1] = Producto("nombreProductoa", "nombreFabricantea", 123455, Etapa("a", address(0), false), false, "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.es%2Ffotos%2Fleche&psig=AOvVaw1tJ7AeOzxVSeO0k3-1jw_T&ust=1683224771435000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCPDlvYbj2f4CFQAAAAAdAAAAABAE");
    }

    // Función para registrar una nueva etapa de producción del alimento
    function registrarEtapaProduccion(uint256 codigoProducto, string memory descripcion) public {
        require(!productos[codigoProducto].completado, "El producto ya ha sido completado.");
        productos[codigoProducto].historialProduccion = Etapa(descripcion, msg.sender, false);
    }
    
    // Función para consultar el estado actual del producto
    function consultarEstadoActual(uint256 codigoProducto) public view returns (string memory) {
        return productos[codigoProducto].historialProduccion.descripcion;
    }
    
    // Función para autorizar la transferencia del producto a la siguiente etapa de producción
    function autorizarTransferencia(uint256 codigoProducto) public {
        require(msg.sender == productos[codigoProducto].historialProduccion.responsable, "Solo el responsable de la etapa actual puede autorizar la transferencia.");
        productos[codigoProducto].historialProduccion.completada = true;
        productos[codigoProducto].completado = true;
    }
    
    // Función para consultar el historial de la cadena de producción del producto
    function consultarHistorial(uint256 codigoProducto) public view returns (Etapa memory) {
        return productos[codigoProducto].historialProduccion;
    }
    
    // Función para crear un nuevo producto
    function crearProducto(uint256 codigoProducto, string memory nombre, string memory fabricante, uint fechaCaducidad,string memory _imagen) public {
        productos[codigoProducto] = Producto(nombre, fabricante, fechaCaducidad, Etapa("", address(0), false), false,_imagen);
    }



    // Getter para obtener el nombre del producto
    function obtenerNombreProducto(uint256 codigoProducto) public view returns (string memory) {
        return productos[codigoProducto].nombre;
    }
    
    // Getter para obtener el fabricante del producto
    function obtenerFabricanteProducto(uint256 codigoProducto) public view returns (string memory) {
        return productos[codigoProducto].fabricante;
    }
    
    // Getter para obtener la fecha de caducidad del producto
    function obtenerFechaCaducidadProducto(uint256 codigoProducto) public view returns (uint) {
        return productos[codigoProducto].fechaCaducidad;
    }
    
    // Getter para obtener la descripción de la última etapa de producción del producto
    function obtenerDescripcionUltimaEtapaProduccion(uint256 codigoProducto) public view returns (string memory) {
        return productos[codigoProducto].historialProduccion.descripcion;
    }
    
    // Getter para obtener el responsable de la última etapa de producción del producto
    function obtenerResponsableUltimaEtapaProduccion(uint256 codigoProducto) public view returns (address) {
        return productos[codigoProducto].historialProduccion.responsable;
    }
    
    // Getter para obtener el estado de la última etapa de producción del producto
    function obtenerEstadoUltimaEtapaProduccion(uint256 codigoProducto) public view returns (bool) {
        return productos[codigoProducto].historialProduccion.completada;
    }
    
    // Getter para obtener la URL de la imagen del producto
    function obtenerUrlImagenProducto(uint256 codigoProducto) public view returns (string memory) {
        return productos[codigoProducto].imagenURL;
    }

    function cadenaInfo() public view returns(string memory,string memory,uint){
        return (productos[0].nombre,productos[0].fabricante,productos[0].fechaCaducidad);

    }
    
}
