function crearFormulario(){
    vaciarFormulario();
    var element=document.getElementById("num_medidas").value;
    if(element>0){
        for(var i=0; i<element; i++){
            agregarMedidas(i+1);
        }
        mostrarFormulario();
    }
    
}

function agregarMedidas(num) {
    var elemento=document.getElementById("formulario_medidas");
    var script='<h3 class="medida">Medida ' +num+': </h3><br/>';
    var script1 = 'Dame la medida de corte: <input type="number" id="medida_corte_' + num + '" min="1" required><br/>';
    var script2 = 'Cuántos cortes quieres: <input type="number" id="numero_cortes_' + num + '" min="1" required><br/>';

    document.getElementById("formulario_medidas").innerHTML+=script+script1+script2;
}

function vaciarFormulario(){
    var elemento=document.getElementById("formulario_medidas");
    document.getElementById("formulario_medidas").innerHTML='';
    document.getElementById("border_formulario").style.display = "none";
    document.getElementById("mostrar_aviso_barras").style.display = "none";
    document.getElementById("mostrar_numero_barras").style.display = "none";
}

function mostrarFormulario(){
    var element=document.getElementById("num_medidas").value;
    if (element.trim() === "") {
        // Si el valor está vacío, oculta el elemento
        document.getElementById("border_formulario").style.display = "none";
    } else {
        // Si el valor no está vacío, muestra el elemento
        document.getElementById("border_formulario").style.display = "block";
    }
}

