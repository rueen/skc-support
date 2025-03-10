import{_ as me,i as ve,r as p,a as H,j as _e,b as C,d as f,c as n,w as l,e as o,k as u,f as ge,o as i,F as U,l as V,m as v,h as r,t as d,g as B,n as y}from"./index-CBTOl_WJ.js";import{e as x,g as ke,f as ye,h as be}from"./enums-Vx4wKXVy.js";import{g as D,p as L}from"./request-BJ0l3KV0.js";const he={class:"task-audit content-container"},Se={class:"table-container"},we={class:"table-header"},Ce={class:"left"},Ne={class:"right"},xe={key:1},Ie={class:"group-name"},Re=["onClick"],Te={__name:"list",setup(je){const J=ge(),{locale:Q}=ve(),I=p(!1),A=p(!1),b=p(!1),R=p(!1),_=p(""),h=p(null),m=p([]),s=H({taskName:"",channelId:void 0,auditStatus:void 0,groupId:void 0}),G=p([]),z=p([]),W=[{title:"任务名称",dataIndex:"taskName",key:"taskName"},{title:"平台渠道",dataIndex:"channelName",key:"channelName"},{title:"任务奖励",dataIndex:"reward",key:"reward"},{title:"会员信息",key:"member"},{title:"审核状态",dataIndex:"auditStatus",key:"auditStatus"},{title:"操作",key:"action",fixed:"right",width:180}],E=p([]),g=H({current:1,pageSize:10,total:0}),X={selectedRowKeys:m,onChange:a=>{m.value=a},getCheckboxProps:a=>({disabled:a.auditStatus!==x.PENDING})},P=a=>ke(ye,a,Q.value),Y=a=>be[a],$=()=>{g.current=1,k()},Z=()=>{s.taskName="",s.channelId=void 0,s.auditStatus=void 0,s.groupId=void 0,$()},ee=a=>{Object.assign(g,a),k()},te=a=>{J.push(`/task-audit/detail/${a.id}`)},ae=async a=>{try{const t=await L("taskSubmitted.batchResolve",{ids:[a.id]});t.success?(u.success("审核通过成功"),k()):u.error(t.message)}catch{u.error("审核通过失败")}},le=async()=>{if(!m.value.length){u.warning("请选择要通过的任务");return}try{const a=await L("taskSubmitted.batchResolve",{ids:m.value});a.success?(u.success("批量审核通过成功"),m.value=[],k()):u.error(a.message)}catch{u.error("批量审核通过失败")}},ne=a=>{m.value=[a.id],_.value="",b.value=!0},se=async()=>{if(!_.value){u.error("请输入拒绝原因");return}try{R.value=!0;const a=await L("taskSubmitted.batchReject",{ids:m.value,reason:_.value});a.success?(u.success("审核拒绝成功"),b.value=!1,k()):u.error(a.message)}catch{u.error("审核拒绝失败")}finally{R.value=!1}},oe=()=>{if(!m.value.length){u.warning("请选择要拒绝的任务");return}_.value="",b.value=!0},ue=async()=>{const a=await D("channel.list");a.success&&(G.value=a.data.list)},re=async(a="")=>{try{const t=await D("group.list",{params:{page:1,pageSize:50,keyword:a}});t.success&&(z.value=t.data.list||[])}catch{u.error("获取群组列表失败")}},k=async()=>{I.value=!0;try{const a=await D("taskSubmitted.list",{params:{page:g.current,pageSize:g.pageSize,...s}});a.success?(E.value=a.data.list,g.total=a.data.total):u.error(a.message)}finally{I.value=!1}};return _e(()=>{k(),re(),ue()}),(a,t)=>{const ie=o("a-input"),S=o("a-form-item"),T=o("a-select-option"),j=o("a-select"),N=o("a-button"),O=o("a-space"),de=o("a-form"),F=o("a-tag"),K=o("a-popconfirm"),ce=o("a-table"),w=o("a-descriptions-item"),pe=o("a-descriptions"),M=o("a-modal"),fe=o("a-textarea");return i(),C("div",he,[f("div",Se,[f("div",we,[f("div",Ce,[n(de,{layout:"inline",model:s},{default:l(()=>[n(S,{label:"任务名称"},{default:l(()=>[n(ie,{value:s.taskName,"onUpdate:value":t[0]||(t[0]=e=>s.taskName=e),placeholder:"请输入任务名称","allow-clear":""},null,8,["value"])]),_:1}),n(S,{label:"平台渠道"},{default:l(()=>[n(j,{value:s.channelId,"onUpdate:value":t[1]||(t[1]=e=>s.channelId=e),placeholder:"请选择平台渠道",style:{width:"120px"},"allow-clear":""},{default:l(()=>[(i(!0),C(U,null,V(G.value,e=>(i(),v(T,{key:e.id,value:e.id},{default:l(()=>[r(d(e.name),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),n(S,{label:"审核状态"},{default:l(()=>[n(j,{value:s.auditStatus,"onUpdate:value":t[2]||(t[2]=e=>s.auditStatus=e),placeholder:"请选择审核状态",style:{width:"120px"},"allow-clear":""},{default:l(()=>[(i(!0),C(U,null,V(Object.values(B(x)),e=>(i(),v(T,{key:e,value:e},{default:l(()=>[r(d(P(e)),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),n(S,{label:"所属群组"},{default:l(()=>[n(j,{value:s.groupId,"onUpdate:value":t[3]||(t[3]=e=>s.groupId=e),placeholder:"请选择群组",style:{width:"120px"},"allow-clear":""},{default:l(()=>[(i(!0),C(U,null,V(z.value,e=>(i(),v(T,{key:e.id,value:e.id},{default:l(()=>[r(d(e.name),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),n(S,null,{default:l(()=>[n(O,null,{default:l(()=>[n(N,{type:"primary",onClick:$},{default:l(()=>t[7]||(t[7]=[r("查询")])),_:1}),n(N,{onClick:Z},{default:l(()=>t[8]||(t[8]=[r("重置")])),_:1})]),_:1})]),_:1})]),_:1},8,["model"])]),f("div",Ne,[n(O,null,{default:l(()=>[n(N,{type:"primary",onClick:le},{default:l(()=>t[9]||(t[9]=[r("批量通过")])),_:1}),n(N,{danger:"",onClick:oe},{default:l(()=>t[10]||(t[10]=[r("批量拒绝")])),_:1})]),_:1})])]),n(ce,{columns:W,"data-source":E.value,loading:I.value,pagination:g,"row-selection":X,onChange:ee},{bodyCell:l(({column:e,record:c})=>[e.key==="auditStatus"?(i(),v(F,{key:0,color:Y(c.auditStatus)},{default:l(()=>[r(d(P(c.auditStatus)),1)]),_:2},1032,["color"])):y("",!0),e.key==="member"?(i(),C("div",xe,[f("div",null,d(c.memberNickname),1),f("div",Ie,[f("span",null,d(c.groupName),1),c.isGroupOwner?(i(),v(F,{key:0,color:"blue",style:{"margin-left":"10px"}},{default:l(()=>t[11]||(t[11]=[r("群主")])),_:1})):y("",!0)])])):y("",!0),e.key==="action"?(i(),v(O,{key:2},{default:l(()=>[f("a",{onClick:q=>te(c)},"查看",8,Re),c.auditStatus===B(x).PENDING?(i(),v(K,{key:0,title:"确定要通过该任务吗？",onConfirm:q=>ae(c)},{default:l(()=>t[12]||(t[12]=[f("a",null,"通过",-1)])),_:2},1032,["onConfirm"])):y("",!0),c.auditStatus===B(x).PENDING?(i(),v(K,{key:1,title:"确定要拒绝该任务吗？",onConfirm:q=>ne(c)},{default:l(()=>t[13]||(t[13]=[f("a",{class:"danger"},"拒绝",-1)])),_:2},1032,["onConfirm"])):y("",!0)]),_:2},1024)):y("",!0)]),_:1},8,["data-source","loading","pagination"])]),n(M,{open:A.value,"onUpdate:open":t[4]||(t[4]=e=>A.value=e),title:"任务详情",footer:null},{default:l(()=>[n(pe,{column:1},{default:l(()=>[n(w,{label:"任务名称"},{default:l(()=>{var e;return[r(d((e=h.value)==null?void 0:e.taskName),1)]}),_:1}),n(w,{label:"任务类型"},{default:l(()=>{var e;return[r(d((e=h.value)==null?void 0:e.taskType),1)]}),_:1}),n(w,{label:"任务描述"},{default:l(()=>{var e;return[r(d((e=h.value)==null?void 0:e.description),1)]}),_:1}),n(w,{label:"任务奖励"},{default:l(()=>{var e;return[r(d((e=h.value)==null?void 0:e.reward),1)]}),_:1}),n(w,{label:"创建时间"},{default:l(()=>{var e;return[r(d((e=h.value)==null?void 0:e.createTime),1)]}),_:1})]),_:1})]),_:1},8,["open"]),n(M,{open:b.value,"onUpdate:open":t[6]||(t[6]=e=>b.value=e),title:"拒绝原因",onOk:se,confirmLoading:R.value},{default:l(()=>[n(fe,{value:_.value,"onUpdate:value":t[5]||(t[5]=e=>_.value=e),placeholder:"请输入拒绝原因",rows:4},null,8,["value"])]),_:1},8,["open","confirmLoading"])])}}},Be=me(Te,[["__scopeId","data-v-eca92a7f"]]);export{Be as default};
