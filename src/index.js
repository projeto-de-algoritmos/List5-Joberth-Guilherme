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

}



