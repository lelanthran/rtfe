
function rtfe_dom_find (id) {
   return document.getElementById (id);
}

function rtfe_element_find (element, id) {
   if (element.id == id)
      return element;

   for (var i=0; i<element.childNodes.length; i++) {
      var found = rtfe_element_find (element.childNodes[i], id);
      if (found)
         return found;
   }

   return null;
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
   new_node.innerHTML = text;
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
   button.innerHTML = text;
   button.addEventListener ("click", onclick);
   return button;
}

function rtfe_form_pushbutton_value (button, value) {
   if (value == true) {
      button.value = false;
      rtfe_classlist_del_by_el ("pushbutton_up", button);
      rtfe_classlist_add_by_el ("pushbutton_down", button);
   }
   if (value == false) {
      button.value = true;
      rtfe_classlist_del_by_el ("pushbutton_down", button);
      rtfe_classlist_add_by_el ("pushbutton_up", button);
   }

   return button.value;
}

function rtfe_form_pushbutton (id, text, value) {
   var button = rtfe_form_button (id, text, null);
   rtfe_form_pushbutton_value (button, value);
   button.onclick =
      function (ev) {
         var new_value = !!!button.value;
         console.log (button.innerHTML + ":" + button.value + ":" + new_value);
         rtfe_form_pushbutton_value (button, new_value);
      };
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
   el.innerHTML = label;
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

function rtfe_form_value (id) {
   return document.getElementById (id).value;
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
   new_node.innerHTML = label;
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

function rtfe_form_editbox (id, name, width, height) {
   var new_node = rtfe_component (id, "div", "");
   new_node.name = name;
   new_node.contentEditable = true;
   new_node.style.width = width;
   new_node.style.height = height;
   return new_node;
}

function rtfe_form_colorpicker (id, name, textContent, color) {
   var new_node = rtfe_form_input (id, name, "");
   new_node.innerHTML = textContent;
   new_node.type = "color";
   new_node.value = color;
   return new_node;
}

function rtfe_form_textarea (id, name, rows, cols) {
   var new_node = document.createElement ("textarea");
   new_node.id = id;
   new_node.rows = rows;
   new_node.cols = cols;

   return new_node;
}

function rtfe_grid_container (id, rowspec, colspec) {
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

function rtfe_quickgrid (id, rowspec, colspec) {
   var new_node = rtfe_grid_container (id, rowspec, colspec);
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
      var el = rtfe_dom_find (arguments[i]);
      if (el == null || el == undefined)
         continue;
      el.classList.add (classname);
   }
}

function rtfe_classlist_del (classname) {
   for (var i=1; i<arguments.length; i++) {
      var el = rtfe_dom_find (arguments[i]);
      if (el == null || el == undefined)
         continue;
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

function rtfe_classlist_add_by_el (classname) {
   for (var i=1; i<arguments.length; i++) {
      var el = arguments[i];
      if (el == null || el == undefined)
         continue;
      el.classList.add (classname);
   }
}

function rtfe_classlist_del_by_el (classname) {
   for (var i=1; i<arguments.length; i++) {
      var el = arguments[i];
      if (el == null || el == undefined)
         continue;
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
      handler (response);
   });
}

function rtfe_collect_form_data (form_id) {
   var form = rtfe_dom_find (form_id);
   var ret = new FormData ();
   var els = form.getElementsByTagName ("input");
   for (var i=0; i<els.length; i++) {
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

function rtfe_setde (root, id, cmd, handler_name, handler_func) {
   rtfe_element_find (root, id)[handler_name] =
      function () {
         console.log ("Setting " + cmd + " to " + handler_func (id));
         document.execCommand (cmd, false, handler_func (id));
      };
}

function rtfe_get_value (id) {
   var el = document.getElementById (id);
   var value = '';
      console.log (el.value);
   if (el.type === 'select') {
      console.log (el.value);
      return el.value;
   }
   return value;
}

function rtfe_set_props (properties) {
   for (var i=1; i<arguments.length; i++) {
      if (!(properties.hasOwnProperty (arguments[i][0]))) {
         properties[arguments[i][0]] = arguments[i][1];
      }
   }
   return properties;
}

function rtfe_rtfe (id, name, properties) {
   /*
    *    +-OuterGrid-1fr-----------------------------------------------------------+
    *    |  +-ToolbarGrid-1fr-8x128px-------------------------------------------+  |
    *    |  |   +----+ +--+ +--+ +--+ +--+ +--+ +--+ +--+ +--+ +--+ +--+ +--+   |  |
    * R1 |  |   |FONT| |Sz| |BG| |FG| |Bd| |Ul| |Il| |Lj| |Fj| |Rj| |B.| |Bn|   |  |
    *    |  |   +----+ +--+ +--+ +--+ +--+ +--+ +--+ +--+ +--+ +--+ +--+ +--+   |  |
    *    |  +-------------------------------------------------------------------+  |
    * ___|_________________________________________________________________________|___
    *    |  +-CancelBtn-+ +SaveBtn----+                                            |
    * R2 |  |   Cancel  | |    Save   |                                            |
    *    |  +-----------+ +-----------+                                            |
    * ___|_________________________________________________________________________|___
    *    |                                                                         |
    *    |  +-Formatted-InputArea-----------------------------------------------+  |
    * R3 |  |                                                                   |  |
    *    |  |                                                                   |  |
    *    |  +-------------------------------------------------------------------+  |
    * ___|_________________________________________________________________________|___
    *    |  +-CancelBtn-+ +SaveBtn----+                                            |
    * R4 |  |   Cancel  | |    Save   |                                            |
    *    |  +-----------+ +-----------+                                            |
    *    |                                                                         |
    *    +-------------------------------------------------------------------------+
    *
    */

   // TODO: caller must supply images for the buttons, or accept the text that we use.
   properties = rtfe_set_props (properties,
                                [ "outer_grid_class",             "rtfe-grid"          ],
                                [ "tb_grid_class",                "toolbar-grid"       ],
                                [ "tb_fontsel_class",             "toolbar-fontsel"    ],
                                [ "tb_fontsize_class",            "toolbar-fontsize"   ],
                                [ "tb_bg_class",                  "toolbar-bg"         ],
                                [ "tb_fg_class",                  "toolbar-fg"         ],
                                [ "tb_bold_class",                "toolbar-bold"       ],
                                [ "tb_underline_class",           "toolbar-underline"  ],
                                [ "tb_italic_class",              "toolbar-italic"     ],
                                [ "tb_leftj_class",               "toolbar-leftj"      ],
                                [ "tb_fullj_class",               "toolbar-fullj"      ],
                                [ "tb_rightj_class",              "toolbar-rightj"     ],
                                [ "tb_ulist_class",               "toolbar-ulist"      ],
                                [ "tb_olist_class",               "toolbar-olist"      ],
                                [ "top_btns_grid_class",          "top-btns-grid"      ],
                                [ "top_btns_cancel_class",        "top-btns-cancel"    ],
                                [ "top_btns_save_class",          "top-btns-save"      ],
                                [ "input_grid_class",             "input-grid"         ],
                                [ "input_area_class",             "input-area"         ],
                                [ "bottom_btns_grid_class",       "bottom-btns-grid"   ],
                                [ "bottom_btns_cancel_class",     "bottom-btns-cancel" ],
                                [ "bottom_btns_save_class",       "bottom-btns-save"   ],
                                [ "editbox_width",                "200px"              ],
                                [ "editbox_height",               "200px"              ],
                                [ "sentinel",                     "none"               ]
                               );

   var ret =
      rtfe_grid_container (id, "auto", "1fr",
         rtfe_quickgrid (id + "-tbgrid", "auto", "100px 80px 64px 64px 32px 32px 32px 32px 32px 32px 32px 32px 1fr",
            rtfe_form_select (id + "-fontsel", "FontSel", 1, "",
               rtfe_form_select_option ("", "Helvetica", "Helvetica"),
               rtfe_form_select_option ("", "Arial", "Arial"),
               rtfe_form_select_option ("", "Courier", "Courier"),
               rtfe_form_select_option ("", "Times New Roman", "Times New Roman")),
            rtfe_form_select (id + "-fontsize", "FontSize", 1, "",
               rtfe_form_select_option ("", "7", "7"),
               rtfe_form_select_option ("", "8", "8"),
               rtfe_form_select_option ("", "9", "9"),
               rtfe_form_select_option ("", "10", "10"),
               rtfe_form_select_option ("", "11", "11")),
            rtfe_form_colorpicker (id + "-bgcolor", "bgcolor", "BG", "#000000"),
            rtfe_form_colorpicker (id + "-fgcolor", "fgcolor", "FG", "#ffffff"),
            rtfe_form_button (id + "-bold", "", null),
            rtfe_form_button (id + "-italic", "", null),
            rtfe_form_button (id + "-underline", "", null),
            rtfe_form_button (id + "-left-just", "", null),
            rtfe_form_button (id + "-right-just", "", null),
            rtfe_form_button (id + "-full-just", "", null),
            rtfe_form_button (id + "-ul", "UL", null),
            rtfe_form_button (id + "-ol", "OL", null)),
         rtfe_quickgrid (id + "-tbtn_grid", "auto", "150px 150px",
            rtfe_form_button (id + "-cancel-top", "Cancel", null),
            rtfe_form_button (id + "-save-top", "Save", null)),
         rtfe_form_editbox (id + "-editbox", name + "-editbox", properties.editbox_width,
                                                                properties.editbox_height),
         rtfe_quickgrid (id + "-bbtn-grid", "auto", "150px 150px",
            rtfe_form_button (id + "-cancel-bottom", "Cancel", null),
            rtfe_form_button (id + "-save-bottom", "Save", null)));

   rtfe_element_find (ret, id).classList.add (properties.outer_grid_class);
   rtfe_element_find (ret, id + "-tbgrid").classList.add (properties.tb_grid_class);
   rtfe_element_find (ret, id + "-fontsel").classList.add (properties.tb_fontsel_class);
   rtfe_element_find (ret, id + "-fontsize").classList.add (properties.tb_fontsize_class);
   rtfe_element_find (ret, id + "-bgcolor").classList.add (properties.tb_bg_class);
   rtfe_element_find (ret, id + "-fgcolor").classList.add (properties.tb_fg_class);
   rtfe_element_find (ret, id + "-bold").classList.add (properties.tb_bold_class);
   rtfe_element_find (ret, id + "-underline").classList.add (properties.tb_underline_class);
   rtfe_element_find (ret, id + "-italic").classList.add (properties.tb_italic_class);
   rtfe_element_find (ret, id + "-left-just").classList.add (properties.tb_leftj_class);
   rtfe_element_find (ret, id + "-full-just").classList.add (properties.tb_fullj_class);
   rtfe_element_find (ret, id + "-right-just").classList.add (properties.tb_rightj_class);
   rtfe_element_find (ret, id + "-ul").classList.add (properties.tb_ulist_class);
   rtfe_element_find (ret, id + "-ol").classList.add (properties.tb_olist_class);
   rtfe_element_find (ret, id + "-tbtn_grid").classList.add (properties.top_btns_grid_class);
   rtfe_element_find (ret, id + "-cancel-top").classList.add (properties.top_btns_cancel_class);
   rtfe_element_find (ret, id + "-save-top").classList.add (properties.top_btns_save_class);
   rtfe_element_find (ret, id + "-bbtn-grid").classList.add (properties.bottom_btns_grid_class);
   rtfe_element_find (ret, id + "-cancel-bottom").classList.add (properties.bottom_btns_cancel_class);
   rtfe_element_find (ret, id + "-save-bottom").classList.add (properties.bottom_btns_save_class);

   rtfe_setde (ret, id + '-fontsel',    'fontName',            'onchange', rtfe_form_value);
   rtfe_setde (ret, id + "-fontsize",   'fontSize',            'onchange', rtfe_form_value);
   rtfe_setde (ret, id + "-bgcolor",    'backColor',           'onclick',  rtfe_form_value);
   rtfe_setde (ret, id + "-fgcolor",    'foreColor',           'onclick',  rtfe_form_value);
   rtfe_setde (ret, id + "-bold",       'bold',                'onclick',  rtfe_form_value);
   rtfe_setde (ret, id + "-underline",  'underline',           'onclick',  rtfe_form_value);
   rtfe_setde (ret, id + "-italic",     'italic',              'onclick',  rtfe_form_value);
   rtfe_setde (ret, id + "-left-just",  'justifyLeft',         'onclick',  rtfe_form_value);
   rtfe_setde (ret, id + "-full-just",  'justifyFull',         'onclick',  rtfe_form_value);
   rtfe_setde (ret, id + "-right-just", 'justifyRight',        'onclick',  rtfe_form_value);
   rtfe_setde (ret, id + "-ul",         'insertUnorderedList', 'onclick',  rtfe_form_value);
   rtfe_setde (ret, id + "-ol",         'insertOrderedList',   'onclick',  rtfe_form_value);
   return ret;

}

