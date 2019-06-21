function addField() {

    var fields = document.getElementById("fields");
    var div_row = document.createElement("div");

    var sumChild = fields.childElementCount + 1;
    div_row.className = "row";
    div_row.id = "input" + sumChild;

    var item = document.createElement("div");
    item.className = "form-group col-5";
    var label_item = document.createElement("label");
    label_item.innerText = "Item";
    item.appendChild(label_item);
    var input_item = document.createElement("input");
    input_item.name = "item" + sumChild;
    input_item.id = "item" + sumChild;
    input_item.className = "form-control item";
    input_item.required = true;
    item.appendChild(input_item);

    var value = document.createElement("div");
    value.className = "form-group col-3";
    var label_value = document.createElement("label");
    label_value.innerText = "Valor";
    value.appendChild(label_value);
    var input_value = document.createElement("input");
    input_value.className = "form-control value";
    input_value.type = "number";
    input_value.name = "value" + sumChild;
    input_value.id = "value" + sumChild;
    input_value.value = 0;
    input_value.required = true;
    value.appendChild(input_value);

    var weight = document.createElement("div");
    weight.className = "form-group col-3";
    var label_weight = document.createElement("label");
    label_weight.innerText = "Peso";
    weight.appendChild(label_weight);
    var input_weight = document.createElement("input");
    input_weight.className = "form-control weight";
    input_weight.type = "number";
    input_weight.name = "weight" + sumChild;
    input_weight.id = "weight" + sumChild;
    input_weight.value = 0;
    input_value.required = true;
    weight.appendChild(input_weight);

    var button_del = document.createElement("button");
    button_del.classList = "btn btn-danger col-1 mt-4";
    button_del.id = "del" + sumChild;
    button_del.innerText = "Deletar";
    button_del.type = "button";
    button_del.style.height = "40px";
    button_del.addEventListener("click", function () {
        var div_del = document.getElementById("input" + sumChild);
        div_del.parentNode.removeChild(div_del);
    });

    div_row.appendChild(item);
    div_row.appendChild(value);
    div_row.appendChild(weight);
    div_row.appendChild(button_del);

    fields.appendChild(div_row);
}

function saveData() {
    var itens_html = document.getElementsByClassName("item");
    var values_html = document.getElementsByClassName("value");
    var weights_html = document.getElementsByClassName("weight");

    var weights = new Array();
    var values = new Array();
    var itens = new Array();

    Object.entries(itens_html).map((object) => { itens.push(object[1].value) });
    Object.entries(values_html).map((object) => { values.push(object[1].value) });
    Object.entries(weights_html).map((object) => { weights.push(object[1].value) });

    var size_sac = document.getElementById("weight-sac").value;

    localStorage.setItem('weight', weights);
    localStorage.setItem('value', values);
    localStorage.setItem('itens', itens);
    localStorage.setItem('sizeSac', size_sac);

    setTimeout(() => {
        window.location = "./table.html";
    }, 750);

}

function mount() {
    var obj_itens = new Array;
    var weights = localStorage.getItem('weight');
    var size = localStorage.getItem('sizeSac');
    var values = localStorage.getItem('value');
    var itens = localStorage.getItem('itens');

    weights = weights.split(",");
    values = values.split(",");
    itens = itens.split(",");

    for (var i = 0; i < weights.length; i++) {
        obj_itens.push({ item: itens[i], value: parseInt(values[i]), weight: parseInt(weights[i]) })
    }

    obj_itens = obj_itens.sort(function (a, b) {
        return a.weight - b.weight
    })

    //modal
    var table_itens = document.getElementById("table-itens");

    for (let element of obj_itens) {
        let row = table_itens.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }

    //size bacpack
    var main_table = document.getElementById("table-sac");
    var h2_sac = document.createElement("h2");
    var strong_sac = document.createElement("strong");
    h2_sac.innerText = "O peso da mochila é: " + size;
    strong_sac.appendChild(h2_sac);
    main_table.appendChild(strong_sac);

    Knapsack(obj_itens, size);

}

function createMainHeadTable(headRow, i){
    var th=document.createElement("th");
    th.scope = "col"
    th.appendChild(document.createTextNode(i));
    headRow.appendChild(th);

    return headRow;
}

function Knapsack(obje, size) {
    var mainM = new Array();

    var zeros = new Array();

    for (var i = 0; i < parseInt(size) + 1; i++) {
        zeros.push(0);
    }

    mainM.push(zeros);

    for (var i = 0; i < obje.length; i++) {
        var aux = new Array();
        aux.push(0);

        for (var j = 1; j < parseInt(size) + 1; j++) {
            aux.push(-1);
        }

        mainM.push(aux);
    }


    for (var i = 1; i < obje.length + 1; i++) {
        for (var j = 1; j < parseInt(size) + 1; j++) {
            if (j - obje[i - 1].weight < 0){
                mainM[i][j] = mainM[i -1][j];
            }else{
                mainM[i][j] = Math.max(mainM[i - 1][j - obje[i - 1].weight] + obje[i - 1].value, mainM[i - 1][j]);
            }
        }
    }

    // create main table
    var main_table = document.getElementById("table-sac");
    var table = document.createElement("table");
    table.className="table mt-5";
    var thead = document.createElement("thead");
    thead.className = "thead-dark";
    var tbody = document.createElement("tbody");
    var headRow = document.createElement("tr");

    headRow = createMainHeadTable(headRow, "Itens");

    for (var  i = 0; i < parseInt(size) + 1 ; i++){
        headRow = createMainHeadTable(headRow, i);
    }

    thead.appendChild(headRow);
    table.appendChild(thead); 

    console.log(obje);

    for (var i = 0; i < obje.length + 1; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < parseInt(size) + 2; j++) {
            
            var td = document.createElement("td");

            if(i == 0 && j == 0){
                td.appendChild(document.createTextNode(0));
                tr.appendChild(td);
            }
            else if(j == 0){
                td.appendChild(document.createTextNode(obje[i - 1].item));
                tr.appendChild(td);      
            }else{
                td.appendChild(document.createTextNode(mainM[i][j - 1]));
                tr.appendChild(td);
            }
        }
        tbody.appendChild(tr);  
    }
    
      table.appendChild(tbody)

    main_table.appendChild(table);



}



