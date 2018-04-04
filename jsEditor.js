//under MIT license. made by Jacob Piela. hosted at github.com/jacobmp70/jsEditor
function jsEditor(id ,settings={}){
    //////privete//////
    var editor = document.getElementById(id);
    var doc;
    var docPage;


    var init = function(){
        //add div for heder items
        var div = document.createElement('div');
        div.id = 'heder';
        editor.appendChild(div);
        heder = document.getElementById('heder');

        //add iframe to page
        var iframe = document.createElement('iframe');
        iframe.id = 'editorPage';
        iframe.srcdoc = "<!DOCTYPE html><html><head><meta charset='utf-8'/></head><body></body></html>";//standard html page
        editor.appendChild(iframe);

        document.getElementById('editorPage').onload = function(){
        
        doc = document.getElementById('editorPage').contentWindow.document.body;
        docPage = document.getElementById('editorPage').contentWindow.document;
        

        if ('contentEditable' in doc) {
            // allow contentEditable
            doc.contentEditable = true;
        }
        else  // Firefox earlier than version 3
        if ('designMode' in doc) {
            // turn on designMode
            doc.designMode = 'on';                
        }
        }

        
        for(var i=0; i<Object.keys(settings).length; i++){
            var temp = Object.keys(settings)[i];
            //add top buttons
            if(temp == 'bold'){
                addItem('button','bold','bold','B');
            } else if(temp == 'italic'){
                addItem('button','italic','italic','I');
            } else if(temp == 'fontSize'){
                addItem('select','fontSize','fontSize','',[1,2,3,4,5,6,7]);
            } else if(temp == 'fontName'){
                addItem('select','fontName','fontName','',["Arial","Times New Roman","serif","Comic Sans MS"]);
            } else if(temp == 'insertOrderedList'){
                addItem('button','insertOrderedList','insertOrderedList','*');
            } else if(temp == 'insertUnorderedList'){
                addItem('button','insertUnorderedList','insertUnorderedList','-');
            } else if(temp == 'underline'){
                addItem('button','underline','underline','_');
            } else if(temp == 'undo'){
                addItem('button','undo','undo','>');
            } else if(temp == 'redo'){
                addItem('button','redo','redo','<');
            } else if(temp == 'createLink'){
                addItem('other','createLink',"other.onclick=function(){docPage.execCommand ('createLink', false, prompt('Enter url'));doc.focus();}",'input', ['type','button','value','http//']);
            } else if(temp == 'foreColor'){
                addItem('other','foreColor',"other.onchange=function(){docPage.execCommand ('foreColor', false, document.getElementById('foreColor').value);doc.focus();}",'input', ['type','color']);
            } else if(temp == 'insertImage'){
                addItem('other','insertImage',"other.onclick=function(){docPage.execCommand ('insertImage', false, prompt('Enter url of img'));doc.focus();}",'input', ['type','button','value','img']);
            } else if(temp == 'insertHTML'){
                addItem('other','insertHTML',"other.onclick=function(){docPage.execCommand ('insertHTML', false, prompt('Enter HTML'));doc.focus();}",'input', ['type','button','value','<html>']);
            } else if(temp == 'justifyLeft'){
                addItem('button','justifyLeft','justifyLeft','|--');
            } else if(temp == 'justifyCenter'){
                addItem('button','justifyCenter','justifyCenter','-|-');
            } else if(temp == 'justifyRight'){
                addItem('button','justifyRight','justifyRight','--|');
            } else if(temp == 'custom') {
                addItem(settings[temp][type],settings[temp][id],settings[temp][command],settings[temp][name],settings[temp][value]);
            } else {
                console.log("Error: invalid arg " + temp);
            }
        }

    }

    var addItem = function(type ,id ,command='' ,name='' ,value=[]){
        if(type == 'button'){//button item example(addItem('button','someid','bold','B');)
        var button = document.createElement('button');
        button.id = id;
        button.className = "hederButton";
        button.innerHTML = name;
        button.onclick = function(){ doc.focus();docPage.execCommand (command, false, function(){ if(value[0] != undefined && value[0] != null){return value[0];}else{return null;}});};
        heder.appendChild(button);
        } else if(type == 'select'){//select item example(addItem('select','someid','fontSize','',[1,2,3,...]);)
            var select = document.createElement('select');
            select.id = id;
            select.className = "hederSelect";
            for(var i=0; i<value.length; i++){
                var option = document.createElement('option');
                if(i == 0){
                    option.selected="selected";
                }
                option.innerHTML = value[i];
                select.appendChild(option);
            }
            select.onchange = function(){doc.focus(); docPage.execCommand (command, false, document.getElementById(id).value);};
            heder.appendChild(select);
        }  else if(type == 'other'){//costom item example(addItem('other','someid','other.onclick=function(){docPage.execCommand ('bold', false, null);doc.focus();}','div');)
            var other = document.createElement(name);
            other.id = id;
            other.className = "hederItem";
            if(value[0] != undefined && value[0] != null){
                other.setAttribute(value[0],value[1]);
            }
            if(value[2] != undefined && value[2] != null){
                other.setAttribute(value[2],value[3]);
            }
            eval(command);
            heder.appendChild(other);
        }
    }
    ////// on start ////////
    init();

    //////public//////
    this.jsEditorHTML = function(){
        return doc.innerHTML;
    }
    this.jsEditorAddNode = function(node){
        return doc.appendChild(node);
    }
    this.jsEditorEnd = function(){
        editor.innerHTML = doc.innerHTML;

    }
}