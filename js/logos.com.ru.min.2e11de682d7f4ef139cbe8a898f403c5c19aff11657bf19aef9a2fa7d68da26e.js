function $(selector){return document.querySelector(selector);}
function get(url,callback){var request=new XMLHttpRequest();request.onreadystatechange=function(){if(this.readyState==4&&this.status==200){callback(this.responseText);}};request.open('GET',url,true);request.send();}
var selectedItem=0;document.addEventListener('DOMContentLoaded',function(){var autocomplete_list=$('.form-autocomplete ul.menu');var data=JSON.parse(localStorage.getItem('logotyp.data'))||[];if(!data.length||(new Date()-parseInt(localStorage.getItem('logotyp.time')))/1000>3){get('/data/index.html',function(d){data=JSON.parse(d);localStorage.setItem('logotyp.data',d);localStorage.setItem('logotyp.time',+new Date());});}
var goto_menu_item=function(item){document.location.href='/logo/'+item.getAttribute('content').toLowerCase();};var handler=function(e){if('keyCode'in e&&e.keyCode==13){goto_menu_item($('ul#autocomplete li.menu-item-selected'));return;}
if(e.target.value.length==0){$('#autocomplete').style.display='none';return;}
$('#autocomplete').style.display='block';if(e.target.value.length==1){autocomplete_list.innerHTML='<li class="toast">Для поиска необходимо ввести минимум 2 буквы латинского алфавита</li>';return;}
if('keyCode'in e&&e.keyCode==27){e.target.value='';autocomplete_list.innerHTML='';$('#autocomplete').style.display='none';return;}
var html=[];var list=[];const input=e.target.value;for(i in data){const searchStr=new RegExp(input.toLowerCase().split(' ').join('.*'));if(data[i].toLowerCase().split(/[\ \-]/).join('').search(searchStr)>=0){list.push(data[i]);}}
list.sort(function(a,b){if(a.search(input)>b.search(input)){return 1;}
if(a.search(input)<b.search(input)){return-1;}
return 0;});for(i in list){html.push('<li class="menu-item" content="'+
list[i].split('.')[0]+
'" image="'+
list[i]+
'">'+
'<a href="/logo/'+
list[i].toLowerCase()+
'/" >'+
'<div class="chip">'+
'<div class="chip-content">'+
list[i].replace(/-/g,' ')+
'</div>'+
'<div class="chip-icon">'+
'<img src="/file/'+
list[i].toLowerCase()+
'.svg" class="avatar" />'+
'</div>'+
'</div>'+
'</a>'+
'</li>');}
var deselectAll=function(items){items.forEach(item=>item.classList.remove('menu-item-selected'));if(selectedItem>=0&&selectedItem<items.length){items[selectedItem].classList.add('menu-item-selected');}};if(!html.length){$('#autocomplete').style.display='none';}else{autocomplete_list.innerHTML=html.join('\n');var items=document.querySelectorAll('ul#autocomplete li');if('keyCode'in e&&e.keyCode==38){if(selectedItem<=0){selectedItem=items.length-1;}else{selectedItem-=1;}}
if('keyCode'in e&&e.keyCode==40){if(selectedItem>=items.length-1){selectedItem=0;}else{selectedItem+=1;}}
deselectAll(items);}
return false;};$('.form-input').addEventListener('keyup',handler);$('.form-input').addEventListener('focus',handler);$('body').addEventListener('click',function(e){var parent=e.target.closest('li');if(parent&&parent.className=='menu-item'){goto_menu_item(parent);}else if(e.target.className.indexOf('form-input')>=0&&e.target.value.length>0){$('#autocomplete').style.display='block';}else{$('#autocomplete').style.display='none';}
return false;});});