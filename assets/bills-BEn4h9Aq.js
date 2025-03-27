import{_ as L,i as W,j as N,r as I,a as E,k as A,b as i,d as g,c as l,w as t,e as u,l as G,m as H,o as n,F as k,n as O,p as h,h as p,t as c,q as y,g as f,K as J,M as P}from"./index-DO2_8iIg.js";const Q={class:"other-bill content-container"},X={class:"table-container"},Y={class:"table-header"},Z={class:"left"},ee=["onClick"],te={key:0},ae={key:1},le={__name:"bills",setup(ne){const d=W(),B=N(()=>d.loaded?d.getEnumOptions("BillType"):[]),D=N(()=>d.loaded?d.getEnumOptions("SettlementStatus"):[]),b=I(!1),s=E({memberNickname:"",billType:void 0,settlementStatus:void 0}),F=a=>{P.error({title:"结算失败原因",content:a.failureReason})},V=[{title:"会员昵称",dataIndex:"memberNickname",key:"memberNickname"},{title:"账单类型",dataIndex:"billType",key:"billType"},{title:"关联任务",key:"taskName"},{title:"金额",dataIndex:"amount",key:"amount",align:"right"},{title:"创建时间",dataIndex:"createTime",key:"createTime"},{title:"状态",key:"settlementStatus"}],S=I([]),r=E({current:1,pageSize:10,total:0}),T=()=>{r.current=1,v()},$=()=>{Object.assign(s,{memberNickname:"",billType:void 0,settlementStatus:void 0}),T()},j=a=>{Object.assign(r,a),v()},z=a=>{},v=async()=>{b.value=!0;try{const a=await G("finance.bills",{page:r.current,pageSize:r.pageSize,...s});a.code===0?(S.value=a.data.list,r.total=a.data.total):H.error(a.message)}finally{b.value=!1}};return A(()=>{v()}),(a,m)=>{const M=u("a-input"),_=u("a-form-item"),w=u("a-select-option"),x=u("a-select"),C=u("a-button"),R=u("a-space"),U=u("a-form"),q=u("a-table");return n(),i("div",Q,[g("div",X,[g("div",Y,[g("div",Z,[l(U,{layout:"inline",model:s},{default:t(()=>[l(_,{label:"会员昵称"},{default:t(()=>[l(M,{value:s.memberNickname,"onUpdate:value":m[0]||(m[0]=e=>s.memberNickname=e),placeholder:"请输入会员昵称","allow-clear":""},null,8,["value"])]),_:1}),l(_,{label:"账单类型"},{default:t(()=>[l(x,{value:s.billType,"onUpdate:value":m[1]||(m[1]=e=>s.billType=e),placeholder:"请选择账单类型",style:{width:"120px"},"allow-clear":""},{default:t(()=>[(n(!0),i(k,null,O(B.value,e=>(n(),h(w,{key:e.value,value:e.value},{default:t(()=>[p(c(e.text),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),l(_,{label:"结算状态"},{default:t(()=>[l(x,{value:s.settlementStatus,"onUpdate:value":m[2]||(m[2]=e=>s.settlementStatus=e),placeholder:"请选择结算状态",style:{width:"120px"},"allow-clear":""},{default:t(()=>[(n(!0),i(k,null,O(D.value,e=>(n(),h(w,{key:e.value,value:e.value},{default:t(()=>[p(c(e.text),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),l(_,null,{default:t(()=>[l(R,null,{default:t(()=>[l(C,{type:"primary",onClick:T},{default:t(()=>[p(c(a.$t("common.search")),1)]),_:1}),l(C,{onClick:$},{default:t(()=>[p(c(a.$t("common.reset")),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["model"])])]),l(q,{columns:V,"data-source":S.value,loading:b.value,pagination:r,onChange:j},{bodyCell:t(({column:e,record:o})=>[e.key==="taskName"?(n(),i("a",{key:0,onClick:K=>z(o.taskId)},c(o.taskName),9,ee)):y("",!0),e.key==="billType"?(n(),i(k,{key:1},[p(c(f(d).getEnumText("BillType",o.billType)),1)],64)):y("",!0),e.key==="settlementStatus"?(n(),i(k,{key:2},[o.billType==="withdrawal"?(n(),i("span",te,c(f(d).getEnumText("WithdrawalStatus",o.withdrawalStatus)),1)):(n(),i("span",ae,c(f(d).getEnumText("SettlementStatus",o.settlementStatus)),1)),o.settlementStatus==="failed"||o.withdrawalStatus==="failed"?(n(),h(f(J),{key:2,class:"status-icon",onClick:K=>F(o)},null,8,["onClick"])):y("",!0)],64)):y("",!0)]),_:1},8,["data-source","loading","pagination"])])])}}},oe=L(le,[["__scopeId","data-v-642b090d"]]);export{oe as default};
