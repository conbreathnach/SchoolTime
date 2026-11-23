const DAYS=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const KEY="schooltime_android_v1";
const $=id=>document.getElementById(id);
let data=loadData(), deferredInstall=null;
function loadData(){try{return JSON.parse(localStorage.getItem(KEY))||{}}catch{return {}}}
function saveData(){localStorage.setItem(KEY,JSON.stringify(data))}
function day(){return $("daySelect").value}
function list(){return Array.isArray(data[day()])?data[day()]:[]}
function render(){
 const entries=[...list()].sort((a,b)=>a.start.localeCompare(b.start));
 $("itemCount").textContent=entries.length;
 $("items").innerHTML="";
 $("emptyState").classList.toggle("hidden",entries.length>0);
 entries.forEach(item=>{
  const card=document.createElement("article");card.className="item-card";
  const stripe=document.createElement("div");stripe.className="item-stripe";stripe.style.setProperty("--item-color",item.color||"#7c8cff");
  const main=document.createElement("div");main.className="item-main";
  const time=document.createElement("div");time.className="item-time";time.textContent=`${item.start} – ${item.end}`;
  const name=document.createElement("div");name.className="item-name";name.textContent=item.name;
  const meta=document.createElement("div");meta.className="item-meta";meta.textContent=[item.type,item.room].filter(Boolean).join(" · ");
  main.append(time,name,meta);
  if(item.notes){const notes=document.createElement("div");notes.className="item-notes";notes.textContent=item.notes;main.append(notes)}
  const actions=document.createElement("div");actions.className="item-actions";
  const edit=document.createElement("button");edit.className="small-btn";edit.textContent="Edit";edit.addEventListener("click",()=>openEditor(item.id));
  const del=document.createElement("button");del.className="small-btn";del.textContent="Delete";del.addEventListener("click",()=>{if(confirm(`Delete ${item.name}?`)){data[day()]=list().filter(x=>x.id!==item.id);saveData();render()}});
  actions.append(edit,del);card.append(stripe,main,actions);$("items").append(card);
 });
}
function openEditor(id){
 const item=id?list().find(x=>x.id===id):null;
 $("itemForm").reset();$("itemId").value=item?.id||"";
 $("dialogTitle").textContent=item?"Edit item":"Add item";
 $("itemName").value=item?.name||"";$("itemType").value=item?.type||"Class";
 $("itemRoom").value=item?.room||"";$("itemStart").value=item?.start||"09:00";
 $("itemEnd").value=item?.end||"10:00";$("itemColor").value=item?.color||"#7c8cff";
 $("itemNotes").value=item?.notes||"";$("formError").textContent="";
 $("itemDialog").showModal();$("itemName").focus();
}
$("itemForm").addEventListener("submit",e=>{
 e.preventDefault();
 const start=$("itemStart").value,end=$("itemEnd").value;
 if(!start||!end||end<=start){$("formError").textContent="Finish time must be later than start time.";return}
 const item={id:$("itemId").value||crypto.randomUUID(),name:$("itemName").value.trim(),type:$("itemType").value,room:$("itemRoom").value.trim(),start,end,color:$("itemColor").value,notes:$("itemNotes").value.trim()};
 if(!item.name){$("formError").textContent="Please enter a name.";return}
 const arr=list(),idx=arr.findIndex(x=>x.id===item.id);
 if(idx>=0)arr[idx]=item;else arr.push(item);
 data[day()]=arr;saveData();$("itemDialog").close();render();
});
$("addBtn").onclick=$("emptyAddBtn").onclick=()=>openEditor();
$("daySelect").addEventListener("change",render);
$("closeDialog").onclick=$("cancelBtn").onclick=()=>$("itemDialog").close();
$("copyDayBtn").onclick=()=>{$("copySource").textContent=day();$("copyTarget").value=DAYS.find(d=>d!==day())||"Monday";$("copyDialog").showModal()};
$("closeCopy").onclick=$("cancelCopy").onclick=()=>$("copyDialog").close();
$("copyForm").addEventListener("submit",e=>{e.preventDefault();const target=$("copyTarget").value;if(target===day()){alert("Choose a different day.");return}data[target]=list().map(x=>({...x,id:crypto.randomUUID()}));saveData();$("copyDialog").close();alert(`Copied ${day()} to ${target}.`)});
if("serviceWorker" in navigator && location.protocol.startsWith("http"))navigator.serviceWorker.register("./service-worker.js").catch(()=>{});
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredInstall=e;$("installBtn").classList.remove("hidden")});
$("installBtn").onclick=async()=>{if(!deferredInstall)return;deferredInstall.prompt();await deferredInstall.userChoice;deferredInstall=null;$("installBtn").classList.add("hidden")};
render();
