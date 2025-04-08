import{P as L}from"./PageHeader-CNYWsX6_.js";import{_ as W,r as f,a as T,v as X,k as Z,b,c as a,d as S,w as n,e as s,l as ee,m as Y,o as p,h as r,t as y,q as g,p as h,F as q,M as te,z as ae}from"./index-D7zbyf1Z.js";const ne={class:"payment-transactions content-container"},oe={class:"table-container"},le={class:"table-header"},se={__name:"payment-transactions",setup(re){const H=X(),v=f(!1),o=T({transactionStatus:void 0,memberId:"",orderId:"",withdrawalId:H.query.withdrawalId,timeRange:[]}),w=f(!1),$=f({}),C=f(""),N=[{title:"订单号",dataIndex:"orderId",key:"orderId"},{title:"提现ID",dataIndex:"withdrawalId",key:"withdrawalId"},{title:"金额",dataIndex:"amount",key:"amount",align:"right"},{title:"账户",dataIndex:"account",key:"account"},{title:"请求参数",key:"requestParams",align:"center"},{title:"响应数据",key:"responseData",align:"center"},{title:"状态",key:"transactionStatus",align:"center"},{title:"请求时间",dataIndex:"requestTime",key:"requestTime"},{title:"响应时间",dataIndex:"responseTime",key:"responseTime"},{title:"操作",key:"action",width:100,align:"center"}],D=f([]),i=T({current:1,pageSize:10,total:0,showSizeChanger:!0,showQuickJumper:!0}),P=t=>({pending:"处理中",success:"成功",failed:"失败"})[t]||t,U=t=>({pending:"blue",success:"green",failed:"red"})[t]||"default",V=t=>!t&&t!==0?"--":`¥ ${Number(t).toFixed(2)}`,x=()=>{i.current=1,k()},B=()=>{Object.assign(o,{transactionStatus:void 0,memberId:"",orderId:"",withdrawalId:"",timeRange:[]}),x()},F=t=>{i.current=t.current,i.pageSize=t.pageSize,k()},M=t=>{$.value=t,C.value=JSON.stringify(t,null,2),w.value=!0},J=t=>{te.info({title:"错误信息",content:t.errorMessage})},j=async t=>{try{const e=await ae("withdrawals.retry",{},{urlParams:{orderId:t.orderId}});k()}catch(e){console.error("重试失败:",e)}},k=async()=>{var t,e;v.value=!0;try{const d={page:i.current,pageSize:i.pageSize,transactionStatus:o.transactionStatus,memberId:o.memberId,orderId:o.orderId,withdrawalId:o.withdrawalId,startDate:(t=o.timeRange)==null?void 0:t[0],endDate:(e=o.timeRange)==null?void 0:e[1]},c=await ee("withdrawals.paymentTransactions",d);c.code===0?(D.value=c.data.list||[],i.total=c.data.total||0):Y.error(c.message)}catch(d){console.error("加载数据失败:",d),Y.error("加载数据失败，请稍后重试")}finally{v.value=!1}};return Z(()=>{k()}),(t,e)=>{const d=s("a-select-option"),c=s("a-select"),_=s("a-form-item"),z=s("a-input"),E=s("a-range-picker"),m=s("a-button"),R=s("a-space"),O=s("a-form"),A=s("a-tag"),K=s("a-table"),Q=s("a-typography"),G=s("a-modal");return p(),b("div",ne,[a(L,{title:"提现交易记录",back:!0,style:{"margin-bottom":"32px",padding:"0"}}),S("div",oe,[S("div",le,[a(O,{layout:"inline",model:o},{default:n(()=>[a(_,{label:"交易状态"},{default:n(()=>[a(c,{value:o.transactionStatus,"onUpdate:value":e[0]||(e[0]=l=>o.transactionStatus=l),placeholder:"请选择交易状态",style:{width:"120px"},"allow-clear":""},{default:n(()=>[a(d,{value:"pending"},{default:n(()=>e[5]||(e[5]=[r("处理中")])),_:1}),a(d,{value:"success"},{default:n(()=>e[6]||(e[6]=[r("成功")])),_:1}),a(d,{value:"failed"},{default:n(()=>e[7]||(e[7]=[r("失败")])),_:1})]),_:1},8,["value"])]),_:1}),a(_,{label:"订单号"},{default:n(()=>[a(z,{value:o.orderId,"onUpdate:value":e[1]||(e[1]=l=>o.orderId=l),placeholder:"请输入订单号","allow-clear":""},null,8,["value"])]),_:1}),a(_,{label:"提现ID"},{default:n(()=>[a(z,{value:o.withdrawalId,"onUpdate:value":e[2]||(e[2]=l=>o.withdrawalId=l),placeholder:"请输入提现ID","allow-clear":""},null,8,["value"])]),_:1}),a(_,{label:"交易时间"},{default:n(()=>[a(E,{value:o.timeRange,"onUpdate:value":e[3]||(e[3]=l=>o.timeRange=l),"show-time":{format:"HH:mm"},format:"YYYY-MM-DD HH:mm","value-format":"YYYY-MM-DD HH:mm:ss"},null,8,["value"])]),_:1}),a(_,null,{default:n(()=>[a(R,null,{default:n(()=>[a(m,{type:"primary",onClick:x},{default:n(()=>[r(y(t.$t("common.search")),1)]),_:1}),a(m,{onClick:B},{default:n(()=>[r(y(t.$t("common.reset")),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["model"])]),a(K,{columns:N,"data-source":D.value,loading:v.value,pagination:i,onChange:F,rowKey:"id"},{bodyCell:n(({column:l,record:u})=>[l.key==="transactionStatus"?(p(),b(q,{key:0},[a(A,{color:U(u.transactionStatus)},{default:n(()=>[r(y(P(u.transactionStatus)),1)]),_:2},1032,["color"]),a(m,{type:"link",size:"small",onClick:I=>J(u)},{default:n(()=>e[8]||(e[8]=[r("查看")])),_:2},1032,["onClick"])],64)):g("",!0),l.key==="amount"?(p(),b(q,{key:1},[r(y(V(u.amount)),1)],64)):g("",!0),l.key==="requestParams"?(p(),h(m,{key:2,type:"link",size:"small",onClick:I=>M(u.requestParams)},{default:n(()=>e[9]||(e[9]=[r("查看")])),_:2},1032,["onClick"])):g("",!0),l.key==="responseData"?(p(),h(m,{key:3,type:"link",size:"small",onClick:I=>M(u.responseData)},{default:n(()=>e[10]||(e[10]=[r("查看")])),_:2},1032,["onClick"])):g("",!0),l.key==="action"?(p(),h(R,{key:4},{default:n(()=>[a(m,{type:"link",size:"small",onClick:I=>j(u)},{default:n(()=>e[11]||(e[11]=[r("重试")])),_:2},1032,["onClick"])]),_:2},1024)):g("",!0)]),_:1},8,["data-source","loading","pagination"])]),a(G,{open:w.value,"onUpdate:open":e[4]||(e[4]=l=>w.value=l),title:"数据详情",width:"800px",footer:null},{default:n(()=>[a(Q,null,{default:n(()=>[S("pre",null,y(C.value),1)]),_:1})]),_:1},8,["open"])])}}},ue=W(se,[["__scopeId","data-v-ba35f4d6"]]);export{ue as default};
