import{_ as D,r as i,k as E,q as F,s as H,a as J,l as K,b as f,c as o,d as Q,w as n,e as l,i as c,f as W,o as u,F as O,m as N,n as A,h as m,t as x,g as X}from"./index-Be5aNowM.js";import{P as Y}from"./index-D0ykn5uR.js";import{O as ee,k as ae}from"./enums-Vx4wKXVy.js";import{g as h,b as te,p as oe}from"./request-CYM1fdgd.js";const re={class:"member-form content-container"},ne={class:"form-container"},se={__name:"detail",setup(le){const v=H(),b=W(),G=i(),{t:ue,locale:R}=E(),p=F(()=>!!v.params.id),r=J({memberNickname:"",memberAccount:"",password:"",occupation:void 0,groupId:void 0,isGroupOwner:!1,inviterId:void 0}),_={memberNickname:[{required:!0,message:"请输入会员昵称"}],memberAccount:[{required:!0,message:"请输入账号"},{validator:(t,e)=>{const d=/^1[3-9]\d{9}$/,s=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;return!e||d.test(e)||s.test(e)?Promise.resolve():Promise.reject("请输入正确的手机号或邮箱格式")}}],groupId:[{required:!0,message:"请选择所属群"}]},g=i(!1),L=i([]),k=i(!1),P=i([]),q=(t,e)=>e.children.toLowerCase().indexOf(t.toLowerCase())>=0,U=async(t="")=>{g.value=!0;try{const e=await h("group.list",{page:1,pageSize:50,groupName:t});e.code===0&&(L.value=e.data.list||[])}finally{g.value=!1}},z=async()=>{k.value=!0;try{const t=await h("member.list",{page:1,pageSize:50});t.code===0&&(P.value=t.data.list||[])}finally{k.value=!1}},S=async()=>{if(p.value)try{const t=await h("member.detail",{},{urlParams:{id:v.params.id}});if(t.code===0){const e=t.data;Object.assign(r,{memberNickname:e.memberNickname,memberAccount:e.memberAccount,occupation:e.occupation,groupId:e.groupId,isGroupOwner:e.isGroupOwner,inviterId:e.inviterId})}}catch{c.error("加载会员信息失败"),b.back()}},T=async()=>{const t=await oe("member.add",r);t.code===0?(c.success("提交成功"),b.back()):c.error(t.message)},B=async()=>{const t=await te("member.edit",r,{urlParams:{id:v.params.id}});t.code===0?(c.success("提交成功"),b.back()):c.error(t.message)},w=i(!1),M=()=>{G.value.validate().then(async()=>{try{w.value=!0,p.value?B():T()}catch{c.error("提交失败")}finally{w.value=!1}})},$=t=>{var e;return((e=ae[t])==null?void 0:e[R.value])||t};return K(()=>{U(),z(),S()}),(t,e)=>{const d=l("a-input"),s=l("a-form-item"),y=l("a-select-option"),I=l("a-select"),j=l("a-switch"),C=l("a-button"),V=l("a-space"),Z=l("a-form");return u(),f("div",re,[o(Y,{title:p.value?"编辑会员":"新增会员",back:!0},null,8,["title"]),Q("div",ne,[o(Z,{ref_key:"formRef",ref:G,model:r,rules:_,"label-col":{span:4},"wrapper-col":{span:16}},{default:n(()=>[o(s,{label:"会员昵称",name:"memberNickname",rules:_.memberNickname},{default:n(()=>[o(d,{value:r.memberNickname,"onUpdate:value":e[0]||(e[0]=a=>r.memberNickname=a),placeholder:"请输入会员昵称"},null,8,["value"])]),_:1},8,["rules"]),o(s,{label:"密码",name:"password",rules:[{required:!p.value,message:"请输入密码"}]},{default:n(()=>[o(d,{value:r.password,"onUpdate:value":e[1]||(e[1]=a=>r.password=a),placeholder:"请输入密码"},null,8,["value"])]),_:1},8,["rules"]),o(s,{label:"账号",name:"memberAccount",rules:_.memberAccount},{default:n(()=>[o(d,{value:r.memberAccount,"onUpdate:value":e[2]||(e[2]=a=>r.memberAccount=a),placeholder:"请输入账号（手机号/邮箱）"},null,8,["value"])]),_:1},8,["rules"]),o(s,{label:"所属群",name:"groupId"},{default:n(()=>[o(I,{value:r.groupId,"onUpdate:value":e[3]||(e[3]=a=>r.groupId=a),placeholder:"请选择所属群",loading:g.value,"allow-clear":"","show-search":"","filter-option":!1,onSearch:U},{default:n(()=>[(u(!0),f(O,null,N(L.value,a=>(u(),A(y,{key:a.id,value:a.id},{default:n(()=>[m(x(a.groupName),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value","loading"])]),_:1}),o(s,{label:"邀请人",name:"inviterId"},{default:n(()=>[o(I,{value:r.inviterId,"onUpdate:value":e[4]||(e[4]=a=>r.inviterId=a),placeholder:"请选择邀请人",loading:k.value,"show-search":"","filter-option":q},{default:n(()=>[(u(!0),f(O,null,N(P.value,a=>(u(),A(y,{key:a.id,value:a.id},{default:n(()=>[m(x(a.memberNickname),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value","loading"])]),_:1}),o(s,{label:"职业",name:"occupation"},{default:n(()=>[o(I,{value:r.occupation,"onUpdate:value":e[5]||(e[5]=a=>r.occupation=a),placeholder:"请选择职业",style:{width:"200px"}},{default:n(()=>[(u(!0),f(O,null,N(Object.values(X(ee)),a=>(u(),A(y,{key:a,value:a},{default:n(()=>[m(x($(a)),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),o(s,{label:"群主标识",name:"isGroupOwner"},{default:n(()=>[o(j,{checked:r.isGroupOwner,"onUpdate:checked":e[6]||(e[6]=a=>r.isGroupOwner=a)},null,8,["checked"])]),_:1}),o(s,{"wrapper-col":{offset:4}},{default:n(()=>[o(V,null,{default:n(()=>[o(C,{type:"primary",loading:w.value,onClick:M},{default:n(()=>e[8]||(e[8]=[m(" 提交 ")])),_:1},8,["loading"]),o(C,{onClick:e[7]||(e[7]=a=>t.$router.back())},{default:n(()=>e[9]||(e[9]=[m("取消")])),_:1})]),_:1})]),_:1})]),_:1},8,["model"])])])}}},pe=D(se,[["__scopeId","data-v-90884f6f"]]);export{pe as default};
