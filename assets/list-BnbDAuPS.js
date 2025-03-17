import{_ as le,l as se,m as ue,r as m,a as $,n as ce,b as f,d as l,c as o,w as n,e as i,p as j,j as d,o as c,F as w,q as O,s as _,h as r,t as p,v as g,g as ie,B as D}from"./index-C3w0WgI5.js";const de={class:"account content-container"},re={class:"table-container"},pe={class:"table-header"},ve={class:"left"},me={class:"right"},fe={key:0,class:"account-info"},_e={class:"home-url"},ge={class:"link-text-container"},ye=["href"],he={class:"stats"},ke={class:"stat-item"},be={class:"stat-item"},Ce={class:"stat-item"},Se={key:1},we={class:"group-name"},xe={__name:"list",setup(Ae){const x=se(),F=ue(()=>x.loaded?x.getEnumOptions("AccountAuditStatus"):[]),A=m(!1),v=m([]),k=m(!1),I=m(!1),y=m(""),h=$({current:1,pageSize:10,total:0,showTotal:t=>`共 ${t} 条`}),s=$({account:"",channelId:void 0,accountAuditStatus:void 0,groupId:void 0}),z=m([]),B=m([]),G=[{title:"账号",dataIndex:"account",key:"account"},{title:"平台渠道",dataIndex:"channelName",key:"channelName"},{title:"账号信息",key:"accountInfo"},{title:"会员信息",key:"member"},{title:"审核状态",dataIndex:"accountAuditStatus",key:"accountAuditStatus"},{title:"操作",key:"action",fixed:"right",width:180}],T=m([{id:1,account:"test123",channelName:"抖音",channelId:1,homeUrl:"https://example.com/test123",fansCount:1e3,postsCount:50,memberNickname:"测试会员1",groupName:"群组1",accountAuditStatus:"pending"}]),K=t=>{v.value=t},V=()=>{h.current=1,b()},q=()=>{s.account="",s.channelId=void 0,s.accountAuditStatus=void 0,s.groupId=void 0,V()},M=t=>{Object.assign(h,{current:t.current,pageSize:t.pageSize}),b()},H=async()=>{if(!v.value.length){d.warning("请选择要通过的账号");return}try{const t=await D("account.batchResolve",{ids:v.value});t.code===0?(d.success("操作成功"),v.value=[],b()):d.error(t.message)}catch(t){console.log(t)}},J=async()=>{if(!v.value.length){d.warning("请选择要拒绝的账号");return}y.value="",k.value=!0},P=t=>{v.value=[t.id],y.value="",k.value=!0},Q=async()=>{if(!y.value){d.error("请输入拒绝原因");return}I.value=!0;try{const t=await D("account.batchReject",{ids:v.value,reason:y.value});t.code===0?(d.success("操作成功"),v.value=[],k.value=!1,b()):d.error(t.message)}catch(t){console.log(t)}finally{I.value=!1}},b=async()=>{A.value=!0;try{const t=await j("account.list",{params:{page:h.current,pageSize:h.pageSize,...s}});t.code===0?(T.value=t.data.list,h.total=t.data.total):d.error(t.message)}finally{A.value=!1}},W=async()=>{const t=await j("channel.list");t.code===0&&(z.value=t.data.list)},X=async(t="")=>{try{const e=await j("group.list",{params:{page:1,pageSize:50,keyword:t}});e.code===0&&(B.value=e.data.list||[])}catch{d.error("获取群组列表失败")}},Y=t=>{navigator.clipboard.writeText(t).then(()=>{d.success("复制成功")}).catch(()=>{d.error("复制失败")})};return ce(()=>{b(),X(),W()}),(t,e)=>{const Z=i("a-input"),C=i("a-form-item"),N=i("a-select-option"),R=i("a-select"),S=i("a-button"),U=i("a-space"),ee=i("a-form"),te=i("a-tag"),E=i("a-popconfirm"),ae=i("a-table"),ne=i("a-textarea"),oe=i("a-modal");return c(),f("div",de,[l("div",re,[l("div",pe,[l("div",ve,[o(ee,{layout:"inline",model:s},{default:n(()=>[o(C,{label:"账号"},{default:n(()=>[o(Z,{value:s.account,"onUpdate:value":e[0]||(e[0]=a=>s.account=a),placeholder:"请输入账号","allow-clear":""},null,8,["value"])]),_:1}),o(C,{label:"平台渠道"},{default:n(()=>[o(R,{value:s.channelId,"onUpdate:value":e[1]||(e[1]=a=>s.channelId=a),placeholder:"请选择平台渠道",style:{width:"120px"},"allow-clear":""},{default:n(()=>[(c(!0),f(w,null,O(z.value,a=>(c(),_(N,{key:a.id,value:a.id},{default:n(()=>[r(p(a.name),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),o(C,{label:"审核状态"},{default:n(()=>[o(R,{value:s.accountAuditStatus,"onUpdate:value":e[2]||(e[2]=a=>s.accountAuditStatus=a),placeholder:"请选择审核状态",style:{width:"120px"},"allow-clear":""},{default:n(()=>[(c(!0),f(w,null,O(F.value,a=>(c(),_(N,{key:a.value,value:a.value},{default:n(()=>[r(p(a.text),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),o(C,{label:"所属群组"},{default:n(()=>[o(R,{value:s.groupId,"onUpdate:value":e[3]||(e[3]=a=>s.groupId=a),placeholder:"请选择群组",style:{width:"120px"},"allow-clear":""},{default:n(()=>[(c(!0),f(w,null,O(B.value,a=>(c(),_(N,{key:a.id,value:a.id},{default:n(()=>[r(p(a.name),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),o(C,null,{default:n(()=>[o(U,null,{default:n(()=>[o(S,{type:"primary",onClick:V},{default:n(()=>e[6]||(e[6]=[r("查询")])),_:1}),o(S,{onClick:q},{default:n(()=>e[7]||(e[7]=[r("重置")])),_:1})]),_:1})]),_:1})]),_:1},8,["model"])]),l("div",me,[o(U,null,{default:n(()=>[o(S,{type:"primary",onClick:H},{default:n(()=>e[8]||(e[8]=[r("批量通过")])),_:1}),o(S,{danger:"",onClick:J},{default:n(()=>e[9]||(e[9]=[r("批量拒绝")])),_:1})]),_:1})])]),o(ae,{columns:G,"data-source":T.value,loading:A.value,pagination:h,"row-selection":{selectedRowKeys:v.value,onChange:K},onChange:M},{bodyCell:n(({column:a,record:u})=>[a.key==="accountInfo"?(c(),f("div",fe,[l("div",_e,[l("div",ge,[e[11]||(e[11]=l("span",{class:"label"},"主页：",-1)),l("a",{href:u.homeUrl,target:"_blank",class:"link-text"},p(u.homeUrl),9,ye),o(S,{type:"link",size:"small",onClick:L=>Y(u.homeUrl)},{default:n(()=>e[10]||(e[10]=[r(" 复制 ")])),_:2},1032,["onClick"])])]),l("div",he,[l("div",ke,"粉丝数："+p(u.fansCount),1),l("div",be,"好友数："+p(u.friendsCount),1),l("div",Ce,"发帖数："+p(u.postsCount),1)])])):g("",!0),a.key==="member"?(c(),f("div",Se,[l("div",null,p(u.memberNickname),1),l("div",we,[l("span",null,p(u.groupName),1),u.isGroupOwner?(c(),_(te,{key:0,color:"blue",style:{"margin-left":"10px"}},{default:n(()=>e[12]||(e[12]=[r("群主")])),_:1})):g("",!0)])])):g("",!0),a.key==="accountAuditStatus"?(c(),f(w,{key:2},[r(p(ie(x).getEnumText("AccountAuditStatus",u.accountAuditStatus)),1)],64)):g("",!0),a.key==="action"?(c(),_(U,{key:3},{default:n(()=>[u.accountAuditStatus==="pending"?(c(),_(E,{key:0,title:"确定要通过该账号吗？",onConfirm:L=>t.handleResolve(u)},{default:n(()=>e[13]||(e[13]=[l("a",null,"通过",-1)])),_:2},1032,["onConfirm"])):g("",!0),u.accountAuditStatus==="pending"?(c(),_(E,{key:1,title:"确定要拒绝该账号吗？",onConfirm:L=>P(u)},{default:n(()=>e[14]||(e[14]=[l("a",{class:"danger"},"拒绝",-1)])),_:2},1032,["onConfirm"])):g("",!0)]),_:2},1024)):g("",!0)]),_:1},8,["data-source","loading","pagination","row-selection"])]),o(oe,{open:k.value,"onUpdate:open":e[5]||(e[5]=a=>k.value=a),title:"拒绝原因",onOk:Q,confirmLoading:I.value},{default:n(()=>[o(ne,{value:y.value,"onUpdate:value":e[4]||(e[4]=a=>y.value=a),placeholder:"请输入拒绝原因",rows:4},null,8,["value"])]),_:1},8,["open","confirmLoading"])])}}},Ne=le(xe,[["__scopeId","data-v-c34c28dd"]]);export{Ne as default};
