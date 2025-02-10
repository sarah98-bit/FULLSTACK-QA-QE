function isPalindrome(str){
    var re = /[^A-Za-z0-9]/g;
 str = str.toLowerCase().replace(re, '');
    var len = str.length
for (i = 0; i < len /2; i++){
    if(str[i] !==str[len - 1 -i]){
        return "it is not a palindrome";
    }
    else {
        return "it is a palindrome"
    }
}
}
console.log (isPalindrome("A man, a plan, a canal, panama"));
console.log(isPalindrome("Was it a car or a cat i saw"));
console.log(isPalindrome("Hello, World"));

// reverse a given string
function reverseString(str){
    if (str === ""){
        return ""
    }
    else {
        return reverseString(str.substr(1)) + str.charAt(0);
    }
}
console.log(reverseString("hello"));


//longest palindromic substring in a given string
function is_Palindrome(str1) {
    var rev = str1.split("").reverse().join("");
    return str1 == rev;
    }
    
    function longest_palindrome(str1) {
        var max_length = 0,
            maxp = '';
    
        for (var i = 0; i < str1.length; i++) {
            var subs = str1.substr(i, str1.length);
    
            for (var j = subs.length; j >= 0; j--) {
                var sub_subs_str = subs.substr(0, j);
                if (sub_subs_str.length <= 1) continue;
    
                if (is_Palindrome(sub_subs_str)) {
                    if (sub_subs_str.length > max_length) {
                        max_length = sub_subs_str.length;
                        maxp = sub_subs_str;
                    }
                }
            }
        }
    
        return maxp;
    }
    
console.log(longest_palindrome("babad"));
console.log(longest_palindrome("cbbd"));
    

    // function to check if two given strings are anagrams of each other
    function isAnagram(firstStr, secondStr){
        let itemFirstStr = firstStr.toLowerCase();
        let itemSecondStr = secondStr.toLowerCase();

        itemFirstStr = itemFirstStr.split('').sort().join('');
        itemSecondStr = itemSecondStr.split('').sort().join('');
            return (itemFirstStr === itemSecondStr)
        
    }
console.log(isAnagram("silent", "listen"));
console.log(isAnagram("hello", "world"));

//function to remove duplicate characters from a string while preserving the order of the first appearance of each character.
function removeDuplicate(s) {
    let result = '';
    let seen = new Set();

    for (let i = 0; i < s.length; i++) {
        let char = s[i];

        if (!seen.has(char)) {
            result += char;
            seen.add(char);
        }
    }

    return result;
}
console.log(removeDuplicate("programming"));
console.log(removeDuplicate("hello world"));
console.log(removeDuplicate("aaaaa"));
console.log(removeDuplicate("abcd"));
console.log(removeDuplicate("aabbcc"));


// function to count palindrome in a string
function isPalindrome(s, i, j) {
    while (i < j) {
        if (s[i] !== s[j]) return false;
        i++;
        j--;
    }
    return true;
}

function countPS(s) {
    let n = s.length;

    // Consider all possible substrings of lengths
    // more than 1
    let res = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          
            // If substring from i to j is palindrome
            // increment the result
            if (isPalindrome(s, i, j)) 
                res++;  
        }
    }

    return res;
}
console.log(countPS("ababa"));
console.log(countPS("racecar"));
console.log(countPS("aabb"));
console.log(countPS("a"));
console.log(countPS("abc"));


//function to find the longest common prefix string amongst an array of strings
function longestCommonPrefix(strs) {
    if (strs.length === 0) return "";
    let prefix = strs[0];
    for (let i = 1; i < strs.length; i++) {
      while (strs[i].indexOf(prefix) !== 0) {
        prefix = prefix.slice(0, prefix.length - 1);
      }
    }
    return prefix;
  }
console.log(longestCommonPrefix(["flower", "flow", "flight"]));
console.log(longestCommonPrefix(["dog","racecar","car"]));
console.log(longestCommonPrefix(["interspecies", "interstellar","interstate"]));
console.log(longestCommonPrefix(["prefix", "prefixes","preform"]));
console.log(longestCommonPrefix(["apple","banana","cherry"]));


//function to be case insensitive, meaning it should ignore upper and lower case differences when checking for a palindrome.
function IsPalindrome(str) {
    let lowerStr = str.toLowerCase();
    let upperStr = str.toUpperCase();

    if (lowerStr !== upperStr.toLowerCase()) return false;  

    let cleanedStr = lowerStr.replace(/[^a-z0-9]/g, '');

    return cleanedStr === cleanedStr.split('').reverse().join('');
}
console.log(IsPalindrome("Aba"))
console.log(IsPalindrome("Racecar"))
console.log(IsPalindrome("Palindrome"))
console.log(IsPalindrome("Madam"))
console.log(IsPalindrome("Hello"))