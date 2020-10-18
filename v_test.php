<?php

function x_response ($errcode, $errmsg, $matrix) {
   $ret = '{';
   $ret = $ret . "\n" .
                 "   errcode: $errcode,\n" .
                 "   errmsg:  \"$errmsg\",\n";

   $ret = $ret . '   [ ';
   $nrows = count ($matrix);
   $delim = '';
   for ($i=0; $i<$nrows; $i++) {
      $ret = $ret . $delim;
      $delim = ",\n      ";
      $ret = $ret . json_encode ($matrix[$i]);
   }
   $ret = $ret . "   ]\n}\n";
   return $ret;
}

$matrix = [];
foreach ($_REQUEST as $key=>$value) {
   $row = [$key, $value];
   array_push ($matrix, $row);
}

print_r ($_FILES);

foreach ($_FILES as $key=>$value) {
   $row = ["FILE:" . $key, $value];
   array_push ($matrix, $row);
}

if (count ($matrix) > 0) {
   echo x_response (-42, "No Error", $matrix);
   exit (0);
}

?>
<html>
<head>
   <script src="rtfe.js"></script>
   <link rel="stylesheet" href="test_styles.css">
</head>
<body>
   <p>Testing<input> </input></p>
   <div id=main>
   </div>
<script>

rtfe_append ("main", rtfe_form_button ("Button3", "toggle",
   function (event) {
      console.log ("Animating toggle");
      if (rtfe_dom_find ("div-1").style.display == "none") {
         rtfe_show ("div-1", "fadein", 500);
      } else {
         rtfe_hide ("div-1", "fadeout", 500);
      }
   }));

rtfe_append ("main", rtfe_form_button ("Button2", "Hide",
                  function (event) {
                     console.log ("Button clicked: " + event.detail);
                     if (rtfe_dom_find ("div-1").style.display == "none") {
                        rtfe_dom_find ("div-1").style.animation = "fadein 1.5s 1";
                        rtfe_dom_find ("Button2").disabled = true;
                        setTimeout (
                           function () {
                              rtfe_dom_find ("div-1").style.display = "block";
                              rtfe_dom_find ("Button2").disabled = false;
                           }, 1500);
                        rtfe_dom_find ("div-1").style.display = "block";
                        rtfe_dom_find ("Button2").textContent = "Hide";
                     } else {
                        rtfe_dom_find ("div-1").style.animation = "fadeout 1.5s 1";
                        rtfe_dom_find ("Button2").disabled = true;
                        setTimeout (
                           function () {
                              rtfe_dom_find ("div-1").style.display = "none";
                              rtfe_dom_find ("Button2").disabled = false;
                           }, 1500);
                        rtfe_dom_find ("Button2").textContent = "Show";
                     }
                  }));

