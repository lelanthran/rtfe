
function rtfe_dom_find (id) {
   return document.getElementById (id);
}

function rtfe_dom_new (parent_id, id, node_type) {
   var new_node = document.createElement (node_type);
   new_node.id = id;
   document.getElementById(parent_id).appendChild (new_node);
   return new_node;
}

function rtfe_component (id, node_type, text) {
   var new_node = document.createElement (node_type);
   new_node.id = id;
   new_node.textContent = text;
   for (var i=3; i<arguments.length; i++) {
      new_node.appendChild (arguments[i]);
   }
   return new_node;
}

function rtfe_form (id, action) {
   var new_node = document.createElement ("form");
   new_node.id = id;
   new_node.action = action;
   for (var i=2; i<arguments.length; i++) {
      new_node.appendChild (arguments[i]);
   }
   new_node.addEventListener('submit', (e) => {
     e.preventDefault()
   });
   return new_node;
}

function rtfe_form_button (id, text, onclick) {
   var button = document.createElement ("button");
   button.id = id;
   button.textContent = text;
   button.addEventListener ("click", onclick);
   return button;
}

function rtfe_form_input (id, name, placeholder) {
   var new_node = document.createElement ("input");
   new_node.id = id;
   new_node.name = name;
   new_node.placeholder = placeholder;
   return new_node;
}

function rtfe_form_hidden (id, name, value) {
   var new_node = document.createElement ("input");
   new_node.id = id;
   new_node.name = name;
   new_node.setAttribute ("type", "hidden");
   new_node.value = value;
   return new_node;
}

function rtfe_form_password (id, name) {
   var new_node = rtfe_form_input (id, name, "");
   new_node.setAttribute ("type", "password");
   return new_node;
}

function rtfe_form_checkbox (id, name, label, checked) {
   var el = document.createElement ("label");
   el.setAttribute ("for", id);
   el.textContent = label;
   var new_node = rtfe_form_input (id, name, "");
   new_node.setAttribute ("type", "checkbox");
   new_node.value = "true";
   new_node.checked = checked.toLowerCase () === "checked" ? true : false;
   el.appendChild (new_node);
   return el;
}

function rtfe_form_radio (id, name, value, checked) {
   var new_node = rtfe_form_input (id, name, "");
   new_node.setAttribute ("type", "radio");
   new_node.value = value;
   new_node.checked = checked.toLowerCase () === "checked" ? true : false;
   return new_node;
}

function rtfe_form_select (id, name, size, multiple) {
   var new_node = document.createElement ("select");
   new_node.id = id;
   new_node.name = name;
   new_node.setAttribute ("size", size);
   if (multiple.length > 0)
      new_node.setAttribute ("multiple", "");
   for (var i=4; i<arguments.length; i++) {
      new_node.appendChild (arguments[i]);
   }
   return new_node;
}

function rtfe_form_select_optgroup (id, label) {
   var new_node = document.createElement ("optgroup");
   new_node.id = id;
   new_node.label = label;
   for (var i=2; i<arguments.length; i++) {
      new_node.appendChild (arguments[i]);
   }
   return new_node;
}

function rtfe_form_select_option (id, value, label) {
   var new_node = document.createElement ("option");
   new_node.id = id;
   new_node.value = value;
   new_node.textContent = label;
   return new_node;
}

function rtfe_form_file (id, name, filter, multiple) {
   var new_node = rtfe_form_input (id, name, "Select file");
   new_node.name = name + "[]";
   new_node.type = "file";
   new_node.accept = filter;
   if (multiple.length > 0) {
      new_node.setAttribute ("multiple", '');
   }
   return new_node;
}

function rtfe_grid_container (id, colspec, rowspec) {
   var new_node = document.createElement ("div");
   new_node.id = id;
   new_node.style.display = "grid";
   new_node.style.gridTemplateColumns = colspec;
   new_node.style.gridTemplateRows = rowspec;

   for (var i=3; i<arguments.length; i++) {
      new_node.appendChild (arguments[i]);
   }

   return new_node;
}

