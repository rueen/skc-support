import{_ as le,l as se,m as ue,r as m,a as D,n as ie,b as d,d as u,c as o,w as n,e as c,p as U,j as r,o as s,F as S,q as N,s as g,h as f,t as p,v,g as ce,B as $}from"./index-COFnzTVb.js";const de={class:"account content-container"},re={class:"table-container"},pe={class:"table-header"},ve={class:"left"},fe={class:"right"},_e={key:0},me=["src"],ge={key:1,class:"account-info"},ye={class:"home-url"},he={class:"link-text-container"},ke=["href"],Ce={class:"stats"},be={key:0,class:"stat-item"},we={key:1,class:"stat-item"},Se={key:2,class:"stat-item"},xe={key:2},Ae={class:"group-name"},Ie={__name:"list",setup(Re){const x=se(),G=ue(()=>x.loaded?x.getEnumOptions("AccountAuditStatus"):[]),A=m(!1),_=m([]),k=m(!1),I=m(!1),y=m(""),i=D({account:"",channelId:void 0,accountAuditStatus:void 0,groupId:void 0}),z=m([]),B=m([]),K=[{title:"账号名称",key:"account"},{title:"账号详情",key:"accountInfo"},{title:"会员信息",key:"member"},{title:"审核状态",dataIndex:"accountAuditStatus",key:"accountAuditStatus"},{title:"操作",key:"action",fixed:"right",width:180}],F=m([]),h=D({current:1,pageSize:10,total:0}),q=t=>{_.value=t},V=()=>{h.current=1,C()},M=()=>{i.account="",i.channelId=void 0,i.accountAuditStatus=void 0,i.groupId=void 0,V()},H=t=>{Object.assign(h,{current:t.current,pageSize:t.pageSize}),C()},J=async()=>{if(!_.value.length){r.warning("请选择要通过的账号");return}try{const t=await $("account.batchResolve",{ids:_.value});t.code===0?(r.success("操作成功"),_.value=[],C()):r.error(t.message)}catch(t){console.log(t)}},P=async()=>{if(!_.value.length){r.warning("请选择要拒绝的账号");return}y.value="",k.value=!0},Q=t=>{_.value=[t.id],y.value="",k.value=!0},W=async()=>{if(!y.value){r.error("请输入拒绝原因");return}I.value=!0;try{const t=await $("account.batchReject",{ids:_.value,reason:y.value});t.code===0?(r.success("操作成功"),_.value=[],k.value=!1,C()):r.error(t.message)}catch(t){console.log(t)}finally{I.value=!1}},C=async()=>{A.value=!0;try{const t=await U("account.list",{page:h.current,pageSize:h.pageSize,...i});t.code===0?(F.value=t.data.list,h.total=t.data.total):r.error(t.message)}finally{A.value=!1}},X=async()=>{const t=await U("channel.list");t.code===0&&(z.value=t.data.list)},E=async(t="")=>{try{const e=await U("group.list",{page:1,pageSize:50,groupName:t});e.code===0&&(B.value=e.data.list||[])}catch{r.error("获取群组列表失败")}},Y=t=>{navigator.clipboard.writeText(t).then(()=>{r.success("复制成功")}).catch(()=>{r.error("复制失败")})};return ie(()=>{C(),E(),X()}),(t,e)=>{const Z=c("a-input"),b=c("a-form-item"),R=c("a-select-option"),j=c("a-select"),w=c("a-button"),O=c("a-space"),ee=c("a-form"),te=c("a-tag"),L=c("a-popconfirm"),ae=c("a-table"),ne=c("a-textarea"),oe=c("a-modal");return s(),d("div",de,[u("div",re,[u("div",pe,[u("div",ve,[o(ee,{layout:"inline",model:i},{default:n(()=>[o(b,{label:"账号"},{default:n(()=>[o(Z,{value:i.account,"onUpdate:value":e[0]||(e[0]=a=>i.account=a),placeholder:"请输入账号","allow-clear":""},null,8,["value"])]),_:1}),o(b,{label:"平台渠道"},{default:n(()=>[o(j,{value:i.channelId,"onUpdate:value":e[1]||(e[1]=a=>i.channelId=a),placeholder:"请选择平台渠道",style:{width:"120px"},"allow-clear":""},{default:n(()=>[(s(!0),d(S,null,N(z.value,a=>(s(),g(R,{key:a.id,value:a.id},{default:n(()=>[f(p(a.name),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),o(b,{label:"审核状态"},{default:n(()=>[o(j,{value:i.accountAuditStatus,"onUpdate:value":e[2]||(e[2]=a=>i.accountAuditStatus=a),placeholder:"请选择审核状态",style:{width:"120px"},"allow-clear":""},{default:n(()=>[(s(!0),d(S,null,N(G.value,a=>(s(),g(R,{key:a.value,value:a.value},{default:n(()=>[f(p(a.text),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),o(b,{label:"所属群组"},{default:n(()=>[o(j,{value:i.groupId,"onUpdate:value":e[3]||(e[3]=a=>i.groupId=a),placeholder:"请选择群组",style:{width:"120px"},"allow-clear":"","show-search":"","filter-option":!1,onSearch:E},{default:n(()=>[(s(!0),d(S,null,N(B.value,a=>(s(),g(R,{key:a.id,value:a.id},{default:n(()=>[f(p(a.groupName),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),o(b,null,{default:n(()=>[o(O,null,{default:n(()=>[o(w,{type:"primary",onClick:V},{default:n(()=>e[6]||(e[6]=[f("查询")])),_:1}),o(w,{onClick:M},{default:n(()=>e[7]||(e[7]=[f("重置")])),_:1})]),_:1})]),_:1})]),_:1},8,["model"])]),u("div",fe,[o(O,null,{default:n(()=>[o(w,{type:"primary",onClick:J},{default:n(()=>e[8]||(e[8]=[f("批量通过")])),_:1}),o(w,{danger:"",onClick:P},{default:n(()=>e[9]||(e[9]=[f("批量拒绝")])),_:1})]),_:1})])]),o(ae,{columns:K,"data-source":F.value,loading:A.value,pagination:h,"row-selection":{selectedRowKeys:_.value,onChange:q},onChange:H},{bodyCell:n(({column:a,record:l})=>[a.key==="account"?(s(),d("div",_e,[u("div",null,[u("img",{src:l.channelIcon,alt:"渠道图标",style:{width:"20px",height:"20px","border-radius":"50%"}},null,8,me),u("span",null,p(l.account),1)])])):v("",!0),a.key==="accountInfo"?(s(),d("div",ge,[u("div",ye,[u("div",he,[e[11]||(e[11]=u("span",{class:"label"},"主页：",-1)),u("a",{href:l.homeUrl,target:"_blank",class:"link-text"},p(l.homeUrl),9,ke),o(w,{type:"link",size:"small",onClick:T=>Y(l.homeUrl)},{default:n(()=>e[10]||(e[10]=[f(" 复制 ")])),_:2},1032,["onClick"])])]),u("div",Ce,[l.channelCustomFields.includes("fansCount")?(s(),d("div",be,"粉丝数："+p(l.fansCount),1)):v("",!0),l.channelCustomFields.includes("friendsCount")?(s(),d("div",we,"好友数："+p(l.friendsCount),1)):v("",!0),l.channelCustomFields.includes("postsCount")?(s(),d("div",Se,"发帖数："+p(l.postsCount),1)):v("",!0)])])):v("",!0),a.key==="member"?(s(),d("div",xe,[u("div",null,p(l.memberNickname),1),u("div",Ae,[u("span",null,p(l.groupName),1),l.isGroupOwner?(s(),g(te,{key:0,color:"blue",style:{"margin-left":"10px"}},{default:n(()=>e[12]||(e[12]=[f("群主")])),_:1})):v("",!0)])])):v("",!0),a.key==="accountAuditStatus"?(s(),d(S,{key:3},[f(p(ce(x).getEnumText("AccountAuditStatus",l.accountAuditStatus)),1)],64)):v("",!0),a.key==="action"?(s(),g(O,{key:4},{default:n(()=>[l.accountAuditStatus==="pending"?(s(),g(L,{key:0,title:"确定要通过该账号吗？",onConfirm:T=>t.handleResolve(l)},{default:n(()=>e[13]||(e[13]=[u("a",null,"通过",-1)])),_:2},1032,["onConfirm"])):v("",!0),l.accountAuditStatus==="pending"?(s(),g(L,{key:1,title:"确定要拒绝该账号吗？",onConfirm:T=>Q(l)},{default:n(()=>e[14]||(e[14]=[u("a",{class:"danger"},"拒绝",-1)])),_:2},1032,["onConfirm"])):v("",!0)]),_:2},1024)):v("",!0)]),_:1},8,["data-source","loading","pagination","row-selection"])]),o(oe,{open:k.value,"onUpdate:open":e[5]||(e[5]=a=>k.value=a),title:"拒绝原因",onOk:W,confirmLoading:I.value},{default:n(()=>[o(ne,{value:y.value,"onUpdate:value":e[4]||(e[4]=a=>y.value=a),placeholder:"请输入拒绝原因",rows:4},null,8,["value"])]),_:1},8,["open","confirmLoading"])])}}},Oe=le(Ie,[["__scopeId","data-v-c105934c"]]);export{Oe as default};
