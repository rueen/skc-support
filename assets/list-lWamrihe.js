import{_ as ie,i as de,j as re,r as m,a as G,k as pe,b as p,d as c,c as o,w as n,e as i,l as N,m as v,o as s,F as w,n as B,p as g,h as f,t as d,q as r,g as ve,z as K,M as fe}from"./index-DsrgIgmo.js";const _e={class:"account content-container"},me={class:"table-container"},ge={class:"table-header"},ye={class:"left"},ke={class:"right"},he={key:1,class:"account-info"},Ce={class:"home-url"},Se={class:"link-text-container"},be=["href"],we={class:"stats"},xe={key:0,class:"stat-item"},Ae={key:1,class:"stat-item"},je={key:2,class:"stat-item"},Re={key:2},Ie={class:"group-name"},ze={__name:"list",setup(Oe){const A=de(),q=re(()=>A.loaded?A.getEnumOptions("AccountAuditStatus"):[]),j=m(!1),_=m([]),h=m(!1),R=m(!1),y=m(""),u=G({account:"",channelId:void 0,accountAuditStatus:"pending",groupId:void 0}),F=m([]),V=m([]),I=[{title:"账号名称",key:"account"},{title:"账号详情",key:"accountInfo"},{title:"会员信息",key:"member"},{title:"审核状态",dataIndex:"accountAuditStatus",key:"accountAuditStatus"}],P=[...I,{title:"操作",key:"action"}],H=[...I,{title:"拒绝原因",key:"rejectReason"}],J={selectedRowKeys:_,onChange:t=>{_.value=t},getCheckboxProps:t=>({disabled:t.accountAuditStatus!=="pending"})},E=m([]),k=G({current:1,pageSize:10,total:0}),L=()=>{k.current=1,C()},Q=()=>{u.account="",u.channelId=void 0,u.accountAuditStatus=void 0,u.groupId=void 0,L()},W=t=>{Object.assign(k,{current:t.current,pageSize:t.pageSize}),C()},X=async t=>{_.value=[t.id],T()},T=async()=>{if(!_.value.length){v.warning("请选择要通过的账号");return}const t=await K("account.batchResolve",{ids:_.value});if(t.code===0){const e=t.data.failed.map(z=>z.reason).join(",");e?fe.error({title:"操作失败，失败原因",content:e}):(v.success("操作成功"),_.value=[],C())}else v.error(t.message)},Y=async()=>{if(!_.value.length){v.warning("请选择要拒绝的账号");return}y.value="",h.value=!0},Z=t=>{_.value=[t.id],y.value="",h.value=!0},ee=async()=>{if(!y.value){v.error("请输入拒绝原因");return}R.value=!0;try{const t=await K("account.batchReject",{ids:_.value,rejectReason:y.value});t.code===0?(v.success("操作成功"),_.value=[],h.value=!1,C()):v.error(t.message)}catch(t){console.log(t)}finally{R.value=!1}},C=async()=>{j.value=!0;try{const t=await N("account.list",{page:k.current,pageSize:k.pageSize,...u});t.code===0?(E.value=t.data.list,k.total=t.data.total):v.error(t.message)}finally{j.value=!1}},te=async()=>{const t=await N("channel.list");t.code===0&&(F.value=t.data.list)},D=async(t="")=>{try{const e=await N("group.list",{page:1,pageSize:50,groupName:t});e.code===0&&(V.value=e.data.list||[])}catch{v.error("获取群组列表失败")}},ae=t=>{navigator.clipboard.writeText(t).then(()=>{v.success("复制成功")}).catch(()=>{v.error("复制失败")})};return pe(()=>{C(),D(),te()}),(t,e)=>{const z=i("a-input"),S=i("a-form-item"),O=i("a-select-option"),U=i("a-select"),b=i("a-button"),x=i("a-space"),ne=i("a-form"),oe=i("a-avatar"),le=i("a-tag"),M=i("a-popconfirm"),se=i("a-table"),ue=i("a-textarea"),ce=i("a-modal");return s(),p("div",_e,[c("div",me,[c("div",ge,[c("div",ye,[o(ne,{layout:"inline",model:u},{default:n(()=>[o(S,{label:"账号"},{default:n(()=>[o(z,{value:u.account,"onUpdate:value":e[0]||(e[0]=a=>u.account=a),placeholder:"请输入账号","allow-clear":""},null,8,["value"])]),_:1}),o(S,{label:"平台渠道"},{default:n(()=>[o(U,{value:u.channelId,"onUpdate:value":e[1]||(e[1]=a=>u.channelId=a),placeholder:"请选择平台渠道",style:{width:"120px"},"allow-clear":""},{default:n(()=>[(s(!0),p(w,null,B(F.value,a=>(s(),g(O,{key:a.id,value:a.id},{default:n(()=>[f(d(a.name),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),o(S,{label:"审核状态"},{default:n(()=>[o(U,{value:u.accountAuditStatus,"onUpdate:value":e[2]||(e[2]=a=>u.accountAuditStatus=a),placeholder:"请选择审核状态",style:{width:"120px"},"allow-clear":""},{default:n(()=>[(s(!0),p(w,null,B(q.value,a=>(s(),g(O,{key:a.value,value:a.value},{default:n(()=>[f(d(a.text),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),o(S,{label:"所属群组"},{default:n(()=>[o(U,{value:u.groupId,"onUpdate:value":e[3]||(e[3]=a=>u.groupId=a),placeholder:"请选择群组",style:{width:"120px"},"allow-clear":"","show-search":"","filter-option":!1,onSearch:D},{default:n(()=>[(s(!0),p(w,null,B(V.value,a=>(s(),g(O,{key:a.id,value:a.id},{default:n(()=>[f(d(a.groupName),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),o(S,null,{default:n(()=>[o(x,null,{default:n(()=>[o(b,{type:"primary",onClick:L},{default:n(()=>e[6]||(e[6]=[f("查询")])),_:1}),o(b,{onClick:Q},{default:n(()=>e[7]||(e[7]=[f("重置")])),_:1})]),_:1})]),_:1})]),_:1},8,["model"])]),c("div",ke,[o(x,null,{default:n(()=>[o(b,{type:"primary",onClick:T},{default:n(()=>e[8]||(e[8]=[f("批量通过")])),_:1}),o(b,{danger:"",onClick:Y},{default:n(()=>e[9]||(e[9]=[f("批量拒绝")])),_:1})]),_:1})])]),o(se,{columns:u.accountAuditStatus==="rejected"?H:u.accountAuditStatus==="pending"?P:I,"data-source":E.value,loading:j.value,pagination:k,"row-selection":J,rowKey:"id",onChange:W},{bodyCell:n(({column:a,record:l})=>[a.key==="account"?(s(),g(x,{key:0},{default:n(()=>[o(oe,{src:l.channelIcon,size:"small"},null,8,["src"]),c("span",null,d(l.account),1)]),_:2},1024)):r("",!0),a.key==="accountInfo"?(s(),p("div",he,[c("div",Ce,[c("div",Se,[e[11]||(e[11]=c("span",{class:"label"},"主页：",-1)),c("a",{href:l.homeUrl,target:"_blank",class:"link-text"},d(l.homeUrl),9,be),o(b,{type:"link",size:"small",onClick:$=>ae(l.homeUrl)},{default:n(()=>e[10]||(e[10]=[f(" 复制 ")])),_:2},1032,["onClick"])])]),c("div",we,[l.channelCustomFields.includes("fansCount")?(s(),p("div",xe,"粉丝数："+d(l.fansCount),1)):r("",!0),l.channelCustomFields.includes("friendsCount")?(s(),p("div",Ae,"好友数："+d(l.friendsCount),1)):r("",!0),l.channelCustomFields.includes("postsCount")?(s(),p("div",je,"发帖数："+d(l.postsCount),1)):r("",!0)])])):r("",!0),a.key==="member"?(s(),p("div",Re,[c("div",null,d(l.memberNickname),1),c("div",Ie,[c("span",null,d(l.groupName),1),l.isGroupOwner?(s(),g(le,{key:0,color:"blue",style:{"margin-left":"10px"}},{default:n(()=>e[12]||(e[12]=[f("群主")])),_:1})):r("",!0)])])):r("",!0),a.key==="accountAuditStatus"?(s(),p(w,{key:3},[f(d(ve(A).getEnumText("AccountAuditStatus",l.accountAuditStatus)),1)],64)):r("",!0),a.key==="action"?(s(),g(x,{key:4},{default:n(()=>[l.accountAuditStatus==="pending"?(s(),g(M,{key:0,title:"确定要通过该账号吗？",onConfirm:$=>X(l)},{default:n(()=>e[13]||(e[13]=[c("a",null,"通过",-1)])),_:2},1032,["onConfirm"])):r("",!0),l.accountAuditStatus==="pending"?(s(),g(M,{key:1,title:"确定要拒绝该账号吗？",onConfirm:$=>Z(l)},{default:n(()=>e[14]||(e[14]=[c("a",{class:"danger"},"拒绝",-1)])),_:2},1032,["onConfirm"])):r("",!0)]),_:2},1024)):r("",!0),a.key==="rejectReason"?(s(),p(w,{key:5},[f(d(l.rejectReason),1)],64)):r("",!0)]),_:1},8,["columns","data-source","loading","pagination"])]),o(ce,{open:h.value,"onUpdate:open":e[5]||(e[5]=a=>h.value=a),title:"拒绝原因",onOk:ee,confirmLoading:R.value},{default:n(()=>[o(ue,{value:y.value,"onUpdate:value":e[4]||(e[4]=a=>y.value=a),placeholder:"请输入拒绝原因",rows:4},null,8,["value"])]),_:1},8,["open","confirmLoading"])])}}},Ne=ie(ze,[["__scopeId","data-v-e296c229"]]);export{Ne as default};
