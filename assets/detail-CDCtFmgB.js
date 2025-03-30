import{_ as D,r as i,j as E,v as F,a as G,k as H,b as y,c as o,d as T,w as s,e as u,l as I,m as d,f as J,o as c,F as z,n as C,p as L,h as p,t as O,y as K,z as Q}from"./index-esknL-RA.js";import{P as W}from"./index-B0QWn2op.js";const X={class:"member-form content-container"},Y={class:"form-container"},ee={__name:"detail",setup(ae){const f=F(),v=J(),N=i(),m=E(()=>!!f.params.id),r=G({memberNickname:"",memberAccount:"",password:"",groupIds:[],inviterId:void 0}),_={memberAccount:[{required:!0,message:"请输入账号"},{validator:(a,e)=>{const l=/^1[3-9]\d{9}$/,n=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;return!e||l.test(e)||n.test(e)?Promise.resolve():Promise.reject("请输入正确的手机号或邮箱格式")}}]},b=i(!1),A=i([]),g=i(!1),x=i([]),R=(a,e)=>e.children.toLowerCase().indexOf(a.toLowerCase())>=0,k=async(a="")=>{b.value=!0;try{const e=await I("group.list",{page:1,pageSize:50,groupName:a,memberId:r.inviterId});e.code===0&&(A.value=e.data.list||[])}finally{b.value=!1}},U=a=>{k()},B=async()=>{g.value=!0;try{const a=await I("member.list",{page:1,pageSize:50});a.code===0&&(x.value=a.data.list||[])}finally{g.value=!1}},M=async()=>{if(m.value)try{const a=await I("member.detail",{},{urlParams:{id:f.params.id}});if(a.code===0){const e=a.data;Object.assign(r,{memberNickname:e.nickname,memberAccount:e.account,groupIds:e.groups.map(l=>l.groupId),inviterId:e.inviterId})}}catch{d.error("加载会员信息失败"),v.back()}},$=async()=>{const a=await Q("member.add",r);a.code===0?(d.success("提交成功"),v.back()):d.error(a.message)},j=async()=>{const a=await K("member.edit",r,{urlParams:{id:f.params.id}});a.code===0?(d.success("提交成功"),v.back()):d.error(a.message)},w=i(!1),V=()=>{N.value.validate().then(async()=>{try{w.value=!0,m.value?j():$()}catch{d.error("提交失败")}finally{w.value=!1}})};return H(async()=>{await M(),await B(),await k()}),(a,e)=>{const l=u("a-input"),n=u("a-form-item"),P=u("a-select-option"),S=u("a-select"),h=u("a-button"),Z=u("a-space"),q=u("a-form");return c(),y("div",X,[o(W,{title:m.value?"编辑会员":"新增会员",back:!0},null,8,["title"]),T("div",Y,[o(q,{ref_key:"formRef",ref:N,model:r,rules:_,"label-col":{span:4},"wrapper-col":{span:16}},{default:s(()=>[o(n,{label:"账号",name:"memberAccount",rules:_.memberAccount},{default:s(()=>[o(l,{value:r.memberAccount,"onUpdate:value":e[0]||(e[0]=t=>r.memberAccount=t),placeholder:"请输入账号（手机号/邮箱）"},null,8,["value"])]),_:1},8,["rules"]),o(n,{label:"密码",name:"password",rules:[{required:!m.value,message:"请输入密码"}]},{default:s(()=>[o(l,{value:r.password,"onUpdate:value":e[1]||(e[1]=t=>r.password=t),placeholder:"请输入密码"},null,8,["value"])]),_:1},8,["rules"]),o(n,{label:"会员昵称",name:"memberNickname",rules:_.memberNickname},{default:s(()=>[o(l,{value:r.memberNickname,"onUpdate:value":e[2]||(e[2]=t=>r.memberNickname=t),placeholder:"请输入会员昵称"},null,8,["value"])]),_:1},8,["rules"]),o(n,{label:"邀请人",name:"inviterId"},{default:s(()=>[o(S,{value:r.inviterId,"onUpdate:value":e[3]||(e[3]=t=>r.inviterId=t),placeholder:"请选择邀请人",loading:g.value,"show-search":"","allow-clear":"","filter-option":R,onSelect:U},{default:s(()=>[(c(!0),y(z,null,C(x.value,t=>(c(),L(P,{key:t.id,value:t.id},{default:s(()=>[p(O(t.nickname),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value","loading"])]),_:1}),o(n,{label:"所属群",name:"groupIds"},{default:s(()=>[o(S,{value:r.groupIds,"onUpdate:value":e[4]||(e[4]=t=>r.groupIds=t),placeholder:"请选择所属群",loading:b.value,mode:"multiple","allow-clear":"","show-search":"","filter-option":!1,onSearch:k},{default:s(()=>[(c(!0),y(z,null,C(A.value,t=>(c(),L(P,{key:t.id,value:t.id},{default:s(()=>[p(O(t.groupName),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value","loading"])]),_:1}),o(n,{"wrapper-col":{offset:4}},{default:s(()=>[o(Z,null,{default:s(()=>[o(h,{type:"primary",loading:w.value,onClick:V},{default:s(()=>e[6]||(e[6]=[p(" 提交 ")])),_:1},8,["loading"]),o(h,{onClick:e[5]||(e[5]=t=>a.$router.back())},{default:s(()=>e[7]||(e[7]=[p("取消")])),_:1})]),_:1})]),_:1})]),_:1},8,["model"])])])}}},re=D(ee,[["__scopeId","data-v-d200d305"]]);export{re as default};
