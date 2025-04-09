import{_ as le,i as de,x as ie,j as ne,b as q,r as $,k as ue,c as b,e as a,d as c,w as t,f as k,t as s,F as y,n as w,p as m,s as p,l as R,m as f,g as oe,o as u,h as l,q as P,A as B}from"./index-GthWQd0a.js";import{P as re}from"./PageHeader-Dc3RFNAG.js";import{_ as ce}from"./CopyContent-BBZjKkjV.js";const me={class:"task-audit-detail content-container"},be={class:"detail-container"},ke={key:0},pe={key:1},fe={class:"detail-section"},_e={class:"section-title"},Te={key:0},ve={class:"link-text-container"},ge=["href"],he={class:"detail-section"},$e={class:"section-title"},ye={class:"detail-section"},Ie={class:"section-title"},Ce={class:"footer-btns"},Se={class:"left"},Ae={class:"right"},je={__name:"detail",setup(we){const I=de(),F=ie(),D=oe(),N=F.query.type,L=ne(()=>n.taskPreAuditStatus==="approved"?"confirm":"pre"),C=$(!1),E=$(!1),v=$(""),_=$(null),n=q({submitContent:{}}),r=q({}),T=q({}),M=async()=>{const e=L.value==="confirm"?"taskSubmitted.batchConfirmAuditApprove":"taskSubmitted.batchPreAuditApprove",o=await B(e,{ids:[_.value]});o.code===0?(f.success($t("submittedTasks.detail.resolveSuccess")),g()):f.error(o.message)},z=()=>{v.value="",C.value=!0},G=async()=>{if(!v.value){f.error($t("submittedTasks.detail.rejectReasonRequired"));return}E.value=!0;const e=L.value==="confirm"?"taskSubmitted.batchConfirmAuditReject":"taskSubmitted.batchPreAuditReject",o=await B(e,{ids:[_.value],reason:v.value});o.code===0?(f.success($t("submittedTasks.detail.rejectSuccess")),C.value=!1,g()):f.error(o.message)},H=()=>{D.push(`/submitted-tasks/detail/${n.prevTaskId}?type=${N}`),_.value=n.prevTaskId,g()},Q=()=>{D.push(`/submitted-tasks/detail/${n.nextTaskId}?type=${N}`),_.value=n.nextTaskId,g()},W=async e=>{try{const o=await R("task.detail",{},{urlParams:{id:e}});o.code===0?Object.assign(r,o.data):f.error(o.message)}catch{f.error($t("submittedTasks.detail.getTaskDetailFailed"))}},J=async e=>{try{const o=await R("member.detail",{},{urlParams:{id:e}});o.code===0?Object.assign(T,o.data):f.error(o.message)}catch{f.error($t("submittedTasks.detail.getMemberDetailFailed"))}},g=async()=>{try{const e=await R("taskSubmitted.detail",{auditType:N},{urlParams:{id:_.value}});e.code===0&&(Object.assign(n,e.data),e.data.taskId!=null&&await W(e.data.taskId),e.data.memberId!=null&&await J(e.data.memberId),e.data.taskId!=null&&e.data.memberId!=null&&await K())}catch{f.error($t("submittedTasks.detail.getDetailFailed"))}},O=$([]),K=async()=>{const e=await R("account.list",{taskId:n.taskId,memberId:n.memberId,channelId:r.channelId});e.code===0&&(O.value=e.data.list||[])};return ue(async()=>{_.value=F.params.id,await g()}),(e,o)=>{const U=k("a-avatar"),S=k("a-space"),d=k("a-descriptions-item"),h=k("a-descriptions"),X=k("a-collapse-panel"),Y=k("a-collapse"),V=k("a-tag"),Z=k("a-image"),A=k("a-button"),x=k("a-textarea"),ee=k("a-modal");return u(),b("div",me,[a(re,{title:e.$t("submittedTasks.detail.title"),back:!0},null,8,["title"]),c("div",be,[a(Y,{ghost:"",class:"collapse"},{default:t(()=>[a(X,{header:e.$t("submittedTasks.detail.taskInfo")},{default:t(()=>[a(h,{column:2},{default:t(()=>[a(d,{label:e.$t("submittedTasks.detail.taskName")},{default:t(()=>[a(S,null,{default:t(()=>[a(U,{src:r.channelIcon,size:"small"},null,8,["src"]),c("span",null,s(r.taskName),1)]),_:1})]),_:1},8,["label"]),a(d,{label:e.$t("submittedTasks.detail.category")},{default:t(()=>[l(s(r.category),1)]),_:1},8,["label"]),a(d,{label:e.$t("submittedTasks.detail.taskType")},{default:t(()=>[l(s(P(I).getEnumText("TaskType",r.taskType)),1)]),_:1},8,["label"]),a(d,{label:e.$t("submittedTasks.detail.reward")},{default:t(()=>[l(s(r.reward),1)]),_:1},8,["label"]),a(d,{label:e.$t("submittedTasks.detail.brand")},{default:t(()=>[l(s(r.brand),1)]),_:1},8,["label"]),a(d,{label:e.$t("submittedTasks.detail.specifyGroup")},{default:t(()=>{var i;return[r.groupMode===0?(u(),b("span",ke,s(e.$t("submittedTasks.detail.noSpecify")),1)):(u(),b("span",pe,s((i=r.groupNames)==null?void 0:i.join("、")),1))]}),_:1},8,["label"]),a(d,{label:e.$t("submittedTasks.detail.taskTime")},{default:t(()=>[l(s(r.startTime)+" "+s(e.$t("submittedTasks.detail.to"))+" "+s(r.endTime),1)]),_:1},8,["label"]),a(d,{label:e.$t("submittedTasks.detail.quota")},{default:t(()=>[l(s(r.unlimitedQuota?e.$t("submittedTasks.detail.noLimit"):r.quota),1)]),_:1},8,["label"]),a(d,{label:e.$t("submittedTasks.detail.fansRequired")},{default:t(()=>[l(s(r.fansRequired),1)]),_:1},8,["label"]),a(d,{label:e.$t("submittedTasks.detail.contentRequirement")},{default:t(()=>[l(s(r.contentRequirement),1)]),_:1},8,["label"]),a(d,{label:e.$t("submittedTasks.detail.taskInfo")},{default:t(()=>[l(s(r.taskInfo),1)]),_:1},8,["label"])]),_:1})]),_:1},8,["header"])]),_:1}),c("div",fe,[c("div",_e,s(e.$t("submittedTasks.detail.memberInfo")),1),a(h,{column:2},{default:t(()=>[a(d,{label:e.$t("submittedTasks.detail.memberNickname")},{default:t(()=>[l(s(T.nickname),1)]),_:1},8,["label"]),a(d,{label:e.$t("submittedTasks.detail.account")},{default:t(()=>[l(s(T.account),1)]),_:1},8,["label"]),a(d,{label:e.$t("submittedTasks.detail.group")},{default:t(()=>[(u(!0),b(y,null,w(T.groups,i=>(u(),b("div",null,[c("span",null,s(i.groupName),1),i.isOwner?(u(),m(V,{key:0,color:"blue",style:{"margin-left":"10px"}},{default:t(()=>o[2]||(o[2]=[l("群主")])),_:1})):p("",!0)]))),256)),!T.groups||T.groups.length===0?(u(),b("span",Te,"--")):p("",!0)]),_:1},8,["label"])]),_:1}),(u(!0),b(y,null,w(O.value,i=>(u(),b("div",{key:i.channelId},[a(h,{column:2},{default:t(()=>[a(d,{label:e.$t("submittedTasks.detail.account")},{default:t(()=>[a(S,null,{default:t(()=>[a(U,{src:i.channelIcon,size:"small"},null,8,["src"]),c("span",null,s(i.account),1),a(V,{color:"warning"},{default:t(()=>[l(s(P(I).getEnumText("AccountAuditStatus",i.accountAuditStatus)),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["label"]),a(d,{label:e.$t("submittedTasks.detail.homepage")},{default:t(()=>[a(ce,{content:i.homeUrl},{default:t(()=>[c("div",ve,[c("a",{href:i.homeUrl,target:"_blank",class:"link-text"},s(i.homeUrl),9,ge)])]),_:2},1032,["content"])]),_:2},1032,["label"]),i.channelCustomFields.includes("fansCount")?(u(),m(d,{key:0,label:e.$t("submittedTasks.detail.fansCount")},{default:t(()=>[l(s(i.fansCount),1)]),_:2},1032,["label"])):p("",!0),i.channelCustomFields.includes("friendsCount")?(u(),m(d,{key:1,label:e.$t("submittedTasks.detail.friendsCount")},{default:t(()=>[l(s(i.friendsCount),1)]),_:2},1032,["label"])):p("",!0),i.channelCustomFields.includes("postsCount")?(u(),m(d,{key:2,label:e.$t("submittedTasks.detail.postsCount")},{default:t(()=>[l(s(i.postsCount),1)]),_:2},1032,["label"])):p("",!0)]),_:2},1024)]))),128))]),c("div",he,[c("div",$e,s(e.$t("submittedTasks.detail.submitInfo")),1),a(h,{column:2},{default:t(()=>{var i;return[(u(!0),b(y,null,w((i=n==null?void 0:n.submitContent)==null?void 0:i.customFields,(j,te)=>(u(),m(d,{key:te,label:j.title},{default:t(()=>[j.type==="image"?(u(!0),b(y,{key:0},w(j.value,(ae,se)=>(u(),m(Z,{src:ae.url,width:60,key:se},null,8,["src"]))),128)):(u(),b(y,{key:1},[l(s(j.value),1)],64))]),_:2},1032,["label"]))),128))]}),_:1})]),c("div",ye,[c("div",Ie,s(e.$t("submittedTasks.detail.auditInfo")),1),a(h,{column:2},{default:t(()=>[a(d,{label:e.$t("submittedTasks.detail.submitTime")},{default:t(()=>[l(s(n.submitTime),1)]),_:1},8,["label"]),a(d,{label:e.$t("submittedTasks.detail.preAuditStatus")},{default:t(()=>[l(s(P(I).getEnumText("TaskPreAuditStatus",n.taskPreAuditStatus)),1)]),_:1},8,["label"]),a(d,{label:e.$t("submittedTasks.detail.preAuditor")},{default:t(()=>[l(s(n.preWaiterName),1)]),_:1},8,["label"]),n.taskPreAuditStatus==="approved"?(u(),m(d,{key:0,label:e.$t("submittedTasks.detail.confirmAuditStatus")},{default:t(()=>[l(s(P(I).getEnumText("TaskAuditStatus",n.taskAuditStatus)),1)]),_:1},8,["label"])):p("",!0),n.taskPreAuditStatus==="approved"?(u(),m(d,{key:1,label:e.$t("submittedTasks.detail.confirmAuditor")},{default:t(()=>[l(s(n.waiterName),1)]),_:1},8,["label"])):p("",!0),n.auditStatus==="rejected"?(u(),m(d,{key:2,label:e.$t("submittedTasks.detail.rejectReason")},{default:t(()=>[l(s(n.rejectReason),1)]),_:1},8,["label"])):p("",!0)]),_:1})]),c("div",Ce,[c("div",Se,[n.auditStatus==="pending"?(u(),m(S,{key:0},{default:t(()=>[a(A,{type:"primary",onClick:M},{default:t(()=>[l(s(e.$t("submittedTasks.detail.approve")),1)]),_:1}),a(A,{danger:"",onClick:z},{default:t(()=>[l(s(e.$t("submittedTasks.detail.reject")),1)]),_:1})]),_:1})):p("",!0)]),c("div",Ae,[a(S,null,{default:t(()=>[n.prevTaskId&&n.prevTaskId!==n.nextTaskId?(u(),m(A,{key:0,onClick:H},{default:t(()=>[l(s(e.$t("submittedTasks.detail.prev")),1)]),_:1})):p("",!0),n.nextTaskId?(u(),m(A,{key:1,onClick:Q},{default:t(()=>[l(s(e.$t("submittedTasks.detail.next")),1)]),_:1})):p("",!0)]),_:1})])])]),a(ee,{open:C.value,"onUpdate:open":o[1]||(o[1]=i=>C.value=i),title:e.$t("submittedTasks.detail.rejectReason"),onOk:G,confirmLoading:E.value},{default:t(()=>[a(x,{value:v.value,"onUpdate:value":o[0]||(o[0]=i=>v.value=i),placeholder:e.$t("submittedTasks.detail.rejectReasonPlaceholder"),rows:4},null,8,["value","placeholder"])]),_:1},8,["open","title","confirmLoading"])])}}},qe=le(je,[["__scopeId","data-v-5cb55d73"]]);export{qe as default};
