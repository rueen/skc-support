import{_ as de,i as re,r as m,a as F,b,d as p,c as n,w as t,e as u,o as r,F as j,j as P,h as s,t as i,g as V,k as v,l as g,m as h}from"./index-B8LRHCPB.js";import{A as _}from"./enums-C8EG5C38.js";const ce={class:"account-audit content-container"},pe={class:"table-container"},_e={class:"table-header"},me={class:"left"},fe={class:"right"},ve={key:0},ge={class:"group-name"},he=["href"],ye=["onClick"],ke=["href"],be={__name:"list",setup(Ce){const{locale:Ne}=re(),x=m(!1),C=m([]),U=m(!1),N=m(!1),E=m(!1),w=m(""),c=m(null),I=F({current:1,pageSize:10,total:0,showTotal:l=>`共 ${l} 条`}),d=F({account:"",channelId:void 0,auditStatus:void 0,groupId:void 0}),J=[{id:1,name:"抖音"},{id:2,name:"快手"}],K=[{id:1,name:"群组1"},{id:2,name:"群组2"}],q=[{title:"账号",dataIndex:"account",key:"account"},{title:"平台渠道",dataIndex:"channelName",key:"channelName"},{title:"主页链接",key:"homeUrl",width:200,ellipsis:!0},{title:"粉丝数",dataIndex:"fansCount",key:"fansCount"},{title:"发帖数",dataIndex:"postsCount",key:"postsCount"},{title:"会员信息",key:"member"},{title:"审核状态",dataIndex:"auditStatus",key:"auditStatus"},{title:"操作",key:"action",fixed:"right",width:180}],O=m([{id:1,account:"test123",channelName:"抖音",channelId:1,homeUrl:"https://example.com/test123",fansCount:1e3,postsCount:50,memberNickname:"测试会员1",groupName:"群组1",auditStatus:_.PENDING}]),H=l=>{C.value=l},B=l=>({[_.PENDING]:"待审核",[_.APPROVED]:"已通过",[_.REJECTED]:"已拒绝"})[l]||l,M=l=>({[_.PENDING]:"warning",[_.APPROVED]:"success",[_.REJECTED]:"error"})[l],G=()=>{I.current=1,y()},Q=()=>{d.account="",d.channelId=void 0,d.auditStatus=void 0,d.groupId=void 0,G()},W=l=>{Object.assign(I,{current:l.current,pageSize:l.pageSize}),y()},X=l=>{c.value=l,U.value=!0},Y=async l=>{try{h.success("审核通过成功"),y()}catch{h.error("审核通过失败")}},Z=()=>{if(!C.value.length){h.warning("请选择要通过的账号");return}},ee=()=>{if(!C.value.length){h.warning("请选择要拒绝的账号");return}},te=l=>{c.value=l,w.value="",N.value=!0},ae=async()=>{if(!w.value){h.error("请输入拒绝原因");return}try{E.value=!0,h.success("审核拒绝成功"),N.value=!1,y()}catch{h.error("审核拒绝失败")}finally{E.value=!1}},y=async()=>{x.value=!0;try{I.total=O.value.length}finally{x.value=!1}};return y(),(l,a)=>{const ne=u("a-input"),k=u("a-form-item"),D=u("a-select-option"),A=u("a-select"),S=u("a-button"),R=u("a-space"),le=u("a-form"),oe=u("a-tooltip"),T=u("a-tag"),L=u("a-popconfirm"),ue=u("a-table"),f=u("a-descriptions-item"),se=u("a-descriptions"),$=u("a-modal"),ie=u("a-textarea");return r(),b("div",ce,[p("div",pe,[p("div",_e,[p("div",me,[n(le,{layout:"inline",model:d},{default:t(()=>[n(k,{label:"账号"},{default:t(()=>[n(ne,{value:d.account,"onUpdate:value":a[0]||(a[0]=e=>d.account=e),placeholder:"请输入账号","allow-clear":""},null,8,["value"])]),_:1}),n(k,{label:"平台渠道"},{default:t(()=>[n(A,{value:d.channelId,"onUpdate:value":a[1]||(a[1]=e=>d.channelId=e),placeholder:"请选择平台渠道",style:{width:"120px"},"allow-clear":""},{default:t(()=>[(r(),b(j,null,P(J,e=>n(D,{key:e.id,value:e.id},{default:t(()=>[s(i(e.name),1)]),_:2},1032,["value"])),64))]),_:1},8,["value"])]),_:1}),n(k,{label:"审核状态"},{default:t(()=>[n(A,{value:d.auditStatus,"onUpdate:value":a[2]||(a[2]=e=>d.auditStatus=e),placeholder:"请选择审核状态",style:{width:"120px"},"allow-clear":""},{default:t(()=>[(r(!0),b(j,null,P(Object.values(V(_)),e=>(r(),v(D,{key:e,value:e},{default:t(()=>[s(i(B(e)),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),n(k,{label:"所属群组"},{default:t(()=>[n(A,{value:d.groupId,"onUpdate:value":a[3]||(a[3]=e=>d.groupId=e),placeholder:"请选择群组",style:{width:"120px"},"allow-clear":""},{default:t(()=>[(r(),b(j,null,P(K,e=>n(D,{key:e.id,value:e.id},{default:t(()=>[s(i(e.name),1)]),_:2},1032,["value"])),64))]),_:1},8,["value"])]),_:1}),n(k,null,{default:t(()=>[n(R,null,{default:t(()=>[n(S,{type:"primary",onClick:G},{default:t(()=>a[7]||(a[7]=[s("查询")])),_:1}),n(S,{onClick:Q},{default:t(()=>a[8]||(a[8]=[s("重置")])),_:1})]),_:1})]),_:1})]),_:1},8,["model"])]),p("div",fe,[n(R,null,{default:t(()=>[n(S,{type:"primary",onClick:Z},{default:t(()=>a[9]||(a[9]=[s("批量通过")])),_:1}),n(S,{danger:"",onClick:ee},{default:t(()=>a[10]||(a[10]=[s("批量拒绝")])),_:1})]),_:1})])]),n(ue,{columns:q,"data-source":O.value,loading:x.value,pagination:I,"row-selection":{selectedRowKeys:C.value,onChange:H},onChange:W},{bodyCell:t(({column:e,record:o})=>[e.key==="member"?(r(),b("div",ve,[p("div",null,i(o.memberNickname),1),p("div",ge,i(o.groupName),1)])):g("",!0),e.key==="homeUrl"?(r(),v(oe,{key:1,title:o.homeUrl},{default:t(()=>[p("a",{href:o.homeUrl,target:"_blank",class:"link-text"},i(o.homeUrl),9,he)]),_:2},1032,["title"])):g("",!0),e.key==="auditStatus"?(r(),v(T,{key:2,color:M(o.auditStatus)},{default:t(()=>[s(i(B(o.auditStatus)),1)]),_:2},1032,["color"])):g("",!0),e.key==="action"?(r(),v(R,{key:3},{default:t(()=>[p("a",{onClick:z=>X(o)},"查看",8,ye),o.auditStatus===V(_).PENDING?(r(),v(L,{key:0,title:"确定要通过该账号吗？",onConfirm:z=>Y(o)},{default:t(()=>a[11]||(a[11]=[p("a",null,"通过",-1)])),_:2},1032,["onConfirm"])):g("",!0),o.auditStatus===V(_).PENDING?(r(),v(L,{key:1,title:"确定要拒绝该账号吗？",onConfirm:z=>te(o)},{default:t(()=>a[12]||(a[12]=[p("a",{class:"danger"},"拒绝",-1)])),_:2},1032,["onConfirm"])):g("",!0)]),_:2},1024)):g("",!0)]),_:1},8,["data-source","loading","pagination","row-selection"])]),n($,{open:U.value,"onUpdate:open":a[4]||(a[4]=e=>U.value=e),title:"账号详情",footer:null},{default:t(()=>[n(se,{column:1},{default:t(()=>[n(f,{label:"账号"},{default:t(()=>{var e;return[s(i((e=c.value)==null?void 0:e.account),1)]}),_:1}),n(f,{label:"平台渠道"},{default:t(()=>{var e;return[s(i((e=c.value)==null?void 0:e.channelName),1)]}),_:1}),n(f,{label:"主页链接"},{default:t(()=>{var e,o;return[p("a",{href:(e=c.value)==null?void 0:e.homeUrl,target:"_blank"},i((o=c.value)==null?void 0:o.homeUrl),9,ke)]}),_:1}),n(f,{label:"粉丝数"},{default:t(()=>{var e;return[s(i((e=c.value)==null?void 0:e.fansCount),1)]}),_:1}),n(f,{label:"发帖数"},{default:t(()=>{var e;return[s(i((e=c.value)==null?void 0:e.postsCount),1)]}),_:1}),n(f,{label:"会员名称"},{default:t(()=>{var e,o;return[s(i((e=c.value)==null?void 0:e.memberNickname)+" ",1),(o=c.value)!=null&&o.isGroupOwner?(r(),v(T,{key:0,color:"blue"},{default:t(()=>a[13]||(a[13]=[s("群主")])),_:1})):g("",!0)]}),_:1}),n(f,{label:"所属群组"},{default:t(()=>{var e;return[s(i((e=c.value)==null?void 0:e.groupName),1)]}),_:1})]),_:1})]),_:1},8,["open"]),n($,{open:N.value,"onUpdate:open":a[6]||(a[6]=e=>N.value=e),title:"拒绝原因",onOk:ae,confirmLoading:E.value},{default:t(()=>[n(ie,{value:w.value,"onUpdate:value":a[5]||(a[5]=e=>w.value=e),placeholder:"请输入拒绝原因",rows:4},null,8,["value"])]),_:1},8,["open","confirmLoading"])])}}},Se=de(be,[["__scopeId","data-v-9096d1ff"]]);export{Se as default};