function rtfe_grid_item (id, rowspec, colspec, component) {
   component.style.gridColumn = colspec;
   component.style.gridRow = rowspec;
   component.style.justifySelf = "center";
   component.style.alignSelf = "center";

   for (var i=4; i<arguments.length; i++) {
      component.appendChild (arguments[i]);
   }

   return component;
}

function rtfe_quickgrid (id, colspec, rowspec) {
   var new_node = rtfe_grid_container (id, colspec, rowspec);
   new_node.id = id;
   new_node.style.display = "grid";
   new_node.style.gridTemplateColumns = colspec;
   new_node.style.gridTemplateRows = rowspec;

   for (var i=3; i<arguments.length; i++) {
      new_node.appendChild (arguments[i]);
   }

   return new_node;
}

function rtfe_append (parent_id) {
   var pnode = document.getElementById (parent_id);
   for (var i=1; i<arguments.length; i++) {
      pnode.appendChild (arguments[i]);
   }
   return pnode;
}

function rtfe_hide (id, anim_name, anim_ms) {
   var el = rtfe_dom_find (id);
   el.style.animation = anim_name + " " + (anim_ms/1000.0) + "s 1";
   setTimeout (
      function () {
         rtfe_dom_find (id).style.display = "none";
      },
      anim_ms);
}

function rtfe_show (id, anim_name, anim_ms) {
   var el = rtfe_dom_find (id);
   el.style.animation = anim_name + " " + (anim_ms/1000.0) + "s 1";
   rtfe_dom_find (id).style.display = "block";
}

function rtfe_classlist_add (classname) {
   for (var i=1; i<arguments.length; i++) {
      rtfe_dom_find (arguments[i]).classList.add (classname);
   }
}

function rtfe_classlist_del (classname) {
   for (var i=1; i<arguments.length; i++) {
      var el = rtfe_dom_find (arguments[i]);
      var oldclass = el.className + "";
      el.className = "";
      var newclass = oldclass.replace (classname, "");
      var newclasses = newclass.split (" ");
      for (var i=0; i<newclasses.length; i++) {
         newclasses[i] = newclasses[i].replace (" ", "");
         if (newclasses[i].length <= 0)
            continue;
         el.classList.add (newclasses[i], el.id);
      }
   }
}

function rtfe_post (url, form_data, handler) {
   fetch(url, {
      method: 'POST',
      body: form_data,
   }).then ((response) => {
      console.log ("calling handler: (" + response + ")");
      handler (response);
   });
}

function rtfe_collect_form_data (form_id) {
   var form = rtfe_dom_find (form_id);
   var ret = new FormData ();
   var els = form.getElementsByTagName ("input");
   for (var i=0; i<els.length; i++) {
      console.log (els[i].name + ":" + els[i].type + ":" + els[i].value);
      if (els[i].type === "checkbox" || els[i].type === "radio") {
          if (els[i].checked) {
             ret.append (els[i].name, els[i].value);
          }
         continue;
      }
      if (els[i].type === "file") {
         for (var j=0; j<els[i].files.length; j++) {
            var file = els[i].files[j];
            var varname = els[i].name;
            console.log ("Appending file " + varname + ":" + file.name);
            ret.append (varname, file);
         }
         continue;
      }
      ret.append (els[i].name, els[i].value);
   }
   els = form.getElementsByTagName ("select");
   for (var i=0; i<els.length; i++) {
      var options = els[i].getElementsByTagName ("option");
      var delim = "";
      for (var j=0; j<options.length; j++) {
         if (options[j].selected) {
            var current = ret.get (els[i].name);
            if (current == null) {
               current = "";
            }
            ret.set (els[i].name, current + delim + options[j].value);
            delim = ",";
         }
      }
   }
   return ret;
}

