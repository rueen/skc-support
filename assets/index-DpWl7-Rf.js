import{_ as N,u as I,a as B,b as L,r as b,c as V,d as q,e as i,f as o,t as f,w as t,g as a,h as D,o as P,i as d}from"./index-fiN95LW_.js";const T={class:"login-container"},F={class:"login-box"},M={class:"login-title"},W={class:"language-switch"},j={__name:"index",setup(A){const m=D(),w=I(),k=B(),{locale:z}=L(),x=b(),h=b(!1),y=b(localStorage.getItem("language")||"zh-CN"),C=s=>{const e=s.target.value;z.value=e,localStorage.setItem("language",e)},l=V({username:"",password:"",remember:!0}),R={username:[{required:!0,message:"请输入用户名"}],password:[{required:!0,message:"请输入密码"}]},U=async s=>{try{h.value=!0;const e={username:s.username,password:s.password};await w.login(e),k.resetEnum(),await k.fetchEnum();const u=m.getRoutes().find(n=>n.path==="/");if(u&&u.children){const n=u.children.filter(c=>{var _,g;const p=(_=c.meta)==null?void 0:_.permissions;return!((g=c.meta)!=null&&g.hidden)&&p&&w.hasPermissions(p)});n.length>0?m.push(n[0].path):m.push("/")}else m.push("/")}catch(e){console.error(e)}finally{h.value=!1}};return(s,e)=>{const S=a("user-outlined"),u=a("a-input"),n=a("a-form-item"),c=a("lock-outlined"),p=a("a-input-password"),_=a("a-checkbox"),g=a("a-button"),$=a("a-form"),v=a("a-radio-button"),E=a("a-radio-group");return P(),q("div",T,[i("div",F,[i("div",M,[i("h1",null,f(s.$t("app.title")),1),i("p",null,f(s.$t("login.title")),1)]),o($,{ref_key:"formRef",ref:x,model:l,rules:R,onFinish:U},{default:t(()=>[o(n,{name:"username"},{default:t(()=>[o(u,{value:l.username,"onUpdate:value":e[0]||(e[0]=r=>l.username=r),size:"large",placeholder:s.$t("login.username")},{prefix:t(()=>[o(S)]),_:1},8,["value","placeholder"])]),_:1}),o(n,{name:"password"},{default:t(()=>[o(p,{value:l.password,"onUpdate:value":e[1]||(e[1]=r=>l.password=r),size:"large",placeholder:s.$t("login.password")},{prefix:t(()=>[o(c)]),_:1},8,["value","placeholder"])]),_:1}),o(n,null,{default:t(()=>[o(_,{checked:l.remember,"onUpdate:checked":e[2]||(e[2]=r=>l.remember=r)},{default:t(()=>[d(f(s.$t("login.rememberMe")),1)]),_:1},8,["checked"])]),_:1}),o(n,null,{default:t(()=>[o(g,{type:"primary","html-type":"submit",size:"large",loading:h.value,block:""},{default:t(()=>[d(f(s.$t("login.login")),1)]),_:1},8,["loading"])]),_:1})]),_:1},8,["model"]),i("div",W,[o(E,{value:y.value,"onUpdate:value":e[3]||(e[3]=r=>y.value=r),"button-style":"solid",size:"small",onChange:C},{default:t(()=>[o(v,{value:"zh-CN"},{default:t(()=>e[4]||(e[4]=[d("简体中文")])),_:1}),o(v,{value:"zh-TW"},{default:t(()=>e[5]||(e[5]=[d("繁體中文")])),_:1}),o(v,{value:"en-US"},{default:t(()=>e[6]||(e[6]=[d("English")])),_:1})]),_:1},8,["value"])])])])}}},H=N(j,[["__scopeId","data-v-be95f095"]]);export{H as default};
