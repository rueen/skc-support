import{_ as K,r as N,i as W,b as $,j as X,k as Y,c as d,d as _,e as n,w as e,f as u,l as B,m as g,g as Z,o,F as m,n as D,p as S,h as r,t as c,q as k,s as tt,v as et}from"./index-ByCb6rGy.js";const at={class:"task content-container"},nt={class:"table-container"},st={class:"table-header"},ot={class:"left"},lt={class:"right"},ut={key:0},it={key:1},ct=["onClick"],dt={__name:"list",setup(rt){const T=Z(),b=N(!1),f=W(),l=$({taskName:"",channelId:void 0,taskStatus:void 0}),w=N([]),V=X(()=>f.loaded?f.getEnumOptions("TaskStatus"):[]),z=[{title:"任务名称",key:"taskName"},{title:"任务状态",dataIndex:"taskStatus",key:"taskStatus",customRender:({text:a})=>f.getEnumText("TaskStatus",a)},{title:"任务名额 / 已提交",key:"taskQuota"},{title:"任务时间",key:"taskTime"},{title:"操作",key:"action",fixed:"right",width:180}],x=N([]),p=$({current:1,pageSize:10,total:0}),I=()=>{p.current=1,v()},F=()=>{l.taskName="",l.channelId=void 0,l.taskStatus=void 0,I()},Q=a=>{Object.assign(p,a),v()},R=()=>{T.push("/task/create")},U=a=>{T.push(`/task/edit/${a.id}`)},j=async a=>{try{const s=await et("task.delete",{},{urlParams:{id:a.id}});s.code===0?(g.success("删除成功"),v()):g.error(s.message)}catch{g.error("删除失败")}},v=async()=>{b.value=!0;try{const a=await B("task.list",{page:p.current,pageSize:p.pageSize,...l});a.code===0?(x.value=a.data.list,p.total=a.data.total):g.error(a.message)}finally{b.value=!1}},q=async()=>{const a=await B("channel.list");a.code===0&&(w.value=a.data.list)};return Y(async()=>{v(),q()}),(a,s)=>{const A=u("a-input"),y=u("a-form-item"),E=u("a-select-option"),O=u("a-select"),C=u("a-button"),h=u("a-space"),L=u("a-form"),M=u("plus-outlined"),P=u("a-avatar"),G=u("a-popconfirm"),H=u("a-table");return o(),d("div",at,[_("div",nt,[_("div",st,[_("div",ot,[n(L,{layout:"inline",model:l},{default:e(()=>[n(y,{label:"任务名称"},{default:e(()=>[n(A,{value:l.taskName,"onUpdate:value":s[0]||(s[0]=t=>l.taskName=t),placeholder:"请输入任务名称","allow-clear":""},null,8,["value"])]),_:1}),n(y,{label:"平台渠道"},{default:e(()=>[n(O,{value:l.channelId,"onUpdate:value":s[1]||(s[1]=t=>l.channelId=t),placeholder:"请选择平台渠道",style:{width:"120px"},"allow-clear":""},{default:e(()=>[(o(!0),d(m,null,D(w.value,t=>(o(),S(E,{key:t.id,value:t.id},{default:e(()=>[r(c(t.name),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),n(y,{label:"任务状态"},{default:e(()=>[n(O,{value:l.taskStatus,"onUpdate:value":s[2]||(s[2]=t=>l.taskStatus=t),placeholder:"请选择任务状态",allowClear:""},{default:e(()=>[(o(!0),d(m,null,D(V.value,t=>(o(),S(E,{key:t.value,value:t.value},{default:e(()=>[r(c(t.text),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),n(y,null,{default:e(()=>[n(h,null,{default:e(()=>[n(C,{type:"primary",onClick:I},{default:e(()=>[r(c(a.$t("common.search")),1)]),_:1}),n(C,{onClick:F},{default:e(()=>[r(c(a.$t("common.reset")),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["model"])]),_("div",lt,[n(h,null,{default:e(()=>[n(C,{type:"primary",onClick:R},{icon:e(()=>[n(M)]),default:e(()=>[s[3]||(s[3]=r(" 新建任务 "))]),_:1})]),_:1})])]),n(H,{columns:z,"data-source":x.value,loading:b.value,pagination:p,onChange:Q},{bodyCell:e(({column:t,record:i})=>[t.key==="taskName"?(o(),S(h,{key:0},{default:e(()=>[n(P,{src:i.channelIcon},null,8,["src"]),r(" "+c(i.taskName),1)]),_:2},1024)):k("",!0),t.key==="taskTime"?(o(),d(m,{key:1},[r(c(i.startTime)+" - "+c(i.endTime),1)],64)):k("",!0),t.key==="taskQuota"?(o(),d(m,{key:2},[i.unlimitedQuota?(o(),d("span",ut,"不限制")):(o(),d("span",it,c(i.quota),1)),_("span",null," / "+c(i.submittedCount),1)],64)):k("",!0),t.key==="taskStatus"?(o(),d(m,{key:3},[r(c(tt(f).getEnumText("TaskStatus",i.taskStatus)),1)],64)):k("",!0),t.key==="action"?(o(),S(h,{key:4},{default:e(()=>[_("a",{onClick:J=>U(i)},"编辑",8,ct),n(G,{title:"确定要删除该任务吗？",onConfirm:J=>j(i)},{default:e(()=>s[4]||(s[4]=[_("a",{class:"danger"},"删除",-1)])),_:2},1032,["onConfirm"])]),_:2},1024)):k("",!0)]),_:1},8,["data-source","loading","pagination"])])])}}},pt=K(dt,[["__scopeId","data-v-34127b26"]]);export{pt as default};