var new_form =
   rtfe_component ("div-1", "div", "MyDiv",
      rtfe_form ("form-1", "",
         rtfe_grid_container ("container-1", "auto", "100px 300px 1fr",
            rtfe_grid_item ("id-1-1", "1", "1", rtfe_component ("lb-1", "p", "Name")),
            rtfe_grid_item ("id-1-2", "1", "2", rtfe_form_input ("in-1", "username", "Name")),
            rtfe_grid_item ("id-2-1", "2", "1", rtfe_component ("lb-2", "p", "Password")),
            rtfe_grid_item ("id-2-2", "2", "2", rtfe_form_password ("in-2", "password")),
            rtfe_grid_item ("id-3-2", "3", "2", rtfe_form_checkbox ("in-3", "SaveLogin", "Remember Me", "checked")),
            rtfe_grid_item ("id-4-2", "4", "2", rtfe_form_checkbox ("in-4", "x-secure", "X-secure", "unchecked")),
            rtfe_grid_item ("id-5-1", "5", "1", rtfe_component ("lb-5", "p", "Favourite Browser")),
            rtfe_form_hidden ("hid-1", "hname", "HiddenValue"),
            rtfe_grid_item ("id-5-2", "5", "3",
               rtfe_component ("id-5-20", "p", "",
               rtfe_quickgrid ("id-qg-1", "auto", "50px 300px",
                  rtfe_form_radio ("in-5-21", "FavB", "FF",   "unchecked"), rtfe_component ("", "s", "FireFox"),
                  rtfe_form_radio ("in-5-22", "FavB", "FFOS", "unchecked"), rtfe_component ("", "span", "FireFoxOS"),
                  rtfe_form_radio ("in-5-23", "FavB", "IE",   "unchecked"), rtfe_component ("", "b", "Internet Explorer"),
                  rtfe_form_radio ("in-5-24", "FavB", "MSE",  "unchecked"), rtfe_component ("", "span", "MS Edge"),
                  rtfe_form_radio ("in-5-25", "FavB", "O",    "unchecked"), rtfe_component ("", "i", "Opera"),
                  rtfe_form_radio ("in-5-26", "FavB", "GC",   "checked")  , rtfe_component ("", "span", "Google Chrome")))),
            rtfe_grid_item ("id-6", "6", "2",
               rtfe_form_select ("in-6", "pets", "5", "multiple",
                  rtfe_form_select_optgroup ("in-6-1", "Quadrupeds",
                     rtfe_form_select_option ("in-6-1-1", "dog", "Canine Companions"),
                     rtfe_form_select_option ("in-6-1-2", "cat", "Feline Companions"),
                     rtfe_form_select_option ("in-6-1-3", "hamster", "Small And Fluffy")),
                  rtfe_form_select_optgroup ("in-6-2", "Avians",
                     rtfe_form_select_option ("in-6-2-1", "parrot", "Talkers"),
                     rtfe_form_select_option ("in-6-2-2", "macaw", "Screechers"),
                     rtfe_form_select_option ("in-6-2-3", "duck", "Swimmers")))),
            rtfe_form_file ("id-7", "inputnamefile", "audio/*,image/*", "multiple"),
            rtfe_grid_item ("btn3", "9", "span 2",
               rtfe_form_button ("form-submit", "Login",
                                 function () {
                                    var fdata = rtfe_collect_form_data ("form-1");
                                    rtfe_post ("v_test.php", fdata,
                                                function (response) {
                                                   for (var iterator of response.headers.entries ()) {
                                                        console.log ("Rqst header: " + iterator);
                                                   }
                                                   console.log ("Rqst response: " + response.ok);
                                                   console.log ("Rqst status: " + response.status);
                                                   console.log ("Rqst status: " + response.statusText);
                                                   console.log ("Rqst type: " + response.type);
                                                   console.log ("Rqst url: " + response.url);
                                                      response.text ().then (function (text) {
                                                         console.log ("Rqst body:" + text);
                                                      } );
                                                });
                                 }))
         )));
// TODO: Add function to search within an object for a specific ID, and function to append to
// existing object more components (like we would want to do in a loop).

rtfe_append ("main", new_form);

// rtfe_append ("lb-2",
// rtfe_component ("test-id2", "p", "Password Paragraph"));

rtfe_classlist_add ("outline", "container-1", "lb-2", "div-1");
rtfe_classlist_add ("one", "container-1", "lb-2", "div-1");
rtfe_classlist_add ("two", "container-1", "lb-2", "div-1");

console.log (rtfe_dom_find ("container-1").classList + ":");

rtfe_classlist_del ("one", "container-1", "lb-2", "div-1");
rtfe_classlist_del ("two", "container-1", "lb-2", "div-1");

console.log (rtfe_dom_find ("container-1").classList + ":");

var form_data = rtfe_collect_form_data ("form-1");


// Attempting to use a static structure instead of function calls.
// Honestly, this looks very ugly and not at all as maintainable as
// it looked in my head.
var form2 = {
   "f2-1":  {
      "component":      "div",
      "textContent":    "Second Div",
      "form-2":  {
         "component":      "form",
         "action":         "",
         "container-2": {
            "component":      "grid-container",
            "colspec":        "100px 300px 1fr",
            "rowspec":        "",
            "c2-1-1":   {
               "component":      "grid-item",
               "colspec":        "1",
               "rowspec":        "1",
               "c2-lb-name":  {
                  "component":      "p",
                  "textContent":    "Name"
               },
               "component":      "grid-item",
               "colspec":        "2",
               "rowspec":        "1",
               "c2-in-name":  {
                  "component":      "form-input",
                  "name":           "username",
                  "placeholder":    "Name"
               },
            },
         },
      },
   },
};

// Second attempt at making a unified interface to components.
// Here we assume that the components have already been created
// and are in an element that is not yet attached to the DOM.
//
var fields = [
   [ "className", "c1 c2 c3 c4" ],
   [ "textContent", "csdcsdcsc" ],
];

// This is kinda ugly too
// apply (root, fields, "id1", "id2", "id3");

var properties = {
"outer_grid_class":     "OldClass",
"outer_grid_tc":        "OldTC",
};

var editor_component = rtfe_rtfe ("id", "name", properties);

rtfe_append ("main", editor_component);


   </script>
</body>
</html>
