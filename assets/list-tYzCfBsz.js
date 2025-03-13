import{c as a,I as re,_ as se,r as y,a as H,l as ie,b as h,d as s,w as t,e as i,i as u,f as ce,o as p,F as S,m as j,n as I,h as g,t as O,g as B,P as ue,p as N}from"./index-BFTMSDHQ.js";import{g as D,d as de}from"./request-iE7dzf1b.js";var pe={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M880 310H732.4c13.6-21.4 21.6-46.8 21.6-74 0-76.1-61.9-138-138-138-41.4 0-78.7 18.4-104 47.4-25.3-29-62.6-47.4-104-47.4-76.1 0-138 61.9-138 138 0 27.2 7.9 52.6 21.6 74H144c-17.7 0-32 14.3-32 32v200c0 4.4 3.6 8 8 8h40v344c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V550h40c4.4 0 8-3.6 8-8V342c0-17.7-14.3-32-32-32zm-334-74c0-38.6 31.4-70 70-70s70 31.4 70 70-31.4 70-70 70h-70v-70zm-138-70c38.6 0 70 31.4 70 70v70h-70c-38.6 0-70-31.4-70-70s31.4-70 70-70zM180 482V378h298v104H180zm48 68h250v308H228V550zm568 308H546V550h250v308zm48-376H546V378h298v104z"}}]},name:"gift",theme:"outlined"};function R(d){for(var l=1;l<arguments.length;l++){var r=arguments[l]!=null?Object(arguments[l]):{},c=Object.keys(r);typeof Object.getOwnPropertySymbols=="function"&&(c=c.concat(Object.getOwnPropertySymbols(r).filter(function(m){return Object.getOwnPropertyDescriptor(r,m).enumerable}))),c.forEach(function(m){me(d,m,r[m])})}return d}function me(d,l,r){return l in d?Object.defineProperty(d,l,{value:r,enumerable:!0,configurable:!0,writable:!0}):d[l]=r,d}var V=function(l,r){var c=R({},l,r.attrs);return a(re,R({},c,{icon:pe}),null)};V.displayName="GiftOutlined";V.inheritAttrs=!1;const fe={class:"member-list content-container"},_e={class:"table-container"},ve={class:"table-header"},ge={class:"left"},be={class:"right"},ye={key:0,style:{display:"inline-block"}},he={class:"link-text-container"},ke=["href"],we=["onClick"],Ce=["onClick"],Oe={__name:"list",setup(d){const l=ce(),r=y(!1),c=y(!1),m=y(!1),x=y(10),f=H({memberNickname:"",groupId:void 0}),P=y([]),_=H({current:1,pageSize:10,total:0}),$=y([]),T=[{title:"会员名称",dataIndex:"memberNickname",key:"memberNickname"},{title:"账号信息",key:"accountList"},{title:"所属群组",dataIndex:"groupName",key:"groupName"},{title:"更新时间",dataIndex:"updateTime",key:"updateTime",width:180},{title:"操作",key:"action",fixed:"right",width:200}],L=()=>{_.current=1,w()},A=()=>{Object.assign(f,{memberNickname:"",groupId:void 0}),L()},E=n=>{_.current=n.current,_.pageSize=n.pageSize,w()},F=()=>{l.push("/member/create")},M=n=>{l.push(`/member/edit/${n.id}`)},q=n=>{l.push(`/member/view/${n.id}`)},J=async n=>{try{const e=await de("member.delete",{},{urlParams:{id:n.id}});e.code===0?(u.success("删除成功"),w()):u.error(e.message)}catch{u.error("删除失败")}},Q=async()=>{c.value=!0,await X()},W=async()=>{try{m.value=!0,u.success("保存成功"),c.value=!1}catch{u.error("保存失败")}finally{m.value=!1}},X=async()=>{try{x.value=10}catch{u.error("获取配置失败")}},w=async()=>{r.value=!0;try{const n=await D("member.list",{page:_.current,pageSize:_.pageSize,...f});n.code===0?(P.value=n.data.list,_.total=n.data.total):u.error(n.message)}finally{r.value=!1}},U=async(n="")=>{try{const e=await D("group.list",{page:1,pageSize:50,groupName:n});e.code===0&&($.value=e.data.list||[])}catch{u.error("获取群组列表失败")}},Y=n=>{navigator.clipboard.writeText(n).then(()=>{u.success("链接已复制到剪贴板")}).catch(()=>{u.error("复制失败，请手动复制")})};return ie(()=>{w(),U()}),(n,e)=>{const Z=i("a-input"),C=i("a-form-item"),K=i("a-select-option"),ee=i("a-select"),k=i("a-button"),z=i("a-space"),G=i("a-form"),te=i("a-tag"),ae=i("a-popconfirm"),ne=i("a-table"),oe=i("a-input-number"),le=i("a-modal");return p(),h("div",fe,[s("div",_e,[s("div",ve,[s("div",ge,[a(G,{layout:"inline",model:f},{default:t(()=>[a(C,{label:"会员名称"},{default:t(()=>[a(Z,{value:f.memberNickname,"onUpdate:value":e[0]||(e[0]=o=>f.memberNickname=o),placeholder:"请输入会员名称","allow-clear":""},null,8,["value"])]),_:1}),a(C,{label:"所属群组"},{default:t(()=>[a(ee,{value:f.groupId,"onUpdate:value":e[1]||(e[1]=o=>f.groupId=o),placeholder:"请选择群组","allow-clear":"","show-search":"","filter-option":!1,onSearch:U,style:{width:"200px"}},{default:t(()=>[(p(!0),h(S,null,j($.value,o=>(p(),I(K,{key:o.id,value:o.id},{default:t(()=>[g(O(o.groupName),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),a(C,null,{default:t(()=>[a(z,null,{default:t(()=>[a(k,{type:"primary",onClick:L},{default:t(()=>e[4]||(e[4]=[g("查询")])),_:1}),a(k,{onClick:A},{default:t(()=>e[5]||(e[5]=[g("重置")])),_:1})]),_:1})]),_:1})]),_:1},8,["model"])]),s("div",be,[a(z,null,{default:t(()=>[a(k,{onClick:Q},{icon:t(()=>[a(B(V))]),default:t(()=>[e[6]||(e[6]=g(" 邀请有礼 "))]),_:1}),a(k,{type:"primary",onClick:F},{icon:t(()=>[a(B(ue))]),default:t(()=>[e[7]||(e[7]=g(" 新增会员 "))]),_:1})]),_:1})])]),a(ne,{columns:T,"data-source":P.value,loading:r.value,pagination:_,onChange:E},{bodyCell:t(({column:o,record:b})=>[o.key==="accountList"?(p(),h("div",ye,[(p(!0),h(S,null,j(b.accountList,v=>(p(),h("div",null,[s("div",null,"账号："+O(v.account),1),s("div",he,[e[9]||(e[9]=s("span",{class:"label"},"主页：",-1)),s("a",{href:v.homeUrl,target:"_blank",class:"link-text"},O(v.homeUrl),9,ke),a(k,{type:"link",size:"small",onClick:Ne=>Y(v.homeUrl)},{default:t(()=>e[8]||(e[8]=[g(" 复制 ")])),_:2},1032,["onClick"])])]))),256))])):N("",!0),o.key==="groupName"?(p(),h(S,{key:1},[s("span",null,O(b.groupName),1),b.isGroupOwner?(p(),I(te,{key:0,color:"blue",style:{"margin-left":"10px"}},{default:t(()=>e[10]||(e[10]=[g("群主")])),_:1})):N("",!0)],64)):N("",!0),o.key==="action"?(p(),I(z,{key:2},{default:t(()=>[s("a",{onClick:v=>M(b)},"编辑",8,we),s("a",{onClick:v=>q(b)},"查看",8,Ce),a(ae,{title:"确定要删除吗？",onConfirm:v=>J(b)},{default:t(()=>e[11]||(e[11]=[s("a",{class:"danger"},"删除",-1)])),_:2},1032,["onConfirm"])]),_:2},1024)):N("",!0)]),_:1},8,["data-source","loading","pagination"])]),a(le,{open:c.value,"onUpdate:open":e[3]||(e[3]=o=>c.value=o),title:"邀请有礼配置",onOk:W,confirmLoading:m.value},{default:t(()=>[a(G,{"label-col":{span:6},"wrapper-col":{span:16}},{default:t(()=>[a(C,{label:"奖励金额",extra:"设置每成功邀请一位新会员的奖励金额"},{default:t(()=>[a(oe,{value:x.value,"onUpdate:value":e[2]||(e[2]=o=>x.value=o),min:0,precision:2,step:1,formatter:o=>`¥ ${o}`,parser:o=>o.replace("¥ ",""),style:{width:"100%"}},null,8,["value","formatter","parser"])]),_:1})]),_:1})]),_:1},8,["open","confirmLoading"])])}}},Se=se(Oe,[["__scopeId","data-v-ec637c90"]]);export{Se as default};
