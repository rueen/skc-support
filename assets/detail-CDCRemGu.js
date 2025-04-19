import{_ as q,r as i,b as D,j as F,x as G,c as H,k as J,d as A,f as r,e as K,w as o,g as m,l as P,m as d,h as Q,o as u,F as U,n as B,p as C,i as v,t as g,z as W,A as X}from"./index-BHj_wI8R.js";import{P as Y}from"./PageHeader-DT7Ragp0.js";const x={class:"member-form content-container"},ee={class:"form-container"},ae={__name:"detail",setup(te){const _=G(),k=Q(),N=i(),{t:S}=D(),c=F(()=>!!_.params.id),l=H({memberNickname:"",memberAccount:"",password:"",groupIds:[],inviterId:void 0}),h={memberAccount:[{required:!0,message:S("member.detail.memberAccountPlaceholder")},{validator:(e,a)=>{const s=/^9[0-9]{9}$/,n=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;return!a||s.test(a)||n.test(a)?Promise.resolve():Promise.reject(S("member.detail.memberAccountRule"))}}]},w=i(!1),p=i([]),y=i(!1),R=i([]),I=async(e="",a=null)=>{w.value=!0;try{const s=await P("group.list",{page:1,pageSize:50,groupName:e,memberId:a});s.code===0&&(p.value=s.data.list||[],l.groupIds.some(b=>p.value.some(f=>f.id===b))||(l.groupIds=[]))}finally{w.value=!1}},E=e=>{p.value=[],I()},z=async(e="")=>{y.value=!0;try{const a=await P("member.list",{page:1,pageSize:50,memberNickname:e});a.code===0&&(R.value=a.data.list||[])}finally{y.value=!1}},L=async()=>{if(c.value)try{const e=await P("member.detail",{},{urlParams:{id:_.params.id}});if(e.code===0){const a=e.data;Object.assign(l,{memberNickname:a.nickname,memberAccount:a.account,groupIds:a.groups.map(s=>s.groupId),inviterId:a.inviterId})}}catch{d.error("load member info failed"),k.back()}},M=async()=>{const e=await X("member.add",l);e.code===0?(d.success(e.message),k.back()):d.error(e.message)},j=async()=>{const e=await W("member.edit",l,{urlParams:{id:_.params.id}});e.code===0?(d.success(e.message),k.back()):d.error(e.message)},$=i(!1),T=()=>{N.value.validate().then(async()=>{try{$.value=!0,c.value?j():M()}catch{d.error("submit failed")}finally{$.value=!1}})};return J(async()=>{await L(),await z(),await I()}),(e,a)=>{const s=m("a-input"),n=m("a-form-item"),b=m("a-select-option"),f=m("a-select"),O=m("a-button"),V=m("a-space"),Z=m("a-form");return u(),A("div",x,[r(Y,{title:c.value?e.$t("member.detail.editTitle"):e.$t("member.detail.addTitle"),back:!0},null,8,["title"]),K("div",ee,[r(Z,{ref_key:"formRef",ref:N,model:l,rules:h,"label-col":{span:6},"wrapper-col":{span:16}},{default:o(()=>[r(n,{label:e.$t("member.detail.memberAccount"),name:"memberAccount",rules:h.memberAccount},{default:o(()=>[r(s,{value:l.memberAccount,"onUpdate:value":a[0]||(a[0]=t=>l.memberAccount=t),placeholder:e.$t("member.detail.memberAccountPlaceholder")},null,8,["value","placeholder"])]),_:1},8,["label","rules"]),r(n,{label:e.$t("member.detail.password"),name:"password",rules:[{required:!c.value,message:e.$t("member.detail.passwordPlaceholder")}]},{default:o(()=>[r(s,{value:l.password,"onUpdate:value":a[1]||(a[1]=t=>l.password=t),placeholder:e.$t("member.detail.passwordPlaceholder")},null,8,["value","placeholder"])]),_:1},8,["label","rules"]),r(n,{label:e.$t("member.detail.memberNickname"),name:"memberNickname",rules:h.memberNickname},{default:o(()=>[r(s,{value:l.memberNickname,"onUpdate:value":a[2]||(a[2]=t=>l.memberNickname=t),placeholder:e.$t("member.detail.memberNicknamePlaceholder")},null,8,["value","placeholder"])]),_:1},8,["label","rules"]),r(n,{label:e.$t("member.detail.inviter"),name:"inviterId"},{default:o(()=>[r(f,{value:l.inviterId,"onUpdate:value":a[3]||(a[3]=t=>l.inviterId=t),placeholder:e.$t("member.detail.inviterPlaceholder"),loading:y.value,"show-search":"","allow-clear":"","filter-option":!1,onSearch:z,onSelect:E},{default:o(()=>[(u(!0),A(U,null,B(R.value,t=>(u(),C(b,{key:t.id,value:t.id},{default:o(()=>[v(g(t.nickname),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value","placeholder","loading"])]),_:1},8,["label"]),r(n,{label:e.$t("member.detail.group"),name:"groupIds"},{default:o(()=>[r(f,{value:l.groupIds,"onUpdate:value":a[4]||(a[4]=t=>l.groupIds=t),placeholder:e.$t("member.detail.groupPlaceholder"),loading:w.value,mode:"multiple","allow-clear":"","show-search":"","filter-option":!1,onSearch:I},{default:o(()=>[(u(!0),A(U,null,B(p.value,t=>(u(),C(b,{key:t.id,value:t.id},{default:o(()=>[v(g(t.groupName),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value","placeholder","loading"])]),_:1},8,["label"]),r(n,{"wrapper-col":{offset:4}},{default:o(()=>[r(V,null,{default:o(()=>[r(O,{type:"primary",loading:$.value,onClick:T},{default:o(()=>[v(g(e.$t("common.submit")),1)]),_:1},8,["loading"]),r(O,{onClick:a[5]||(a[5]=t=>e.$router.back())},{default:o(()=>[v(g(e.$t("common.cancel")),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["model"])])])}}},oe=q(ae,[["__scopeId","data-v-34dcb3d8"]]);export{oe as default};
