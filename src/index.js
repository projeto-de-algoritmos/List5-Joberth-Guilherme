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
    input_item.className = "form-control";
    item.appendChild(input_item);

    var value = document.createElement("div");
    value.className = "form-group col-6";
    var label_value = document.createElement("label");
    label_value.innerText = "Valor";
    value.appendChild(label_value);
    var input_value = document.createElement("input");
    input_value.className = "form-control";
    input_value.type = "number";
    input_value.name = "value" + sumChild;
    input_value.id = "value" + sumChild;
    value.appendChild(input_value);

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
    div_row.appendChild(button_del);

    fields.appendChild(div_row);
}


