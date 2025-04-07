import{_ as le,i as ne,v as oe,j as ue,a as E,r as C,k as re,b as _,c as a,d as c,w as e,e as p,F as S,n as j,p as m,q as f,l as P,m as k,f as de,o as r,t as s,h as l,g as R,z}from"./index-DfdbcBxU.js";import{P as ie}from"./PageHeader-Dxc7uqpX.js";const ce={class:"task-audit-detail content-container"},me={class:"detail-container"},_e={key:0},pe={key:1},fe={class:"detail-section"},ke={key:0},be={class:"link-text-container"},ve=["href"],ye={class:"detail-section"},ge={class:"detail-section"},he={class:"footer-btns"},Ie={class:"left"},Te={class:"right"},Ce={__name:"detail",setup(Se){const w=ne(),F=oe(),L=de(),N=F.query.type,q=ue(()=>u.taskPreAuditStatus==="approved"?"confirm":"pre"),x=C(!1),O=C(!1),y=C(""),b=C(null),u=E({submitContent:{}}),i=E({}),v=E({}),B=async()=>{const d=q.value==="confirm"?"taskSubmitted.batchConfirmAuditApprove":"taskSubmitted.batchPreAuditApprove",t=await z(d,{ids:[b.value]});t.code===0?(k.success("审核通过成功"),g()):k.error(t.message)},D=()=>{y.value="",x.value=!0},M=async()=>{if(!y.value){k.error("请输入拒绝原因");return}O.value=!0;const d=q.value==="confirm"?"taskSubmitted.batchConfirmAuditReject":"taskSubmitted.batchPreAuditReject",t=await z(d,{ids:[b.value],reason:y.value});t.code===0?(k.success("审核拒绝成功"),x.value=!1,g()):k.error(t.message)},H=()=>{L.push(`/submitted-tasks/detail/${u.prevTaskId}?type=${N}`),b.value=u.prevTaskId,g()},Q=()=>{L.push(`/submitted-tasks/detail/${u.nextTaskId}?type=${N}`),b.value=u.nextTaskId,g()},W=async d=>{try{const t=await P("task.detail",{},{urlParams:{id:d}});t.code===0?Object.assign(i,t.data):k.error(t.message)}catch{k.error("获取任务详情失败")}},G=async d=>{try{const t=await P("member.detail",{},{urlParams:{id:d}});t.code===0?Object.assign(v,t.data):k.error(t.message)}catch{k.error("获取会员详情失败")}},g=async()=>{try{const d=await P("taskSubmitted.detail",{auditType:N},{urlParams:{id:b.value}});d.code===0&&(Object.assign(u,d.data),d.data.taskId!=null&&await W(d.data.taskId),d.data.memberId!=null&&await G(d.data.memberId),d.data.taskId!=null&&d.data.memberId!=null&&await J())}catch{k.error("获取详情失败")}},U=C([]),J=async()=>{const d=await P("account.list",{taskId:u.taskId,memberId:u.memberId,channelId:i.channelId});d.code===0&&(U.value=d.data.list||[])};return re(async()=>{b.value=F.params.id,await g()}),(d,t)=>{const V=p("a-avatar"),A=p("a-space"),n=p("a-descriptions-item"),h=p("a-descriptions"),K=p("a-collapse-panel"),X=p("a-collapse"),$=p("a-tag"),I=p("a-button"),Y=p("a-image"),Z=p("a-textarea"),ee=p("a-modal");return r(),_("div",ce,[a(ie,{title:"任务审核详情",back:!0}),c("div",me,[a(X,{ghost:"",class:"collapse"},{default:e(()=>[a(K,{header:"任务信息"},{default:e(()=>[a(h,{column:2},{default:e(()=>[a(n,{label:"任务名称"},{default:e(()=>[a(A,null,{default:e(()=>[a(V,{src:i.channelIcon,size:"small"},null,8,["src"]),c("span",null,s(i.taskName),1)]),_:1})]),_:1}),a(n,{label:"达人领域"},{default:e(()=>[l(s(i.category),1)]),_:1}),a(n,{label:"任务类型"},{default:e(()=>[l(s(R(w).getEnumText("TaskType",i.taskType)),1)]),_:1}),a(n,{label:"任务奖励"},{default:e(()=>[l(s(i.reward)+" 元",1)]),_:1}),a(n,{label:"品牌"},{default:e(()=>[l(s(i.brand),1)]),_:1}),a(n,{label:"指定群组"},{default:e(()=>{var o;return[i.groupMode===0?(r(),_("span",_e,"不指定")):(r(),_("span",pe,s((o=i.groupNames)==null?void 0:o.join("、")),1))]}),_:1}),a(n,{label:"任务时间"},{default:e(()=>[l(s(i.startTime)+" 至 "+s(i.endTime),1)]),_:1}),a(n,{label:"任务名额"},{default:e(()=>[l(s(i.unlimitedQuota?"不限制":i.quota),1)]),_:1}),a(n,{label:"粉丝要求"},{default:e(()=>[l(s(i.fansRequired)+" 粉丝",1)]),_:1}),a(n,{label:"作品要求"},{default:e(()=>[l(s(i.contentRequirement),1)]),_:1}),a(n,{label:"任务信息"},{default:e(()=>[l(s(i.taskInfo),1)]),_:1})]),_:1})]),_:1})]),_:1}),c("div",fe,[t[4]||(t[4]=c("div",{class:"section-title"},"会员信息",-1)),a(h,{column:2},{default:e(()=>[a(n,{label:"会员昵称"},{default:e(()=>[l(s(v.nickname),1)]),_:1}),a(n,{label:"账号"},{default:e(()=>[l(s(v.account),1)]),_:1}),a(n,{label:"所属群"},{default:e(()=>[(r(!0),_(S,null,j(v.groups,o=>(r(),_("div",null,[c("span",null,s(o.groupName),1),o.isOwner?(r(),m($,{key:0,color:"blue",style:{"margin-left":"10px"}},{default:e(()=>t[2]||(t[2]=[l("群主")])),_:1})):f("",!0)]))),256)),!v.groups||v.groups.length===0?(r(),_("span",ke,"--")):f("",!0)]),_:1})]),_:1}),(r(!0),_(S,null,j(U.value,o=>(r(),_("div",{key:o.channelId},[a(h,{column:2},{default:e(()=>[a(n,{label:"账号"},{default:e(()=>[a(A,null,{default:e(()=>[a(V,{src:o.channelIcon,size:"small"},null,8,["src"]),c("span",null,s(o.account),1),a($,{color:"warning"},{default:e(()=>[l(s(R(w).getEnumText("AccountAuditStatus",o.accountAuditStatus)),1)]),_:2},1024)]),_:2},1024)]),_:2},1024),a(n,{label:"主页"},{default:e(()=>[c("div",be,[c("a",{href:o.homeUrl,target:"_blank",class:"link-text"},s(o.homeUrl),9,ve),a(I,{type:"link",size:"small",onClick:T=>d.handleCopy(o.homeUrl)},{default:e(()=>t[3]||(t[3]=[l(" 复制 ")])),_:2},1032,["onClick"])])]),_:2},1024),o.channelCustomFields.includes("fansCount")?(r(),m(n,{key:0,label:"粉丝数"},{default:e(()=>[l(s(o.fansCount),1)]),_:2},1024)):f("",!0),o.channelCustomFields.includes("friendsCount")?(r(),m(n,{key:1,label:"好友数"},{default:e(()=>[l(s(o.friendsCount),1)]),_:2},1024)):f("",!0),o.channelCustomFields.includes("postsCount")?(r(),m(n,{key:2,label:"发帖数"},{default:e(()=>[l(s(o.postsCount),1)]),_:2},1024)):f("",!0)]),_:2},1024)]))),128))]),c("div",ye,[t[5]||(t[5]=c("div",{class:"section-title"},"提交信息",-1)),a(h,{column:2},{default:e(()=>{var o;return[(r(!0),_(S,null,j((o=u==null?void 0:u.submitContent)==null?void 0:o.customFields,(T,te)=>(r(),m(n,{key:te,label:T.title},{default:e(()=>[T.type==="image"?(r(!0),_(S,{key:0},j(T.value,(ae,se)=>(r(),m(Y,{src:ae.url,width:60,key:se},null,8,["src"]))),128)):(r(),_(S,{key:1},[l(s(T.value),1)],64))]),_:2},1032,["label"]))),128))]}),_:1})]),c("div",ge,[t[6]||(t[6]=c("div",{class:"section-title"},"审核信息",-1)),a(h,{column:2},{default:e(()=>[a(n,{label:"提交时间"},{default:e(()=>[l(s(u.submitTime),1)]),_:1}),a(n,{label:"初审状态"},{default:e(()=>[l(s(R(w).getEnumText("TaskPreAuditStatus",u.taskPreAuditStatus)),1)]),_:1}),a(n,{label:"初审员"},{default:e(()=>[l(s(u.preWaiterName),1)]),_:1}),u.taskPreAuditStatus==="approved"?(r(),m(n,{key:0,label:"复审状态"},{default:e(()=>[l(s(R(w).getEnumText("TaskAuditStatus",u.taskAuditStatus)),1)]),_:1})):f("",!0),u.taskPreAuditStatus==="approved"?(r(),m(n,{key:1,label:"复审员"},{default:e(()=>[l(s(u.waiterName),1)]),_:1})):f("",!0),u.auditStatus==="rejected"?(r(),m(n,{key:2,label:"拒绝原因"},{default:e(()=>[l(s(u.rejectReason),1)]),_:1})):f("",!0)]),_:1})]),c("div",he,[c("div",Ie,[u.auditStatus==="pending"?(r(),m(A,{key:0},{default:e(()=>[a(I,{type:"primary",onClick:B},{default:e(()=>t[7]||(t[7]=[l(" 审核通过 ")])),_:1}),a(I,{danger:"",onClick:D},{default:e(()=>t[8]||(t[8]=[l(" 审核拒绝 ")])),_:1})]),_:1})):f("",!0)]),c("div",Te,[a(A,null,{default:e(()=>[u.prevTaskId&&u.prevTaskId!==u.nextTaskId?(r(),m(I,{key:0,onClick:H},{default:e(()=>t[9]||(t[9]=[l("上一个")])),_:1})):f("",!0),u.nextTaskId?(r(),m(I,{key:1,onClick:Q},{default:e(()=>t[10]||(t[10]=[l("下一个")])),_:1})):f("",!0)]),_:1})])])]),a(ee,{open:x.value,"onUpdate:open":t[1]||(t[1]=o=>x.value=o),title:"拒绝原因",onOk:M,confirmLoading:O.value},{default:e(()=>[a(Z,{value:y.value,"onUpdate:value":t[0]||(t[0]=o=>y.value=o),placeholder:"请输入拒绝原因",rows:4},null,8,["value"])]),_:1},8,["open","confirmLoading"])])}}},Ae=le(Ce,[["__scopeId","data-v-459c3dc0"]]);export{Ae as default};
