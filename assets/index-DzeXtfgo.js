import{_ as Q,r as d,a as X,m as Y,n as Z,b as U,d as r,c as o,w as i,e as s,p as ee,o as f,h as ae,s as I,v as b,i as te,g as oe,P as ne,x as se,j as n,A as le,B as ie}from"./index-COFnzTVb.js";const ce={class:"channel content-container"},de={class:"table-container"},re={class:"table-header"},ue={class:"right"},me=["onClick"],pe={key:0},fe={__name:"index",setup(ve){const v=d(!1),u=d(!1),_=d(!1),m=d("add"),k=d(),c=d([]),B=d([{label:"粉丝数",value:"fansCount"},{label:"好友数",value:"friendsCount"},{label:"发帖数",value:"postsCount"}]),C={action:te.imageUploadUrl,headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}},t=X({name:"",icon:"",customFields:["fansCount"]}),g=d(),L={name:[{required:!0,message:"请输入渠道名称"}],icon:[{required:!0,message:"请上传渠道图标"}]},F=[{title:"渠道图标",dataIndex:"icon",key:"icon",width:100},{title:"渠道名称",dataIndex:"name",key:"name"},{title:"更新时间",dataIndex:"updateTime",key:"updateTime"},{title:"操作",key:"action",width:200}],x=d([]),M=Y(()=>({add:"添加渠道",edit:"编辑渠道"})[m.value]),T=()=>{m.value="add",t.name="",t.icon="",c.value=[],u.value=!0},V=e=>{m.value="edit",g.value=e.id,t.name=e.name,t.icon=e.icon,c.value=e.icon?[{uid:"-1",name:"image.png",status:"done",url:e.icon}]:[],u.value=!0},D=async e=>{try{const a=await se("channel.delete",{},{urlParams:{id:e.id}});a.code===0?(n.success("删除成功"),p()):n.error(a.message)}catch{n.error("删除失败")}},E=e=>{e.code===0?(t.icon=e.data.url,c.value=[{uid:"-1",name:"image.png",status:"done",url:t.icon}],n.success("上传成功")):(n.error(response.message||"上传失败"),c.value=c.value.filter(a=>a.uid!==file.uid))},N=()=>{n.error("上传失败"),c.value=[]},O=e=>e.type.startsWith("image/")?e.size/1024/1024<1?!0:(n.error("图片必须小于 1MB！"),!1):(n.error("只能上传图片文件！"),!1),P=async()=>{const e=await ie("channel.add",t);e.code===0?(n.success("添加成功"),u.value=!1,p()):n.error(e.message)},S=async()=>{const e=await le("channel.edit",{...t,id:g.value},{urlParams:{id:g.value}});e.code===0?(n.success("编辑成功"),u.value=!1,p()):n.error(e.message)},z=async()=>{console.log(t.customFields);try{switch(await k.value.validate(),_.value=!0,m.value){case"add":P();break;case"edit":S();break}}catch(e){console.error(e)}finally{_.value=!1}},p=async()=>{v.value=!0;try{const e=await ee("channel.list",{page:1,pageSize:200});x.value=e.data.list}finally{v.value=!1}};return Z(()=>{p()}),(e,a)=>{const w=s("a-button"),A=s("a-image"),$=s("a-popconfirm"),q=s("a-space"),R=s("a-table"),j=s("a-upload"),y=s("a-form-item"),W=s("a-input"),G=s("a-checkbox-group"),H=s("a-form"),J=s("a-modal");return f(),U("div",ce,[r("div",de,[r("div",re,[a[5]||(a[5]=r("div",{class:"left"},null,-1)),r("div",ue,[o(w,{type:"primary",onClick:T},{default:i(()=>a[4]||(a[4]=[ae(" 添加渠道 ")])),_:1})])]),o(R,{columns:F,"data-source":x.value,loading:v.value,pagination:!1},{bodyCell:i(({column:l,record:h})=>[l.key==="icon"?(f(),I(A,{key:0,width:40,height:40,src:h.icon},null,8,["src"])):b("",!0),l.key==="action"?(f(),I(q,{key:1},{default:i(()=>[r("a",{onClick:K=>V(h)},"编辑",8,me),o($,{title:"确定要删除该渠道吗？",onConfirm:K=>D(h)},{default:i(()=>a[6]||(a[6]=[r("a",{class:"danger"},"删除",-1)])),_:2},1032,["onConfirm"])]),_:2},1024)):b("",!0)]),_:1},8,["data-source","loading"])]),o(J,{open:u.value,"onUpdate:open":a[3]||(a[3]=l=>u.value=l),title:M.value,confirmLoading:_.value,onOk:z},{default:i(()=>[o(H,{ref_key:"formRef",ref:k,model:t,rules:L,"label-col":{span:6},"wrapper-col":{span:16}},{default:i(()=>[o(y,{label:"渠道图标",name:"icon"},{default:i(()=>[o(j,{"file-list":c.value,"onUpdate:fileList":a[0]||(a[0]=l=>c.value=l),action:C.action,headers:C.headers,"before-upload":O,onSuccess:E,onError:N,accept:"image/*","list-type":"picture-card","max-count":1},{default:i(()=>[c.value.length?b("",!0):(f(),U("div",pe,[o(oe(ne)),a[7]||(a[7]=r("div",{style:{"margin-top":"8px"}},"上传",-1))]))]),_:1},8,["file-list","action","headers"])]),_:1}),o(y,{label:"渠道名称",name:"name"},{default:i(()=>[o(W,{value:t.name,"onUpdate:value":a[1]||(a[1]=l=>t.name=l),placeholder:"请输入渠道名称"},null,8,["value"])]),_:1}),o(y,{label:"自定义字段",name:"customFields"},{default:i(()=>[o(G,{value:t.customFields,"onUpdate:value":a[2]||(a[2]=l=>t.customFields=l),options:B.value},null,8,["value","options"])]),_:1})]),_:1},8,["model"])]),_:1},8,["open","title","confirmLoading"])])}}},ge=Q(fe,[["__scopeId","data-v-d9099d2d"]]);export{ge as default};
