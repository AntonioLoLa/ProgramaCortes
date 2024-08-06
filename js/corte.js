const BARRA = 650;

function recuento(){
    let arrayMedidas = [];
    for(var i=1; i <= document.getElementById("num_medidas").value; i++){
        arrayMedidas.push([document.getElementById("medida_corte_"+i).value,document.getElementById("numero_cortes_"+i).value]);
        if (document.getElementById("medida_corte_"+i).value.trim() === '' || document.getElementById("numero_cortes_"+i).value.trim() === '') {
            alert('Por favor, complete todos los campos.');
            return false;
        }
    }
    arrayMedidas.sort((a, b) => b[0] - a[0]);
    recuentoTotal(arrayMedidas);
    document.getElementById("mostrar_numero_barras").style.display = "block";
}

function recuentoTotal(array_medidas) {

        const nMedidas = document.getElementById("num_medidas").value;
        const vector = [];
        const retales = [];

        for (let i = 0; i < nMedidas; i++) {
            let medida;

            vector.push(calcularBarras(array_medidas[i][0], array_medidas[i][1], retales));
        }

        if (isCorteJusto(retales)) {
            
            document.getElementById("mostrar_aviso_barras").innerHTML="CUIDADO - BARRAS JUSTAS";
            document.getElementById("mostrar_aviso_barras").style.display = "block";
        }

        //console.log("Necesitas " + sumaBarras(vector) + " barras.");
        document.getElementById("mostrar_numero_barras").innerHTML="<p id='result'> Necesitas " + sumaBarras(vector) + " barras.</p>";


}


function usarRetal(corte, retal) {
    let trobat = false;
    for (let i = 0; i < retal.length; i++) {
        if (retal[i] >= corte) {
            trobat = true;
            break;
        }
    }

    if (trobat) {
        const index = retal.findIndex(value => value >= corte);
        const aux = retal[index] - corte;
        retal.splice(index, 1);
        if (aux > 0) {
            retal.push(aux);
        }
    }

    return trobat;
}

function calcularBarras(medida, cortes, retal) {
    var nBarras = 1;
    let i = 0;
    let aux = BARRA;
    let pasas = false;

    while (i < cortes) {
        if (!usarRetal(medida, retal)) {
            pasas = true;
            aux = aux - medida;

            if (i === cortes - 1) {
                retal.push(aux);
            } else {
                if (aux < medida) {
                    retal.push(aux);

                    if (cortes - 1 !== i) {
                        nBarras++;
                    }

                    aux = BARRA;
                }
            }
        }

        // Ordenar el array de menor a mayor
        retal.sort((a, b) => a - b);
        i++;
    }

    return pasas ? nBarras : 0;
}

function sumaBarras(retal) {
    return retal.reduce((sum, value) => sum + value, 0);
}

function isCorteJusto(retales) {
    return retales.some(value => value < 5);
}
