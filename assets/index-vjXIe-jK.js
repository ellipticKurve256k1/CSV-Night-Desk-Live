(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function o(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=o(s);fetch(s.href,i)}})();const ie=document.querySelector("#app");ie.innerHTML=`
  <div class="page">
    <div class="top-actions hidden" id="topActions">
      <button id="uploadAnotherBtn" class="upload-another-btn" type="button">Upload another file</button>
    </div>

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
      <div class="table-controls">
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

      <div id="paginationBar" class="pagination-bar hidden" aria-label="Table pagination">
        <label class="page-size-label" for="pageSizeSelect">Rows per page</label>
        <select id="pageSizeSelect" class="page-size-select">
          <option value="10" selected>10</option>
          <option value="15">15</option>
          <option value="100">100</option>
          <option value="250">250</option>
          <option value="500">500</option>
          <option value="1000">1000</option>
        </select>
        <button id="prevPageBtn" class="page-btn" type="button">Prev</button>
        <span id="pageInfo" class="page-info">Page 1 / 1</span>
        <button id="nextPageBtn" class="page-btn" type="button">Next</button>
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
`;const le=document.querySelector(".page"),re=document.querySelector("#topActions"),ce=document.querySelector("#uploadAnotherBtn"),g=document.querySelector("#dropZone"),de=document.querySelector("#uploadBtn"),N=document.querySelector("#fileInput"),d=document.querySelector("#statusText"),$=document.querySelector("#columnTags"),R=document.querySelector("#resetColumnsBtn"),_=document.querySelector("#exportBtn"),K=document.querySelector("#fileMeta"),B=document.querySelector("#rowMeta"),D=document.querySelector("#colMeta"),x=document.querySelector("#emptyState"),k=x.querySelector("p"),L=document.querySelector("#tableWrap"),P=document.querySelector("#dataTable"),y=document.querySelector("#tableHead"),S=document.querySelector("#tableBody"),w=document.querySelector("#paginationBar"),Q=document.querySelector("#pageSizeSelect"),T=document.querySelector("#prevPageBtn"),G=document.querySelector("#pageInfo"),A=document.querySelector("#nextPageBtn"),m=document.querySelector("#columnModal"),ue=document.querySelector("#modalColumnName"),pe=document.querySelector("#closeColumnModalBtn"),me=document.querySelector("#sortAscBtn"),ge=document.querySelector("#sortDescBtn"),he=document.querySelector("#clearSortBtn"),q=document.querySelector("#filterModeSelect"),fe=document.querySelector("#valueFilterGroup"),z=document.querySelector("#valueFilterSelect"),ve=document.querySelector("#numberFilterGroup"),Y=document.querySelector("#numberFilterInput"),be=document.querySelector("#applyFilterBtn"),Ce=document.querySelector("#clearFilterBtn"),ye=10,n={fileName:"",headers:[],rows:[],visibleColumnIndexes:[],columnFilters:{},sort:{columnIndex:null,direction:null},activeModalColumnIndex:null,pagination:{currentPage:1,pageSize:ye},processedRowsCache:{isDirty:!0,rows:[]},uniqueValuesCache:new Map};de.addEventListener("click",()=>N.click());ce.addEventListener("click",()=>N.click());N.addEventListener("change",e=>{const[t]=e.target.files??[];t&&J(t)});R.addEventListener("click",Re);pe.addEventListener("click",p);me.addEventListener("click",()=>se("asc"));ge.addEventListener("click",()=>se("desc"));he.addEventListener("click",Ie);q.addEventListener("change",oe);be.addEventListener("click",$e);Ce.addEventListener("click",Be);_.addEventListener("click",De);T.addEventListener("click",()=>ne(-1));A.addEventListener("click",()=>ne(1));Q.addEventListener("change",we);g.addEventListener("dragenter",e=>{e.preventDefault(),g.classList.add("is-dragging")});g.addEventListener("dragover",e=>{e.preventDefault(),g.classList.add("is-dragging")});g.addEventListener("dragleave",e=>{g.contains(e.relatedTarget)||g.classList.remove("is-dragging")});g.addEventListener("drop",e=>{var o;e.preventDefault(),g.classList.remove("is-dragging");const[t]=((o=e.dataTransfer)==null?void 0:o.files)??[];t&&J(t)});g.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),N.click())});window.addEventListener("dragover",e=>e.preventDefault());window.addEventListener("drop",e=>e.preventDefault());window.addEventListener("resize",()=>{m.classList.contains("hidden")||U()});window.addEventListener("keydown",e=>{e.key==="Escape"&&p()});document.addEventListener("click",e=>{if(m.classList.contains("hidden"))return;const t=e.target;t instanceof Element&&(m.contains(t)||t.closest(".column-header-btn")||p())});async function J(e){d.textContent="Reading file...";try{const o=(await e.text()).replace(/^\uFEFF/,""),a=ze(o),i=Ve(o,a).filter(u=>u.some(f=>f.trim()!==""));if(i.length===0)throw new Error("File is empty.");const[l,...r]=i,c=l.map((u,f)=>u.trim()||`Column ${f+1}`),h=Math.max(c.length,...r.map(u=>u.length));if(c.length<h)for(let u=c.length;u<h;u+=1)c.push(`Column ${u+1}`);const ae=r.map(u=>{const f=u.slice();for(;f.length<h;)f.push("");return f});n.fileName=e.name,n.headers=c,n.rows=ae,n.visibleColumnIndexes=c.map((u,f)=>f),n.columnFilters={},n.sort={columnIndex:null,direction:null},n.activeModalColumnIndex=null,b(),C(),te(),p(),ee(!0),I(),v(),K.textContent=`File: ${e.name}`,W(),d.textContent=`Loaded "${e.name}" successfully.`}catch(t){X(),d.textContent=`Could not parse CSV: ${t.message}`}finally{N.value=""}}function v(){const e=n.visibleColumnIndexes,t=H();if(n.headers.length===0){y.textContent="",S.textContent="",k.textContent="No data loaded yet.",x.classList.remove("hidden"),L.classList.add("hidden"),w.classList.add("hidden"),E(1),F(0),M();return}if(e.length===0){y.textContent="",S.textContent="",k.textContent="No columns selected. Click a red column tag to show it again.",x.classList.remove("hidden"),L.classList.add("hidden"),w.classList.add("hidden"),E(1),F(t.length),M();return}const o=e.map(l=>n.headers[l]),a=Se(t);y.textContent="",S.textContent="",E(o.length);const s=document.createElement("tr");o.forEach((l,r)=>{const c=document.createElement("th"),h=e[r];c.appendChild(Ee(l,h)),s.appendChild(c)}),y.appendChild(s);const i=document.createDocumentFragment();a.rows.forEach(l=>{const r=document.createElement("tr");e.forEach(c=>{const h=document.createElement("td");h.textContent=l[c]??"",r.appendChild(h)}),i.appendChild(r)}),S.appendChild(i),F(t.length,a.startIndex,a.endIndexExclusive),xe(t.length,a.totalPages),M(),x.classList.add("hidden"),L.classList.remove("hidden")}function X(){n.fileName="",n.headers=[],n.rows=[],n.visibleColumnIndexes=[],n.columnFilters={},n.sort={columnIndex:null,direction:null},n.activeModalColumnIndex=null,b(),C(),te(),p(),ee(!1),I(),E(1),y.textContent="",S.textContent="",w.classList.add("hidden"),k.textContent="No data loaded yet.",K.textContent="File: -",F(0),D.textContent="Columns: 0",M(),x.classList.remove("hidden"),L.classList.add("hidden")}function ee(e){le.classList.toggle("is-data-loaded",e),re.classList.toggle("hidden",!e)}function E(e){P.style.setProperty("--col-count",String(e)),P.classList.toggle("dense",e>=12),P.classList.toggle("super-dense",e>=20)}function W(){if(n.headers.length===0){D.textContent="Columns: 0";return}D.textContent=`Columns: ${n.visibleColumnIndexes.length}/${n.headers.length}`}function F(e,t,o){if(n.rows.length===0){B.textContent="Rows: 0";return}if(!(Number.isInteger(t)&&Number.isInteger(o)&&e>n.pagination.pageSize)){B.textContent=`Rows: ${e}/${n.rows.length}`;return}B.textContent=`Rows: ${e}/${n.rows.length} (view ${t+1}-${o})`}function M(){_.disabled=n.headers.length===0||n.visibleColumnIndexes.length===0}function b(){n.pagination.currentPage=1}function C(){n.processedRowsCache.isDirty=!0}function te(){n.uniqueValuesCache.clear()}function Se(e){const t=e.length,o=Math.max(1,Math.ceil(t/n.pagination.pageSize));n.pagination.currentPage=Math.min(Math.max(n.pagination.currentPage,1),o);const a=(n.pagination.currentPage-1)*n.pagination.pageSize,s=Math.min(a+n.pagination.pageSize,t);return{rows:e.slice(a,s),startIndex:a,endIndexExclusive:s,totalPages:o}}function xe(e,t){if(n.headers.length===0||n.visibleColumnIndexes.length===0){w.classList.add("hidden");return}if(w.classList.remove("hidden"),Q.value=String(n.pagination.pageSize),e===0){G.textContent="Page 1 / 1 - No rows",T.disabled=!0,A.disabled=!0;return}G.textContent=`Page ${n.pagination.currentPage} / ${t}`,T.disabled=n.pagination.currentPage<=1,A.disabled=n.pagination.currentPage>=t}function ne(e){const t=H();if(t.length===0)return;const o=Math.max(1,Math.ceil(t.length/n.pagination.pageSize)),a=Math.min(Math.max(n.pagination.currentPage+e,1),o);a!==n.pagination.currentPage&&(n.pagination.currentPage=a,v())}function we(e){const t=e.target;if(!(t instanceof HTMLSelectElement))return;const o=Number.parseInt(t.value,10);if(!Number.isFinite(o)||o<=0){t.value=String(n.pagination.pageSize);return}n.pagination.pageSize=o,b(),v()}function H(){if(!n.processedRowsCache.isDirty)return n.processedRowsCache.rows;if(n.rows.length===0)return n.processedRowsCache={isDirty:!1,rows:[]},n.processedRowsCache.rows;const e=Object.entries(n.columnFilters),t=e.length===0?n.rows:n.rows.filter(i=>e.every(([l,r])=>Ne(i[Number(l)]??"",r)));if(n.sort.columnIndex===null||!n.sort.direction)return n.processedRowsCache={isDirty:!1,rows:t},n.processedRowsCache.rows;const o=n.sort.columnIndex,a=n.sort.direction,s=[...t].sort((i,l)=>{const r=Le(i[o]??"",l[o]??"");return a==="asc"?r:-r});return n.processedRowsCache={isDirty:!1,rows:s},n.processedRowsCache.rows}function Ne(e,t){if(!t)return!0;if(t.type==="value")return(Array.isArray(t.values)?t.values:t.value===void 0?[]:[t.value]).includes(e);const o=O(e);return Number.isNaN(o)?!1:t.type==="lte"?o<=t.value:t.type==="gte"?o>=t.value:!0}function Le(e,t){const o=Z(e),a=Z(t);if(!Number.isNaN(o)&&!Number.isNaN(a))return o-a;const i=V(e),l=V(t);if(i||l)return String(e).localeCompare(String(t),void 0,{numeric:!0,sensitivity:"base"});const r=O(e),c=O(t);return!Number.isNaN(r)&&!Number.isNaN(c)?r-c:String(e).localeCompare(String(t),void 0,{numeric:!0,sensitivity:"base"})}function V(e){const t=String(e??"").trim();if(t==="")return!1;const o=/^\d{4}[-/.]\d{1,2}[-/.]\d{1,2}(?:[T\s]\d{1,2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?)?(?:\s*(?:Z|[+-]\d{2}:?\d{2}))?$/,a=/^\d{1,2}[-/.]\d{1,2}[-/.]\d{4}(?:[T\s]\d{1,2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?)?(?:\s*(?:Z|[+-]\d{2}:?\d{2}))?$/,s=/^[A-Za-z]{3,}\s+\d{1,2},?\s+\d{4}(?:\s+\d{1,2}:\d{2}(?::\d{2})?(?:\s*[APMapm]{2})?)?$/;return o.test(t)||a.test(t)||s.test(t)}function Z(e){if(!V(e))return Number.NaN;const o=String(e).trim().replace(/^(\d{4}[-/.]\d{1,2}[-/.]\d{1,2})\s+(\d)/,"$1T$2"),a=Date.parse(o);return Number.isNaN(a)?Number.NaN:a}function O(e){if(typeof e=="number")return Number.isFinite(e)?e:Number.NaN;const t=String(e).trim();if(t==="")return Number.NaN;const o=t.replace(/\u2212/g,"-"),a=o.startsWith("(")&&o.endsWith(")")&&o.length>2,l=(a?o.slice(1,-1).trim():o).replace(/[%$€£¥₩₹\s]/g,"").match(/[-+]?(?:\d[\d,]*(?:\.\d+)?|\.\d+)(?:[eE][-+]?\d+)?/);if(!l)return Number.NaN;const r=l[0].replace(/,/g,""),c=Number.parseFloat(r);return Number.isNaN(c)?Number.NaN:a?-Math.abs(c):c}function Ee(e,t){const o=document.createElement("button");o.type="button",o.className="column-header-btn";const a=document.createElement("span");a.className="header-label",a.textContent=e,o.appendChild(a);const s=document.createElement("span");if(s.className="header-indicators",n.columnFilters[t]){const i=document.createElement("span");i.className="header-indicator filter-indicator",i.textContent="F",s.appendChild(i)}if(n.sort.columnIndex===t){const i=document.createElement("span");i.className="header-indicator sort-indicator",i.textContent=n.sort.direction==="asc"?"▲":"▼",s.appendChild(i)}return s.childElementCount>0&&o.appendChild(s),o.addEventListener("click",i=>{i.stopPropagation(),Fe(t)}),o}function Fe(e){n.activeModalColumnIndex=e,ue.textContent=n.headers[e];const t=n.columnFilters[e];q.value=(t==null?void 0:t.type)??"none",Y.value=t&&(t.type==="lte"||t.type==="gte")?String(t.value):"",Me(e,t&&t.type==="value"&&Array.isArray(t.values)?t.values.map(o=>String(o)):[]),oe(),m.classList.remove("hidden"),requestAnimationFrame(()=>{U()})}function p(){m.classList.add("hidden"),n.activeModalColumnIndex=null}function U(){if(m.classList.contains("hidden"))return;const e=12,t=16,o=m.offsetWidth,a=(window.innerWidth-o)/2,s=window.innerWidth-o-e,i=Math.min(Math.max(a,e),Math.max(e,s)),l=e+t;m.style.left=`${i}px`,m.style.top=`${l}px`}function Me(e,t=[]){const o=qe(e),a=new Set(t.map(s=>String(s)));z.textContent="",o.forEach(s=>{const i=document.createElement("option");i.value=String(s),i.textContent=String(s)===""?"(empty)":String(s),i.selected=a.has(i.value),z.appendChild(i)})}function qe(e){if(n.uniqueValuesCache.has(e))return n.uniqueValuesCache.get(e);const t=[...new Set(n.rows.map(o=>o[e]??""))].sort((o,a)=>String(o).localeCompare(String(a),void 0,{numeric:!0,sensitivity:"base"}));return n.uniqueValuesCache.set(e,t),t}function oe(){const e=q.value;fe.classList.toggle("hidden",e!=="value"),ve.classList.toggle("hidden",e!=="lte"&&e!=="gte"),m.classList.contains("hidden")||requestAnimationFrame(()=>{U()})}function se(e){const t=n.activeModalColumnIndex;t!==null&&(n.sort={columnIndex:t,direction:e},b(),C(),v(),d.textContent=`Sorted "${n.headers[t]}" in ${e==="asc"?"ascending":"descending"} order.`,p())}function Ie(){if(n.sort.columnIndex===null){p();return}n.sort={columnIndex:null,direction:null},b(),C(),v(),d.textContent="Sort cleared.",p()}function $e(){const e=n.activeModalColumnIndex;if(e===null)return;const t=q.value;if(t==="none")delete n.columnFilters[e];else if(t==="value"){const o=[...z.selectedOptions].map(a=>a.value);if(o.length===0){d.textContent="Choose at least one value before applying value filter.";return}n.columnFilters[e]={type:"value",values:o}}else{const o=Number.parseFloat(Y.value);if(Number.isNaN(o)){d.textContent="Enter a valid number for numeric filter.";return}n.columnFilters[e]={type:t,value:o}}b(),C(),v(),d.textContent=`Filter applied on "${n.headers[e]}".`,p()}function Be(){const e=n.activeModalColumnIndex;e!==null&&(delete n.columnFilters[e],b(),C(),v(),d.textContent=`Filter cleared on "${n.headers[e]}".`,p())}function I(){if($.textContent="",R.classList.add("hidden"),n.headers.length===0){const t=document.createElement("span");t.className="column-placeholder",t.textContent="Load a CSV file to choose columns.",$.appendChild(t);return}const e=new Set(n.visibleColumnIndexes);n.headers.forEach((t,o)=>{const a=e.has(o),s=document.createElement("span");s.className=a?"column-tag":"column-tag is-hidden";const i=document.createElement("span");i.className="column-name",i.textContent=t;const l=document.createElement("button");l.type="button",l.className="column-remove",l.setAttribute("aria-label",`${a?"Hide":"Show"} column ${t}`),l.textContent="x",l.addEventListener("click",()=>Pe(o)),s.appendChild(i),s.appendChild(l),$.appendChild(s)}),n.visibleColumnIndexes.length<n.headers.length&&R.classList.remove("hidden")}function Pe(e){const t=n.visibleColumnIndexes.includes(e);let o=!1;if(t?(n.visibleColumnIndexes=n.visibleColumnIndexes.filter(a=>a!==e),n.columnFilters[e]&&(delete n.columnFilters[e],o=!0),n.sort.columnIndex===e&&(n.sort={columnIndex:null,direction:null},o=!0),n.activeModalColumnIndex===e&&p()):n.visibleColumnIndexes=[...n.visibleColumnIndexes,e].sort((a,s)=>a-s),o&&(b(),C()),I(),v(),W(),n.visibleColumnIndexes.length===0){d.textContent="No columns visible. Click any red column tag to restore it.";return}d.textContent=`Showing ${n.visibleColumnIndexes.length} of ${n.headers.length} columns.`}function Re(){n.headers.length!==0&&(n.visibleColumnIndexes=n.headers.map((e,t)=>t),I(),v(),W(),d.textContent=`Showing all ${n.headers.length} columns.`)}function De(){if(n.headers.length===0){d.textContent="Load a CSV file before exporting.";return}if(n.visibleColumnIndexes.length===0){d.textContent="No columns selected to export.";return}const e=n.visibleColumnIndexes.map(r=>n.headers[r]),t=H().map(r=>n.visibleColumnIndexes.map(c=>r[c]??"")),a=`\uFEFF${[j(e),...t.map(r=>j(r))].join(`\r
`)}`,s=new Blob([a],{type:"text/csv;charset=utf-8;"}),i=URL.createObjectURL(s),l=document.createElement("a");l.href=i,l.download=ke(),document.body.appendChild(l),l.click(),l.remove(),URL.revokeObjectURL(i),d.textContent=`Exported ${t.length} rows and ${e.length} columns.`}function ke(){const e="csv-export",t=n.fileName&&n.fileName.replace(/\.[^/.]+$/,"").trim()||e,o=Ae(new Date);return`${t}-view-${o}.csv`}function j(e){return e.map(t=>Te(t)).join(",")}function Te(e){const t=String(e??"");return/[",\n\r]/.test(t)?`"${t.replace(/"/g,'""')}"`:t}function Ae(e){const t=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0"),s=String(e.getHours()).padStart(2,"0"),i=String(e.getMinutes()).padStart(2,"0"),l=String(e.getSeconds()).padStart(2,"0");return`${t}${o}${a}-${s}${i}${l}`}function ze(e){const t=e.split(/\r?\n/).find(i=>i.trim().length>0)??"",o=[",",";","	","|"];let a=",",s=-1;return o.forEach(i=>{const l=(t.match(new RegExp(Oe(i),"g"))??[]).length;l>s&&(s=l,a=i)}),a}function Ve(e,t=","){const o=[];let a=[],s="",i=!1;for(let l=0;l<e.length;l+=1){const r=e[l],c=e[l+1];if(i){r==='"'&&c==='"'?(s+='"',l+=1):r==='"'?i=!1:s+=r;continue}if(r==='"'){i=!0;continue}if(r===t){a.push(s),s="";continue}if(r===`
`){a.push(s),o.push(a),a=[],s="";continue}r!=="\r"&&(s+=r)}if(i)throw new Error("Unclosed quoted value.");return a.push(s),o.push(a),o}function Oe(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}X();
