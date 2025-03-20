import{_ as se,r as i,a as O,m as re,n as ie,b as y,d as m,c as t,w as o,e as s,p as R,j as r,f as ue,o as u,F as T,q as j,s as $,h as d,t as k,g as de,P as ce,v as q,x as pe,A as me,B as fe}from"./index-scHfdszV.js";const ge={class:"group content-container"},_e={class:"table-container"},ve={class:"table-header"},ke={class:"left"},ye={class:"right"},be=["onClick"],we={key:2,class:"link-text-container"},he=["href"],Ne={__name:"index",setup(Ce){const F=ue(),h=i(!1),f=i(!1),N=i(!1),b=i("add"),U=i(),c=O({groupName:"",ownerId:void 0}),l=O({groupName:"",groupLink:"",ownerId:void 0}),V=i(void 0),A={groupName:[{required:!0,message:"请输入群名称"}],groupLink:[{required:!0,message:"请输入群链接"}]},C=i([]),E=[{title:"群名称",dataIndex:"groupName",key:"groupName"},{title:"群链接",dataIndex:"groupLink",key:"groupLink",ellipsis:!0},{title:"群主",dataIndex:"ownerName",key:"ownerName"},{title:"成员人数",key:"memberCount",align:"right"},{title:"更新时间",dataIndex:"updateTime",key:"updateTime"},{title:"操作",key:"action",width:200}],z=i([]),g=O({current:1,pageSize:10,total:0}),G=re(()=>({add:"添加群",edit:"编辑群"})[b.value]),B=()=>{g.current=1,_()},H=()=>{Object.assign(c,{name:"",ownerId:void 0}),B()},J=e=>{Object.assign(g,e),_()},K=()=>{b.value="add",l.groupName="",l.groupLink="",l.ownerId=void 0,f.value=!0},Q=e=>{F.push(`/member?groupId=${e.id}`)},W=e=>{V.value=e.id,b.value="edit",l.groupName=e.groupName,l.groupLink=e.groupLink,l.ownerId=e.ownerId,f.value=!0},X=async e=>{try{const a=await pe("group.delete",{id:e.id},{urlParams:{id:e.id}});a.code===0?(r.success("删除成功"),_()):r.error(a.message)}catch{r.error("删除失败")}},Y=async()=>{const e=await fe("group.add",l);e.code===0?(r.success("添加成功"),f.value=!1,_()):r.error(e.message)},Z=async()=>{const e=await me("group.edit",l,{urlParams:{id:V.value}});e.code===0?(r.success("编辑成功"),f.value=!1,_()):r.error(e.message)},ee=async()=>{try{switch(await U.value.validate(),N.value=!0,b.value){case"add":await Y();break;case"edit":await Z();break}}catch(e){console.error(e)}finally{N.value=!1}},_=async()=>{h.value=!0;try{const e=await R("group.list",{page:g.current,pageSize:g.pageSize,...c});e.code===0?(z.value=e.data.list,g.total=e.data.total):r.error(e.message)}finally{h.value=!1}},I=async(e="")=>{try{const a=await R("member.list",{page:1,pageSize:50,memberNickname:e});a.code===0&&(C.value=a.data.list||[])}catch{r.error("获取会员列表失败")}},ae=e=>{navigator.clipboard.writeText(e).then(()=>{r.success("链接已复制到剪贴板")}).catch(()=>{r.error("复制失败，请手动复制")})};return ie(()=>{_(),I()}),(e,a)=>{const L=s("a-input"),v=s("a-form-item"),D=s("a-select-option"),M=s("a-select"),w=s("a-button"),x=s("a-space"),P=s("a-form"),te=s("a-typography-link"),oe=s("a-popconfirm"),ne=s("a-table"),le=s("a-modal");return u(),y("div",ge,[m("div",_e,[m("div",ve,[m("div",ke,[t(P,{layout:"inline",model:c},{default:o(()=>[t(v,{label:"群名称"},{default:o(()=>[t(L,{value:c.groupName,"onUpdate:value":a[0]||(a[0]=n=>c.groupName=n),placeholder:"请输入群名称","allow-clear":""},null,8,["value"])]),_:1}),t(v,{label:"群主"},{default:o(()=>[t(M,{value:c.ownerId,"onUpdate:value":a[1]||(a[1]=n=>c.ownerId=n),placeholder:"请选择群主","allow-clear":"","show-search":"","filter-option":!1,onSearch:I,style:{width:"200px"}},{default:o(()=>[(u(!0),y(T,null,j(C.value,n=>(u(),$(D,{key:n.id,value:n.id},{default:o(()=>[d(k(n.memberNickname),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),t(v,null,{default:o(()=>[t(x,null,{default:o(()=>[t(w,{type:"primary",onClick:B},{default:o(()=>[d(k(e.$t("common.search")),1)]),_:1}),t(w,{onClick:H},{default:o(()=>[d(k(e.$t("common.reset")),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["model"])]),m("div",ye,[t(x,null,{default:o(()=>[t(w,{type:"primary",onClick:K},{icon:o(()=>[t(de(ce))]),default:o(()=>[a[6]||(a[6]=d(" 新增群组 "))]),_:1})]),_:1})])]),t(ne,{columns:E,"data-source":z.value,loading:h.value,pagination:g,onChange:J},{bodyCell:o(({column:n,record:p})=>[n.key==="memberCount"?(u(),y(T,{key:0},[d(k(p.memberCount)+" ",1),t(te,{onClick:S=>Q(p)},{default:o(()=>a[7]||(a[7]=[d("查看")])),_:2},1032,["onClick"])],64)):q("",!0),n.key==="action"?(u(),$(x,{key:1},{default:o(()=>[m("a",{onClick:S=>W(p)},"编辑",8,be),t(oe,{title:"确定要删除该群吗？",onConfirm:S=>X(p)},{default:o(()=>a[8]||(a[8]=[m("a",{class:"danger"},"删除",-1)])),_:2},1032,["onConfirm"])]),_:2},1024)):n.key==="groupLink"?(u(),y("div",we,[m("a",{href:p.groupLink,target:"_blank",class:"link-text"},k(p.groupLink),9,he),t(w,{type:"link",size:"small",onClick:S=>ae(p.groupLink)},{default:o(()=>a[9]||(a[9]=[d(" 复制 ")])),_:2},1032,["onClick"])])):q("",!0)]),_:1},8,["data-source","loading","pagination"])]),t(le,{open:f.value,"onUpdate:open":a[5]||(a[5]=n=>f.value=n),title:G.value,confirmLoading:N.value,onOk:ee},{default:o(()=>[t(P,{ref_key:"formRef",ref:U,model:l,rules:A,"label-col":{span:6},"wrapper-col":{span:16}},{default:o(()=>[t(v,{label:"群名称",name:"groupName"},{default:o(()=>[t(L,{value:l.groupName,"onUpdate:value":a[2]||(a[2]=n=>l.groupName=n),placeholder:"请输入群名称"},null,8,["value"])]),_:1}),t(v,{label:"群链接",name:"groupLink"},{default:o(()=>[t(L,{value:l.groupLink,"onUpdate:value":a[3]||(a[3]=n=>l.groupLink=n),placeholder:"请输入群链接"},null,8,["value"])]),_:1}),t(v,{label:"群主",name:"ownerId"},{default:o(()=>[t(M,{value:l.ownerId,"onUpdate:value":a[4]||(a[4]=n=>l.ownerId=n),placeholder:"请选择群主","allow-clear":"","show-search":"","filter-option":!1,onSearch:I},{default:o(()=>[(u(!0),y(T,null,j(C.value,n=>(u(),$(D,{key:n.id,value:n.id},{default:o(()=>[d(k(n.memberNickname),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1})]),_:1},8,["model"])]),_:1},8,["open","title","confirmLoading"])])}}},Le=se(Ne,[["__scopeId","data-v-2d1f3c27"]]);export{Le as default};
