import{_ as K,r as l,a as h,j as Q,k as X,b as C,d,c as n,w as o,e as i,l as Y,o as v,h as x,p as D,q as A,F as Z,n as ee,t as se,s as ae,m as r,y as te,z as ne}from"./index-BlTIBMeX.js";const oe={class:"waiter content-container"},ie={class:"table-container"},re={class:"table-header"},le={class:"right"},me=["onClick"],de={__name:"index",setup(ue){const k=l(!1),m=l(!1),u=l(!1),c=l("add"),g=l(),b=l(null),e=h({username:"",password:"",remarks:"",permissions:[]}),V=[{title:"task",permissions:"task:list"},{title:"taskCreate",permissions:"task:create"},{title:"taskEdit",permissions:"task:edit"},{title:"account",permissions:"account:list"},{title:"taskPreAudit",permissions:"task:preAudit"},{title:"taskConfirmAudit",permissions:"task:confirmAudit"},{title:"taskSubmittedDetail",permissions:"task:submittedDetail"},{title:"member",permissions:"member:list"},{title:"memberCreate",permissions:"member:create"},{title:"memberEdit",permissions:"member:edit"},{title:"memberView",permissions:"member:view"},{title:"channel",permissions:"channel:list"},{title:"group",permissions:"group:list"},{title:"withdrawal",permissions:"finance:withdrawal"},{title:"bills",permissions:"finance:bills"},{title:"waiter",permissions:"waiter:list"},{title:"article",permissions:"article:list"},{title:"systemConfig",permissions:"system:config"}],S=[{title:"账号名称",dataIndex:"username",key:"username"},{title:"备注",dataIndex:"remarks",key:"remarks"},{title:"操作",key:"action",width:200}],y=l([]),p=h({current:1,pageSize:10,total:0}),U=Q(()=>c.value==="add"?"添加账号":"编辑账号"),j=a=>{Object.assign(p,a),f()},z=()=>{c.value="add",e.username="",e.password="",e.remarks="",e.permissions=[],m.value=!0},B=a=>{b.value=a.id,c.value="edit",e.username=a.username,e.password="",e.remarks=a.remarks,e.permissions=a.permissions.split(","),m.value=!0},E=async a=>{try{const s=await ae("waiter.delete",{id:a.id},{urlParams:{id:a.id}});s.code===0?(r.success("删除成功"),f()):r.error(s.message)}catch{r.error("删除失败")}},I=async()=>{try{u.value=!0;const a=await ne("waiter.add",{...e,permissions:e.permissions.join(",")});a.code===0?(r.success("添加成功"),m.value=!1,f()):r.error(a.message)}catch{r.error("添加失败")}finally{u.value=!1}},L=async()=>{try{u.value=!0;const a={id:b.value,username:e.username,remarks:e.remarks,permissions:e.permissions.join(",")};e.password&&(a.password=e.password);const s=await te("waiter.edit",a,{urlParams:{id:b.value}});s.code===0?(r.success("编辑成功"),m.value=!1,f()):r.error(s.message)}catch{r.error("编辑失败")}finally{u.value=!1}},N=async()=>{switch(await g.value.validate(),c.value){case"add":I();break;case"edit":L();break}},f=async()=>{k.value=!0;try{const a=await Y("waiter.list",{page:p.current,pageSize:p.pageSize});y.value=a.data.list,p.total=a.data.total}finally{k.value=!1}};return X(()=>{f()}),(a,s)=>{const O=i("a-button"),T=i("a-popconfirm"),q=i("a-space"),F=i("a-table"),P=i("a-input"),_=i("a-form-item"),$=i("a-input-password"),R=i("a-textarea"),W=i("a-checkbox"),M=i("a-checkbox-group"),G=i("a-form"),H=i("a-modal");return v(),C("div",oe,[d("div",ie,[d("div",re,[s[6]||(s[6]=d("div",{class:"left"},null,-1)),d("div",le,[n(O,{type:"primary",onClick:z},{default:o(()=>s[5]||(s[5]=[x(" 添加账号 ")])),_:1})])]),n(F,{columns:S,"data-source":y.value,loading:k.value,pagination:p,onChange:j},{bodyCell:o(({column:t,record:w})=>[t.key==="action"?(v(),D(q,{key:0},{default:o(()=>[d("a",{onClick:J=>B(w)},"编辑",8,me),w.isAdmin?A("",!0):(v(),D(T,{key:0,title:"确定要删除该账号吗？",onConfirm:J=>E(w)},{default:o(()=>s[7]||(s[7]=[d("a",{class:"danger"},"删除",-1)])),_:2},1032,["onConfirm"]))]),_:2},1024)):A("",!0)]),_:1},8,["data-source","loading","pagination"])]),n(H,{open:m.value,"onUpdate:open":s[4]||(s[4]=t=>m.value=t),title:U.value,confirmLoading:u.value,onOk:N},{default:o(()=>[n(G,{ref_key:"formRef",ref:g,model:e,"label-col":{span:6},"wrapper-col":{span:16}},{default:o(()=>[n(_,{label:"用户名",name:"username",rules:[{required:!0,message:"请输入用户名"}]},{default:o(()=>[n(P,{value:e.username,"onUpdate:value":s[0]||(s[0]=t=>e.username=t),placeholder:"请输入用户名"},null,8,["value"])]),_:1}),n(_,{label:"密码",name:"password",rules:[{required:c.value==="add",message:"请输入密码"}]},{default:o(()=>[n($,{value:e.password,"onUpdate:value":s[1]||(s[1]=t=>e.password=t),placeholder:"请输入密码"},null,8,["value"])]),_:1},8,["rules"]),n(_,{label:"备注",name:"remarks"},{default:o(()=>[n(R,{value:e.remarks,"onUpdate:value":s[2]||(s[2]=t=>e.remarks=t),placeholder:"请输入备注",rows:3},null,8,["value"])]),_:1}),n(_,{label:"权限",name:"permissions"},{default:o(()=>[n(M,{value:e.permissions,"onUpdate:value":s[3]||(s[3]=t=>e.permissions=t)},{default:o(()=>[(v(),C(Z,null,ee(V,t=>n(W,{key:t.title,value:t.permissions},{default:o(()=>[x(se(a.$t("menu."+t.title)),1)]),_:2},1032,["value"])),64))]),_:1},8,["value"])]),_:1})]),_:1},8,["model"])]),_:1},8,["open","title","confirmLoading"])])}}},pe=K(de,[["__scopeId","data-v-a8d620b8"]]);export{pe as default};
