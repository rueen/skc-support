import{_ as pe,r,a as U,l as ve,b as y,d as p,c as l,w as n,e as o,E as fe,n as V,j as u,f as me,o as i,F as A,p as B,q as m,h as d,t as c,s as b,C as T}from"./index-2-XIWpSa.js";const _e={class:"task-audit content-container"},ke={class:"table-container"},ge={class:"table-header"},ye={class:"left"},be={class:"right"},he={key:1},we={class:"group-name"},Se=["onClick"],Ce={__name:"list",setup(xe){const M=me(),N=r(!1),L=r(!1),h=r(!1),I=r(!1),_=r(""),w=r(null),f=r([]),s=U({taskName:"",channelId:void 0,taskAuditStatus:void 0,groupId:void 0}),z=r([]),E=r([]),P=[{title:"任务名称",dataIndex:"taskName",key:"taskName"},{title:"平台渠道",dataIndex:"channelName",key:"channelName"},{title:"任务奖励",dataIndex:"reward",key:"reward"},{title:"会员信息",key:"member"},{title:"审核状态",dataIndex:"taskAuditStatus",key:"taskAuditStatus"},{title:"操作",key:"action",fixed:"right",width:180}],$=r([]),k=U({current:1,pageSize:10,total:0}),H={selectedRowKeys:f,onChange:a=>{f.value=a},getCheckboxProps:a=>({disabled:a.taskAuditStatus!=="pending"})},D=()=>{k.current=1,g()},Q=()=>{s.taskName="",s.channelId=void 0,s.taskAuditStatus=void 0,s.groupId=void 0,D()},W=a=>{Object.assign(k,a),g()},X=a=>{M.push(`/task-audit/detail/${a.id}`)},Y=async a=>{try{const t=await T("taskSubmitted.batchResolve",{ids:[a.id]});t.code===0?(u.success("审核通过成功"),g()):u.error(t.message)}catch{u.error("审核通过失败")}},Z=async()=>{if(!f.value.length){u.warning("请选择要通过的任务");return}try{const a=await T("taskSubmitted.batchResolve",{ids:f.value});a.code===0?(u.success("批量审核通过成功"),f.value=[],g()):u.error(a.message)}catch{u.error("批量审核通过失败")}},ee=a=>{f.value=[a.id],_.value="",h.value=!0},te=async()=>{if(!_.value){u.error("请输入拒绝原因");return}try{I.value=!0;const a=await T("taskSubmitted.batchReject",{ids:f.value,reason:_.value});a.code===0?(u.success("审核拒绝成功"),h.value=!1,g()):u.error(a.message)}catch{u.error("审核拒绝失败")}finally{I.value=!1}},ae=()=>{if(!f.value.length){u.warning("请选择要拒绝的任务");return}_.value="",h.value=!0},ne=async()=>{const a=await V("channel.list");a.code===0&&(z.value=a.data.list)},le=async(a="")=>{try{const t=await V("group.list",{params:{page:1,pageSize:50,keyword:a}});t.code===0&&(E.value=t.data.list||[])}catch{u.error("获取群组列表失败")}},g=async()=>{N.value=!0;try{const a=await V("taskSubmitted.list",{params:{page:k.current,pageSize:k.pageSize,...s}});a.code===0?($.value=a.data.list,k.total=a.data.total):u.error(a.message)}finally{N.value=!1}},F=r([]),G=U({}),se=async()=>{const a=await fe();F.value=Object.values(a),Object.values(a).map(t=>{G[t.value]=t.text})};return ve(()=>{se(),g(),le(),ne()}),(a,t)=>{const oe=o("a-input"),S=o("a-form-item"),R=o("a-select-option"),j=o("a-select"),x=o("a-button"),O=o("a-space"),ue=o("a-form"),de=o("a-tag"),q=o("a-popconfirm"),ie=o("a-table"),C=o("a-descriptions-item"),re=o("a-descriptions"),J=o("a-modal"),ce=o("a-textarea");return i(),y("div",_e,[p("div",ke,[p("div",ge,[p("div",ye,[l(ue,{layout:"inline",model:s},{default:n(()=>[l(S,{label:"任务名称"},{default:n(()=>[l(oe,{value:s.taskName,"onUpdate:value":t[0]||(t[0]=e=>s.taskName=e),placeholder:"请输入任务名称","allow-clear":""},null,8,["value"])]),_:1}),l(S,{label:"平台渠道"},{default:n(()=>[l(j,{value:s.channelId,"onUpdate:value":t[1]||(t[1]=e=>s.channelId=e),placeholder:"请选择平台渠道",style:{width:"120px"},"allow-clear":""},{default:n(()=>[(i(!0),y(A,null,B(z.value,e=>(i(),m(R,{key:e.id,value:e.id},{default:n(()=>[d(c(e.name),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),l(S,{label:"审核状态"},{default:n(()=>[l(j,{value:s.taskAuditStatus,"onUpdate:value":t[2]||(t[2]=e=>s.taskAuditStatus=e),placeholder:"请选择审核状态",style:{width:"120px"},"allow-clear":""},{default:n(()=>[(i(!0),y(A,null,B(F.value,e=>(i(),m(R,{key:e.value,value:e.value},{default:n(()=>[d(c(e.text),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),l(S,{label:"所属群组"},{default:n(()=>[l(j,{value:s.groupId,"onUpdate:value":t[3]||(t[3]=e=>s.groupId=e),placeholder:"请选择群组",style:{width:"120px"},"allow-clear":""},{default:n(()=>[(i(!0),y(A,null,B(E.value,e=>(i(),m(R,{key:e.id,value:e.id},{default:n(()=>[d(c(e.name),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),l(S,null,{default:n(()=>[l(O,null,{default:n(()=>[l(x,{type:"primary",onClick:D},{default:n(()=>t[7]||(t[7]=[d("查询")])),_:1}),l(x,{onClick:Q},{default:n(()=>t[8]||(t[8]=[d("重置")])),_:1})]),_:1})]),_:1})]),_:1},8,["model"])]),p("div",be,[l(O,null,{default:n(()=>[l(x,{type:"primary",onClick:Z},{default:n(()=>t[9]||(t[9]=[d("批量通过")])),_:1}),l(x,{danger:"",onClick:ae},{default:n(()=>t[10]||(t[10]=[d("批量拒绝")])),_:1})]),_:1})])]),l(ie,{columns:P,"data-source":$.value,loading:N.value,pagination:k,"row-selection":H,onChange:W},{bodyCell:n(({column:e,record:v})=>[e.key==="taskAuditStatus"?(i(),y(A,{key:0},[d(c(G[v.taskAuditStatus]),1)],64)):b("",!0),e.key==="member"?(i(),y("div",he,[p("div",null,c(v.memberNickname),1),p("div",we,[p("span",null,c(v.groupName),1),v.isGroupOwner?(i(),m(de,{key:0,color:"blue",style:{"margin-left":"10px"}},{default:n(()=>t[11]||(t[11]=[d("群主")])),_:1})):b("",!0)])])):b("",!0),e.key==="action"?(i(),m(O,{key:2},{default:n(()=>[p("a",{onClick:K=>X(v)},"查看",8,Se),v.taskAuditStatus==="pending"?(i(),m(q,{key:0,title:"确定要通过该任务吗？",onConfirm:K=>Y(v)},{default:n(()=>t[12]||(t[12]=[p("a",null,"通过",-1)])),_:2},1032,["onConfirm"])):b("",!0),v.taskAuditStatus==="pending"?(i(),m(q,{key:1,title:"确定要拒绝该任务吗？",onConfirm:K=>ee(v)},{default:n(()=>t[13]||(t[13]=[p("a",{class:"danger"},"拒绝",-1)])),_:2},1032,["onConfirm"])):b("",!0)]),_:2},1024)):b("",!0)]),_:1},8,["data-source","loading","pagination"])]),l(J,{open:L.value,"onUpdate:open":t[4]||(t[4]=e=>L.value=e),title:"任务详情",footer:null},{default:n(()=>[l(re,{column:1},{default:n(()=>[l(C,{label:"任务名称"},{default:n(()=>{var e;return[d(c((e=w.value)==null?void 0:e.taskName),1)]}),_:1}),l(C,{label:"任务类型"},{default:n(()=>{var e;return[d(c((e=w.value)==null?void 0:e.taskType),1)]}),_:1}),l(C,{label:"任务描述"},{default:n(()=>{var e;return[d(c((e=w.value)==null?void 0:e.description),1)]}),_:1}),l(C,{label:"任务奖励"},{default:n(()=>{var e;return[d(c((e=w.value)==null?void 0:e.reward),1)]}),_:1}),l(C,{label:"创建时间"},{default:n(()=>{var e;return[d(c((e=w.value)==null?void 0:e.createTime),1)]}),_:1})]),_:1})]),_:1},8,["open"]),l(J,{open:h.value,"onUpdate:open":t[6]||(t[6]=e=>h.value=e),title:"拒绝原因",onOk:te,confirmLoading:I.value},{default:n(()=>[l(ce,{value:_.value,"onUpdate:value":t[5]||(t[5]=e=>_.value=e),placeholder:"请输入拒绝原因",rows:4},null,8,["value"])]),_:1},8,["open","confirmLoading"])])}}},Ne=pe(Ce,[["__scopeId","data-v-acfe628b"]]);export{Ne as default};
