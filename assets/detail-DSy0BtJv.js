import{_ as re,i as de,r as c,p as ie,q as me,a as pe,j as fe,b as p,c as t,d as m,w as l,e as u,k as f,s as v,f as ve,o as i,F as H,l as x,m as w,h as r,t as V,g as F,n as E,Q as ce,P as ge}from"./index-DCqgSKVo.js";import{P as _e}from"./index-B_GOzeeM.js";import{c as ke,g as ye,d as be}from"./enums-Vx4wKXVy.js";import{g as N,p as S}from"./request-DpAzyv0l.js";const Te={class:"task-form content-container"},we={class:"form-container"},qe={class:"group-select"},Ye={key:1,class:"group-tip"},Ue={class:"user-range"},Ie={key:0,class:"task-count"},Me={class:"quota-container"},Re={class:"custom-fields"},Ce={__name:"detail",setup(De){const q=me(),Y=ve(),{locale:z}=de(),O=c(),U=ie(()=>q.name==="TaskEdit"),a=pe({taskName:"",channelId:void 0,category:void 0,taskType:void 0,reward:void 0,brand:"",groupIds:[],groupMode:0,customFields:[{title:"",type:"input"}],startTime:null,endTime:null,quota:void 0,unlimitedQuota:!0,fansRequired:void 0,contentRequirement:"",taskInfo:"",notice:`1.请尽快完成发布，填写发布链接。
2.任务结束后无法填写，不能结算。
3.发布内容不符合要求，将无法审核通过。
4.填写链接无法访问或其他无关链接，视为放弃结算。`,userRange:0,taskCount:0}),G={taskName:[{required:!0,message:"请输入任务名称"}],channelId:[{required:!0,message:"请选择平台渠道"}],category:[{required:!0,message:"请输入达人领域"}],taskType:[{required:!0,message:"请选择任务类型"}],reward:[{required:!0,message:"请输入任务奖励"}],fansRequired:[{required:!0,message:"请输入粉丝要求"}],groupIds:[{validator:(o,e)=>a.groupMode===1&&(!e||e.length===0)?Promise.reject("请选择指定群组"):Promise.resolve()}],taskCount:[{validator:(o,e)=>a.userRange===1&&e==null?Promise.reject("请输入完成任务次数"):Promise.resolve()}]},P=c([]),h=c(!1),j=c([]),$=()=>{a.customFields.length<10&&a.customFields.push({title:"",type:"input"})},A=o=>{a.customFields.splice(o,1)},J=o=>ye(be,o,z.value),K=o=>{o.target.value===0&&(a.groupIds=[])},W=async()=>{try{g.value=!0;const o={...a,groupIds:a.groupMode===0?[]:a.groupIds,startTime:a.startTime?v(a.startTime).format("YYYY-MM-DD HH:mm:ss"):null,endTime:a.endTime?v(a.endTime).format("YYYY-MM-DD HH:mm:ss"):null},e=await S("task.add",o);e.code===0?(f.success("提交成功"),Y.back()):f.error(e.message)}catch(o){console.log(o)}finally{g.value=!1}},X=async()=>{try{g.value=!0;const o={...a,groupIds:a.groupMode===0?[]:a.groupIds,startTime:a.startTime?v(a.startTime).format("YYYY-MM-DD HH:mm:ss"):null,endTime:a.endTime?v(a.endTime).format("YYYY-MM-DD HH:mm:ss"):null},e=await S("task.edit",{id:q.params.id,...a});e.code===0?(f.success("提交成功"),Y.back()):f.error(e.message)}catch(o){console.log(o)}finally{g.value=!1}},g=c(!1),Z=()=>{O.value.validate().then(async()=>{U.value?await X():await W()})},ee=()=>{Y.back()},ae=async o=>{try{const e=await N("task.detail",{params:{id:o}});if(e.code===0){const d=e.data||{};d.startTime&&(d.startTime=v(d.startTime)),d.endTime&&(d.endTime=v(d.endTime)),Object.assign(a,d)}}catch(e){console.log(e),f.error(e)}},te=async()=>{const o=await N("channel.list");o.code===0&&(P.value=o.data.list)},le=async(o="")=>{try{const e=await N("group.list",{params:{page:1,pageSize:50,keyword:o}});e.code===0&&(j.value=e.data.list||[])}catch{f.error("获取群组列表失败")}};return fe(()=>{te(),le(),U.value&&ae(q.params.id)}),(o,e)=>{const d=u("a-input"),s=u("a-form-item"),_=u("a-select-option"),k=u("a-select"),I=u("a-input-number"),Q=u("a-date-picker"),M=u("a-col"),ne=u("a-row"),y=u("a-radio"),L=u("a-radio-group"),B=u("a-form-item-rest"),oe=u("a-tooltip"),se=u("a-checkbox"),R=u("a-space"),b=u("a-button"),C=u("a-textarea"),ue=u("a-form");return i(),p("div",Te,[t(_e,{title:U.value?"编辑任务":"新建任务",back:!0,class:"page-header"},null,8,["title"]),m("div",we,[t(ue,{ref_key:"formRef",ref:O,model:a,rules:G,"label-col":{span:3},"wrapper-col":{span:20},layout:"horizontal"},{default:l(()=>[t(s,{label:"任务名称",name:"taskName"},{default:l(()=>[t(d,{value:a.taskName,"onUpdate:value":e[0]||(e[0]=n=>a.taskName=n),placeholder:"请输入任务名称"},null,8,["value"])]),_:1}),t(s,{label:"平台渠道",name:"channelId"},{default:l(()=>[t(k,{value:a.channelId,"onUpdate:value":e[1]||(e[1]=n=>a.channelId=n),placeholder:"请选择平台渠道"},{default:l(()=>[(i(!0),p(H,null,x(P.value,n=>(i(),w(_,{key:n.id,value:n.id},{default:l(()=>[r(V(n.name),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),t(s,{label:"达人领域",name:"category"},{default:l(()=>[t(d,{value:a.category,"onUpdate:value":e[2]||(e[2]=n=>a.category=n),placeholder:"请输入达人领域"},null,8,["value"])]),_:1}),t(s,{label:"任务类型",name:"taskType"},{default:l(()=>[t(k,{value:a.taskType,"onUpdate:value":e[3]||(e[3]=n=>a.taskType=n),placeholder:"请选择任务类型"},{default:l(()=>[(i(!0),p(H,null,x(Object.values(F(ke)),n=>(i(),w(_,{key:n,value:n},{default:l(()=>[r(V(J(n)),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),t(s,{label:"任务奖励",name:"reward"},{default:l(()=>[t(I,{value:a.reward,"onUpdate:value":e[4]||(e[4]=n=>a.reward=n),min:0,precision:2,step:.1,placeholder:"请输入任务奖励"},null,8,["value"])]),_:1}),t(s,{label:"粉丝要求",name:"fansRequired"},{default:l(()=>[t(d,{value:a.fansRequired,"onUpdate:value":e[5]||(e[5]=n=>a.fansRequired=n),placeholder:"请输入粉丝要求"},null,8,["value"])]),_:1}),t(s,{label:"任务时间",required:""},{default:l(()=>[t(ne,{gutter:8},{default:l(()=>[t(M,{span:11},{default:l(()=>[t(s,{name:"startTime",rules:[{required:!0,message:"请选择开始时间"}]},{default:l(()=>[t(Q,{value:a.startTime,"onUpdate:value":e[6]||(e[6]=n=>a.startTime=n),"show-time":"",style:{width:"100%"},placeholder:"开始时间",format:"YYYY-MM-DD HH:mm:ss"},null,8,["value"])]),_:1})]),_:1}),t(M,{span:2,class:"text-center"},{default:l(()=>e[18]||(e[18]=[m("span",null,"至",-1)])),_:1}),t(M,{span:11},{default:l(()=>[t(s,{name:"endTime",rules:[{required:!0,message:"请选择结束时间"}]},{default:l(()=>[t(Q,{value:a.endTime,"onUpdate:value":e[7]||(e[7]=n=>a.endTime=n),"show-time":"",style:{width:"100%"},placeholder:"结束时间",format:"YYYY-MM-DD HH:mm:ss"},null,8,["value"])]),_:1})]),_:1})]),_:1})]),_:1}),t(s,{label:"指定群组",name:"groupIds"},{default:l(()=>[m("div",qe,[t(L,{value:a.groupMode,"onUpdate:value":e[8]||(e[8]=n=>a.groupMode=n),onChange:K},{default:l(()=>[t(y,{value:0},{default:l(()=>e[19]||(e[19]=[r("不指定")])),_:1}),t(y,{value:1},{default:l(()=>e[20]||(e[20]=[r("指定群组")])),_:1})]),_:1},8,["value"]),t(B,null,{default:l(()=>[a.groupMode===1?(i(),w(k,{key:0,value:a.groupIds,"onUpdate:value":e[9]||(e[9]=n=>a.groupIds=n),mode:"multiple",placeholder:"请选择群组",style:{width:"100%","margin-top":"8px"},options:j.value,loading:h.value},null,8,["value","options","loading"])):(i(),p("div",Ye," 所有群组的会员都可以接取该任务 "))]),_:1})])]),_:1}),t(s,{label:"用户范围",name:"userRange"},{default:l(()=>[m("div",Ue,[t(L,{value:a.userRange,"onUpdate:value":e[10]||(e[10]=n=>a.userRange=n)},{default:l(()=>[t(y,{value:0},{default:l(()=>e[21]||(e[21]=[r("全部用户")])),_:1}),t(y,{value:1},{default:l(()=>e[22]||(e[22]=[r("完成任务次数")])),_:1})]),_:1},8,["value"]),t(B,null,{default:l(()=>[a.userRange===1?(i(),p("div",Ie,[t(s,{name:"taskCount"},{default:l(()=>[t(I,{value:a.taskCount,"onUpdate:value":e[11]||(e[11]=n=>a.taskCount=n),min:0,precision:0,placeholder:"请输入次数","addon-after":"次"},null,8,["value"])]),_:1}),t(oe,null,{title:l(()=>e[23]||(e[23]=[r(" 举例："),m("br",null,null,-1),r(" 0次，代表新人从未参与过任务的会员可显示并参与"),m("br",null,null,-1),r(" 2次，代表只参与过0次/1次/2次的人可显示并参与"),m("br",null,null,-1),r(" 5次，代表参与过0/1/2/3/4/5次任务的人可显示并参与 ")])),default:l(()=>[t(F(ce))]),_:1})])):E("",!0)]),_:1})])]),_:1}),t(s,{label:"任务名额"},{default:l(()=>[m("div",Me,[t(R,{align:"baseline"},{default:l(()=>[t(s,{name:"quota"},{default:l(()=>[t(I,{value:a.quota,"onUpdate:value":e[12]||(e[12]=n=>a.quota=n),min:0,precision:0,disabled:a.unlimitedQuota,placeholder:"请输入任务名额"},null,8,["value","disabled"])]),_:1}),t(se,{checked:a.unlimitedQuota,"onUpdate:checked":e[13]||(e[13]=n=>a.unlimitedQuota=n)},{default:l(()=>e[24]||(e[24]=[r(" 不限制 ")])),_:1},8,["checked"])]),_:1})])]),_:1}),t(s,{label:"品牌",name:"brand"},{default:l(()=>[t(d,{value:a.brand,"onUpdate:value":e[14]||(e[14]=n=>a.brand=n),placeholder:"请输入品牌名称"},null,8,["value"])]),_:1}),t(s,{label:"提交信息字段"},{default:l(()=>[m("div",Re,[(i(!0),p(H,null,x(a.customFields,(n,D)=>(i(),p("div",{key:D,class:"field-item"},[t(R,{align:"baseline"},{default:l(()=>[t(s,{name:["customFields",D,"title"],rules:[{required:!0,message:"请输入字段标题"}]},{default:l(()=>[t(d,{value:n.title,"onUpdate:value":T=>n.title=T,placeholder:"请输入字段标题"},null,8,["value","onUpdate:value"])]),_:2},1032,["name"]),t(k,{value:n.type,"onUpdate:value":T=>n.type=T,style:{width:"120px"}},{default:l(()=>[t(_,{value:"input"},{default:l(()=>e[25]||(e[25]=[r("输入框")])),_:1}),t(_,{value:"image"},{default:l(()=>e[26]||(e[26]=[r("上传图片")])),_:1})]),_:2},1032,["value","onUpdate:value"]),t(b,{type:"link",danger:"",onClick:T=>A(D)},{default:l(()=>e[27]||(e[27]=[r(" 删除 ")])),_:2},1032,["onClick"])]),_:2},1024)]))),128)),a.customFields.length<10?(i(),w(b,{key:0,type:"dashed",block:"",onClick:$},{default:l(()=>[t(F(ge)),e[28]||(e[28]=r("添加字段 "))]),_:1})):E("",!0)])]),_:1}),t(s,{label:"作品要求",name:"contentRequirement"},{default:l(()=>[t(C,{value:a.contentRequirement,"onUpdate:value":e[15]||(e[15]=n=>a.contentRequirement=n),rows:4,placeholder:"请输入作品要求"},null,8,["value"])]),_:1}),t(s,{label:"任务信息",name:"taskInfo"},{default:l(()=>[t(C,{value:a.taskInfo,"onUpdate:value":e[16]||(e[16]=n=>a.taskInfo=n),rows:4,placeholder:"请输入任务信息"},null,8,["value"])]),_:1}),t(s,{label:"温馨提示",name:"notice"},{default:l(()=>[t(C,{value:a.notice,"onUpdate:value":e[17]||(e[17]=n=>a.notice=n),rows:4,placeholder:"请输入温馨提示"},null,8,["value"])]),_:1}),t(s,{"wrapper-col":{span:16,offset:4}},{default:l(()=>[t(R,null,{default:l(()=>[t(b,{type:"primary",onClick:Z},{default:l(()=>e[29]||(e[29]=[r("提交")])),_:1}),t(b,{onClick:ee},{default:l(()=>e[30]||(e[30]=[r("取消")])),_:1})]),_:1})]),_:1})]),_:1},8,["model"])])])}}},Oe=re(Ce,[["__scopeId","data-v-704f229f"]]);export{Oe as default};
