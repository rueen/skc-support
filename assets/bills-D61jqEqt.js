import{_ as G,i as H,j as I,r as O,a as $,k as J,b as n,d as g,c as i,w as s,e as m,l as P,m as Q,f as X,o as t,F as r,n as B,p as b,h as k,t as o,q as d,g as f,K as Y,M as Z}from"./index-C_f3BNdC.js";const ee={class:"other-bill content-container"},te={class:"table-container"},ae={class:"table-header"},ne={class:"left"},le=["onClick"],se=["onClick"],oe={key:1},ie={key:1},ue={key:0},me={key:1},ce={key:0},re={key:1},de={__name:"bills",setup(_e){const c=H(),S=X(),D=I(()=>c.loaded?c.getEnumOptions("BillType"):[]),F=I(()=>c.loaded?c.getEnumOptions("SettlementStatus"):[]),h=O(!1),u=$({memberNickname:"",billType:void 0,settlementStatus:void 0}),M=l=>{Z.error({title:"结算失败原因",content:l.failureReason})},R=[{title:"会员昵称",key:"memberNickname"},{title:"账单类型",dataIndex:"billType",key:"billType"},{title:"关联任务",key:"taskName"},{title:"金额",dataIndex:"amount",key:"amount",align:"right"},{title:"备注",key:"remark"},{title:"创建时间",dataIndex:"createTime",key:"createTime"},{title:"状态",key:"settlementStatus"}],T=O([]),_=$({current:1,pageSize:10,total:0}),w=()=>{_.current=1,v()},V=()=>{Object.assign(u,{memberNickname:"",billType:void 0,settlementStatus:void 0}),w()},j=l=>{Object.assign(_,l),v()},z=l=>{S.push(`/member/view/${l.memberId}`)},U=l=>{S.push(`/submitted-tasks/detail/${l.submittedId}`)},v=async()=>{h.value=!0;try{const l=await P("finance.bills",{page:_.current,pageSize:_.pageSize,...u});l.code===0?(T.value=l.data.list,_.total=l.data.total):Q.error(l.message)}finally{h.value=!1}};return J(()=>{v()}),(l,p)=>{const q=m("a-input"),y=m("a-form-item"),N=m("a-select-option"),x=m("a-select"),C=m("a-button"),K=m("a-space"),L=m("a-form"),W=m("a-typography-text"),A=m("a-table");return t(),n("div",ee,[g("div",te,[g("div",ae,[g("div",ne,[i(L,{layout:"inline",model:u},{default:s(()=>[i(y,{label:"会员昵称"},{default:s(()=>[i(q,{value:u.memberNickname,"onUpdate:value":p[0]||(p[0]=e=>u.memberNickname=e),placeholder:"请输入会员昵称","allow-clear":""},null,8,["value"])]),_:1}),i(y,{label:"账单类型"},{default:s(()=>[i(x,{value:u.billType,"onUpdate:value":p[1]||(p[1]=e=>u.billType=e),placeholder:"请选择账单类型",style:{width:"120px"},"allow-clear":""},{default:s(()=>[(t(!0),n(r,null,B(D.value,e=>(t(),b(N,{key:e.value,value:e.value},{default:s(()=>[k(o(e.text),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),i(y,{label:"结算状态"},{default:s(()=>[i(x,{value:u.settlementStatus,"onUpdate:value":p[2]||(p[2]=e=>u.settlementStatus=e),placeholder:"请选择结算状态",style:{width:"120px"},"allow-clear":""},{default:s(()=>[(t(!0),n(r,null,B(F.value,e=>(t(),b(N,{key:e.value,value:e.value},{default:s(()=>[k(o(e.text),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),i(y,null,{default:s(()=>[i(K,null,{default:s(()=>[i(C,{type:"primary",onClick:w},{default:s(()=>[k(o(l.$t("common.search")),1)]),_:1}),i(C,{onClick:V},{default:s(()=>[k(o(l.$t("common.reset")),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["model"])])]),i(A,{columns:R,"data-source":T.value,loading:h.value,pagination:_,onChange:j},{bodyCell:s(({column:e,record:a})=>[e.key==="memberNickname"?(t(),n("a",{key:0,onClick:E=>z(a)},o(a.memberNickname),9,le)):d("",!0),e.key==="taskName"?(t(),n(r,{key:1},[a.taskName?(t(),n("a",{key:0,onClick:E=>U(a)},o(a.taskName),9,se)):(t(),n("span",oe,"--"))],64)):d("",!0),e.key==="billType"?(t(),n(r,{key:2},[k(o(f(c).getEnumText("BillType",a.billType)),1)],64)):d("",!0),e.key==="amount"?(t(),n(r,{key:3},[a.billType==="reward_deduction"?(t(),b(W,{key:0,type:"danger"},{default:s(()=>[k(" - "+o(a.amount),1)]),_:2},1024)):(t(),n("span",ie,o(a.amount),1))],64)):d("",!0),e.key==="remark"?(t(),n(r,{key:4},[a.remark?(t(),n("span",ue,o(a.remark)+"(操作人: "+o(a.waiterName)+")",1)):(t(),n("span",me,"--"))],64)):d("",!0),e.key==="settlementStatus"?(t(),n(r,{key:5},[a.billType==="withdrawal"?(t(),n("span",ce,o(f(c).getEnumText("WithdrawalStatus",a.withdrawalStatus)),1)):(t(),n("span",re,o(f(c).getEnumText("SettlementStatus",a.settlementStatus)),1)),a.settlementStatus==="failed"||a.withdrawalStatus==="failed"?(t(),b(f(Y),{key:2,class:"status-icon",onClick:E=>M(a)},null,8,["onClick"])):d("",!0)],64)):d("",!0)]),_:1},8,["data-source","loading","pagination"])])])}}},ke=G(de,[["__scopeId","data-v-d0baefc8"]]);export{ke as default};
