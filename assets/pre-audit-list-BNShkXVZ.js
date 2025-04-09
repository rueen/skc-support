import{_ as ke,i as be,a as ve,j as H,r as g,b as V,k as fe,c as h,d as c,e as n,w as a,f as u,l as O,m,g as ge,o as i,F as C,n as D,p as v,h as k,t as r,s as f,q as he,M as _e,A as z}from"./index-Bx9mD4zV.js";import{d as Te}from"./download-DfwN-UeI.js";const ye={class:"task-audit content-container"},we={class:"table-container"},Se={class:"table-header"},Ce={style:{width:"100%",display:"flex","justify-content":"space-between"}},$e={key:3},Ae={class:"group-name"},Pe=["onClick"],Re={class:"danger"},Ne={__name:"pre-audit-list",setup(Ie){const A=be(),{t:o}=ve(),F=H(()=>A.loaded?A.getEnumOptions("TaskPreAuditStatus"):[]),W=ge(),P=g(!1),y=g(!1),x=g(!1),_=g(""),b=g([]),l=V({taskName:"",channelId:void 0,taskPreAuditStatus:"pending",groupId:void 0,submitTimeRange:[],completedTaskCount:void 0}),E=g([]),M=g([]),q=H(()=>[{title:o("submittedTasks.list.taskName"),key:"taskName"},{title:o("submittedTasks.list.reward"),dataIndex:"reward",key:"reward"},{title:o("submittedTasks.list.memberInfo"),key:"member"},{title:o("submittedTasks.list.status"),dataIndex:"taskPreAuditStatus",key:"taskPreAuditStatus"},{title:o("submittedTasks.list.preAuditor"),key:"preWaiterName"},{title:o("submittedTasks.list.action"),key:"action",fixed:"right",width:180}]),R=g([]),T=V({current:1,pageSize:10,total:0}),G={selectedRowKeys:b,onChange:e=>{b.value=e},getCheckboxProps:e=>({disabled:e.taskPreAuditStatus!=="pending"})},U=()=>{T.current=1,w()},K=()=>{Object.assign(l,{taskName:"",channelId:void 0,taskPreAuditStatus:"pending",groupId:void 0,submitTimeRange:[],completedTaskCount:void 0}),U()},J=e=>{Object.assign(T,e),w()},Q=e=>{W.push(`/submitted-tasks/detail/${e.id}?type=pre`)},X=async e=>{b.value=[e.id],Y()},Y=async()=>{if(!b.value.length){m.warning(o("submittedTasks.list.selectTask"));return}const e=await z("taskSubmitted.batchPreAuditApprove",{ids:b.value});e.code===0?(m.success(o("submittedTasks.list.batchResolveSuccess")),b.value=[],w()):m.error(e.message)},Z=e=>{b.value=[e.id],_.value="",y.value=!0},ee=async()=>{if(!_.value){m.error(o("submittedTasks.list.rejectReasonRequired"));return}x.value=!0;const e=await z("taskSubmitted.batchPreAuditReject",{ids:b.value,reason:_.value});e.code===0?(m.success(o("submittedTasks.list.rejectSuccess")),y.value=!1,w()):m.error(e.message)},te=()=>{if(!b.value.length){m.warning(o("submittedTasks.list.selectTask"));return}_.value="",y.value=!0},ae=async()=>{const e=await O("channel.list");e.code===0&&(E.value=e.data.list)},se=()=>{_e.confirm({title:o("submittedTasks.list.export"),content:o("submittedTasks.list.confirmExportContent"),onOk:async()=>{try{const e=m.loading(o("submittedTasks.list.exporting"),0),s={...l};await Te("taskSubmitted.preAuditExport",s,`pre_audit_tasks_${new Date().toLocaleDateString()}.xlsx`),e(),m.success(o("submittedTasks.list.exportSuccess"))}catch(e){console.error("导出失败:",e),m.error(o("submittedTasks.list.exportFailed"))}}})},ne=async(e="")=>{try{const s=await O("group.list",{params:{page:1,pageSize:50,keyword:e}});s.code===0&&(M.value=s.data.list||[])}catch{m.error("获取群组列表失败")}},w=async()=>{var e,s;P.value=!0;try{const N={page:T.current,pageSize:T.pageSize,taskName:l.taskName,channelId:l.channelId,taskPreAuditStatus:l.taskPreAuditStatus,groupId:l.groupId,submitStartTime:(e=l.submitTimeRange)==null?void 0:e[0],submitEndTime:(s=l.submitTimeRange)==null?void 0:s[1],completedTaskCount:l.completedTaskCount},p=await O("taskSubmitted.preAuditList",{...N});p.code===0?(R.value=p.data.list,T.total=p.data.total):m.error(p.message)}finally{P.value=!1}};return fe(()=>{w(),ne(),ae()}),(e,s)=>{const N=u("a-input"),p=u("a-form-item"),I=u("a-select-option"),j=u("a-select"),le=u("a-range-picker"),oe=u("a-input-number"),ue=u("a-form"),S=u("a-button"),$=u("a-space"),ie=u("DownloadOutlined"),re=u("a-avatar"),de=u("a-tag"),B=u("a-popconfirm"),ce=u("a-table"),me=u("a-textarea"),pe=u("a-modal");return i(),h("div",ye,[c("div",we,[c("div",Se,[n(ue,{layout:"inline",model:l},{default:a(()=>[n(p,{label:e.$t("submittedTasks.search.taskName")},{default:a(()=>[n(N,{value:l.taskName,"onUpdate:value":s[0]||(s[0]=t=>l.taskName=t),placeholder:e.$t("submittedTasks.search.taskNamePlaceholder"),"allow-clear":"",style:{width:"140px"}},null,8,["value","placeholder"])]),_:1},8,["label"]),n(p,{label:e.$t("submittedTasks.search.channel")},{default:a(()=>[n(j,{value:l.channelId,"onUpdate:value":s[1]||(s[1]=t=>l.channelId=t),placeholder:e.$t("submittedTasks.search.channelPlaceholder"),"allow-clear":"",style:{width:"140px"}},{default:a(()=>[(i(!0),h(C,null,D(E.value,t=>(i(),v(I,{key:t.id,value:t.id},{default:a(()=>[k(r(t.name),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value","placeholder"])]),_:1},8,["label"]),n(p,{label:e.$t("submittedTasks.search.taskPreAuditStatus")},{default:a(()=>[n(j,{value:l.taskPreAuditStatus,"onUpdate:value":s[2]||(s[2]=t=>l.taskPreAuditStatus=t),placeholder:e.$t("submittedTasks.search.taskPreAuditStatusPlaceholder"),"allow-clear":"",style:{width:"140px"}},{default:a(()=>[(i(!0),h(C,null,D(F.value,t=>(i(),v(I,{key:t.value,value:t.value},{default:a(()=>[k(r(t.text),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value","placeholder"])]),_:1},8,["label"]),n(p,{label:e.$t("submittedTasks.search.groupId")},{default:a(()=>[n(j,{value:l.groupId,"onUpdate:value":s[3]||(s[3]=t=>l.groupId=t),placeholder:e.$t("submittedTasks.search.groupIdPlaceholder"),"allow-clear":""},{default:a(()=>[(i(!0),h(C,null,D(M.value,t=>(i(),v(I,{key:t.id,value:t.id},{default:a(()=>[k(r(t.groupName),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value","placeholder"])]),_:1},8,["label"]),n(p,{label:e.$t("submittedTasks.search.submitTime")},{default:a(()=>[n(le,{value:l.submitTimeRange,"onUpdate:value":s[4]||(s[4]=t=>l.submitTimeRange=t),"show-time":{format:"HH:mm"},format:"YYYY-MM-DD HH:mm","value-format":"YYYY-MM-DD HH:mm:ss",style:{width:"280px"}},null,8,["value"])]),_:1},8,["label"]),n(p,{label:e.$t("submittedTasks.search.completedTaskCount")},{default:a(()=>[n(oe,{value:l.completedTaskCount,"onUpdate:value":s[5]||(s[5]=t=>l.completedTaskCount=t),min:0,max:9999,"addon-after":e.$t("submittedTasks.search.times"),style:{width:"100px!important"}},null,8,["value","addon-after"])]),_:1},8,["label"])]),_:1},8,["model"]),c("div",Ce,[c("div",null,[n($,null,{default:a(()=>[n(S,{type:"primary",onClick:U},{default:a(()=>[k(r(e.$t("common.search")),1)]),_:1}),n(S,{onClick:K},{default:a(()=>[k(r(e.$t("common.reset")),1)]),_:1})]),_:1})]),c("div",null,[n($,null,{default:a(()=>[R.value.length?(i(),v(S,{key:0,onClick:se},{icon:a(()=>[n(ie)]),default:a(()=>[k(" "+r(e.$t("common.export")),1)]),_:1})):f("",!0),n(S,{type:"primary",onClick:Y},{default:a(()=>[k(r(e.$t("common.batchResolve")),1)]),_:1}),n(S,{danger:"",onClick:te},{default:a(()=>[k(r(e.$t("common.batchReject")),1)]),_:1})]),_:1})])])]),n(ce,{columns:q.value,"data-source":R.value,loading:P.value,pagination:T,"row-selection":G,rowKey:"id",onChange:J},{bodyCell:a(({column:t,record:d})=>[t.key==="taskName"?(i(),v($,{key:0},{default:a(()=>[n(re,{src:d.channelIcon,size:"small"},null,8,["src"]),c("span",null,r(d.taskName),1)]),_:2},1024)):f("",!0),t.key==="taskPreAuditStatus"?(i(),h(C,{key:1},[k(r(he(A).getEnumText("TaskPreAuditStatus",d.taskPreAuditStatus)),1)],64)):f("",!0),t.key==="preWaiterName"?(i(),h(C,{key:2},[k(r(d.preWaiterName||"--"),1)],64)):f("",!0),t.key==="member"?(i(),h("div",$e,[c("div",null,r(d.memberNickname),1),c("div",Ae,[c("span",null,r(d.groupName),1),d.isGroupOwner?(i(),v(de,{key:0,color:"blue",style:{"margin-left":"10px"}},{default:a(()=>s[8]||(s[8]=[k("群主")])),_:1})):f("",!0)])])):f("",!0),t.key==="action"?(i(),v($,{key:4},{default:a(()=>[c("a",{onClick:L=>Q(d)},r(e.$t("submittedTasks.list.view")),9,Pe),d.taskPreAuditStatus==="pending"?(i(),v(B,{key:0,title:e.$t("submittedTasks.list.confirmResolve"),onConfirm:L=>X(d)},{default:a(()=>[c("a",null,r(e.$t("submittedTasks.list.resolve")),1)]),_:2},1032,["title","onConfirm"])):f("",!0),d.taskPreAuditStatus==="pending"?(i(),v(B,{key:1,title:e.$t("submittedTasks.list.confirmReject"),onConfirm:L=>Z(d)},{default:a(()=>[c("a",Re,r(e.$t("submittedTasks.list.reject")),1)]),_:2},1032,["title","onConfirm"])):f("",!0)]),_:2},1024)):f("",!0)]),_:1},8,["columns","data-source","loading","pagination"])]),n(pe,{open:y.value,"onUpdate:open":s[7]||(s[7]=t=>y.value=t),title:e.$t("submittedTasks.list.rejectReason"),onOk:ee,confirmLoading:x.value},{default:a(()=>[n(me,{value:_.value,"onUpdate:value":s[6]||(s[6]=t=>_.value=t),placeholder:e.$t("submittedTasks.list.rejectReasonPlaceholder"),rows:4},null,8,["value","placeholder"])]),_:1},8,["open","title","confirmLoading"])])}}},De=ke(Ne,[["__scopeId","data-v-84bfb096"]]);export{De as default};
