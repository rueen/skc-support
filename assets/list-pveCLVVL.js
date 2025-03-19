import{_ as se,l as ue,m as ce,r as m,a as D,n as ie,b as v,d as u,c as o,w as n,e as i,p as U,j as d,o as s,F as x,q as z,s as g,h as f,t as r,v as p,g as de,B as $}from"./index-DoiZOWAx.js";const re={class:"account content-container"},pe={class:"table-container"},ve={class:"table-header"},fe={class:"left"},_e={class:"right"},me={key:1,class:"account-info"},ge={class:"home-url"},ye={class:"link-text-container"},he=["href"],ke={class:"stats"},Ce={key:0,class:"stat-item"},be={key:1,class:"stat-item"},Se={key:2,class:"stat-item"},we={key:2},xe={class:"group-name"},Ae={__name:"list",setup(Ie){const A=ue(),G=ce(()=>A.loaded?A.getEnumOptions("AccountAuditStatus"):[]),I=m(!1),_=m([]),k=m(!1),R=m(!1),y=m(""),c=D({account:"",channelId:void 0,accountAuditStatus:"pending",groupId:void 0}),N=m([]),B=m([]),K=[{title:"账号名称",key:"account"},{title:"账号详情",key:"accountInfo"},{title:"会员信息",key:"member"},{title:"审核状态",dataIndex:"accountAuditStatus",key:"accountAuditStatus"},{title:"操作",key:"action",fixed:"right",width:180}],F=m([]),h=D({current:1,pageSize:10,total:0}),q=t=>{_.value=t},V=()=>{h.current=1,C()},M=()=>{c.account="",c.channelId=void 0,c.accountAuditStatus=void 0,c.groupId=void 0,V()},H=t=>{Object.assign(h,{current:t.current,pageSize:t.pageSize}),C()},J=async()=>{if(!_.value.length){d.warning("请选择要通过的账号");return}try{const t=await $("account.batchResolve",{ids:_.value});t.code===0?(d.success("操作成功"),_.value=[],C()):d.error(t.message)}catch(t){console.log(t)}},P=async()=>{if(!_.value.length){d.warning("请选择要拒绝的账号");return}y.value="",k.value=!0},Q=t=>{_.value=[t.id],y.value="",k.value=!0},W=async()=>{if(!y.value){d.error("请输入拒绝原因");return}R.value=!0;try{const t=await $("account.batchReject",{ids:_.value,reason:y.value});t.code===0?(d.success("操作成功"),_.value=[],k.value=!1,C()):d.error(t.message)}catch(t){console.log(t)}finally{R.value=!1}},C=async()=>{I.value=!0;try{const t=await U("account.list",{page:h.current,pageSize:h.pageSize,...c});t.code===0?(F.value=t.data.list,h.total=t.data.total):d.error(t.message)}finally{I.value=!1}},X=async()=>{const t=await U("channel.list");t.code===0&&(N.value=t.data.list)},E=async(t="")=>{try{const e=await U("group.list",{page:1,pageSize:50,groupName:t});e.code===0&&(B.value=e.data.list||[])}catch{d.error("获取群组列表失败")}},Y=t=>{navigator.clipboard.writeText(t).then(()=>{d.success("复制成功")}).catch(()=>{d.error("复制失败")})};return ie(()=>{C(),E(),X()}),(t,e)=>{const Z=i("a-input"),b=i("a-form-item"),j=i("a-select-option"),O=i("a-select"),S=i("a-button"),w=i("a-space"),ee=i("a-form"),te=i("a-avatar"),ae=i("a-tag"),L=i("a-popconfirm"),ne=i("a-table"),oe=i("a-textarea"),le=i("a-modal");return s(),v("div",re,[u("div",pe,[u("div",ve,[u("div",fe,[o(ee,{layout:"inline",model:c},{default:n(()=>[o(b,{label:"账号"},{default:n(()=>[o(Z,{value:c.account,"onUpdate:value":e[0]||(e[0]=a=>c.account=a),placeholder:"请输入账号","allow-clear":""},null,8,["value"])]),_:1}),o(b,{label:"平台渠道"},{default:n(()=>[o(O,{value:c.channelId,"onUpdate:value":e[1]||(e[1]=a=>c.channelId=a),placeholder:"请选择平台渠道",style:{width:"120px"},"allow-clear":""},{default:n(()=>[(s(!0),v(x,null,z(N.value,a=>(s(),g(j,{key:a.id,value:a.id},{default:n(()=>[f(r(a.name),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),o(b,{label:"审核状态"},{default:n(()=>[o(O,{value:c.accountAuditStatus,"onUpdate:value":e[2]||(e[2]=a=>c.accountAuditStatus=a),placeholder:"请选择审核状态",style:{width:"120px"},"allow-clear":""},{default:n(()=>[(s(!0),v(x,null,z(G.value,a=>(s(),g(j,{key:a.value,value:a.value},{default:n(()=>[f(r(a.text),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),o(b,{label:"所属群组"},{default:n(()=>[o(O,{value:c.groupId,"onUpdate:value":e[3]||(e[3]=a=>c.groupId=a),placeholder:"请选择群组",style:{width:"120px"},"allow-clear":"","show-search":"","filter-option":!1,onSearch:E},{default:n(()=>[(s(!0),v(x,null,z(B.value,a=>(s(),g(j,{key:a.id,value:a.id},{default:n(()=>[f(r(a.groupName),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),o(b,null,{default:n(()=>[o(w,null,{default:n(()=>[o(S,{type:"primary",onClick:V},{default:n(()=>e[6]||(e[6]=[f("查询")])),_:1}),o(S,{onClick:M},{default:n(()=>e[7]||(e[7]=[f("重置")])),_:1})]),_:1})]),_:1})]),_:1},8,["model"])]),u("div",_e,[o(w,null,{default:n(()=>[o(S,{type:"primary",onClick:J},{default:n(()=>e[8]||(e[8]=[f("批量通过")])),_:1}),o(S,{danger:"",onClick:P},{default:n(()=>e[9]||(e[9]=[f("批量拒绝")])),_:1})]),_:1})])]),o(ne,{columns:K,"data-source":F.value,loading:I.value,pagination:h,"row-selection":{selectedRowKeys:_.value,onChange:q},onChange:H},{bodyCell:n(({column:a,record:l})=>[a.key==="account"?(s(),g(w,{key:0},{default:n(()=>[o(te,{src:l.channelIcon,size:"small"},null,8,["src"]),u("span",null,r(l.account),1)]),_:2},1024)):p("",!0),a.key==="accountInfo"?(s(),v("div",me,[u("div",ge,[u("div",ye,[e[11]||(e[11]=u("span",{class:"label"},"主页：",-1)),u("a",{href:l.homeUrl,target:"_blank",class:"link-text"},r(l.homeUrl),9,he),o(S,{type:"link",size:"small",onClick:T=>Y(l.homeUrl)},{default:n(()=>e[10]||(e[10]=[f(" 复制 ")])),_:2},1032,["onClick"])])]),u("div",ke,[l.channelCustomFields.includes("fansCount")?(s(),v("div",Ce,"粉丝数："+r(l.fansCount),1)):p("",!0),l.channelCustomFields.includes("friendsCount")?(s(),v("div",be,"好友数："+r(l.friendsCount),1)):p("",!0),l.channelCustomFields.includes("postsCount")?(s(),v("div",Se,"发帖数："+r(l.postsCount),1)):p("",!0)])])):p("",!0),a.key==="member"?(s(),v("div",we,[u("div",null,r(l.memberNickname),1),u("div",xe,[u("span",null,r(l.groupName),1),l.isGroupOwner?(s(),g(ae,{key:0,color:"blue",style:{"margin-left":"10px"}},{default:n(()=>e[12]||(e[12]=[f("群主")])),_:1})):p("",!0)])])):p("",!0),a.key==="accountAuditStatus"?(s(),v(x,{key:3},[f(r(de(A).getEnumText("AccountAuditStatus",l.accountAuditStatus)),1)],64)):p("",!0),a.key==="action"?(s(),g(w,{key:4},{default:n(()=>[l.accountAuditStatus==="pending"?(s(),g(L,{key:0,title:"确定要通过该账号吗？",onConfirm:T=>t.handleResolve(l)},{default:n(()=>e[13]||(e[13]=[u("a",null,"通过",-1)])),_:2},1032,["onConfirm"])):p("",!0),l.accountAuditStatus==="pending"?(s(),g(L,{key:1,title:"确定要拒绝该账号吗？",onConfirm:T=>Q(l)},{default:n(()=>e[14]||(e[14]=[u("a",{class:"danger"},"拒绝",-1)])),_:2},1032,["onConfirm"])):p("",!0)]),_:2},1024)):p("",!0)]),_:1},8,["data-source","loading","pagination","row-selection"])]),o(le,{open:k.value,"onUpdate:open":e[5]||(e[5]=a=>k.value=a),title:"拒绝原因",onOk:W,confirmLoading:R.value},{default:n(()=>[o(oe,{value:y.value,"onUpdate:value":e[4]||(e[4]=a=>y.value=a),placeholder:"请输入拒绝原因",rows:4},null,8,["value"])]),_:1},8,["open","confirmLoading"])])}}},je=se(Ae,[["__scopeId","data-v-0c507590"]]);export{je as default};
