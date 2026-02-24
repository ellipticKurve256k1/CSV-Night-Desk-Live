(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))i(l);new MutationObserver(l=>{for(const s of l)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function o(l){const s={};return l.integrity&&(s.integrity=l.integrity),l.referrerPolicy&&(s.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?s.credentials="include":l.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(l){if(l.ep)return;l.ep=!0;const s=o(l);fetch(l.href,s)}})();const K=document.querySelector("#app");K.innerHTML=`
  <div class="page">
    <header class="hero">
      <p class="eyebrow">DATA WORKSPACE</p>
      <h1>CSV Night Desk</h1>
      <p class="subtitle">Drop a CSV file or upload one to inspect it instantly.</p>
    </header>

    <section class="panel upload-panel">
      <div id="dropZone" class="drop-zone" tabindex="0" aria-label="Drop CSV file here">
        <p class="drop-title">Drop CSV file here</p>
        <p class="drop-hint">or use the upload button</p>
        <button id="uploadBtn" class="upload-btn" type="button">Upload</button>
        <input id="fileInput" type="file" accept=".csv,text/csv" hidden />
      </div>
      <p id="statusText" class="status" aria-live="polite">Waiting for a CSV file.</p>
    </section>

    <section class="panel table-panel">
      <div class="column-picker">
        <p class="field-label">Display columns</p>
        <div class="column-tags-wrap">
          <div id="columnTags" class="column-tags">
            <span class="column-placeholder">Load a CSV file to choose columns.</span>
          </div>
          <button id="resetColumnsBtn" class="reset-columns hidden" type="button">Reset</button>
        </div>
      </div>

      <div class="meta-row">
        <div class="meta">
          <span id="fileMeta" class="chip">File: -</span>
          <span id="rowMeta" class="chip">Rows: 0</span>
          <span id="colMeta" class="chip">Columns: 0</span>
        </div>
        <button id="exportBtn" class="export-btn" type="button" disabled>Export</button>
      </div>

      <div id="emptyState" class="empty-state">
        <p>No data loaded yet.</p>
      </div>

      <div id="tableWrap" class="table-wrap hidden">
        <table id="dataTable" style="--col-count: 1">
          <thead id="tableHead"></thead>
          <tbody id="tableBody"></tbody>
        </table>
      </div>

      <div id="columnModal" class="column-modal hidden" role="dialog" aria-label="Column controls">
        <div class="modal-title-row">
          <p id="modalColumnName" class="modal-title">Column</p>
          <button id="closeColumnModalBtn" class="modal-close" type="button" aria-label="Close modal">x</button>
        </div>

        <div class="modal-section">
          <p class="modal-label">Sort</p>
          <div class="modal-actions">
            <button id="sortAscBtn" class="modal-btn" type="button">Ascending</button>
            <button id="sortDescBtn" class="modal-btn" type="button">Descending</button>
            <button id="clearSortBtn" class="modal-btn ghost" type="button">Clear sort</button>
          </div>
        </div>

        <div class="modal-section">
          <label class="modal-label" for="filterModeSelect">Filter</label>
          <select id="filterModeSelect" class="modal-input">
            <option value="none">No filter</option>
            <option value="value">By exact value</option>
            <option value="lte">Less than or equal</option>
            <option value="gte">More than or equal</option>
          </select>

          <div id="valueFilterGroup" class="filter-input-group hidden">
            <p class="modal-hint">Select one or more values (Cmd/Ctrl-click for multi-select).</p>
            <select id="valueFilterSelect" class="modal-input value-filter-select" multiple size="8"></select>
          </div>

          <div id="numberFilterGroup" class="filter-input-group hidden">
            <input id="numberFilterInput" class="modal-input" type="number" step="any" placeholder="Enter a number" />
          </div>

          <div class="modal-actions">
            <button id="applyFilterBtn" class="modal-btn" type="button">Apply filter</button>
            <button id="clearFilterBtn" class="modal-btn ghost" type="button">Clear filter</button>
          </div>
        </div>
      </div>
    </section>
  </div>
`;const v=document.querySelector("#dropZone"),_=document.querySelector("#uploadBtn"),L=document.querySelector("#fileInput"),d=document.querySelector("#statusText"),I=document.querySelector("#columnTags"),q=document.querySelector("#resetColumnsBtn"),O=document.querySelector("#exportBtn"),P=document.querySelector("#fileMeta"),V=document.querySelector("#rowMeta"),$=document.querySelector("#colMeta"),y=document.querySelector("#emptyState"),A=y.querySelector("p"),x=document.querySelector("#tableWrap"),B=document.querySelector("#dataTable"),g=document.querySelector("#tableHead"),C=document.querySelector("#tableBody"),f=document.querySelector("#columnModal"),Q=document.querySelector("#modalColumnName"),Y=document.querySelector("#closeColumnModalBtn"),J=document.querySelector("#sortAscBtn"),X=document.querySelector("#sortDescBtn"),ee=document.querySelector("#clearSortBtn"),E=document.querySelector("#filterModeSelect"),te=document.querySelector("#valueFilterGroup"),R=document.querySelector("#valueFilterSelect"),ne=document.querySelector("#numberFilterGroup"),W=document.querySelector("#numberFilterInput"),oe=document.querySelector("#applyFilterBtn"),le=document.querySelector("#clearFilterBtn"),n={fileName:"",headers:[],rows:[],visibleColumnIndexes:[],columnFilters:{},sort:{columnIndex:null,direction:null},activeModalColumnIndex:null,activeModalAnchor:null};_.addEventListener("click",()=>L.click());L.addEventListener("change",e=>{const[t]=e.target.files??[];t&&z(t)});q.addEventListener("click",he);Y.addEventListener("click",p);J.addEventListener("click",()=>Z("asc"));X.addEventListener("click",()=>Z("desc"));ee.addEventListener("click",de);E.addEventListener("change",j);oe.addEventListener("click",ue);le.addEventListener("click",me);O.addEventListener("click",fe);v.addEventListener("dragenter",e=>{e.preventDefault(),v.classList.add("is-dragging")});v.addEventListener("dragover",e=>{e.preventDefault(),v.classList.add("is-dragging")});v.addEventListener("dragleave",e=>{v.contains(e.relatedTarget)||v.classList.remove("is-dragging")});v.addEventListener("drop",e=>{var o;e.preventDefault(),v.classList.remove("is-dragging");const[t]=((o=e.dataTransfer)==null?void 0:o.files)??[];t&&z(t)});v.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),L.click())});window.addEventListener("dragover",e=>e.preventDefault());window.addEventListener("drop",e=>e.preventDefault());window.addEventListener("resize",()=>{f.classList.contains("hidden")||T()});window.addEventListener("keydown",e=>{e.key==="Escape"&&p()});document.addEventListener("click",e=>{if(f.classList.contains("hidden"))return;const t=e.target;t instanceof Element&&(f.contains(t)||t.closest(".column-header-btn")||p())});async function z(e){d.textContent="Reading file...";try{const o=(await e.text()).replace(/^\uFEFF/,""),i=Ce(o),s=ye(o,i).filter(u=>u.some(m=>m.trim()!==""));if(s.length===0)throw new Error("File is empty.");const[r,...a]=s,c=r.map((u,m)=>u.trim()||`Column ${m+1}`),h=Math.max(c.length,...a.map(u=>u.length));if(c.length<h)for(let u=c.length;u<h;u+=1)c.push(`Column ${u+1}`);const M=a.map(u=>{const m=u.slice();for(;m.length<h;)m.push("");return m});n.fileName=e.name,n.headers=c,n.rows=M,n.visibleColumnIndexes=c.map((u,m)=>m),n.columnFilters={},n.sort={columnIndex:null,direction:null},n.activeModalColumnIndex=null,n.activeModalAnchor=null,p(),F(),b(),P.textContent=`File: ${e.name}`,D(),d.textContent=`Loaded "${e.name}" successfully.`}catch(t){G(),d.textContent=`Could not parse CSV: ${t.message}`}finally{L.value=""}}function b(){const e=n.visibleColumnIndexes,t=U();if(n.headers.length===0){g.textContent="",C.textContent="",A.textContent="No data loaded yet.",y.classList.remove("hidden"),x.classList.add("hidden"),S(1),w(0),N();return}if(e.length===0){g.textContent="",C.textContent="",A.textContent="No columns selected. Click a red column tag to show it again.",y.classList.remove("hidden"),x.classList.add("hidden"),S(1),w(t.length),N();return}const o=e.map(r=>n.headers[r]),i=t.map(r=>e.map(a=>r[a]??""));g.textContent="",C.textContent="",S(o.length);const l=document.createElement("tr");o.forEach((r,a)=>{const c=document.createElement("th"),h=e[a];c.appendChild(re(r,h)),l.appendChild(c)}),g.appendChild(l);const s=document.createDocumentFragment();i.forEach(r=>{const a=document.createElement("tr");r.forEach(c=>{const h=document.createElement("td");h.textContent=c,a.appendChild(h)}),s.appendChild(a)}),C.appendChild(s),w(t.length),N(),y.classList.add("hidden"),x.classList.remove("hidden")}function G(){n.fileName="",n.headers=[],n.rows=[],n.visibleColumnIndexes=[],n.columnFilters={},n.sort={columnIndex:null,direction:null},n.activeModalColumnIndex=null,n.activeModalAnchor=null,p(),F(),S(1),g.textContent="",C.textContent="",A.textContent="No data loaded yet.",P.textContent="File: -",w(0),$.textContent="Columns: 0",N(),y.classList.remove("hidden"),x.classList.add("hidden")}function S(e){B.style.setProperty("--col-count",String(e)),B.classList.toggle("dense",e>=12),B.classList.toggle("super-dense",e>=20)}function D(){if(n.headers.length===0){$.textContent="Columns: 0";return}$.textContent=`Columns: ${n.visibleColumnIndexes.length}/${n.headers.length}`}function w(e){if(n.rows.length===0){V.textContent="Rows: 0";return}V.textContent=`Rows: ${e}/${n.rows.length}`}function N(){O.disabled=n.headers.length===0||n.visibleColumnIndexes.length===0}function U(){if(n.rows.length===0)return[];const e=n.rows.filter(i=>Object.entries(n.columnFilters).every(([s,r])=>se(i[Number(s)]??"",r)));if(n.sort.columnIndex===null||!n.sort.direction)return e;const t=n.sort.columnIndex,o=n.sort.direction;return[...e].sort((i,l)=>{const s=ie(i[t]??"",l[t]??"");return o==="asc"?s:-s})}function se(e,t){if(!t)return!0;if(t.type==="value")return(Array.isArray(t.values)?t.values:t.value===void 0?[]:[t.value]).includes(e);const o=k(e);return Number.isNaN(o)?!1:t.type==="lte"?o<=t.value:t.type==="gte"?o>=t.value:!0}function ie(e,t){const o=k(e),i=k(t);return!Number.isNaN(o)&&!Number.isNaN(i)?o-i:String(e).localeCompare(String(t),void 0,{numeric:!0,sensitivity:"base"})}function k(e){if(typeof e=="number")return Number.isFinite(e)?e:Number.NaN;const t=String(e).trim();if(t==="")return Number.NaN;const o=t.replace(/\u2212/g,"-"),i=o.startsWith("(")&&o.endsWith(")")&&o.length>2,r=(i?o.slice(1,-1).trim():o).replace(/[%$€£¥₩₹\s]/g,"").match(/[-+]?(?:\d[\d,]*(?:\.\d+)?|\.\d+)(?:[eE][-+]?\d+)?/);if(!r)return Number.NaN;const a=r[0].replace(/,/g,""),c=Number.parseFloat(a);return Number.isNaN(c)?Number.NaN:i?-Math.abs(c):c}function re(e,t){const o=document.createElement("button");o.type="button",o.className="column-header-btn";const i=document.createElement("span");i.className="header-label",i.textContent=e,o.appendChild(i);const l=document.createElement("span");if(l.className="header-indicators",n.columnFilters[t]){const s=document.createElement("span");s.className="header-indicator filter-indicator",s.textContent="F",l.appendChild(s)}if(n.sort.columnIndex===t){const s=document.createElement("span");s.className="header-indicator sort-indicator",s.textContent=n.sort.direction==="asc"?"▲":"▼",l.appendChild(s)}return l.childElementCount>0&&o.appendChild(l),o.addEventListener("click",s=>{s.stopPropagation(),ae(t,o)}),o}function ae(e,t){n.activeModalColumnIndex=e,n.activeModalAnchor=t,Q.textContent=n.headers[e];const o=n.columnFilters[e];E.value=(o==null?void 0:o.type)??"none",W.value=o&&(o.type==="lte"||o.type==="gte")?String(o.value):"",ce(e,o&&o.type==="value"&&Array.isArray(o.values)?o.values.map(i=>String(i)):[]),j(),f.classList.remove("hidden"),requestAnimationFrame(()=>{T(t)})}function p(){f.classList.add("hidden"),n.activeModalColumnIndex=null,n.activeModalAnchor=null}function T(e=n.activeModalAnchor){if(!e||f.classList.contains("hidden"))return;if(!(e instanceof Element)||!e.isConnected){p();return}const t=e.getBoundingClientRect(),o=12,i=8,l=f.offsetWidth,s=f.offsetHeight,r=window.innerWidth-l-o,a=window.innerHeight-s-o;let c=t.left+t.width/2-l/2;c=Math.min(Math.max(c,o),r);const h=window.innerHeight-t.bottom-o,M=t.top-o;let m=h>=s+i||h>=M?t.bottom+i:t.top-s-i;m=Math.min(Math.max(m,o),a),f.style.left=`${c}px`,f.style.top=`${m}px`}function ce(e,t=[]){const o=[...new Set(n.rows.map(l=>l[e]??""))].sort((l,s)=>String(l).localeCompare(String(s),void 0,{numeric:!0,sensitivity:"base"})),i=new Set(t.map(l=>String(l)));R.textContent="",o.forEach(l=>{const s=document.createElement("option");s.value=String(l),s.textContent=String(l)===""?"(empty)":String(l),s.selected=i.has(s.value),R.appendChild(s)})}function j(){const e=E.value;te.classList.toggle("hidden",e!=="value"),ne.classList.toggle("hidden",e!=="lte"&&e!=="gte"),f.classList.contains("hidden")||requestAnimationFrame(()=>{T()})}function Z(e){const t=n.activeModalColumnIndex;t!==null&&(n.sort={columnIndex:t,direction:e},b(),d.textContent=`Sorted "${n.headers[t]}" in ${e==="asc"?"ascending":"descending"} order.`,p())}function de(){if(n.sort.columnIndex===null){p();return}n.sort={columnIndex:null,direction:null},b(),d.textContent="Sort cleared.",p()}function ue(){const e=n.activeModalColumnIndex;if(e===null)return;const t=E.value;if(t==="none")delete n.columnFilters[e];else if(t==="value"){const o=[...R.selectedOptions].map(i=>i.value);if(o.length===0){d.textContent="Choose at least one value before applying value filter.";return}n.columnFilters[e]={type:"value",values:o}}else{const o=Number.parseFloat(W.value);if(Number.isNaN(o)){d.textContent="Enter a valid number for numeric filter.";return}n.columnFilters[e]={type:t,value:o}}b(),d.textContent=`Filter applied on "${n.headers[e]}".`,p()}function me(){const e=n.activeModalColumnIndex;e!==null&&(delete n.columnFilters[e],b(),d.textContent=`Filter cleared on "${n.headers[e]}".`,p())}function F(){if(I.textContent="",q.classList.add("hidden"),n.headers.length===0){const t=document.createElement("span");t.className="column-placeholder",t.textContent="Load a CSV file to choose columns.",I.appendChild(t);return}const e=new Set(n.visibleColumnIndexes);n.headers.forEach((t,o)=>{const i=e.has(o),l=document.createElement("span");l.className=i?"column-tag":"column-tag is-hidden";const s=document.createElement("span");s.className="column-name",s.textContent=t;const r=document.createElement("button");r.type="button",r.className="column-remove",r.setAttribute("aria-label",`${i?"Hide":"Show"} column ${t}`),r.textContent="x",r.addEventListener("click",()=>pe(o)),l.appendChild(s),l.appendChild(r),I.appendChild(l)}),n.visibleColumnIndexes.length<n.headers.length&&q.classList.remove("hidden")}function pe(e){if(n.visibleColumnIndexes.includes(e)?(n.visibleColumnIndexes=n.visibleColumnIndexes.filter(o=>o!==e),delete n.columnFilters[e],n.sort.columnIndex===e&&(n.sort={columnIndex:null,direction:null}),n.activeModalColumnIndex===e&&p()):n.visibleColumnIndexes=[...n.visibleColumnIndexes,e].sort((o,i)=>o-i),F(),b(),D(),n.visibleColumnIndexes.length===0){d.textContent="No columns visible. Click any red column tag to restore it.";return}d.textContent=`Showing ${n.visibleColumnIndexes.length} of ${n.headers.length} columns.`}function he(){n.headers.length!==0&&(n.visibleColumnIndexes=n.headers.map((e,t)=>t),F(),b(),D(),d.textContent=`Showing all ${n.headers.length} columns.`)}function fe(){if(n.headers.length===0){d.textContent="Load a CSV file before exporting.";return}if(n.visibleColumnIndexes.length===0){d.textContent="No columns selected to export.";return}const e=n.visibleColumnIndexes.map(a=>n.headers[a]),t=U().map(a=>n.visibleColumnIndexes.map(c=>a[c]??"")),i=`\uFEFF${[H(e),...t.map(a=>H(a))].join(`\r
`)}`,l=new Blob([i],{type:"text/csv;charset=utf-8;"}),s=URL.createObjectURL(l),r=document.createElement("a");r.href=s,r.download=ve(),document.body.appendChild(r),r.click(),r.remove(),URL.revokeObjectURL(s),d.textContent=`Exported ${t.length} rows and ${e.length} columns.`}function ve(){const e="csv-export",t=n.fileName&&n.fileName.replace(/\.[^/.]+$/,"").trim()||e,o=ge(new Date);return`${t}-view-${o}.csv`}function H(e){return e.map(t=>be(t)).join(",")}function be(e){const t=String(e??"");return/[",\n\r]/.test(t)?`"${t.replace(/"/g,'""')}"`:t}function ge(e){const t=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0"),i=String(e.getDate()).padStart(2,"0"),l=String(e.getHours()).padStart(2,"0"),s=String(e.getMinutes()).padStart(2,"0"),r=String(e.getSeconds()).padStart(2,"0");return`${t}${o}${i}-${l}${s}${r}`}function Ce(e){const t=e.split(/\r?\n/).find(s=>s.trim().length>0)??"",o=[",",";","	","|"];let i=",",l=-1;return o.forEach(s=>{const r=(t.match(new RegExp(xe(s),"g"))??[]).length;r>l&&(l=r,i=s)}),i}function ye(e,t=","){const o=[];let i=[],l="",s=!1;for(let r=0;r<e.length;r+=1){const a=e[r],c=e[r+1];if(s){a==='"'&&c==='"'?(l+='"',r+=1):a==='"'?s=!1:l+=a;continue}if(a==='"'){s=!0;continue}if(a===t){i.push(l),l="";continue}if(a===`
`){i.push(l),o.push(i),i=[],l="";continue}a!=="\r"&&(l+=a)}if(s)throw new Error("Unclosed quoted value.");return i.push(l),o.push(i),o}function xe(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}G();
