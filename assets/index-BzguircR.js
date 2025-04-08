import{_ as X,r,b as Y,j as Z,k as ee,c as U,d,e as o,w as i,f as n,l as ae,o as f,h as te,p as I,q as b,B as oe,v as ne,m as s,z as se,A as le}from"./index-ByCb6rGy.js";const ie={class:"channel content-container"},ce={class:"table-container"},re={class:"table-header"},de={class:"right"},ue=["onClick"],me={key:0},pe={__name:"index",setup(fe){const _=r(!1),u=r(!1),v=r(!1),m=r("add"),k=r(),c=r([]),B=r([{label:"粉丝数",value:"fansCount"},{label:"好友数",value:"friendsCount"},{label:"发帖数",value:"postsCount"}]),C={action:oe.imageUploadUrl,headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}},t=Y({name:"",icon:"",customFields:["fansCount"]}),g=r(),L={name:[{required:!0,message:"请输入渠道名称"}],icon:[{required:!0,message:"请上传渠道图标"}]},F=[{title:"渠道图标",dataIndex:"icon",key:"icon",width:100},{title:"渠道名称",dataIndex:"name",key:"name"},{title:"更新时间",dataIndex:"updateTime",key:"updateTime"},{title:"操作",key:"action",width:200}],x=r([]),M=Z(()=>({add:"添加渠道",edit:"编辑渠道"})[m.value]),T=()=>{m.value="add",t.name="",t.icon="",c.value=[],u.value=!0},V=e=>{m.value="edit",g.value=e.id,t.name=e.name,t.icon=e.icon,c.value=e.icon?[{uid:"-1",name:"image.png",status:"done",url:e.icon}]:[],u.value=!0},z=async e=>{try{const a=await ne("channel.delete",{},{urlParams:{id:e.id}});a.code===0?(s.success("删除成功"),p()):s.error(a.message)}catch{s.error("删除失败")}},D=e=>{e.code===0?(t.icon=e.data.url,c.value=[{uid:"-1",name:"image.png",status:"done",url:t.icon}],s.success("上传成功")):(s.error(response.message||"上传失败"),c.value=c.value.filter(a=>a.uid!==file.uid))},E=()=>{s.error("上传失败"),c.value=[]},N=e=>e.type.startsWith("image/")?e.size/1024/1024<1?!0:(s.error("图片必须小于 1MB！"),!1):(s.error("只能上传图片文件！"),!1),S=async()=>{const e=await le("channel.add",t);e.code===0?(s.success("添加成功"),u.value=!1,p()):s.error(e.message)},q=async()=>{const e=await se("channel.edit",{...t,id:g.value},{urlParams:{id:g.value}});e.code===0?(s.success("编辑成功"),u.value=!1,p()):s.error(e.message)},A=async()=>{try{switch(await k.value.validate(),v.value=!0,m.value){case"add":S();break;case"edit":q();break}}catch(e){console.error(e)}finally{v.value=!1}},p=async()=>{_.value=!0;try{const e=await ae("channel.list",{page:1,pageSize:200});x.value=e.data.list}finally{_.value=!1}};return ee(()=>{p()}),(e,a)=>{const w=n("a-button"),O=n("a-image"),$=n("a-popconfirm"),P=n("a-space"),R=n("a-table"),j=n("plus-outlined"),W=n("a-upload"),y=n("a-form-item"),G=n("a-input"),H=n("a-checkbox-group"),J=n("a-form"),K=n("a-modal");return f(),U("div",ie,[d("div",ce,[d("div",re,[a[5]||(a[5]=d("div",{class:"left"},null,-1)),d("div",de,[o(w,{type:"primary",onClick:T},{default:i(()=>a[4]||(a[4]=[te(" 添加渠道 ")])),_:1})])]),o(R,{columns:F,"data-source":x.value,loading:_.value,pagination:!1},{bodyCell:i(({column:l,record:h})=>[l.key==="icon"?(f(),I(O,{key:0,width:40,height:40,src:h.icon},null,8,["src"])):b("",!0),l.key==="action"?(f(),I(P,{key:1},{default:i(()=>[d("a",{onClick:Q=>V(h)},"编辑",8,ue),o($,{title:"确定要删除该渠道吗？",onConfirm:Q=>z(h)},{default:i(()=>a[6]||(a[6]=[d("a",{class:"danger"},"删除",-1)])),_:2},1032,["onConfirm"])]),_:2},1024)):b("",!0)]),_:1},8,["data-source","loading"])]),o(K,{open:u.value,"onUpdate:open":a[3]||(a[3]=l=>u.value=l),title:M.value,confirmLoading:v.value,onOk:A},{default:i(()=>[o(J,{ref_key:"formRef",ref:k,model:t,rules:L,"label-col":{span:6},"wrapper-col":{span:16}},{default:i(()=>[o(y,{label:"渠道图标",name:"icon"},{default:i(()=>[o(W,{"file-list":c.value,"onUpdate:fileList":a[0]||(a[0]=l=>c.value=l),action:C.action,headers:C.headers,"before-upload":N,onSuccess:D,onError:E,accept:"image/*","list-type":"picture-card","max-count":1},{default:i(()=>[c.value.length?b("",!0):(f(),U("div",me,[o(j),a[7]||(a[7]=d("div",{style:{"margin-top":"8px"}},"上传",-1))]))]),_:1},8,["file-list","action","headers"])]),_:1}),o(y,{label:"渠道名称",name:"name"},{default:i(()=>[o(G,{value:t.name,"onUpdate:value":a[1]||(a[1]=l=>t.name=l),placeholder:"请输入渠道名称"},null,8,["value"])]),_:1}),o(y,{label:"自定义字段",name:"customFields"},{default:i(()=>[o(H,{value:t.customFields,"onUpdate:value":a[2]||(a[2]=l=>t.customFields=l),options:B.value},null,8,["value","options"])]),_:1})]),_:1},8,["model"])]),_:1},8,["open","title","confirmLoading"])])}}},ve=X(pe,[["__scopeId","data-v-52b21e91"]]);export{ve as default};
