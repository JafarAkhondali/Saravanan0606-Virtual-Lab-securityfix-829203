$(document).ready(function(){ 
    $("ul#sidemenu li a").click(function(e){
     if (!$(this).hasClass("active")) {
         var tabNum = $(this).index();
         var nthChild = tabNum+1;
       $("ul#sidemenu li a.active").removeClass("active");
       $(this).addClass("active");
       $("ul#Contenttab1 li.selected").removeClass("selected");
       $("ul#Contenttab1 li:nth-child("+nthChild+")").addClass("selected");
     }
   });
  });

//   (async () => {
//     let opt;
//     ["tomorrow_night","solarized_dark","kuroir","github","dracula","katzenmilch","merbivore","nord_dark"].forEach(function(e){
//         opt += `<option value="${e}">${e}</option>`
//     })
//     await import('https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/ace.js').catch((error) => console.log('Loading failed' + error))
//     document.body.appendChild(Object.assign(document.createElement("select"), {id: "themes", innerHTML: opt}))
//     document.body.appendChild(Object.assign(document.createElement("div"), {id: "target", style: "width:100%;height:100vh;border:1px black solid"}))
//     let editor = await ace.edit('target')
//     ace.config.set('basePath', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/')
//     editor.setOptions({
//         value: '\n\n\n\n\n\n\n\n\n\n\n\n',
//         theme: 'ace/theme/tomorrow_night',
//         mode: 'ace/mode/javascript'
//     })
//     themes.addEventListener('change', function(e){
//       editor.setOptions({
//         theme: 'ace/theme/' + e.target.value
//       })
//     })
// })()