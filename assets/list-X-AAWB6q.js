import{_ as ye,a as ke,b as be,j as J,r as v,c as Q,k as we,d,e as i,f as n,w as a,g as r,l as O,m as _,h as Ce,o as c,F as y,n as N,p as g,i as m,t as s,s as p,q as Se,A as W,M as X}from"./index-SKVrdFi-.js";import{_ as Y}from"./CopyContent-BQwhHWS3.js";import{G as $e}from"./GroupOwner--vYQqJo4.js";const je={class:"account content-container"},Ae={class:"table-container"},Re={class:"table-header"},Ie={class:"left"},Oe={class:"right"},Ne={style:{"text-align":"left","margin-bottom":"16px"}},Ue={key:0,class:"account-info"},ze={class:"link-text-container"},Ee={class:"label"},Fe=["href"],Pe={class:"stats"},Te={key:0,class:"stat-item"},Be={key:1,class:"stat-item"},Me={key:2,class:"stat-item"},Ve={key:1},De={class:"danger"},Ge={__name:"list",setup(Le){const U=Ce(),z=ke(),{t:f}=be(),Z=J(()=>z.loaded?z.getEnumOptions("AccountAuditStatus"):[]),E=v(!1),h=v([]),C=v(!1),F=v(!1),k=v(""),u=Q({keyword:"",channelId:void 0,accountAuditStatus:"pending",groupId:void 0,memberId:void 0}),T=v([]),B=v([]),M=v([]),x=J(()=>[{title:f("account.list.accountInfo"),key:"accountInfo",width:500},{title:f("account.list.member"),key:"member"},{title:f("account.list.submitTime"),dataIndex:"submitTime",key:"submitTime"},{title:f("account.list.auditStatus"),dataIndex:"accountAuditStatus",key:"accountAuditStatus"},{title:f("account.list.waiterName"),key:"waiterName"},{title:f("account.list.action"),key:"action"}]),ee={selectedRowKeys:h,onChange:e=>{h.value=e},getCheckboxProps:e=>({disabled:e.accountAuditStatus!=="pending"})},V=v([]),b=Q({current:1,pageSize:10,total:0}),D=()=>{b.current=1,S()},te=()=>{u.keyword="",u.channelId=void 0,u.accountAuditStatus=void 0,u.groupId=void 0,u.memberId=void 0,D()},ae=e=>{U.push(`/member/view/${e.memberId}`)},ne=e=>{U.push({name:"AccountEdit",params:{id:e.id}})},oe=e=>{X.error({content:e.rejectReason})},le=()=>{U.push("/account/old")},se=e=>{Object.assign(b,{current:e.current,pageSize:e.pageSize}),S()},ce=async e=>{h.value=[e.id],G()},G=async()=>{if(!h.value.length){_.warning(f("account.list.message.selectAccount"));return}const e=await W("account.batchResolve",{ids:h.value});if(e.code===0){const o=e.data.failed.map(P=>P.reason).join(",");o?X.error({title:f("account.list.batchRejectFailedTitle"),content:o}):(_.success(f("account.list.message.success")),h.value=[],S())}else _.error(e.message)},ue=async()=>{if(!h.value.length){_.warning(f("account.list.message.selectAccount"));return}k.value="",C.value=!0},ie=e=>{h.value=[e.id],k.value="",C.value=!0},re=async()=>{if(!k.value){_.error(f("account.list.message.rejectReason"));return}F.value=!0;try{const e=await W("account.batchReject",{ids:h.value,rejectReason:k.value});e.code===0?(_.success(f("account.list.message.success")),h.value=[],C.value=!1,S()):_.error(e.message)}catch(e){console.log(e)}finally{F.value=!1}},S=async()=>{E.value=!0;try{const e=await O("account.list",{page:b.current,pageSize:b.pageSize,...u});e.code===0?(V.value=e.data.list,b.total=e.data.total):_.error(e.message)}finally{E.value=!1}},de=async()=>{const e=await O("channel.list");e.code===0&&(T.value=e.data.list)},L=async(e="")=>{try{const o=await O("group.list",{page:1,pageSize:50,groupName:e});o.code===0&&(B.value=o.data.list||[])}catch{_.error("获取群组列表失败")}},K=async(e="")=>{const o=await O("member.list",{page:1,pageSize:50,memberNickname:e});o.code===0&&(M.value=o.data.list||[])};return we(()=>{S(),L(),de(),K()}),(e,o)=>{const P=r("a-input"),w=r("a-form-item"),A=r("a-select-option"),R=r("a-select"),$=r("a-button"),j=r("a-space"),me=r("a-form"),pe=r("EditOutlined"),fe=r("a-avatar"),q=r("a-typography-link"),he=r("info-circle-outlined"),H=r("a-popconfirm"),ve=r("a-table"),_e=r("a-textarea"),ge=r("a-modal");return c(),d("div",je,[i("div",Ae,[i("div",Re,[i("div",Ie,[n(me,{layout:"inline",model:u},{default:a(()=>[n(w,{label:e.$t("account.search.account")},{default:a(()=>[n(P,{value:u.keyword,"onUpdate:value":o[0]||(o[0]=t=>u.keyword=t),placeholder:e.$t("account.search.accountPlaceholder"),"allow-clear":""},null,8,["value","placeholder"])]),_:1},8,["label"]),n(w,{label:e.$t("account.search.channel")},{default:a(()=>[n(R,{value:u.channelId,"onUpdate:value":o[1]||(o[1]=t=>u.channelId=t),placeholder:e.$t("account.search.channelPlaceholder"),style:{width:"120px"},"allow-clear":""},{default:a(()=>[(c(!0),d(y,null,N(T.value,t=>(c(),g(A,{key:t.id,value:t.id},{default:a(()=>[m(s(t.name),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value","placeholder"])]),_:1},8,["label"]),n(w,{label:e.$t("account.search.auditStatus")},{default:a(()=>[n(R,{value:u.accountAuditStatus,"onUpdate:value":o[2]||(o[2]=t=>u.accountAuditStatus=t),placeholder:e.$t("account.search.auditStatusPlaceholder"),style:{width:"120px"},"allow-clear":""},{default:a(()=>[(c(!0),d(y,null,N(Z.value,t=>(c(),g(A,{key:t.value,value:t.value},{default:a(()=>[m(s(t.text),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value","placeholder"])]),_:1},8,["label"]),n(w,{label:e.$t("account.search.group")},{default:a(()=>[n(R,{value:u.groupId,"onUpdate:value":o[3]||(o[3]=t=>u.groupId=t),placeholder:e.$t("account.search.groupPlaceholder"),style:{width:"120px"},"allow-clear":"","show-search":"","filter-option":!1,onSearch:L},{default:a(()=>[(c(!0),d(y,null,N(B.value,t=>(c(),g(A,{key:t.id,value:t.id},{default:a(()=>[m(s(t.groupName),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value","placeholder"])]),_:1},8,["label"]),n(w,{label:e.$t("account.search.member")},{default:a(()=>[n(R,{value:u.memberId,"onUpdate:value":o[4]||(o[4]=t=>u.memberId=t),placeholder:e.$t("account.search.memberPlaceholder"),style:{width:"120px"},"allow-clear":"","show-search":"","filter-option":!1,onSearch:K},{default:a(()=>[(c(!0),d(y,null,N(M.value,t=>(c(),g(A,{key:t.id,value:t.id},{default:a(()=>[m(s(t.nickname),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value","placeholder"])]),_:1},8,["label"]),n(w,null,{default:a(()=>[n(j,null,{default:a(()=>[n($,{type:"primary",onClick:D},{default:a(()=>[m(s(e.$t("common.search")),1)]),_:1}),n($,{onClick:te},{default:a(()=>[m(s(e.$t("common.reset")),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["model"])]),i("div",Oe,[n(j,null,{default:a(()=>[n($,{type:"primary",onClick:G},{default:a(()=>[m(s(e.$t("common.batchResolve")),1)]),_:1}),n($,{danger:"",onClick:ue},{default:a(()=>[m(s(e.$t("common.batchReject")),1)]),_:1})]),_:1})])]),i("div",Ne,[n($,{onClick:le},{default:a(()=>[m(s(e.$t("account.list.oldAccount")),1)]),_:1})]),n(ve,{columns:x.value,"data-source":V.value,loading:E.value,pagination:b,"row-selection":ee,rowKey:"id",onChange:se},{bodyCell:a(({column:t,record:l})=>[t.key==="accountInfo"?(c(),d("div",Ue,[n(pe,{class:"edit-icon",onClick:I=>ne(l)},null,8,["onClick"]),n(j,null,{default:a(()=>[n(fe,{src:l.channelIcon,size:"small"},null,8,["src"]),i("span",null,s(l.account),1)]),_:2},1024),i("div",null,[i("div",ze,[i("span",Ee,s(e.$t("account.list.homepage"))+"：",1),n(Y,{content:l.homeUrl},{default:a(()=>[n(q,null,{default:a(()=>[i("a",{href:l.homeUrl,target:"_blank"},s(l.homeUrl),9,Fe)]),_:2},1024)]),_:2},1032,["content"])])]),i("div",null,[o[7]||(o[7]=i("span",{class:"label"},"uid：",-1)),n(Y,{content:l.uid},null,8,["content"])]),i("div",Pe,[l.channelCustomFields.includes("fansCount")?(c(),d("div",Te,s(e.$t("account.list.fansCount"))+"："+s(l.fansCount),1)):p("",!0),l.channelCustomFields.includes("friendsCount")?(c(),d("div",Be,s(e.$t("account.list.friendsCount"))+"："+s(l.friendsCount),1)):p("",!0),l.channelCustomFields.includes("postsCount")?(c(),d("div",Me,s(e.$t("account.list.postsCount"))+"："+s(l.postsCount),1)):p("",!0)])])):p("",!0),t.key==="member"?(c(),d("div",Ve,[i("div",null,[n(q,{onClick:I=>ae(l)},{default:a(()=>[m(s(l.memberNickname),1)]),_:2},1032,["onClick"])]),n(j,{class:"group-name"},{default:a(()=>[i("span",null,s(l.groupName),1),l.isGroupOwner?(c(),g($e,{key:0})):p("",!0)]),_:2},1024)])):p("",!0),t.key==="accountAuditStatus"?(c(),d(y,{key:2},[m(s(Se(z).getEnumText("AccountAuditStatus",l.accountAuditStatus))+" ",1),l.accountAuditStatus==="rejected"?(c(),g(he,{key:0,class:"danger",onClick:I=>oe(l)},null,8,["onClick"])):p("",!0)],64)):p("",!0),t.key==="waiterName"?(c(),d(y,{key:3},[m(s(l.waiterName||"--"),1)],64)):p("",!0),t.key==="action"?(c(),g(j,{key:4},{default:a(()=>[l.accountAuditStatus==="pending"?(c(),g(H,{key:0,title:e.$t("account.list.resolveConfirm"),onConfirm:I=>ce(l)},{default:a(()=>[i("a",null,s(e.$t("account.list.resolve")),1)]),_:2},1032,["title","onConfirm"])):p("",!0),l.accountAuditStatus==="pending"?(c(),g(H,{key:1,title:e.$t("account.list.rejectConfirm"),onConfirm:I=>ie(l)},{default:a(()=>[i("a",De,s(e.$t("account.list.reject")),1)]),_:2},1032,["title","onConfirm"])):p("",!0)]),_:2},1024)):p("",!0),t.key==="rejectReason"?(c(),d(y,{key:5},[m(s(l.rejectReason),1)],64)):p("",!0)]),_:1},8,["columns","data-source","loading","pagination"])]),n(ge,{open:C.value,"onUpdate:open":o[6]||(o[6]=t=>C.value=t),title:e.$t("account.list.rejectReason"),onOk:re,confirmLoading:F.value},{default:a(()=>[n(_e,{value:k.value,"onUpdate:value":o[5]||(o[5]=t=>k.value=t),placeholder:e.$t("account.list.rejectReasonPlaceholder"),rows:4},null,8,["value","placeholder"])]),_:1},8,["open","title","confirmLoading"])])}}},Je=ye(Ge,[["__scopeId","data-v-ab2b9ee3"]]);export{Je as default};
