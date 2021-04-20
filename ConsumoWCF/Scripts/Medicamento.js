window.onload = function () {
    listarMedicamentos();
    listarFormaFarmaceutica();
}

function listarFormaFarmaceutica() {
    fetch("Medicamento/ListarFormaFarmaceutica")
        .then(res => res.json())
        .then(res => {
            llenarCombo(res);
        });
}
function llenarCombo(res) {
    var contenido = "";
    contenido += "<option value=''>--Seleccione--</option>";
    for (var i = 0; i < res.length; i++) {
        var item = res[i];
        contenido += "<option value='" + item.iidformafarmaceutica + "'>" + item.nombreformafarmaceutica + "</option>";
    }
    document.getElementById("cboFormaFarmaceutica").innerHTML = contenido;
}

function listarMedicamentos() {
    fetch("Medicamento/listarMedicamentos")
        .then(res => res.json())
        .then(res => {
            listar(res);
        });
}

function listar(res) {
    var contenido = "";
    //console.log(res);
    //Tabla
    contenido += "<table class='table'>";
    //console.log(contenido);
    //grupo de headers
    contenido += "<thead class='table-dark'>";
    //Defino la primera fila de los ecabezados
    contenido += "<tr>";
    //Columnas con los nombres de los encabezados
    contenido += "<th>Id Medicamento</th>";
    contenido += "<th>Nombre</th>";
    contenido += "<th>Concentracion</th>";
    contenido += "<th>Forma Farmaceutica</th>";
    contenido += "<th>Stock</th>";
    contenido += "<th>Precio</th>";
    contenido += "<th>Presentacion</th>";
    contenido += "<th>Operacion</th>";
    contenido += "</tr>";
    //Columnas con la data de la informacion
    contenido += "<tbody>";
    for (var i = 0; i < res.length; i++) {
        var item = res[i];
        contenido += "<tr>";

        contenido += "<td>" + item.iidmedicamento + "</td>";
        contenido += "<td>" + item.nombre + "</td>";
        contenido += "<td>" + item.concentracion + "</td>";
        contenido += "<td>" + item.nombreformafarmaceutica + "</td>";
        contenido += "<td>" + item.stock + "</td>";
        contenido += "<td>" + item.precio + "</td>";
        contenido += "<td>" + item.presentacion + "</td>";
        contenido += "<td><input onclick='abrirModal("+item.iidmedicamento+")' type ='button' class='btn btn-primary' value='Editar' data-bs-toggle='modal' data-bs-target='#exampleModal'>";
        contenido += "<input type ='button' class='btn btn-danger' value='Eliminar'></td>";

        contenido += "</tr>";
    }
    contenido += "</tbody>";
    contenido += "</thead>";
    contenido += "<table>";

    document.getElementById("DivTabla").innerHTML = contenido;
}
function abrirModal(iidMedicamento) {
    limpiar();
    if (iidMedicamento === 0) {
        document.getElementById("lblTitulo").innerHTML="Agregar Medicamento";
    } else {
        document.getElementById("lblTitulo").innerHTML = "Editar Medicamento";
        fetch("Medicamento/RecuperarMedicamento/?iidMedicamento=" + iidMedicamento)
            .then(res => res.json())
            .then(res => {
                llenarModal(res);
            });
    }
}
function llenarModal(res) {
    console.log(res);
    document.getElementById("txtIdMedicamento").value = res.iidmedicamento ;
    document.getElementById("txtNombreMedicamento").value = res.nombre ;
    document.getElementById("txtConcentracion").value = res.concentracion;
    document.getElementById("cboFormaFarmaceutica").value = res.iidformafarmaceutica;
    document.getElementById("txtPrecio").value = res.precio ;
    document.getElementById("txtStock").value = res.stock ;
    document.getElementById("txtPresentacion").value = res.presentacion ;
}

function limpiar() {
    let limpiar = document.getElementsByClassName("limpiar");
    for (var i = 0; i < limpiar.length; i++) {
        limpiar[i].value = "";
    }
}
function ValidaCampos() {
    let exito = true;
    let contenido = "<ol style='color:red'>";
    let obligatorio = document.getElementsByClassName("obligatorio");
    for (var i = 0; i < obligatorio.length; i++) {
        if (obligatorio[i].value === "") {
            exito = false;
            contenido += "<li>" + obligatorio[i].name +" es obligatorio</li>";
        }
    }
    contenido += "</ol>";
    return {exito, contenido};
}
function Guardar() {
    if (confirm("Desea Guardar los cambios") == 1) {
        let objeto = ValidaCampos();
        if (objeto.exito == false) {
            document.getElementById("divError").innerHTML = objeto.contenido;
        }
        else {
            document.getElementById("divError").innerHTML = "";
        }
    }
}