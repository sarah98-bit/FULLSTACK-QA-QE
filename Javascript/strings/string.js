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
    function swapcase(str){
      return str.replace(/([a-z]+)|([A-Z]+)/g, function(match, chr) {
        return chr ? match.toUpperCase() : match.toLowerCase();
    });
    }
console.log(swapcase("AaBbc"));
//function to convert a string into camel case.
function camelize(str){
  return str.replace(/\W+(.)/g, function (match, char){
    return char.toUpperCase()

  }
);
}
console.log(camelize("Javascript Exercises"));
//function to uncamelize a string
function uncamelize(str , separator){
  if (typeof (separator)== "undefined"){
    separator=" "
  }
  var str =str.replace(/[A-Z]/g, function(letter){
    return separator + letter.toLowerCase()
  });
  return str.replace("/^" + separator + "/", '');
}
console.log(uncamelize("helloWorld","-"));
//function to concatenate a given string n times.
function repeat(str, count){
  if(typeof(count) == "undefined") {
    count =1;
  }
  return count < 1 ? '' : new Array(count + 1).join(str);
    
}
console.log(repeat('Ha!',3));
//function to insert a string within another string at a given position.
function insert (main_string, ins_string, pos){
  if (typeof(pos)=='undefined'){
    pos = 0;
  }
  if (typeof(ins_string)=='undefined'){
    ins_string = '';
  
  }
  return main_string.slice(0, pos) + ins_string  + main_string.slice(pos)
};
console.log(insert('We are doing some exercises','javascript ', 18,));
//function that formats a number with the correct suffix(1st, 2nd, etc..)
function humanize_format(num){
  if(typeof(num) == "undefined") return;
  if(num % 100 >= 11 && num % 100 <= 13)
        return num + "th";
        
        switch(num % 10) {
            case 1: return num + "st";
            case 2: return num + "nd";
            case 3: return num + "rd";
        }
        return num + "th";
}
console.log(humanize_format(301));
//function to truncate a string and append "..."
function truncate_text(str, length,ending){
  if (length == null) {
    length = 100;
  }
  if (ending == null) {
    ending = '...';
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
}
console.log(truncate_text("We are doing JS exercises",15,"!!"))
//function to chop a string into chunks.
function string_chop(str, size){
  if (str == null) return [];
  str = String(str);
  size = ~~size;
return size > 0 ? str.match(new RegExp('.{1,' + size + '}', 'g')) : [str];
}
console.log(string_chop("W3resource",3));
//function to count occurrences of a substring in a string.
function countOccurrences(str, subStr, caseInsensitive = false) {
  if (!subStr) return 0;

  if (caseInsensitive) {
      str = str.toLowerCase();
      subStr = subStr.toLowerCase();
  }

  return str.split(subStr).length - 1;
}
console.log(countOccurrences("The quick brown fox jumps over the lazy dog", "the", true));
//function that reverses the binary representation of a number and returns its decimal form.
function test(num) {
	return parseInt(num.toString(2).split('').reverse().join(''), 2);
}
console.log(test(100));
// function to pad a string to a specified length
function formatted_string(pad, user_str, pad_pos)
{
  if (typeof user_str === 'undefined') 
    return pad;
  if (pad_pos == 'l')
     {
     return (pad + user_str).slice(-pad.length);
     }
  else 
    {
    return (user_str + pad).substring(0, pad.length);
    }
}
console.log(formatted_string('0000',123,'l'));