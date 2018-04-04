# jsEditor

  

jsEditor is a simple small WYSIWYG editor.

![jsEditor images](https://raw.githubusercontent.com/jacobmp70/jsEditor/master/jsEditor.png "Logo Title Text 1")
  
To add jsEditor to your website simply

add the jsEditor.js and jsEditor.css file to your project

and add a div tag. Then configure it in your javascript an example config

```
<div id='editor' style='width:600px; height:500px;'></div>
<script type="text/javascript">
	var Myeditor = new jsEditor('editor' ,{bold:true,
		italic:true,
		fontSize:true,
		fontName:true,
		foreColor:true,
		justifyLeft:true,
		justifyCenter:true,
		justifyRight:true,
		createLink:true,
		insertImage:true,
		insertHTML:true,
		underline:true});
</script>
```

and your done.
