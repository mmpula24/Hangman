var rite = '';
var rong = '';
var seekrit = "javascript";
wordBlendr(seekrit, rite)

function wordBlendr(wrd1, wrd2) {
   var pos;
   var ary = new Array();
   var len2 = wrd2.length; 
   var len1 = wrd1.length;
   ary.length = len1;
   for (var i = 0; i < len1; i++) {     
      ary[i] = "*";
   }
   for (var j = 0; j < len2; j++) {     
      var char = wrd2.charAt(j);     
      pos = wrd1.indexOf(char);  
      while (pos != -1) {
         ary[pos] = char;
         pos = wrd1.indexOf(char, pos+1);  
      }
   }
   
   for (var k = 0; k < len1; k++)  {   
      document.write(ary[k]);
   }
}

function showImage(num) {console.log(document.getElementById("image"), "document.getElementById");
   var imageName = "H" + num.toString() + ".GIF";console.log(imageName, "imageName");
   document.getElementById("image").innerHTML = "<img src=\"" + imageName + "\">";
}

function btnClik_onclick() {  
   var letter = document.getElementById("txtGuess").value;
   var valid = isValid(letter);
   var pos;
   if(valid) {
      var cliks = 0;
      var strAddr = window.location.href;  
      var nuAddr = '';
      var param = '';
      console.log(strAddr.indexOf("?"), "strAdd.indexOf");
      if (strAddr.indexOf("?") == -1) {
         nuAddr = strAddr + "?cliks=1";console.log(nuAddr, "nuAddr -1");     
         param = setVar(nuAddr, "rite", rite); console.log(param, "param btnClick");
      }
      else {
         pos = strAddr.indexOf("cliks=");console.log(pos, "pos");  
         cliks = parseInt(strAddr.substring(pos+6));
         cliks++;				
         param = setVar(strAddr, "rite", rite);console.log(param, "param");
         nuAddr = strAddr.substr(0,pos+6) + cliks + param;  
         console.log(nuAddr, "nuAddr");
      }console.log(param, "param before setting location");
      window.location.href = param;
      var x = window.location.href;console.log(x, "x");
      var riteLetters = getVar(param, "rite");console.log(riteLetters, "riteLetters");
      wordBlendr(seekrit, riteLetters);
   }
}

function isValid(letter) { 
   letter = letter.trim();
   letter = letter.charAt(0).toLowerCase();
   var letterChar = letter.charCodeAt(0);console.log(letterChar, "letterChar");
   if(letterChar >= 97 && letterChar <= 122) {
      if(seekrit.includes(letter)) {
         rite += letter;console.log(rite, "rite");
      }
      else{
         rong += letter;console.log(rong, "rong");
      }
      return true;
   }
   else {
      alert("Please enter a valid letter");
      return false;
   }
}

function getVar(addr, key) {console.log(addr, key, "getVar1");
   var tmp = addr;
   var pos, pos2, varname, varval;
   
   pos = tmp.indexOf("?");		
   if (pos == -1) {console.log("pos = -1");
      tmp = "";
   }
   else {console.log("pos != -1");
      tmp = tmp.substring(pos+1);console.log(tmp, "tmp3");
   }
   
   while (tmp.length > 0) {
      pos = tmp.indexOf("=");     
      varname = tmp.substring(0,pos);console.log(varname, "varname2");
      
      pos2 = tmp.indexOf("&");    
      if (pos2==-1) {		
         varval = tmp.substring(pos+1);console.log(varval, "varval");
         tmp = "";
      }
      else {			
         varval = tmp.substring(pos+1, pos2);
         tmp = tmp.substring(pos2+1); 
      }console.log(key, varname, "key", "varname");
      if (key == varname) {
         return varval;
      }
   }
   return "";			
}

function setVar(addr, key, val) {console.log(addr, key, val, "setVar");
   var tmp = addr.toLowerCase();console.log(tmp.indexOf("?"), "tmp1");
   var blnQuest = false;
   var pos, pos2, varname, varval;
   
   key = key.toLowerCase();
   blnQuest = (tmp.indexOf("?") > -1);console.log(blnQuest, "blnQuest");
   
   if (blnQuest) {console.log("blnQuest is true");console.log(key+"=", "key");       	
      pos = tmp.indexOf(key + "=");console.log(pos, "pos2");
      if (pos > -1) {console.log("key found");     	
         pos = pos + key.length + 1;
         pos2 = tmp.indexOf("&", pos+1);
         if (pos2 > -1) {  	
            tmp = tmp.substring(0, pos) + val + tmp.substring(pos2); }
         else {   		
            tmp = tmp.substring(0, pos) + val; }
      }
      else {console.log("key not found");		
         tmp = addr + "&" + key + "=" + val;
      }
   }
   else {  		
      tmp = addr + "?" + key + "=" + val;
   }
   return tmp;
}

var strAddr, pos;
var cliks = 0;

strAddr = window.location.href;      
if (strAddr.indexOf("?") == -1) {
   document.write("Page: " + cliks + "<br />");
}
else {
   pos = strAddr.indexOf("cliks=");  
   cliks = parseInt(strAddr.substring(pos+6));
   document.write("Page: " + cliks + "<br />");
}
