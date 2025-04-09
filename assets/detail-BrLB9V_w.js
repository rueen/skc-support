import{_ as le,i as de,x as ie,j as ne,b as q,r as y,k as ue,c as p,e as a,d as c,w as t,f as b,t as s,F as I,n as w,p as m,s as k,l as R,m as f,g as oe,o as u,h as i,q as P,A as V}from"./index-CmSkOvrl.js";import{P as re}from"./PageHeader-CHJdny0t.js";import{_ as ce}from"./CopyContent-Dik8qGE8.js";import{G as me}from"./GroupOwner-ClflEnz0.js";const be={class:"task-audit-detail content-container"},ke={class:"detail-container"},pe={key:0},fe={key:1},_e={class:"detail-section"},Te={class:"section-title"},ve={key:0},he={class:"link-text-container"},$e=["href"],ge={class:"detail-section"},ye={class:"section-title"},Ie={class:"detail-section"},Ce={class:"section-title"},Se={class:"footer-btns"},Ae={class:"left"},je={class:"right"},we={__name:"detail",setup(Re){const C=de(),F=ie(),D=oe(),N=F.query.type,L=ne(()=>n.taskPreAuditStatus==="approved"?"confirm":"pre"),S=y(!1),E=y(!1),v=y(""),_=y(null),n=q({submitContent:{}}),r=q({}),T=q({}),B=async()=>{const e=L.value==="confirm"?"taskSubmitted.batchConfirmAuditApprove":"taskSubmitted.batchPreAuditApprove",o=await V(e,{ids:[_.value]});o.code===0?(f.success($t("submittedTasks.detail.resolveSuccess")),h()):f.error(o.message)},M=()=>{v.value="",S.value=!0},G=async()=>{if(!v.value){f.error($t("submittedTasks.detail.rejectReasonRequired"));return}E.value=!0;const e=L.value==="confirm"?"taskSubmitted.batchConfirmAuditReject":"taskSubmitted.batchPreAuditReject",o=await V(e,{ids:[_.value],reason:v.value});o.code===0?(f.success($t("submittedTasks.detail.rejectSuccess")),S.value=!1,h()):f.error(o.message)},z=()=>{D.push(`/submitted-tasks/detail/${n.prevTaskId}?type=${N}`),_.value=n.prevTaskId,h()},H=()=>{D.push(`/submitted-tasks/detail/${n.nextTaskId}?type=${N}`),_.value=n.nextTaskId,h()},Q=async e=>{try{const o=await R("task.detail",{},{urlParams:{id:e}});o.code===0?Object.assign(r,o.data):f.error(o.message)}catch{f.error($t("submittedTasks.detail.getTaskDetailFailed"))}},W=async e=>{try{const o=await R("member.detail",{},{urlParams:{id:e}});o.code===0?Object.assign(T,o.data):f.error(o.message)}catch{f.error($t("submittedTasks.detail.getMemberDetailFailed"))}},h=async()=>{try{const e=await R("taskSubmitted.detail",{auditType:N},{urlParams:{id:_.value}});e.code===0&&(Object.assign(n,e.data),e.data.taskId!=null&&await Q(e.data.taskId),e.data.memberId!=null&&await W(e.data.memberId),e.data.taskId!=null&&e.data.memberId!=null&&await J())}catch{f.error($t("submittedTasks.detail.getDetailFailed"))}},O=y([]),J=async()=>{const e=await R("account.list",{taskId:n.taskId,memberId:n.memberId,channelId:r.channelId});e.code===0&&(O.value=e.data.list||[])};return ue(async()=>{_.value=F.params.id,await h()}),(e,o)=>{const U=b("a-avatar"),$=b("a-space"),l=b("a-descriptions-item"),g=b("a-descriptions"),K=b("a-collapse-panel"),X=b("a-collapse"),Y=b("a-tag"),Z=b("a-image"),A=b("a-button"),x=b("a-textarea"),ee=b("a-modal");return u(),p("div",be,[a(re,{title:e.$t("submittedTasks.detail.title"),back:!0},null,8,["title"]),c("div",ke,[a(X,{ghost:"",class:"collapse"},{default:t(()=>[a(K,{header:e.$t("submittedTasks.detail.taskInfo")},{default:t(()=>[a(g,{column:2},{default:t(()=>[a(l,{label:e.$t("submittedTasks.detail.taskName")},{default:t(()=>[a($,null,{default:t(()=>[a(U,{src:r.channelIcon,size:"small"},null,8,["src"]),c("span",null,s(r.taskName),1)]),_:1})]),_:1},8,["label"]),a(l,{label:e.$t("submittedTasks.detail.category")},{default:t(()=>[i(s(r.category),1)]),_:1},8,["label"]),a(l,{label:e.$t("submittedTasks.detail.taskType")},{default:t(()=>[i(s(P(C).getEnumText("TaskType",r.taskType)),1)]),_:1},8,["label"]),a(l,{label:e.$t("submittedTasks.detail.reward")},{default:t(()=>[i(s(r.reward),1)]),_:1},8,["label"]),a(l,{label:e.$t("submittedTasks.detail.brand")},{default:t(()=>[i(s(r.brand),1)]),_:1},8,["label"]),a(l,{label:e.$t("submittedTasks.detail.specifyGroup")},{default:t(()=>{var d;return[r.groupMode===0?(u(),p("span",pe,s(e.$t("submittedTasks.detail.noSpecify")),1)):(u(),p("span",fe,s((d=r.groupNames)==null?void 0:d.join("、")),1))]}),_:1},8,["label"]),a(l,{label:e.$t("submittedTasks.detail.taskTime")},{default:t(()=>[i(s(r.startTime)+" "+s(e.$t("submittedTasks.detail.to"))+" "+s(r.endTime),1)]),_:1},8,["label"]),a(l,{label:e.$t("submittedTasks.detail.quota")},{default:t(()=>[i(s(r.unlimitedQuota?e.$t("submittedTasks.detail.noLimit"):r.quota),1)]),_:1},8,["label"]),a(l,{label:e.$t("submittedTasks.detail.fansRequired")},{default:t(()=>[i(s(r.fansRequired),1)]),_:1},8,["label"]),a(l,{label:e.$t("submittedTasks.detail.contentRequirement")},{default:t(()=>[i(s(r.contentRequirement),1)]),_:1},8,["label"]),a(l,{label:e.$t("submittedTasks.detail.taskInfo")},{default:t(()=>[i(s(r.taskInfo),1)]),_:1},8,["label"])]),_:1})]),_:1},8,["header"])]),_:1}),c("div",_e,[c("div",Te,s(e.$t("submittedTasks.detail.memberInfo")),1),a(g,{column:2},{default:t(()=>[a(l,{label:e.$t("submittedTasks.detail.memberNickname")},{default:t(()=>[i(s(T.nickname),1)]),_:1},8,["label"]),a(l,{label:e.$t("submittedTasks.detail.account")},{default:t(()=>[i(s(T.account),1)]),_:1},8,["label"]),a(l,{label:e.$t("submittedTasks.detail.group")},{default:t(()=>[(u(!0),p(I,null,w(T.groups,d=>(u(),m($,null,{default:t(()=>[c("span",null,s(d.groupName),1),d.isOwner?(u(),m(me,{key:0})):k("",!0)]),_:2},1024))),256)),!T.groups||T.groups.length===0?(u(),p("span",ve,"--")):k("",!0)]),_:1},8,["label"])]),_:1}),(u(!0),p(I,null,w(O.value,d=>(u(),p("div",{key:d.channelId},[a(g,{column:2},{default:t(()=>[a(l,{label:e.$t("submittedTasks.detail.account")},{default:t(()=>[a($,null,{default:t(()=>[a(U,{src:d.channelIcon,size:"small"},null,8,["src"]),c("span",null,s(d.account),1),a(Y,{color:"warning"},{default:t(()=>[i(s(P(C).getEnumText("AccountAuditStatus",d.accountAuditStatus)),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["label"]),a(l,{label:e.$t("submittedTasks.detail.homepage")},{default:t(()=>[a(ce,{content:d.homeUrl},{default:t(()=>[c("div",he,[c("a",{href:d.homeUrl,target:"_blank",class:"link-text"},s(d.homeUrl),9,$e)])]),_:2},1032,["content"])]),_:2},1032,["label"]),d.channelCustomFields.includes("fansCount")?(u(),m(l,{key:0,label:e.$t("submittedTasks.detail.fansCount")},{default:t(()=>[i(s(d.fansCount),1)]),_:2},1032,["label"])):k("",!0),d.channelCustomFields.includes("friendsCount")?(u(),m(l,{key:1,label:e.$t("submittedTasks.detail.friendsCount")},{default:t(()=>[i(s(d.friendsCount),1)]),_:2},1032,["label"])):k("",!0),d.channelCustomFields.includes("postsCount")?(u(),m(l,{key:2,label:e.$t("submittedTasks.detail.postsCount")},{default:t(()=>[i(s(d.postsCount),1)]),_:2},1032,["label"])):k("",!0)]),_:2},1024)]))),128))]),c("div",ge,[c("div",ye,s(e.$t("submittedTasks.detail.submitInfo")),1),a(g,{column:2},{default:t(()=>{var d;return[(u(!0),p(I,null,w((d=n==null?void 0:n.submitContent)==null?void 0:d.customFields,(j,te)=>(u(),m(l,{key:te,label:j.title},{default:t(()=>[j.type==="image"?(u(!0),p(I,{key:0},w(j.value,(ae,se)=>(u(),m(Z,{src:ae.url,width:60,key:se},null,8,["src"]))),128)):(u(),p(I,{key:1},[i(s(j.value),1)],64))]),_:2},1032,["label"]))),128))]}),_:1})]),c("div",Ie,[c("div",Ce,s(e.$t("submittedTasks.detail.auditInfo")),1),a(g,{column:2},{default:t(()=>[a(l,{label:e.$t("submittedTasks.detail.submitTime")},{default:t(()=>[i(s(n.submitTime),1)]),_:1},8,["label"]),a(l,{label:e.$t("submittedTasks.detail.preAuditStatus")},{default:t(()=>[i(s(P(C).getEnumText("TaskPreAuditStatus",n.taskPreAuditStatus)),1)]),_:1},8,["label"]),a(l,{label:e.$t("submittedTasks.detail.preAuditor")},{default:t(()=>[i(s(n.preWaiterName),1)]),_:1},8,["label"]),n.taskPreAuditStatus==="approved"?(u(),m(l,{key:0,label:e.$t("submittedTasks.detail.confirmAuditStatus")},{default:t(()=>[i(s(P(C).getEnumText("TaskAuditStatus",n.taskAuditStatus)),1)]),_:1},8,["label"])):k("",!0),n.taskPreAuditStatus==="approved"?(u(),m(l,{key:1,label:e.$t("submittedTasks.detail.confirmAuditor")},{default:t(()=>[i(s(n.waiterName),1)]),_:1},8,["label"])):k("",!0),n.auditStatus==="rejected"?(u(),m(l,{key:2,label:e.$t("submittedTasks.detail.rejectReason")},{default:t(()=>[i(s(n.rejectReason),1)]),_:1},8,["label"])):k("",!0)]),_:1})]),c("div",Se,[c("div",Ae,[n.auditStatus==="pending"?(u(),m($,{key:0},{default:t(()=>[a(A,{type:"primary",onClick:B},{default:t(()=>[i(s(e.$t("submittedTasks.detail.approve")),1)]),_:1}),a(A,{danger:"",onClick:M},{default:t(()=>[i(s(e.$t("submittedTasks.detail.reject")),1)]),_:1})]),_:1})):k("",!0)]),c("div",je,[a($,null,{default:t(()=>[n.prevTaskId&&n.prevTaskId!==n.nextTaskId?(u(),m(A,{key:0,onClick:z},{default:t(()=>[i(s(e.$t("submittedTasks.detail.prev")),1)]),_:1})):k("",!0),n.nextTaskId?(u(),m(A,{key:1,onClick:H},{default:t(()=>[i(s(e.$t("submittedTasks.detail.next")),1)]),_:1})):k("",!0)]),_:1})])])]),a(ee,{open:S.value,"onUpdate:open":o[1]||(o[1]=d=>S.value=d),title:e.$t("submittedTasks.detail.rejectReason"),onOk:G,confirmLoading:E.value},{default:t(()=>[a(x,{value:v.value,"onUpdate:value":o[0]||(o[0]=d=>v.value=d),placeholder:e.$t("submittedTasks.detail.rejectReasonPlaceholder"),rows:4},null,8,["value","placeholder"])]),_:1},8,["open","title","confirmLoading"])])}}},De=le(we,[["__scopeId","data-v-5026adc2"]]);export{De as default};
