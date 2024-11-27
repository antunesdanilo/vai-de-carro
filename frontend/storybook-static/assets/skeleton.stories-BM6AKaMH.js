import{j as n}from"./jsx-runtime-CkxqCPlQ.js";import{r as c}from"./index-DJO9vBfz.js";const E=({width:_,height:q,repeat:i=1})=>{const[N,T]=c.useState([]);return c.useEffect(()=>{const e=[];for(let p=0;p<i;p++)e.push(p);T(e)},[i]),n.jsx("div",{id:"skeleton-container",children:N.map(e=>n.jsx("div",{className:"skeleton",style:{width:_||"100%",height:q||"20px"},children:n.jsx("div",{className:"pulse"})},e))})};E.__docgenInfo={description:"",methods:[],displayName:"Skeleton",props:{width:{required:!1,tsType:{name:"string"},description:""},height:{required:!1,tsType:{name:"string"},description:""},repeat:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}}}};const H={title:"Components/Skeleton",component:E,tags:["autodocs"],parameters:{layout:"fullscreen"},args:{}},r={args:{repeat:1,width:"400px"}},t={args:{repeat:2,width:"400px"}},s={args:{repeat:3,width:"600px"}},a={args:{repeat:1,width:"600px",height:"200px"}},o={args:{repeat:2,width:"100%",height:"100px"}};var d,m,u;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    repeat: 1,
    width: '400px'
  }
}`,...(u=(m=r.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var l,h,g;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    repeat: 2,
    width: '400px'
  }
}`,...(g=(h=t.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var x,f,w;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    repeat: 3,
    width: '600px'
  }
}`,...(w=(f=s.parameters)==null?void 0:f.docs)==null?void 0:w.source}}};var R,S,y;a.parameters={...a.parameters,docs:{...(R=a.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    repeat: 1,
    width: '600px',
    height: '200px'
  }
}`,...(y=(S=a.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};var j,k,v;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    repeat: 2,
    width: '100%',
    height: '100px'
  }
}`,...(v=(k=o.parameters)==null?void 0:k.docs)==null?void 0:v.source}}};const W=["Default","Repeat2","Repeat3","RepeatHeight200","RepeatFullWidth"];export{r as Default,t as Repeat2,s as Repeat3,o as RepeatFullWidth,a as RepeatHeight200,W as __namedExportsOrder,H as default};
