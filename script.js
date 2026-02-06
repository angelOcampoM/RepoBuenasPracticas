// buena practica aplicada: directrices - no revelar version, motor de base de datos, puertos ni credenciales en comentarios
// sistema de registro de usuarios

// Variables globales (accesibles desde toda la aplicación)
var registros = [];
var contador = 0;
// Mala práctica: Credenciales y llaves sensibles hardcodeadas en el código.
// Deben almacenarse en variables de entorno o servicios seguros, nunca en archivos JS.
// buena practica aplicada: valores quemados - credenciales removidas, deben configurarse via backend seguro
var API_KEY = "";
var DB_CONNECTION_STRING = "";

// buena practica aplicada: valores quemados y contenido url - no hardcodear passwords ni ips
const CONFIG = {
    maxRegistros: 1000,
    adminEmail: "",
    debugMode: false
};

// mala práctica: Mostrar datos sensibles en consola.
// un atacante puede ver esta información desde el navegador.


// Función principal de inicialización
function inicializar() {
    
    // Mala práctica: Mostrar credenciales administrativas en consola.
    
    // Event listener para el formulario
    document.getElementById('registroForm').addEventListener('submit', function(e) {
        e.preventDefault();
        guardarRegistro();
    });
}

// buena practica aplicada: impresion de mensajes de salida - eliminar console.log que revelan flujo del sistema
function guardarRegistro() {
    
    // buena practica aplicada: validacion de entrada - usar trim y validar con expresiones regulares
    var nombre = document.getElementById('nombre').value.trim();
    var apellido1 = document.getElementById('apellido1').value.trim();
    var apellido2 = document.getElementById('apellido2').value.trim();
    var telefono = document.getElementById('telefono').value.trim();
    var curp = document.getElementById('curp').value.trim();
    var email = document.getElementById('email').value.trim();
    
    if (!nombre || !apellido1 || !apellido2 || !telefono || !curp || !email) {
        alert('por favor completa todos los campos');
        return;
    }
    
    if (!/^\d{10}$/.test(telefono)) {
        alert('formato de telefono invalido');
        return;
    }
    
    if (!/^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/i.test(curp)) {
        alert('formato de curp invalido');
        return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('formato de email invalido');
        return;
    }
    
    //  mala práctica: Mostrar detalles internos (líneas, tablas, funciones).
    //  los mensajes deben ser genéricos para el usuario.
    //  mala práctica: No se valida formato (email, teléfono, CURP).
    //  deben usarse expresiones regulares para validar estructura.
    
    var nuevoRegistro = {
        id: contador++,
        nombre: nombre,
        apellido1: apellido1,
        apellido2: apellido2,
        nombreCompleto: nombre + " " + apellido1 + " " + apellido2,
        telefono: telefono,
        curp: curp.toUpperCase(),
        email: email.toLowerCase(),
        fechaRegistro: new Date().toISOString()
    };
    
    registros.push(nuevoRegistro);
    
    // Mostrar en tabla
    agregarFilaTabla(nuevoRegistro);
    
    document.getElementById('registroForm').reset();
    
    // buena practica aplicada: mensajes de error - mensaje generico sin revelar detalles tecnicos
    alert('registro guardado correctamente');
}

// buena practica aplicada: validacion de entrada - usar createelement y textcontent para prevenir xss
function agregarFilaTabla(registro) {
    var tabla = document.getElementById('tablaRegistros');
    var fila = document.createElement('tr');
    
    var tdNombre = document.createElement('td');
    tdNombre.textContent = registro.nombreCompleto;
    fila.appendChild(tdNombre);
    
    var tdTelefono = document.createElement('td');
    tdTelefono.textContent = registro.telefono;
    fila.appendChild(tdTelefono);
    
    var tdCurp = document.createElement('td');
    tdCurp.textContent = registro.curp;
    fila.appendChild(tdCurp);
    
    var tdEmail = document.createElement('td');
    tdEmail.textContent = registro.email;
    fila.appendChild(tdEmail);
    
    tabla.appendChild(fila);
}

// buena practica aplicada: codigo comentado - codigo antiguo eliminado antes de produccion

// Variable global adicional
var ultimoRegistro = null;

// buena practica aplicada: menor privilegio - no exponer variables sensibles en window
window.addEventListener('DOMContentLoaded', function() {
    //  mala práctica: Exponer variables sensibles como globales.
    //  Aumenta el riesgo de acceso y manipulación maliciosa.
    inicializar();
});

// buena practica aplicada: directrices - no revelar version del sistema ni informacion del desarrollador