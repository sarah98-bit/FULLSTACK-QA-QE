// function to check whether an 'input' is a string or not
function is_string (my_string){
  if (typeof my_string === 'string')
  {
    return true
  }
  else{
    return false
  }}
  console.log(is_string('w3resource')); 
  console.log(is_string([1, 2, 4, 0])); 
 //function to check whether a string is blank or not.
  function is_blank(my_input){
    if(my_input.length === 0){
      return true
    }
    else {
      return false
    }
  }
  console.log(is_blank(''));
  console.log(is_blank('abc'));
   //functionn to split a string and convert it into an array if words.
  function string_to_array(my_str){
    return my_str.split(" ")
  }
  console.log(string_to_array("Robin singh"))
  //function to extract a specified number of characters from a string
  function truncate_string(my_str1, length){
    if ((my_str1.constructor === String) && (length>0)) {
      return my_str1.slice(0, length);
  }
  }
  console.log(truncate_string("Robin Singh", 4))
  //function to convert a string into abbreviated form
  function abbrev_name(my_srt){
    var split_names = my_srt.split(" ")
    if(split_names.length> 1){
      return (split_names[0]+" "+split_names[1].charAt(0)+".");
    }
    else{
      return split_names[0]
    }
  };
  console.log(abbrev_name("Robin Singh"));
  // function that hides email addresses to prevent unauthorized
  function protect_email (user_name){
    var avg, splitted , section1, section2;
    splitted = user_name.split("@");
    section1 = splitted[0];
    avg =section1.length /2;
    section1 = section1.substring(0,(section1.length - avg));
    section2 = splitted[1];
    return section1 + "...@"+ section2;
  };
  console.log(protect_email("robon_singh@example.com"));
  // function to parameterize a string
  function string_parameterize (my_str){
    return my_str.toLowerCase().replace(/[^a-zA_Z0-9 -]/, "").replace(/\s/g, "-");

  };
  console.log(string_parameterize("Robin Singh fron USA"));
  // function to capitalize the first letter of a string.
  function capitalize(js_string)
  {
    return js_string.charAt(0).toUpperCase()+ js_string.slice(1)};
    console.log(capitalize('js string exercise'));
    //function to capitalize the first letter of each word in a string.
    function capitalize_words(str1){
      return str1.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase()+txt.substr(1).toLowerCase();
      });
    }
    console.log(capitalize_words('js string exercises'));
    //function that converts uppercase letters to lowercase and vice versa.
    
