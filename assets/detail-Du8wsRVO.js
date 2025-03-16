import{_ as z,l as K,r as S,a as T,m as W,y as X,b as R,c as a,d as i,w as t,e as _,n as I,j as u,f as Y,o as c,h as s,t as o,g as h,q as f,s as y,F as A,p as Z,B}from"./index-DWbj4jnr.js";import{P as $}from"./index-Db8u8dQ5.js";const ee={class:"task-audit-detail content-container"},te={class:"detail-container"},ae={class:"detail-section"},se={class:"detail-section"},oe={class:"detail-section"},le={class:"detail-section"},ne={class:"footer-btns"},re={class:"left"},de={class:"right"},ie={__name:"detail",setup(ue){const N=K(),O=N.jsonEnum.TaskType,V=N.jsonEnum.TaskAuditStatus,j=X(),x=Y(),k=S(!1),w=S(!1),p=S(""),m=T({}),n=T({}),b=T({}),q=async()=>{try{const r=await B("taskSubmitted.batchResolve",{ids:[j.params.id]});r.code===0?(u.success("审核通过成功"),x.back()):u.error(r.message)}catch{u.error("审核通过失败")}},D=()=>{p.value="",k.value=!0},E=async()=>{if(!p.value){u.error("请输入拒绝原因");return}try{w.value=!0;const r=await B("taskSubmitted.batchReject",{ids:[j.params.id],reason:p.value});r.code===0?(u.success("审核拒绝成功"),k.value=!1,x.back()):u.error(r.message)}catch{u.error("审核拒绝失败")}finally{w.value=!1}},L=()=>{},M=()=>{},F=async r=>{try{const e=await I("task.detail",{params:{id:r}});e.code===0?Object.assign(n,e.data):u.error(e.message)}catch{u.error("获取任务详情失败")}},P=async r=>{try{const e=await I("member.detail",{params:{id:r}});e.code===0?Object.assign(b,e.data):u.error(e.message)}catch{u.error("获取会员详情失败")}},J=async r=>{try{const e=await I("taskSubmitted.detail",{params:{id:r}});e.code===0&&(Object.assign(m,e.data),e.data.relatedTaskId&&await F(e.data.relatedTaskId),e.data.relatedMemberId&&await P(e.data.relatedMemberId))}catch{u.error("获取详情失败")}};return W(()=>{J(j.params.id)}),(r,e)=>{const l=_("a-descriptions-item"),v=_("a-descriptions"),U=_("a-tag"),G=_("a-image"),g=_("a-button"),C=_("a-space"),H=_("a-textarea"),Q=_("a-modal");return c(),R("div",ee,[a($,{title:"任务审核详情",back:!0}),i("div",te,[i("div",ae,[e[2]||(e[2]=i("div",{class:"section-title"},"任务信息",-1)),a(v,{column:2},{default:t(()=>[a(l,{label:"任务名称"},{default:t(()=>[s(o(n.taskName),1)]),_:1}),a(l,{label:"平台渠道"},{default:t(()=>[s(o(n.channelName),1)]),_:1}),a(l,{label:"达人领域"},{default:t(()=>[s(o(n.category),1)]),_:1}),a(l,{label:"任务类型"},{default:t(()=>[s(o(h(O)[n.type]),1)]),_:1}),a(l,{label:"任务奖励"},{default:t(()=>[s(o(n.reward)+" 元",1)]),_:1}),a(l,{label:"品牌"},{default:t(()=>[s(o(n.brand),1)]),_:1}),a(l,{label:"指定群组"},{default:t(()=>{var d;return[s(o((d=n.groupNames)==null?void 0:d.join("、")),1)]}),_:1}),a(l,{label:"任务时间"},{default:t(()=>[s(o(n.startTime)+" 至 "+o(n.endTime),1)]),_:1}),a(l,{label:"任务名额"},{default:t(()=>[s(o(n.unlimitedQuota?"不限制":n.quota),1)]),_:1}),a(l,{label:"粉丝要求"},{default:t(()=>[s(o(n.fansRequired)+" 粉丝",1)]),_:1}),a(l,{label:"作品要求"},{default:t(()=>[s(o(n.contentRequirement),1)]),_:1}),a(l,{label:"任务信息"},{default:t(()=>[s(o(n.taskInfo),1)]),_:1})]),_:1})]),i("div",se,[e[4]||(e[4]=i("div",{class:"section-title"},"会员信息",-1)),a(v,{column:2},{default:t(()=>[a(l,{label:"会员昵称"},{default:t(()=>[s(o(b.nickname),1)]),_:1}),a(l,{label:"账号"},{default:t(()=>[s(o(b.account),1)]),_:1}),a(l,{label:"所属群"},{default:t(()=>[s(o(b.groupName)+" ",1),b.isGroupOwner?(c(),f(U,{key:0,color:"blue"},{default:t(()=>e[3]||(e[3]=[s("群主")])),_:1})):y("",!0)]),_:1})]),_:1})]),i("div",oe,[e[5]||(e[5]=i("div",{class:"section-title"},"提交信息",-1)),a(v,{column:2},{default:t(()=>[(c(!0),R(A,null,Z(n.customFields,d=>(c(),f(l,{key:d.title,label:d.title},{default:t(()=>[d.type==="image"?(c(),f(G,{key:0,src:d.value,width:120},null,8,["src"])):(c(),R(A,{key:1},[s(o(d.value),1)],64))]),_:2},1032,["label"]))),128))]),_:1})]),i("div",le,[e[6]||(e[6]=i("div",{class:"section-title"},"审核信息",-1)),a(v,{column:2},{default:t(()=>[a(l,{label:"报名时间"},{default:t(()=>[s(o(m.applyTime),1)]),_:1}),a(l,{label:"提交时间"},{default:t(()=>[s(o(m.submitTime),1)]),_:1}),a(l,{label:"审核状态"},{default:t(()=>[s(o(h(V)[m.taskAuditStatus]),1)]),_:1}),m.taskAuditStatus==="rejected"?(c(),f(l,{key:0,label:"拒绝原因"},{default:t(()=>[s(o(m.rejectReason),1)]),_:1})):y("",!0)]),_:1})]),i("div",ne,[i("div",re,[a(C,null,{default:t(()=>[m.taskAuditStatus==="pending"?(c(),f(g,{key:0,type:"primary",onClick:q},{default:t(()=>e[7]||(e[7]=[s(" 审核通过 ")])),_:1})):y("",!0),m.taskAuditStatus==="pending"?(c(),f(g,{key:1,danger:"",onClick:D},{default:t(()=>e[8]||(e[8]=[s(" 审核拒绝 ")])),_:1})):y("",!0)]),_:1})]),i("div",de,[a(C,null,{default:t(()=>[a(g,{onClick:L},{default:t(()=>e[9]||(e[9]=[s("上一个")])),_:1}),a(g,{onClick:M},{default:t(()=>e[10]||(e[10]=[s("下一个")])),_:1})]),_:1})])])]),a(Q,{open:k.value,"onUpdate:open":e[1]||(e[1]=d=>k.value=d),title:"拒绝原因",onOk:E,confirmLoading:w.value},{default:t(()=>[a(H,{value:p.value,"onUpdate:value":e[0]||(e[0]=d=>p.value=d),placeholder:"请输入拒绝原因",rows:4},null,8,["value"])]),_:1},8,["open","confirmLoading"])])}}},_e=z(ie,[["__scopeId","data-v-d8ae1970"]]);export{_e as default};
