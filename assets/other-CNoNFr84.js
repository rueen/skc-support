import{_ as q,l as M,r as N,a as w,m as R,b as m,d as v,c as a,w as t,e as s,n as A,j as G,o,F as p,p as C,g as y,q as B,h as r,t as i,s as I}from"./index-DWbj4jnr.js";const H={class:"other-bill content-container"},K={class:"table-container"},P={class:"table-header"},Q={class:"left"},W={__name:"other",setup(X){const d=M(),E=d.arrEnum.BillType,j=d.jsonEnum.BillType,V=d.arrEnum.SettlementStatus,z=d.jsonEnum.SettlementStatus,b=N(!1),l=w({memberNickname:"",billType:void 0,settlementStatus:void 0}),D=[{title:"会员昵称",dataIndex:"memberNickname",key:"memberNickname"},{title:"账单类型",dataIndex:"billType",key:"billType"},{title:"关联任务",dataIndex:"taskName",key:"taskName"},{title:"金额",dataIndex:"amount",key:"amount",align:"right"},{title:"创建时间",dataIndex:"createTime",key:"createTime"},{title:"结算状态",dataIndex:"settlementStatus",key:"settlementStatus"}],k=N([]),u=w({current:1,pageSize:10,total:0}),g=()=>{u.current=1,f()},F=()=>{Object.assign(l,{memberNickname:"",billType:void 0,settlementStatus:void 0}),g()},L=n=>{Object.assign(u,n),f()},f=async()=>{b.value=!0;try{const n=await A("settlement.otherBills",{page:u.current,pageSize:u.pageSize,...l});n.code===0?(k.value=n.data.list,u.total=n.data.total):G.error(n.message)}finally{b.value=!1}};return R(()=>{f()}),(n,c)=>{const U=s("a-input"),_=s("a-form-item"),S=s("a-select-option"),h=s("a-select"),T=s("a-button"),J=s("a-space"),O=s("a-form"),$=s("a-table");return o(),m("div",H,[v("div",K,[v("div",P,[v("div",Q,[a(O,{layout:"inline",model:l},{default:t(()=>[a(_,{label:"会员昵称"},{default:t(()=>[a(U,{value:l.memberNickname,"onUpdate:value":c[0]||(c[0]=e=>l.memberNickname=e),placeholder:"请输入会员昵称","allow-clear":""},null,8,["value"])]),_:1}),a(_,{label:"账单类型"},{default:t(()=>[a(h,{value:l.billType,"onUpdate:value":c[1]||(c[1]=e=>l.billType=e),placeholder:"请选择账单类型",style:{width:"120px"},"allow-clear":""},{default:t(()=>[(o(!0),m(p,null,C(y(E),e=>(o(),B(S,{key:e.value,value:e.value},{default:t(()=>[r(i(e.text),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),a(_,{label:"结算状态"},{default:t(()=>[a(h,{value:l.settlementStatus,"onUpdate:value":c[2]||(c[2]=e=>l.settlementStatus=e),placeholder:"请选择结算状态",style:{width:"120px"},"allow-clear":""},{default:t(()=>[(o(!0),m(p,null,C(y(V),e=>(o(),B(S,{key:e.value,value:e.value},{default:t(()=>[r(i(e.text),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),a(_,null,{default:t(()=>[a(J,null,{default:t(()=>[a(T,{type:"primary",onClick:g},{default:t(()=>[r(i(n.$t("common.search")),1)]),_:1}),a(T,{onClick:F},{default:t(()=>[r(i(n.$t("common.reset")),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["model"])])]),a($,{columns:D,"data-source":k.value,loading:b.value,pagination:u,onChange:L},{bodyCell:t(({column:e,record:x})=>[e.key==="billType"?(o(),m(p,{key:0},[r(i(y(j)[x.billType]),1)],64)):I("",!0),e.key==="settlementStatus"?(o(),m(p,{key:1},[r(i(y(z)[x.settlementStatus]),1)],64)):I("",!0)]),_:1},8,["data-source","loading","pagination"])])])}}},Z=q(W,[["__scopeId","data-v-4e7af47d"]]);export{Z as default};
