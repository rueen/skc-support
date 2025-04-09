import{_ as X,i as Y,a as Z,r as C,b as B,x as ee,j as te,k as ae,c as u,d as r,e as a,w as t,f as c,l as D,m as v,g as ne,o as s,F as g,n as S,p as I,h as d,t as n,s as b,q as oe,v as se}from"./index-D9O2bI05.js";import{_ as le}from"./CopyContent-Bu5npXlr.js";const re={class:"member-list content-container"},ie={class:"table-container"},ce={class:"table-header"},ue={class:"left"},me={class:"right"},de={key:0,style:{display:"inline-block"}},pe={class:"link-text-container"},_e={class:"label"},he=["href"],be={key:0},ge=["onClick"],fe=["onClick"],ke={class:"danger"},ve={__name:"list",setup(ye){const E=Y(),{t:p}=Z(),y=ne(),L=ee(),$=C(!1),_=B({memberNickname:"",groupId:L.query.groupId}),z=C([]),h=B({current:1,pageSize:10,total:0}),T=C([]),O=te(()=>[{title:p("member.list.memberNickname"),dataIndex:"nickname",key:"nickname"},{title:p("member.list.memberAccount"),dataIndex:"account",key:"account"},{title:p("member.list.accounts"),key:"accountList"},{title:p("member.list.inviter"),key:"inviterNickname"},{title:p("member.list.group"),key:"groups"},{title:p("member.list.updateTime"),dataIndex:"updateTime",key:"updateTime",width:180},{title:p("member.list.action"),key:"action",fixed:"right",width:150}]),A=()=>{h.current=1,f()},F=()=>{Object.assign(_,{memberNickname:"",groupId:void 0}),A()},P=e=>{h.current=e.current,h.pageSize=e.pageSize,f()},R=()=>{y.push("/member/create")},j=e=>{y.push(`/member/edit/${e.id}`)},q=e=>{y.push(`/member/view/${e.id}`)},x=async e=>{const o=await se("member.delete",{},{urlParams:{id:e.id}});o.code===0?(v.success("删除成功"),f()):v.error(o.message)},f=async()=>{$.value=!0;try{const e=await D("member.list",{page:h.current,pageSize:h.pageSize,..._});e.code===0?(z.value=e.data.list,h.total=e.data.total):v.error(e.message)}finally{$.value=!1}},U=async(e="")=>{try{const o=await D("group.list",{page:1,pageSize:50,groupName:e});o.code===0&&(T.value=o.data.list||[])}catch{v.error("获取群组列表失败")}};return ae(()=>{f(),U()}),(e,o)=>{const G=c("a-input"),N=c("a-form-item"),M=c("a-select-option"),H=c("a-select"),w=c("a-button"),k=c("a-space"),J=c("a-form"),K=c("plus-outlined"),V=c("a-tag"),Q=c("a-popconfirm"),W=c("a-table");return s(),u("div",re,[r("div",ie,[r("div",ce,[r("div",ue,[a(J,{layout:"inline",model:_},{default:t(()=>[a(N,{label:e.$t("member.search.memberNickname")},{default:t(()=>[a(G,{value:_.memberNickname,"onUpdate:value":o[0]||(o[0]=l=>_.memberNickname=l),placeholder:e.$t("member.search.memberNicknamePlaceholder"),"allow-clear":""},null,8,["value","placeholder"])]),_:1},8,["label"]),a(N,{label:e.$t("member.search.group")},{default:t(()=>[a(H,{value:_.groupId,"onUpdate:value":o[1]||(o[1]=l=>_.groupId=l),placeholder:e.$t("member.search.groupPlaceholder"),"allow-clear":"","show-search":"","filter-option":!1,onSearch:U,style:{width:"200px"}},{default:t(()=>[(s(!0),u(g,null,S(T.value,l=>(s(),I(M,{key:l.id,value:l.id},{default:t(()=>[d(n(l.groupName),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value","placeholder"])]),_:1},8,["label"]),a(N,null,{default:t(()=>[a(k,null,{default:t(()=>[a(w,{type:"primary",onClick:A},{default:t(()=>[d(n(e.$t("common.search")),1)]),_:1}),a(w,{onClick:F},{default:t(()=>[d(n(e.$t("common.reset")),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["model"])]),r("div",me,[a(k,null,{default:t(()=>[a(w,{type:"primary",onClick:R},{icon:t(()=>[a(K)]),default:t(()=>[d(" "+n(e.$t("member.list.add")),1)]),_:1})]),_:1})])]),a(W,{columns:O.value,"data-source":z.value,loading:$.value,pagination:h,onChange:P},{bodyCell:t(({column:l,record:m})=>[l.key==="accountList"?(s(),u("div",de,[(s(!0),u(g,null,S(m.accountList,i=>(s(),u("div",null,[r("div",null,[a(k,null,{default:t(()=>[d(n(e.$t("member.list.account"))+"："+n(i.account)+" ",1),a(V,{color:"warning"},{default:t(()=>[d(n(oe(E).getEnumText("AccountAuditStatus",i.accountAuditStatus)),1)]),_:2},1024)]),_:2},1024)]),r("div",pe,[r("span",_e,n(e.$t("member.list.homepage"))+"：",1),a(le,{content:i.homeUrl},{default:t(()=>[r("a",{href:i.homeUrl,target:"_blank",class:"link-text"},n(i.homeUrl),9,he)]),_:2},1032,["content"])])]))),256))])):b("",!0),l.key==="inviterNickname"?(s(),u(g,{key:1},[d(n(m.inviterNickname||"--"),1)],64)):b("",!0),l.key==="groups"?(s(),u(g,{key:2},[(s(!0),u(g,null,S(m.groups,i=>(s(),u("div",null,[r("span",null,n(i.groupName),1),i.isOwner?(s(),I(V,{key:0,color:"blue",style:{"margin-left":"10px"}},{default:t(()=>o[2]||(o[2]=[d("群主")])),_:1})):b("",!0)]))),256)),!m.groups||m.groups.length===0?(s(),u("span",be,"--")):b("",!0)],64)):b("",!0),l.key==="action"?(s(),I(k,{key:3},{default:t(()=>[r("a",{onClick:i=>j(m)},n(e.$t("member.list.edit")),9,ge),r("a",{onClick:i=>q(m)},n(e.$t("member.list.view")),9,fe),a(Q,{title:e.$t("member.list.deleteConfirm"),onConfirm:i=>x(m)},{default:t(()=>[r("a",ke,n(e.$t("member.list.delete")),1)]),_:2},1032,["title","onConfirm"])]),_:2},1024)):b("",!0)]),_:1},8,["columns","data-source","loading","pagination"])])])}}},we=X(ve,[["__scopeId","data-v-a5a96646"]]);export{we as default};
