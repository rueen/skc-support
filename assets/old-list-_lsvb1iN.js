import{_ as se,r as k,a as ie,b as C,j as T,k as ce,c as b,e as t,d as m,w as o,f as i,l as H,m as c,o as p,F as de,n as re,p as A,h as y,t as d,B as ue,s as L,M as me,v as pe,z as fe,A as _e}from"./index-D9O2bI05.js";import{_ as he}from"./CopyContent-Bu5npXlr.js";import{P as ke}from"./PageHeader-DTBAjLFU.js";const ge={class:"old-account content-container"},ve={class:"table-container"},be={class:"table-header"},ye={class:"left"},Le={class:"right"},$e={key:0},we={key:1},Ue=["href"],Be={key:3},Fe=["onClick"],Ce={class:"danger"},Ae={__name:"old-list",setup(Pe){const U=k(!1),$=k(null),{t:s}=ie(),P={action:`${ue.businessApiUrl}/old-accounts-fb/import`,headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}},r=C({keyword:"",memberId:void 0}),S=k([]),D=T(()=>[{title:s("account.oldList.FBAccount"),key:"account",dataIndex:"uid"},{title:s("account.oldList.FBNickname"),key:"nickname",dataIndex:"nickname"},{title:s("account.oldList.FBHomepage"),key:"homeUrl"},{title:s("account.oldList.linkedMember"),key:"member"},{title:s("account.oldList.action"),key:"action"}]),N=k([]),f=C({current:1,pageSize:10,total:0}),g=k(!1),B=k(!1),O=T(()=>n.id?s("account.oldList.editTitle"):s("account.oldList.addTitle")),n=C({id:null,uid:"",nickname:"",homeUrl:""}),V={uid:[{required:!0,message:s("account.oldList.FBAccountPlaceholder"),trigger:"blur"}],nickname:[{required:!0,message:s("account.oldList.FBNicknamePlaceholder"),trigger:"blur"}],homeUrl:[{required:!0,message:s("account.oldList.FBHomepagePlaceholder"),trigger:"blur"},{pattern:/^https?:\/\//,message:s("account.oldList.FBHomepagePlaceholder2"),trigger:"blur"}]},_=async()=>{U.value=!0;try{const e=await H("oldAccount.list",{page:f.current,pageSize:f.pageSize,...r});e.code===0?(N.value=e.data.list,f.total=e.data.total):c.error(e.message)}finally{U.value=!1}},E=()=>{n.id=null,n.uid="",n.nickname="",n.homeUrl="",$.value&&$.value.resetFields()},j=()=>{E(),g.value=!0},q=e=>{E(),Object.assign(n,{id:e.id,uid:e.uid,nickname:e.nickname,homeUrl:e.homeUrl}),g.value=!0},x=async e=>{try{const a=await pe("oldAccount.delete",{id:e.id},{urlParams:{id:e.id}});a.code===0?(c.success("delete success"),_()):c.error(a.message)}catch{c.error("delete failed")}},R=()=>{$.value.validate().then(async()=>{B.value=!0;try{let e;n.id?e=await fe("oldAccount.edit",n,{urlParams:{id:n.id}}):e=await _e("oldAccount.add",n),e.code===0?(c.success(n.id?"edit success":"add success"),g.value=!1,_()):c.error(e.message)}finally{B.value=!1}}).catch(e=>{console.log("validate failed",e)})},K=e=>e.type==="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"||e.type==="application/vnd.ms-excel"?(c.loading({content:s("account.oldList.uploadExcelLoading"),key:"importTip"}),!0):(c.error(s("account.oldList.uploadExcelError")),!1),G=e=>{if(c.destroy("importTip"),e.code===0){const a=e.data||{};me.success({content:`import success: ${`total ${a.total||0} data, imported ${a.imported||0} data, skipped ${a.skipped||0} data(Linked Member)`}`}),_()}else c.error(e.message||"import failed")},J=e=>{console.log(e),c.destroy("importTip"),c.error("upload failed")},I=()=>{f.current=1,_()},Q=()=>{r.keyword="",r.memberId=void 0,I()},W=e=>{Object.assign(f,{current:e.current,pageSize:e.pageSize}),_()},z=async(e="")=>{try{const a=await H("member.list",{page:1,pageSize:50,memberNickname:e});a.code===0&&(S.value=a.data.list||[])}catch{c.error("get member list failed")}};return ce(()=>{_(),z()}),(e,a)=>{const v=i("a-input"),h=i("a-form-item"),X=i("a-select-option"),Y=i("a-select"),w=i("a-button"),F=i("a-space"),M=i("a-form"),Z=i("upload-outlined"),ee=i("a-upload"),te=i("plus-outlined"),ae=i("a-popconfirm"),oe=i("a-table"),le=i("a-modal");return p(),b("div",ge,[t(ke,{title:e.$t("account.list.oldAccount"),back:!0,style:{"margin-bottom":"0"}},null,8,["title"]),m("div",ve,[m("div",be,[m("div",ye,[t(M,{layout:"inline",model:r},{default:o(()=>[t(h,{label:e.$t("account.oldList.keyword")},{default:o(()=>[t(v,{value:r.keyword,"onUpdate:value":a[0]||(a[0]=l=>r.keyword=l),placeholder:e.$t("account.oldList.keywordPlaceholder"),"allow-clear":""},null,8,["value","placeholder"])]),_:1},8,["label"]),t(h,{label:e.$t("account.oldList.member")},{default:o(()=>[t(Y,{value:r.memberId,"onUpdate:value":a[1]||(a[1]=l=>r.memberId=l),placeholder:e.$t("account.oldList.memberPlaceholder"),style:{width:"120px"},"allow-clear":"","show-search":"","filter-option":!1,onSearch:z},{default:o(()=>[(p(!0),b(de,null,re(S.value,l=>(p(),A(X,{key:l.id,value:l.id},{default:o(()=>[y(d(l.nickname),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value","placeholder"])]),_:1},8,["label"]),t(h,null,{default:o(()=>[t(F,null,{default:o(()=>[t(w,{type:"primary",onClick:I},{default:o(()=>[y(d(e.$t("common.search")),1)]),_:1}),t(w,{onClick:Q},{default:o(()=>[y(d(e.$t("common.reset")),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["model"])]),m("div",Le,[t(F,null,{default:o(()=>[t(ee,{name:"file",multiple:!1,showUploadList:!1,action:P.action,headers:P.headers,beforeUpload:K,onSuccess:G,onError:J,accept:".xlsx,.xls"},{default:o(()=>[t(w,null,{default:o(()=>[t(Z),y(" "+d(e.$t("account.oldList.import")),1)]),_:1})]),_:1},8,["action","headers"]),t(w,{type:"primary",onClick:j},{default:o(()=>[t(te),y(" "+d(e.$t("account.oldList.add")),1)]),_:1})]),_:1})])]),t(oe,{columns:D.value,"data-source":N.value,loading:U.value,pagination:f,rowKey:"id",onChange:W},{bodyCell:o(({column:l,record:u})=>[l.key==="account"?(p(),b("div",$e,[m("div",null,d(u.uid),1)])):L("",!0),l.key==="nickname"?(p(),b("div",we,d(u.nickname),1)):L("",!0),l.key==="homeUrl"?(p(),A(he,{key:2,content:u.homeUrl},{default:o(()=>[m("a",{href:u.homeUrl,target:"_blank",class:"link-text",style:{"max-width":"200px",display:"inline-block",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap"}},d(u.homeUrl),9,Ue)]),_:2},1032,["content"])):L("",!0),l.key==="member"?(p(),b("div",Be,d(u.memberNickname||"--"),1)):L("",!0),l.key==="action"?(p(),A(F,{key:4},{default:o(()=>[m("a",{onClick:ne=>q(u)},d(e.$t("account.oldList.edit")),9,Fe),t(ae,{title:e.$t("account.oldList.deleteConfirm"),onConfirm:ne=>x(u)},{default:o(()=>[m("a",Ce,d(e.$t("account.oldList.delete")),1)]),_:2},1032,["title","onConfirm"])]),_:2},1024)):L("",!0)]),_:1},8,["columns","data-source","loading","pagination"])]),t(le,{open:g.value,"onUpdate:open":a[5]||(a[5]=l=>g.value=l),title:O.value,onOk:R,confirmLoading:B.value},{default:o(()=>[t(M,{model:n,rules:V,ref_key:"formRef",ref:$,"label-col":{span:6},"wrapper-col":{span:18}},{default:o(()=>[t(h,{label:e.$t("account.oldList.FBAccount"),name:"uid"},{default:o(()=>[t(v,{value:n.uid,"onUpdate:value":a[2]||(a[2]=l=>n.uid=l),placeholder:e.$t("account.oldList.FBAccountPlaceholder")},null,8,["value","placeholder"])]),_:1},8,["label"]),t(h,{label:e.$t("account.oldList.FBNickname"),name:"nickname"},{default:o(()=>[t(v,{value:n.nickname,"onUpdate:value":a[3]||(a[3]=l=>n.nickname=l),placeholder:e.$t("account.oldList.FBNicknamePlaceholder")},null,8,["value","placeholder"])]),_:1},8,["label"]),t(h,{label:e.$t("account.oldList.FBHomepage"),name:"homeUrl"},{default:o(()=>[t(v,{value:n.homeUrl,"onUpdate:value":a[4]||(a[4]=l=>n.homeUrl=l),placeholder:e.$t("account.oldList.FBHomepagePlaceholder")},null,8,["value","placeholder"])]),_:1},8,["label"])]),_:1},8,["model"])]),_:1},8,["open","title","confirmLoading"])])}}},Ie=se(Ae,[["__scopeId","data-v-e7cd1ef7"]]);export{Ie as default};
