function addField(){
  
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
    weight.appendChild(input_weight);

    var button_del = document.createElement("button");
    button_del.classList = "btn btn-danger col-1 mt-4";
    button_del.id = "del" + sumChild;
    button_del.innerText = "Deletar";
    button_del.type = "button";
    button_del.style.height = "40px";
    button_del.addEventListener("click", function(){
        var div_del = document.getElementById("input"+sumChild);
        div_del.parentNode.removeChild(div_del);
    });

    div_row.appendChild(item);
    div_row.appendChild(value);
    div_row.appendChild(weight);
    div_row.appendChild(button_del);

    fields.appendChild(div_row);
}

var weights;
var values;
var itens;

function saveData(){
    var itens_html = document.getElementsByClassName("item");
    var values_html = document.getElementsByClassName("value");
    var weights_html = document.getElementsByClassName("weight");

    weights = new Array(document.getElementById("fields").childElementCount - 1);
    values = new Array(document.getElementById("fields").childElementCount - 1);
    itens = new Array(document.getElementById("fields").childElementCount - 1);

    Object.entries(itens_html).map((object) => { itens.push(object[1].value) });
    Object.entries(values_html).map((object) => { values.push(object[1].value) });
    Object.entries(weights_html).map((object) => { weights.push(object[1].value) });

    console.log(weights)
    console.log(values)
    console.log(itens)

    /*setTimeout(() => {
        window.location = "./table.html";
    }, 1000);*/

}



