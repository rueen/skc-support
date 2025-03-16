import{_ as re,r as _,v as de,x as ie,a as V,l as me,b as p,c as t,d as m,w as l,e as r,m as F,j as f,y as v,f as pe,o as i,F as q,n as Y,p as g,h as u,t as N,q as z,g as L,Q as fe,P as ve,z as ce,A as _e}from"./index-CrZnNwoR.js";import{P as ge}from"./index-B4u0WGUb.js";import{a as ke}from"./enum-Ciewj-1_.js";const ye={class:"task-form content-container"},be={class:"form-container"},Te={class:"group-select"},we={key:1,class:"group-tip"},qe={class:"user-range"},Ye={key:0,class:"task-count"},Ue={class:"quota-container"},Me={class:"custom-fields"},Ie={__name:"detail",setup(Re){const U=ie(),M=pe(),P=_(),I=de(()=>U.name==="TaskEdit"),a=V({taskName:"",channelId:void 0,category:void 0,taskType:void 0,reward:void 0,brand:"",groupIds:[],groupMode:0,customFields:[{title:"",type:"input"}],startTime:null,endTime:null,quota:void 0,unlimitedQuota:!0,fansRequired:void 0,contentRequirement:"",taskInfo:"",notice:`1.请尽快完成发布，填写发布链接。
2.任务结束后无法填写，不能结算。
3.发布内容不符合要求，将无法审核通过。
4.填写链接无法访问或其他无关链接，视为放弃结算。`,userRange:0,taskCount:0}),G={taskName:[{required:!0,message:"请输入任务名称"}],channelId:[{required:!0,message:"请选择平台渠道"}],category:[{required:!0,message:"请输入达人领域"}],taskType:[{required:!0,message:"请选择任务类型"}],reward:[{required:!0,message:"请输入任务奖励"}],fansRequired:[{required:!0,message:"请输入粉丝要求"}],groupIds:[{validator:(s,e)=>a.groupMode===1&&(!e||e.length===0)?Promise.reject("请选择指定群组"):Promise.resolve()}],taskCount:[{validator:(s,e)=>a.userRange===1&&e==null?Promise.reject("请输入完成任务次数"):Promise.resolve()}]},O=_([]),j=_([]),A=()=>{a.customFields.length<10&&a.customFields.push({title:"",type:"input"})},J=s=>{a.customFields.splice(s,1)},$=s=>{s.target.value===0&&(a.groupIds=[])},K=async()=>{try{k.value=!0;const s={...a,groupIds:a.groupMode===0?[]:a.groupIds,startTime:a.startTime?v(a.startTime).format("YYYY-MM-DD HH:mm:ss"):null,endTime:a.endTime?v(a.endTime).format("YYYY-MM-DD HH:mm:ss"):null},e=await _e("task.add",s);e.code===0?(f.success("提交成功"),M.back()):f.error(e.message)}catch(s){console.log(s)}finally{k.value=!1}},W=async()=>{try{k.value=!0;const s={...a,groupIds:a.groupMode===0?[]:a.groupIds,startTime:a.startTime?v(a.startTime).format("YYYY-MM-DD HH:mm:ss"):null,endTime:a.endTime?v(a.endTime).format("YYYY-MM-DD HH:mm:ss"):null},e=await ce("task.edit",{...s},{urlParams:{id:U.params.id}});e.code===0?(f.success("提交成功"),M.back()):f.error(e.message)}catch(s){console.log(s)}finally{k.value=!1}},k=_(!1),X=()=>{P.value.validate().then(async()=>{I.value?await W():await K()})},Z=()=>{M.back()},ee=async s=>{try{const e=await F("task.detail",{},{urlParams:{id:s}});if(e.code===0){let d={};for(let o in e.data)o!=="groups"&&(d[o]=e.data[o]);d.startTime&&(d.startTime=v(d.startTime)),d.endTime&&(d.endTime=v(d.endTime)),Object.assign(a,d)}}catch(e){console.log(e),f.error(e)}},ae=async()=>{const s=await F("channel.list");s.code===0&&(O.value=s.data.list)},Q=async(s="")=>{try{const e=await F("group.list",{page:1,pageSize:50,groupName:s});e.code===0&&(j.value=e.data.list||[])}catch{f.error("获取群组列表失败")}},E=_([]),te=V({}),le=async()=>{const s=await ke();E.value=Object.values(s),Object.values(s).map(e=>{te[e.value]=e.text})};return me(()=>{le(),ae(),Q(),I.value&&ee(U.params.id)}),(s,e)=>{const d=r("a-input"),o=r("a-form-item"),c=r("a-select-option"),y=r("a-select"),R=r("a-input-number"),h=r("a-date-picker"),C=r("a-col"),ne=r("a-row"),b=r("a-radio"),B=r("a-radio-group"),S=r("a-form-item-rest"),oe=r("a-tooltip"),se=r("a-checkbox"),D=r("a-space"),T=r("a-button"),x=r("a-textarea"),ue=r("a-form");return i(),p("div",ye,[t(ge,{title:I.value?"编辑任务":"新建任务",back:!0,class:"page-header"},null,8,["title"]),m("div",be,[t(ue,{ref_key:"formRef",ref:P,model:a,rules:G,"label-col":{span:3},"wrapper-col":{span:20},layout:"horizontal"},{default:l(()=>[t(o,{label:"任务名称",name:"taskName"},{default:l(()=>[t(d,{value:a.taskName,"onUpdate:value":e[0]||(e[0]=n=>a.taskName=n),placeholder:"请输入任务名称"},null,8,["value"])]),_:1}),t(o,{label:"平台渠道",name:"channelId"},{default:l(()=>[t(y,{value:a.channelId,"onUpdate:value":e[1]||(e[1]=n=>a.channelId=n),placeholder:"请选择平台渠道"},{default:l(()=>[(i(!0),p(q,null,Y(O.value,n=>(i(),g(c,{key:n.id,value:n.id},{default:l(()=>[u(N(n.name),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),t(o,{label:"达人领域",name:"category"},{default:l(()=>[t(d,{value:a.category,"onUpdate:value":e[2]||(e[2]=n=>a.category=n),placeholder:"请输入达人领域"},null,8,["value"])]),_:1}),t(o,{label:"任务类型",name:"taskType"},{default:l(()=>[t(y,{value:a.taskType,"onUpdate:value":e[3]||(e[3]=n=>a.taskType=n),placeholder:"请选择任务类型"},{default:l(()=>[(i(!0),p(q,null,Y(E.value,n=>(i(),g(c,{key:n.value,value:n.value},{default:l(()=>[u(N(n.text),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),t(o,{label:"任务奖励",name:"reward"},{default:l(()=>[t(R,{value:a.reward,"onUpdate:value":e[4]||(e[4]=n=>a.reward=n),min:0,precision:2,step:.1,placeholder:"请输入任务奖励"},null,8,["value"])]),_:1}),t(o,{label:"粉丝要求",name:"fansRequired"},{default:l(()=>[t(d,{value:a.fansRequired,"onUpdate:value":e[5]||(e[5]=n=>a.fansRequired=n),placeholder:"请输入粉丝要求"},null,8,["value"])]),_:1}),t(o,{label:"任务时间",required:""},{default:l(()=>[t(ne,{gutter:8},{default:l(()=>[t(C,{span:11},{default:l(()=>[t(o,{name:"startTime",rules:[{required:!0,message:"请选择开始时间"}]},{default:l(()=>[t(h,{value:a.startTime,"onUpdate:value":e[6]||(e[6]=n=>a.startTime=n),"show-time":"",style:{width:"100%"},placeholder:"开始时间",format:"YYYY-MM-DD HH:mm:ss"},null,8,["value"])]),_:1})]),_:1}),t(C,{span:2,class:"text-center"},{default:l(()=>e[18]||(e[18]=[m("span",null,"至",-1)])),_:1}),t(C,{span:11},{default:l(()=>[t(o,{name:"endTime",rules:[{required:!0,message:"请选择结束时间"}]},{default:l(()=>[t(h,{value:a.endTime,"onUpdate:value":e[7]||(e[7]=n=>a.endTime=n),"show-time":"",style:{width:"100%"},placeholder:"结束时间",format:"YYYY-MM-DD HH:mm:ss"},null,8,["value"])]),_:1})]),_:1})]),_:1})]),_:1}),t(o,{label:"指定群组",name:"groupIds"},{default:l(()=>[m("div",Te,[t(B,{value:a.groupMode,"onUpdate:value":e[8]||(e[8]=n=>a.groupMode=n),onChange:$},{default:l(()=>[t(b,{value:0},{default:l(()=>e[19]||(e[19]=[u("不指定")])),_:1}),t(b,{value:1},{default:l(()=>e[20]||(e[20]=[u("指定群组")])),_:1})]),_:1},8,["value"]),t(S,null,{default:l(()=>[a.groupMode===1?(i(),g(y,{key:0,value:a.groupIds,"onUpdate:value":e[9]||(e[9]=n=>a.groupIds=n),"show-search":"","filter-option":!1,mode:"multiple",placeholder:"请选择群组",style:{width:"100%","margin-top":"8px"},onSearch:Q},{default:l(()=>[(i(!0),p(q,null,Y(j.value,n=>(i(),g(c,{key:n.id,value:n.id},{default:l(()=>[u(N(n.groupName),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])):(i(),p("div",we," 所有群组的会员都可以接取该任务 "))]),_:1})])]),_:1}),t(o,{label:"用户范围",name:"userRange"},{default:l(()=>[m("div",qe,[t(B,{value:a.userRange,"onUpdate:value":e[10]||(e[10]=n=>a.userRange=n)},{default:l(()=>[t(b,{value:0},{default:l(()=>e[21]||(e[21]=[u("全部用户")])),_:1}),t(b,{value:1},{default:l(()=>e[22]||(e[22]=[u("完成任务次数")])),_:1})]),_:1},8,["value"]),t(S,null,{default:l(()=>[a.userRange===1?(i(),p("div",Ye,[t(o,{name:"taskCount"},{default:l(()=>[t(R,{value:a.taskCount,"onUpdate:value":e[11]||(e[11]=n=>a.taskCount=n),min:0,precision:0,placeholder:"请输入次数","addon-after":"次"},null,8,["value"])]),_:1}),t(oe,null,{title:l(()=>e[23]||(e[23]=[u(" 举例："),m("br",null,null,-1),u(" 0次，代表新人从未参与过任务的会员可显示并参与"),m("br",null,null,-1),u(" 2次，代表只参与过0次/1次/2次的人可显示并参与"),m("br",null,null,-1),u(" 5次，代表参与过0/1/2/3/4/5次任务的人可显示并参与 ")])),default:l(()=>[t(L(fe))]),_:1})])):z("",!0)]),_:1})])]),_:1}),t(o,{label:"任务名额"},{default:l(()=>[m("div",Ue,[t(D,{align:"baseline"},{default:l(()=>[t(o,{name:"quota"},{default:l(()=>[t(R,{value:a.quota,"onUpdate:value":e[12]||(e[12]=n=>a.quota=n),min:0,precision:0,disabled:a.unlimitedQuota,placeholder:"请输入任务名额"},null,8,["value","disabled"])]),_:1}),t(se,{checked:a.unlimitedQuota,"onUpdate:checked":e[13]||(e[13]=n=>a.unlimitedQuota=n)},{default:l(()=>e[24]||(e[24]=[u(" 不限制 ")])),_:1},8,["checked"])]),_:1})])]),_:1}),t(o,{label:"品牌",name:"brand"},{default:l(()=>[t(d,{value:a.brand,"onUpdate:value":e[14]||(e[14]=n=>a.brand=n),placeholder:"请输入品牌名称"},null,8,["value"])]),_:1}),t(o,{label:"提交信息字段"},{default:l(()=>[m("div",Me,[(i(!0),p(q,null,Y(a.customFields,(n,H)=>(i(),p("div",{key:H,class:"field-item"},[t(D,{align:"baseline"},{default:l(()=>[t(o,{name:["customFields",H,"title"],rules:[{required:!0,message:"请输入字段标题"}]},{default:l(()=>[t(d,{value:n.title,"onUpdate:value":w=>n.title=w,placeholder:"请输入字段标题"},null,8,["value","onUpdate:value"])]),_:2},1032,["name"]),t(y,{value:n.type,"onUpdate:value":w=>n.type=w,style:{width:"120px"}},{default:l(()=>[t(c,{value:"input"},{default:l(()=>e[25]||(e[25]=[u("输入框")])),_:1}),t(c,{value:"image"},{default:l(()=>e[26]||(e[26]=[u("上传图片")])),_:1})]),_:2},1032,["value","onUpdate:value"]),t(T,{type:"link",danger:"",onClick:w=>J(H)},{default:l(()=>e[27]||(e[27]=[u(" 删除 ")])),_:2},1032,["onClick"])]),_:2},1024)]))),128)),a.customFields.length<10?(i(),g(T,{key:0,type:"dashed",block:"",onClick:A},{default:l(()=>[t(L(ve)),e[28]||(e[28]=u("添加字段 "))]),_:1})):z("",!0)])]),_:1}),t(o,{label:"作品要求",name:"contentRequirement"},{default:l(()=>[t(x,{value:a.contentRequirement,"onUpdate:value":e[15]||(e[15]=n=>a.contentRequirement=n),rows:4,placeholder:"请输入作品要求"},null,8,["value"])]),_:1}),t(o,{label:"任务信息",name:"taskInfo"},{default:l(()=>[t(x,{value:a.taskInfo,"onUpdate:value":e[16]||(e[16]=n=>a.taskInfo=n),rows:4,placeholder:"请输入任务信息"},null,8,["value"])]),_:1}),t(o,{label:"温馨提示",name:"notice"},{default:l(()=>[t(x,{value:a.notice,"onUpdate:value":e[17]||(e[17]=n=>a.notice=n),rows:4,placeholder:"请输入温馨提示"},null,8,["value"])]),_:1}),t(o,{"wrapper-col":{span:16,offset:4}},{default:l(()=>[t(D,null,{default:l(()=>[t(T,{type:"primary",onClick:X},{default:l(()=>e[29]||(e[29]=[u("提交")])),_:1}),t(T,{onClick:Z},{default:l(()=>e[30]||(e[30]=[u("取消")])),_:1})]),_:1})]),_:1})]),_:1},8,["model"])])])}}},He=re(Ie,[["__scopeId","data-v-eef27c8b"]]);export{He as default};
