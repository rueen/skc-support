import{B as R,S as b,n as q,o as G}from"./enums-Vx4wKXVy.js";import{g as H}from"./request-BJ0l3KV0.js";import{_ as J,i as K,r as I,a as w,j as P,b as m,d as y,c as n,w as a,e as s,k as Q,o as c,F as g,l as j,g as D,m as v,h as u,t as i,n as L}from"./index-CBTOl_WJ.js";const W={class:"other-bill content-container"},X={class:"table-container"},Y={class:"table-header"},Z={class:"left"},ee={__name:"other",setup(te){const{t:ae,locale:k}=K(),_=I(!1),o=w({memberNickname:"",billType:void 0,status:void 0}),E=[{title:"会员名称",dataIndex:"memberNickname",key:"memberNickname"},{title:"账单类型",dataIndex:"billType",key:"billType"},{title:"关联任务",dataIndex:"taskName",key:"taskName"},{title:"金额",dataIndex:"amount",key:"amount",align:"right"},{title:"创建时间",dataIndex:"createdAt",key:"createdAt"},{title:"结算状态",dataIndex:"status",key:"status"}],h=I([]),r=w({current:1,pageSize:10,total:0}),T=e=>{var l;return((l=q[e])==null?void 0:l[k.value])||e},S=e=>{var l;return((l=G[e])==null?void 0:l[k.value])||e},F=e=>({[b.SETTLED]:"success",[b.FAILED]:"error"})[e],x=()=>{r.current=1,p()},O=()=>{Object.assign(o,{memberNickname:"",billType:void 0,status:void 0}),x()},V=e=>{Object.assign(r,e),p()},p=async()=>{_.value=!0;try{const e=await H("settlement.otherBills",{page:r.current,pageSize:r.pageSize,...o});e.success?(h.value=e.data.list,r.total=e.data.total):Q.error(e.message)}finally{_.value=!1}};return P(()=>{p()}),(e,l)=>{const z=s("a-input"),d=s("a-form-item"),N=s("a-select-option"),B=s("a-select"),C=s("a-button"),A=s("a-space"),U=s("a-form"),$=s("a-tag"),M=s("a-table");return c(),m("div",W,[y("div",X,[y("div",Y,[y("div",Z,[n(U,{layout:"inline",model:o},{default:a(()=>[n(d,{label:"会员名称"},{default:a(()=>[n(z,{value:o.memberNickname,"onUpdate:value":l[0]||(l[0]=t=>o.memberNickname=t),placeholder:"请输入会员名称","allow-clear":""},null,8,["value"])]),_:1}),n(d,{label:"账单类型"},{default:a(()=>[n(B,{value:o.billType,"onUpdate:value":l[1]||(l[1]=t=>o.billType=t),placeholder:"请选择账单类型",style:{width:"120px"},"allow-clear":""},{default:a(()=>[(c(!0),m(g,null,j(Object.values(D(R)),t=>(c(),v(N,{key:t,value:t},{default:a(()=>[u(i(T(t)),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),n(d,{label:"结算状态"},{default:a(()=>[n(B,{value:o.status,"onUpdate:value":l[2]||(l[2]=t=>o.status=t),placeholder:"请选择结算状态",style:{width:"120px"},"allow-clear":""},{default:a(()=>[(c(!0),m(g,null,j(Object.values(D(b)),t=>(c(),v(N,{key:t,value:t},{default:a(()=>[u(i(S(t)),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),n(d,null,{default:a(()=>[n(A,null,{default:a(()=>[n(C,{type:"primary",onClick:x},{default:a(()=>[u(i(e.$t("common.search")),1)]),_:1}),n(C,{onClick:O},{default:a(()=>[u(i(e.$t("common.reset")),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["model"])])]),n(M,{columns:E,"data-source":h.value,loading:_.value,pagination:r,onChange:V},{bodyCell:a(({column:t,record:f})=>[t.key==="billType"?(c(),m(g,{key:0},[u(i(T(f.billType)),1)],64)):L("",!0),t.key==="status"?(c(),v($,{key:1,color:F(f.status)},{default:a(()=>[u(i(S(f.status)),1)]),_:2},1032,["color"])):L("",!0)]),_:1},8,["data-source","loading","pagination"])])])}}},se=J(ee,[["__scopeId","data-v-6b527faf"]]);export{se as default};
