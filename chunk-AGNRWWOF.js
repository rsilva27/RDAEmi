import{a as X}from"./chunk-TH7GMEEF.js";import{A as T,H as z,L as N,M as U,P as j,S as L,V as H,W as q,X as G,Y as W,Z as $,ca as K,da as J,ea as Z,k as A,l as k,n as O,v as M,w as F,x as V}from"./chunk-6O5HTEX2.js";import{$ as E,Ea as P,Fa as m,Ga as g,Ia as R,Ja as x,Ka as b,La as s,Ma as t,Na as i,Oa as d,Q as f,R as h,Ra as _,Sa as C,Ta as c,ab as I,bb as y,cb as a,db as p,eb as S,kb as B,la as w,na as n,xa as D}from"./chunk-U23SP7CI.js";var te=(o,r)=>r.id,ie=(o,r)=>r.location,Q=(o,r)=>r.name,ee=(o,r)=>r.description;function ne(o,r){o&1&&a(0," Enviando RDA... ")}function oe(o,r){o&1&&a(0," Simular Env\xEDo RDA ")}function ae(o,r){if(o&1&&(t(0,"section",8)(1,"h3",25),d(2,"lucide-icon",26),a(3," Arquitectura de Seguridad \u2014 Cumplimiento Normativo "),i(),t(4,"p",27),a(5," Requisitos estrictos de seguridad seg\xFAn la norma t\xE9cnica del Ministerio y la Ley 1581 de 2012 (Habeas Data). "),i(),t(6,"div",28)(7,"div")(8,"h4",29),d(9,"lucide-icon",6),a(10," 1. No exponer credenciales (BFF Pattern) "),i(),t(11,"p",30),a(12," El frontend NUNCA almacena "),t(13,"code",31),a(14,"client_id"),i(),a(15,", "),t(16,"code",31),a(17,"client_secret"),i(),a(18," ni "),t(19,"code",31),a(20,"Ocp-Apim-Subscription-Key"),i(),a(21,". Se resuelven desde Azure Key Vault v\xEDa un BFF. "),i(),d(22,"app-code-block",32),i(),t(23,"div")(24,"h4",29),d(25,"lucide-icon",6),a(26," 2. Cabeceras HTTP y Cifrado en Tr\xE1nsito (TLS 1.2+) "),i(),t(27,"p",30),a(28," Toda comunicaci\xF3n fuerza "),t(29,"code",31),a(30,"https://"),i(),a(31,". Se inyectan los headers "),t(32,"code",31),a(33,"Authorization"),i(),a(34,", "),t(35,"code",31),a(36,"Ocp-Apim-Subscription-Key"),i(),a(37," y "),t(38,"code",31),a(39,"Content-Type: application/fhir+json"),i(),a(40,". "),i(),d(41,"app-code-block",33),i(),t(42,"div")(43,"h4",29),d(44,"lucide-icon",6),a(45," 3. Cifrado en Reposo (AES-256-GCM) "),i(),t(46,"p",30),a(47," Si el navegador pierde conectividad, el JSON se cifra con AES-256-GCM antes de persistirse en localStorage. "),i(),d(48,"app-code-block",34),i(),t(49,"div")(50,"h4",29),d(51,"lucide-icon",6),a(52," 4. Manejo de Errores (OperationOutcome) "),i(),t(53,"p",30),a(54," Los errores HTTP 400/409 del validador VIDA retornan un recurso "),t(55,"code",31),a(56,"OperationOutcome"),i(),a(57," con "),t(58,"code",31),a(59,"issue[].diagnostics"),i(),a(60,". "),i(),d(61,"app-code-block",35),i()()()),o&2){let e=c();n(2),s("img",e.ShieldCheck)("size",20),n(7),s("img",e.Lock)("size",16),n(13),s("code",e.bffSnippet),n(3),s("img",e.Send)("size",16),n(16),s("code",e.enviarRDASnippet),n(3),s("img",e.Lock)("size",16),n(4),s("code",e.cifradoSnippet),n(3),s("img",e.AlertTriangle)("size",16),n(10),s("code",e.operationOutcomeSnippet)}}function re(o,r){if(o&1&&(t(0,"div",41)(1,"div",42)(2,"span",43),a(3),i(),t(4,"div",44)(5,"p",45),a(6),i(),t(7,"p",46)(8,"strong"),a(9,"Ubicaci\xF3n:"),i(),a(10),i(),t(11,"p",47)(12,"strong"),a(13,"C\xF3digo:"),i(),a(14),i()()()()),o&2){let e=r.$implicit,l=c(2);y(l.severityClass(e.severity)),n(2),y(l.severityBadge(e.severity)),n(),S(" ",e.severity," "),n(3),p(e.diagnostics),n(4),S(" ",e.location," "),n(4),S(" ",e.code," ")}}function le(o,r){if(o&1&&(t(0,"section",9)(1,"h3",36),d(2,"lucide-icon",37),a(3," OperationOutcome \u2014 Respuesta del Validador VIDA "),i(),t(4,"p",38),a(5," Ejemplo de errores devueltos por el Ministerio al enviar un Bundle con campos inv\xE1lidos ("),t(6,"strong"),a(7,"HTTP 400 \u2014 Bad Request"),i(),a(8,"). "),i(),t(9,"div",39),x(10,re,15,8,"div",40,ie),i()()),o&2){let e=c();n(2),s("img",e.AlertTriangle)("size",20),n(8),b(e.mockOperationOutcome)}}function se(o,r){if(o&1){let e=_();t(0,"button",48),C("mouseenter",function(){let u=f(e).$implicit,v=c();return h(v.onEntryHover(u.id))})("click",function(){let u=f(e).$implicit,v=c();return h(v.selectEntry(u.id))}),t(1,"div",49)(2,"span",50),a(3),i(),t(4,"span",51),d(5,"lucide-icon",6),i(),t(6,"div",44)(7,"div",52)(8,"span",53),a(9),i(),t(10,"span",54),a(11),i()(),t(12,"p",55),a(13),i()(),d(14,"lucide-icon",56),i()()}if(o&2){let e=r.$implicit,l=c();y(l.activeEntry()===e.id?l.entryActiveBg(e.color):l.entryBg(e.color)),P("aria-expanded",l.activeEntry()===e.id)("aria-label","entry["+e.index+"]: "+e.resource+" \u2014 "+e.title),n(3),S(" ",e.index," "),n(),y(l.iconBg(e.color)),n(),s("img",e.icon)("size",16),n(4),S("entry[",e.index,"]"),n(2),p(e.resource),n(2),p(e.subtitle),n(),I("rotate-0",l.activeEntry()!==e.id),s("img",l.ChevronRight)("size",16)}}function de(o,r){if(o&1&&(t(0,"li",66),d(1,"lucide-icon",69),t(2,"code",70),a(3),i()()),o&2){let e=r.$implicit,l=c(2);n(),s("img",l.ChevronRight)("size",14),n(2),p(e)}}function ce(o,r){if(o&1&&(t(0,"a",75),d(1,"lucide-icon",6),i()),o&2){let e=c().$implicit,l=c(3);s("href",e.url,w),n(),s("img",l.ExternalLink)("size",14)}}function ue(o,r){if(o&1&&(t(0,"div",72),d(1,"lucide-icon",73),t(2,"span",74),a(3),i(),m(4,ce,2,3,"a",75),i()),o&2){let e=r.$implicit,l=c(3);n(),s("img",l.FileText)("size",14),n(2),p(e.name),n(),g(e.url?4:-1)}}function pe(o,r){if(o&1&&(t(0,"div")(1,"h4",64),a(2,"Cat\xE1logos Obligatorios"),i(),t(3,"div",71),x(4,ue,5,4,"div",72,Q),i()()),o&2){let e=c();n(4),b(e.catalogs)}}function me(o,r){if(o&1&&(t(0,"span",79),a(1),i()),o&2){let e=c().$implicit;n(),p(e.code)}}function ge(o,r){if(o&1&&(t(0,"div",76)(1,"div",77),d(2,"lucide-icon",78),t(3,"div"),m(4,me,2,1,"span",79),t(5,"p",80),a(6),i()()()()),o&2){let e=r.$implicit,l=c(3);n(2),s("img",l.AlertTriangle)("size",14),n(2),g(e.code?4:-1),n(2),p(e.description)}}function xe(o,r){if(o&1&&(t(0,"div")(1,"h4",64),a(2,"Reglas de Validaci\xF3n MUV"),i(),t(3,"div",71),x(4,ge,7,4,"div",76,ee),i()()),o&2){let e=c();n(4),b(e.validations)}}function be(o,r){if(o&1&&(t(0,"div",67)(1,"div",77),d(2,"lucide-icon",81),t(3,"p",82),a(4),i()()()),o&2){let e=c(),l=c();n(2),s("img",l.ShieldCheck)("size",14),n(2),p(e.securityNote)}}function Ce(o,r){if(o&1){let e=_();t(0,"div",22)(1,"div",57)(2,"div",58)(3,"div",49)(4,"span",59),d(5,"lucide-icon",6),i(),t(6,"div")(7,"h3",60),a(8),i(),t(9,"p",61),a(10),i()()(),t(11,"button",62),C("click",function(){f(e);let u=c();return h(u.clearSelection())}),d(12,"lucide-icon",6),i()()(),t(13,"div",63)(14,"div")(15,"h4",64),a(16,"Campos Requeridos"),i(),t(17,"ul",65),x(18,de,4,3,"li",66,R),i()(),m(20,pe,6,0,"div"),m(21,xe,6,0,"div"),m(22,be,5,3,"div",67),t(23,"div")(24,"h4",64),a(25,"Fragmento JSON (FHIR R4)"),i(),d(26,"app-code-block",68),i()()()}if(o&2){let e=r,l=c();n(),y(l.headerBg(e.color)),n(4),s("img",e.icon)("size",18),n(3),p(e.title),n(2),p(e.subtitle),n(2),s("img",l.XIcon)("size",16),n(6),b(e.requiredFields),n(2),g(e.catalogs.length?20:-1),n(),g(e.validations.length?21:-1),n(),g(e.securityNote?22:-1),n(4),s("title",e.resource+".json")("code",e.jsonSnippet)}}function ye(o,r){if(o&1&&(t(0,"div",23)(1,"div",83),d(2,"lucide-icon",84),i(),t(3,"h3",85),a(4,"Panel de Detalle"),i(),t(5,"p",86),a(6," Pasa el mouse o haz clic en cualquier bloque del Bundle para ver su fragmento JSON, cat\xE1logos obligatorios y reglas de validaci\xF3n. "),i()()),o&2){let e=c();n(2),s("img",e.Eye)("size",28)}}function ve(o,r){if(o&1&&(t(0,"li",66),d(1,"lucide-icon",69),t(2,"code",70),a(3),i()()),o&2){let e=r.$implicit,l=c(2);n(),s("img",l.ChevronRight)("size",14),n(2),p(e)}}function fe(o,r){if(o&1&&(t(0,"a",95),d(1,"lucide-icon",6),i()),o&2){let e=c().$implicit,l=c(3);s("href",e.url,w),n(),s("img",l.ExternalLink)("size",14)}}function he(o,r){if(o&1&&(t(0,"div",72),d(1,"lucide-icon",73),t(2,"span",74),a(3),i(),m(4,fe,2,3,"a",95),i()),o&2){let e=r.$implicit,l=c(3);n(),s("img",l.FileText)("size",14),n(2),p(e.name),n(),g(e.url?4:-1)}}function Ee(o,r){if(o&1&&(t(0,"div")(1,"h4",94),a(2,"Cat\xE1logos Obligatorios"),i(),t(3,"div",71),x(4,he,5,4,"div",72,Q),i()()),o&2){let e=c();n(4),b(e.catalogs)}}function Se(o,r){if(o&1&&(t(0,"span",79),a(1),i()),o&2){let e=c().$implicit;n(),p(e.code)}}function _e(o,r){if(o&1&&(t(0,"div",76)(1,"div",77),d(2,"lucide-icon",78),t(3,"div"),m(4,Se,2,1,"span",79),t(5,"p",80),a(6),i()()()()),o&2){let e=r.$implicit,l=c(3);n(2),s("img",l.AlertTriangle)("size",14),n(2),g(e.code?4:-1),n(2),p(e.description)}}function we(o,r){if(o&1&&(t(0,"div")(1,"h4",94),a(2,"Reglas de Validaci\xF3n MUV"),i(),t(3,"div",71),x(4,_e,7,4,"div",76,ee),i()()),o&2){let e=c();n(4),b(e.validations)}}function Pe(o,r){if(o&1&&(t(0,"div",67)(1,"div",77),d(2,"lucide-icon",81),t(3,"p",82),a(4),i()()()),o&2){let e=c(),l=c();n(2),s("img",l.ShieldCheck)("size",14),n(2),p(e.securityNote)}}function Re(o,r){if(o&1){let e=_();t(0,"div",87),C("click",function(){f(e);let u=c();return h(u.clearSelection())}),t(1,"div",88),C("click",function(u){return u.stopPropagation()}),t(2,"div",89)(3,"div",52)(4,"span",90),d(5,"lucide-icon",6),i(),t(6,"h3",91),a(7),i()(),t(8,"button",92),C("click",function(){f(e);let u=c();return h(u.clearSelection())}),d(9,"lucide-icon",6),i()(),t(10,"div",93)(11,"div")(12,"h4",94),a(13,"Campos Requeridos"),i(),t(14,"ul",65),x(15,ve,4,3,"li",66,R),i()(),m(17,Ee,6,0,"div"),m(18,we,6,0,"div"),m(19,Pe,5,3,"div",67),t(20,"div")(21,"h4",94),a(22,"Fragmento JSON (FHIR R4)"),i(),d(23,"app-code-block",68),i()()()()}if(o&2){let e=r,l=c();P("aria-label","Detalle de "+e.resource),n(2),y(l.headerBg(e.color)),n(3),s("img",e.icon)("size",16),n(2),p(e.title),n(2),s("img",l.XIcon)("size",16),n(6),b(e.requiredFields),n(2),g(e.catalogs.length?17:-1),n(),g(e.validations.length?18:-1),n(),g(e.securityNote?19:-1),n(4),s("title",e.resource+".json")("code",e.jsonSnippet)}}var Y=class o{FileText=T;ShieldCheck=L;Lock=z;Send=j;AlertTriangle=G;ExternalLink=M;ChevronRight=O;XIcon=K;Eye=V;EyeOff=F;Package=N;activeEntry=E(null);showSecurityPanel=E(!1);showErrorDemo=E(!1);sendingRDA=E(!1);sendResult=E(null);activeEntryData=B(()=>{let r=this.activeEntry();return r?this.entries.find(e=>e.id===r)??null:null});mockOperationOutcome=[{severity:"error",code:"structure",diagnostics:'El campo "Patient.identifier[0].value" no cumple con el patr\xF3n requerido #CC-[0-9]{6,10}. Valor recibido: "12345" sin prefijo de tipo de documento.',location:"Bundle.entry[1].resource.identifier[0].value"},{severity:"error",code:"business-rule",diagnostics:'RVC033: El c\xF3digo de diagn\xF3stico principal "Z76.0" pertenece a factores de estado de salud (Z00-Z99) pero la finalidad de la consulta no es Promoci\xF3n y Prevenci\xF3n.',location:"Bundle.entry[3].resource.code.coding[0].code"},{severity:"warning",code:"informational",diagnostics:"RVG11: El profesional con documento CC-9876543 no se encuentra activo en RETHUS a la fecha de la atenci\xF3n reportada.",location:"Bundle.entry[6].resource.identifier[0].value"}];bundleWrapper=`{
  "resourceType": "Bundle",
  "id": "rda-consulta-domicilio-001",
  "type": "document",
  "timestamp": "2026-03-11T10:30:00-05:00",
  "entry": [
    { "resource": { "resourceType": "Composition", ... } },
    { "resource": { "resourceType": "Patient", ... } },
    { "resource": { "resourceType": "Encounter", ... } },
    { "resource": { "resourceType": "Condition", ... } },
    { "resource": { "resourceType": "Procedure", ... } },
    { "resource": { "resourceType": "MedicationRequest", ... } },
    { "resource": { "resourceType": "Practitioner", ... } },
    { "resource": { "resourceType": "Organization", ... } }
  ]
}`;bffSnippet=`// \u26D4 NUNCA hacer esto en el frontend:
// const CLIENT_SECRET = "mi-secreto";

// \u2705 El frontend llama al BFF (Backend-For-Frontend)
// que resuelve credenciales desde Azure Key Vault
async function obtenerToken(): Promise<string> {
  const res = await fetch("https://mi-bff.falck.co/api/auth/token", {
    method: "POST",
    credentials: "include", // Cookie HttpOnly
  });
  const { access_token } = await res.json();
  return access_token;
}`;enviarRDASnippet=`/**
 * Env\xEDa el Bundle RDA al Ministerio.
 * - Fuerza HTTPS (TLS 1.2+)
 * - Token obtenido del BFF (nunca expuesto al frontend)
 * - Subscription Key inyectada por el proxy/BFF
 */
async function enviarRDA(
  jsonBundle: object,
  token: string,
  subscriptionKey: string
): Promise<Response> {
  const url = "https://ihce.minsalud.gov.co/api/Composition/$enviar-rda-paciente";

  // Validaci\xF3n: solo HTTPS
  if (!url.startsWith("https://")) {
    throw new Error("\u{1F512} Solo se permite comunicaci\xF3n HTTPS (TLS 1.2+)");
  }

  return fetch(url, {
    method: "POST",
    headers: {
      "Authorization": \`Bearer \${token}\`,
      "Ocp-Apim-Subscription-Key": subscriptionKey,
      "Content-Type": "application/fhir+json",
    },
    body: JSON.stringify(jsonBundle),
  });
}`;cifradoSnippet=`/**
 * Cifrado AES-256-GCM para datos en reposo (localStorage).
 * Requerido por el anexo t\xE9cnico del Ministerio (Ley 1581/2012).
 */
async function cifrarParaLocalStorage(
  data: string,
  cryptoKey: CryptoKey
): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(data);

  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    encoded
  );

  // Almacenar IV + ciphertext codificado en base64
  const payload = {
    iv: btoa(String.fromCharCode(...iv)),
    data: btoa(String.fromCharCode(...new Uint8Array(ciphertext))),
  };
  return JSON.stringify(payload);
}

async function descifrarDesdeLocalStorage(
  stored: string,
  cryptoKey: CryptoKey
): Promise<string> {
  const { iv, data } = JSON.parse(stored);
  const ivBytes = Uint8Array.from(atob(iv), c => c.charCodeAt(0));
  const cipherBytes = Uint8Array.from(atob(data), c => c.charCodeAt(0));

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: ivBytes },
    cryptoKey,
    cipherBytes
  );
  return new TextDecoder().decode(decrypted);
}`;operationOutcomeSnippet=`/**
 * Captura y muestra errores OperationOutcome del MUV/VIDA.
 * HTTP 400 = Error de estructura, HTTP 409 = Duplicado.
 */
async function manejarRespuesta(response: Response) {
  if (response.ok) {
    return { success: true, data: await response.json() };
  }

  // El Ministerio devuelve OperationOutcome en errores
  const outcome = await response.json();

  if (outcome.resourceType === "OperationOutcome") {
    const errores = outcome.issue.map((i: any) => ({
      severity: i.severity,
      code: i.code,
      diagnostics: i.diagnostics,
      location: i.expression?.join(", ") ?? "desconocido",
    }));

    return { success: false, status: response.status, errores };
  }

  return { success: false, status: response.status, errores: [] };
}`;entries=[{id:"composition",index:0,resource:"Composition",title:"Composition (El \xCDndice)",subtitle:"Primera entrada obligatoria. Define al paciente, m\xE9dico autor, tipo de RDA y sus secciones.",icon:T,color:"slate",requiredFields:['status: "final"','type.coding \u2014 Tipo de atenci\xF3n (Ej. "outpatient" = Consulta Externa)',"subject \u2014 Referencia al Patient (#CC-1234567890)","author[] \u2014 Referencia al Practitioner (#CC-NumProfesional)","date \u2014 Fecha/hora de creaci\xF3n del documento",'title \u2014 "Resumen Digital de Atenci\xF3n"',"section[] \u2014 Secciones obligatorias (Diagn\xF3sticos, Procedimientos, Medicamentos)"],catalogs:[{name:"TipoDocClinicoRDA",url:"https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=TipoDocClinicoRDA"}],validations:[{description:"Debe existir al menos una secci\xF3n por cada tipo cl\xEDnico (diagn\xF3sticos, procedimientos, medicamentos)"},{description:'Si una secci\xF3n no tiene datos, debe incluir el objeto emptyReason con c\xF3digo "nilknown"'},{code:"RVG02",description:"El subject debe referenciar exactamente al Patient incluido en el Bundle"}],jsonSnippet:`{
  "resourceType": "Composition",
  "status": "final",
  "type": {
    "coding": [{
      "system": "https://ihce.minsalud.gov.co/CodeSystem/TipoDocClinicoRDA",
      "code": "outpatient",
      "display": "Consulta Externa"
    }]
  },
  "subject": { "reference": "#CC-1234567890" },
  "author": [{ "reference": "#CC-51987654" }],
  "date": "2026-03-11T10:30:00-05:00",
  "title": "Resumen Digital de Atenci\xF3n",
  "section": [
    {
      "title": "Diagn\xF3sticos",
      "entry": [{ "reference": "#diag-001" }]
    },
    {
      "title": "Medicamentos",
      "emptyReason": {
        "coding": [{
          "system": "http://terminology.hl7.org/CodeSystem/list-empty-reason",
          "code": "nilknown",
          "display": "Nil Known"
        }]
      }
    }
  ]
}`},{id:"patient",index:1,resource:"Patient",title:"Patient (El Paciente)",subtitle:"Datos demogr\xE1ficos del paciente. Debe coincidir exactamente con el registro EVOL (Nombres, apellidos, sexo).",icon:$,color:"blue",requiredFields:["identifier[0].value \u2014 Patr\xF3n: #CC-1234567890","name[0].family \u2014 Apellidos (validados contra EVOL)","name[0].given[] \u2014 Nombres (validados contra EVOL)","gender \u2014 Sexo biol\xF3gico (male | female)","birthDate \u2014 Fecha de nacimiento AAAA-MM-DD","extension:Etnia \u2014 C\xF3digo MDECEtnia (Obligatorio)","extension:Ocupaci\xF3n \u2014 C\xF3digo PSRGOCUPACION CUOC DANE","extension:Discapacidad \u2014 C\xF3digo CategoriaDiscapacidad","extension:IdentidadG\xE9nero \u2014 C\xF3digo MDECIdentidadGenero (Opcional)","managingOrganization \u2014 Referencia a la EPS (#CodigoEAPBS)"],catalogs:[{name:"TipoIdPISIS",url:"https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=TipoIdPISIS"},{name:"Sexo",url:"https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=Sexo"},{name:"Pais (ISO 3166-1)",url:"https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=Pais"},{name:"Municipio (DANE)",url:"https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=Municipio"},{name:"MDECEtnia",url:"https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=Etnia"},{name:"PSRGOCUPACION (CUOC DANE)",url:"https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=PSRGOCUPACION"},{name:"CategoriaDiscapacidad",url:"https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=CategoriaDiscapacidad"},{name:"MDECIdentidadGenero",url:"https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=MDECIdentidadGenero"}],validations:[{code:"RVC001",description:'El n\xFAmero de documento se cruza con Registradur\xEDa. "AS" (Adulto sin identificar) o "MS" (Menor sin identificar) aplican reglas especiales de longitud.'},{code:"RVC007",description:"La edad del paciente debe ser coherente con el tipo de documento (CC solo para mayores de 18 a\xF1os)."},{code:"RVC010",description:'Si la atenci\xF3n es materna/parto/IVE, el sexo debe ser "F".'}],jsonSnippet:`{
  "resourceType": "Patient",
  "id": "CC-1234567890",
  "identifier": [{
    "use": "official",
    "type": {
      "coding": [{
        "system": "https://ihce.minsalud.gov.co/CodeSystem/TipoIdPISIS",
        "code": "CC"
      }]
    },
    "value": "1234567890"
  }],
  "name": [{
    "use": "official",
    "family": "GARC\xCDA MART\xCDNEZ",
    "given": ["JUAN", "CARLOS"]
  }],
  "gender": "male",
  "birthDate": "1990-05-15",
  "extension": [
    {
      "url": "https://ihce.minsalud.gov.co/StructureDefinition/ExtensionPatientEthnicity",
      "valueCoding": {
        "system": "https://ihce.minsalud.gov.co/CodeSystem/MDECEtnia",
        "code": "06",
        "display": "Ninguno de los anteriores"
      }
    },
    {
      "url": "https://ihce.minsalud.gov.co/StructureDefinition/ExtensionPatientEthnicCommunity",
      "valueString": "N/A"
    },
    {
      "url": "https://ihce.minsalud.gov.co/StructureDefinition/ExtensionPatientOccupation",
      "valueCoding": {
        "system": "https://ihce.minsalud.gov.co/CodeSystem/PSRGOCUPACION",
        "code": "9999",
        "display": "Ocupaci\xF3n no especificada"
      }
    },
    {
      "url": "https://ihce.minsalud.gov.co/StructureDefinition/ExtensionPatientDisabilityCategory",
      "valueCoding": {
        "system": "https://ihce.minsalud.gov.co/CodeSystem/CategoriaDiscapacidad",
        "code": "00",
        "display": "Ninguna"
      }
    },
    {
      "url": "https://ihce.minsalud.gov.co/StructureDefinition/ExtensionPatientGenderIdentity",
      "valueCoding": {
        "system": "https://ihce.minsalud.gov.co/CodeSystem/MDECIdentidadGenero",
        "code": "01",
        "display": "Masculino"
      }
    }
  ],
  "managingOrganization": {
    "reference": "#EPS000"
  }
}`,securityNote:"Datos protegidos por Ley 1581/2012 (Habeas Data). El identificador se valida en tiempo real contra la base EVOL de la Registradur\xEDa Nacional."},{id:"encounter",index:2,resource:"Encounter",title:"Encounter (La Atenci\xF3n)",subtitle:"Define la modalidad, entorno y condiciones del encuentro cl\xEDnico.",icon:k,color:"emerald",requiredFields:['status: "finished"',"class \u2014 Modalidad de atenci\xF3n","type \u2014 V\xEDa de ingreso del usuario","period.start / period.end \u2014 Fechas de inicio y fin","reasonCode \u2014 Causa / motivo de la atenci\xF3n","serviceType \u2014 Entorno de atenci\xF3n (01: Hogar)","priority \u2014 Triage (Solo en urgencias/ambulancias)"],catalogs:[{name:"ModalidadAtencion",url:"https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=ModalidadAtencion"},{name:"ViaIngresoUsuario",url:"https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=ViaIngresoUsuario"},{name:"RIPSCausaExterna",url:"https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=RIPSCausaExterna"},{name:"CondicionyDestinoUsuarioEgreso",url:"https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=CondicionyDestinoUsuarioEgreso"},{name:"EntornoAtencion (Res. 866)",url:"https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=EntornoAtencion"}],validations:[{code:"RVC039",description:"La fecha/hora de inicio no puede ser mayor a la actual. La fecha de egreso no puede ser menor a la de inicio."},{description:'Para servicios a domicilio: modalidad "03" (Extramural domiciliaria) y entorno "01" (Hogar).'},{code:"RVG16",description:"Si se informan datos de urgencias, la causa de consulta debe coincidir con la causa de urgencia."},{description:'Regla vital Grupo emi: Si modalidad "03" (Extramural domiciliaria), el entorno debe ser estrictamente "01" (Hogar). Otros: 02 Comunitario, 03 Escolar, 04 Laboral, 05 Institucional.'},{description:"Triage: exclusivo para ambulancias/urgencias. Determina la prioridad de atenci\xF3n inmediata."}],jsonSnippet:`{
  "resourceType": "Encounter",
  "status": "finished",
  "class": {
    "system": "https://ihce.minsalud.gov.co/CodeSystem/ModalidadAtencion",
    "code": "03",
    "display": "Extramural domiciliaria"
  },
  "type": [{
    "coding": [{
      "system": "https://ihce.minsalud.gov.co/CodeSystem/ViaIngresoUsuario",
      "code": "01",
      "display": "Consulta externa"
    }]
  }],
  "period": {
    "start": "2026-03-11T08:00:00-05:00",
    "end": "2026-03-11T08:45:00-05:00"
  },
  "serviceType": {
    "coding": [{
      "system": "https://ihce.minsalud.gov.co/CodeSystem/EntornoAtencion",
      "code": "01",
      "display": "Hogar"
    }]
  },
  "priority": {
    "coding": [{
      "system": "https://ihce.minsalud.gov.co/CodeSystem/EscalaTriage",
      "code": "III",
      "display": "Triage III - Urgencia"
    }]
  }
}`},{id:"condition",index:3,resource:"Condition",title:"Condition (Hallazgos / Diagn\xF3sticos)",subtitle:"Diagn\xF3stico principal y relacionados del paciente.",icon:H,color:"amber",requiredFields:["code.coding[0].code \u2014 C\xF3digo CIE-10 o CIE-11","code.coding[0].display \u2014 Nombre del diagn\xF3stico","category \u2014 Principal o Relacionado","clinicalStatus \u2014 active | recurrence | inactive","extension:FactorRiesgo \u2014 C\xF3digo Res. 866 (Condicional)","evidence \u2014 Antecedente familiar CIE-10 + parentesco (Opcional)"],catalogs:[{name:"CIE-10",url:"https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=CIE10"},{name:"RIPSTipoDiagn\xF3sticoPrincipal",url:"https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=RIPSTipoDiagnosticoPrincipalVersion2"}],validations:[{code:"RVC033",description:"El diagn\xF3stico principal NO puede ser c\xF3digo de causas externas (V01-Y98) ni factores de salud (Z00-Z99) salvo que la finalidad sea Promoci\xF3n y Prevenci\xF3n."},{code:"RVC085",description:"El diagn\xF3stico debe validarse por edad y sexo del paciente."},{code:"RVC086",description:"El diagn\xF3stico relacionado no puede ser igual al principal."},{description:"Factor de riesgo (Res. 866): Si se identifica riesgo (01 Qu\xEDmicos, 02 F\xEDsicos, 05 Biol\xF3gicos), debe diligenciarse."},{description:"Condici\xF3n familiar: diagn\xF3stico CIE-10 de antecedente de salud, acompa\xF1ado de parentesco (01 Padres, 02 Hermanos, 03 T\xEDos, 04 Abuelos)."}],jsonSnippet:`{
  "resourceType": "Condition",
  "id": "diag-001",
  "clinicalStatus": {
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
      "code": "active"
    }]
  },
  "category": [{
    "coding": [{
      "system": "https://ihce.minsalud.gov.co/CodeSystem/RIPSTipoDiagnosticoPrincipalVersion2",
      "code": "02",
      "display": "Confirmado nuevo"
    }]
  }],
  "code": {
    "coding": [{
      "system": "https://ihce.minsalud.gov.co/CodeSystem/CIE10",
      "code": "J06.9",
      "display": "Infecci\xF3n aguda de las v\xEDas respiratorias superiores"
    }]
  },
  "subject": { "reference": "#CC-1234567890" },
  "extension": [
    {
      "url": "https://ihce.minsalud.gov.co/StructureDefinition/FactorRiesgo",
      "valueCoding": {
        "system": "https://ihce.minsalud.gov.co/CodeSystem/FactorRiesgo",
        "code": "05",
        "display": "Biol\xF3gicos"
      }
    }
  ],
  "evidence": [{
    "code": [{
      "coding": [{
        "system": "https://ihce.minsalud.gov.co/CodeSystem/CIE10",
        "code": "Z82.4",
        "display": "Antecedente familiar - enfermedad isqu\xE9mica del coraz\xF3n"
      }],
      "text": "Parentesco: 01 - Padres"
    }]
  }]
}`},{id:"procedure",index:4,resource:"Procedure",title:"Procedure (Procedimientos)",subtitle:"Intervenciones y procedimientos realizados al paciente.",icon:q,color:"violet",requiredFields:["code.coding[0].code \u2014 C\xF3digo CUPS (6 caracteres)","code.coding[0].display \u2014 Nombre del procedimiento",'status: "completed"',"performedDateTime \u2014 Fecha/hora de realizaci\xF3n"],catalogs:[{name:"CUPS",url:"https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=CUPS"},{name:"FinalidadConsulta",url:"https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=RIPSFinalidadConsultaVersion2"}],validations:[{code:"RVC059",description:"El c\xF3digo CUPS debe existir y validarse contra grupo de servicio, sexo y edad del paciente."},{code:"RVC051",description:"La finalidad debe ser coherente con sexo y edad. Ej. No se puede enviar control prenatal en hombres."},{code:"RVC034",description:'Si modalidad "Pago por evento": valor > 0. Si c\xE1pita: valor = 0.'}],jsonSnippet:`{
  "resourceType": "Procedure",
  "id": "proc-001",
  "status": "completed",
  "code": {
    "coding": [{
      "system": "https://ihce.minsalud.gov.co/CodeSystem/CUPS",
      "code": "890201",
      "display": "Consulta de primera vez por medicina general"
    }]
  },
  "subject": { "reference": "#CC-1234567890" },
  "performedDateTime": "2026-03-11T08:30:00-05:00"
}`},{id:"medication",index:5,resource:"MedicationRequest",title:"MedicationRequest (Medicamentos)",subtitle:"F\xF3rmulas m\xE9dicas o medicamentos administrados.",icon:U,color:"rose",requiredFields:["medicationCodeableConcept.coding[0].code \u2014 C\xF3digo IUM o DCI","medicationCodeableConcept.coding[0].display \u2014 Nombre del medicamento",'status: "active" | "completed"',"dosageInstruction \u2014 Posolog\xEDa (cantidad, frecuencia)"],catalogs:[{name:"IUM (Identificador \xDAnico de Medicamento)",url:"https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=IUM"},{name:"UMM (Unidad de Medida)",url:"https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=UMM"}],validations:[{code:"RVC063",description:"Medicamentos de preparaci\xF3n magistral usan c\xF3digo DCI en lugar de IUM."},{code:"RVC064",description:"El c\xF3digo debe existir en la base de SISPRO."},{code:"RVG13",description:"No pueden enviarse dos medicamentos con el mismo c\xF3digo exacto para el mismo usuario."},{code:"RVG01",description:"Las cantidades deben ser n\xFAmeros enteros positivos mayores a cero."}],jsonSnippet:`{
  "resourceType": "MedicationRequest",
  "id": "med-001",
  "status": "active",
  "intent": "order",
  "medicationCodeableConcept": {
    "coding": [{
      "system": "https://ihce.minsalud.gov.co/CodeSystem/IUM",
      "code": "20045671",
      "display": "Acetaminof\xE9n 500 mg tableta"
    }]
  },
  "subject": { "reference": "#CC-1234567890" },
  "dosageInstruction": [{
    "text": "1 tableta cada 8 horas por 5 d\xEDas",
    "doseAndRate": [{
      "doseQuantity": {
        "value": 1,
        "unit": "tableta"
      }
    }]
  }]
}`},{id:"practitioner",index:6,resource:"Practitioner",title:"Practitioner (Profesional Tratante)",subtitle:"M\xE9dico o profesional de salud que realiza la atenci\xF3n.",icon:W,color:"cyan",requiredFields:["identifier[0].value \u2014 Referencia local #CC-Numero","name[0].family \u2014 Apellidos del profesional","name[0].given[] \u2014 Nombres del profesional","qualification \u2014 N\xFAmero de tarjeta profesional"],catalogs:[{name:"RETHUS (Registro de Talento Humano en Salud)",url:"https://web.sispro.gov.co/THS/Cliente/ConsultasPublicas/ConsultaPublicaDeTHxIdentificacion.aspx"}],validations:[{code:"RVG11",description:"Se valida en tiempo real que el profesional est\xE9 activo en RETHUS. Si no est\xE1 activo, el RDA es rechazado."},{description:"El tipo y n\xFAmero de documento deben coincidir exactamente con RETHUS."}],jsonSnippet:`{
  "resourceType": "Practitioner",
  "id": "CC-51987654",
  "identifier": [{
    "use": "official",
    "type": {
      "coding": [{
        "system": "https://ihce.minsalud.gov.co/CodeSystem/TipoIdPISIS",
        "code": "CC"
      }]
    },
    "value": "51987654"
  }],
  "name": [{
    "use": "official",
    "family": "RODR\xCDGUEZ L\xD3PEZ",
    "given": ["MAR\xCDA", "ELENA"]
  }],
  "qualification": [{
    "code": {
      "coding": [{
        "system": "https://ihce.minsalud.gov.co/CodeSystem/RETHUS",
        "code": "MD",
        "display": "M\xE9dico(a)"
      }]
    }
  }]
}`,securityNote:"Validaci\xF3n RETHUS en tiempo real. El profesional debe estar activo en el portal del Ministerio al momento del env\xEDo."},{id:"organization",index:7,resource:"Organization",title:"Organization (Prestador / IPS)",subtitle:"Identificaci\xF3n de la IPS o empresa prestadora de salud.",icon:A,color:"teal",requiredFields:["identifier[0].value \u2014 C\xF3digo REPS de 12 d\xEDgitos (#NumeroDeHabilitacion)","name \u2014 Nombre de la IPS","type \u2014 Tipo de prestador"],catalogs:[{name:"IPSCodHabilitacion (REPS)",url:"https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=IPSCodHabilitacion"}],validations:[{code:"RVC002",description:"El NIT del facturador debe coincidir con el registrado en la tabla REPS del Ministerio."},{description:"Se identifica con el c\xF3digo REPS de 12 d\xEDgitos usando el patr\xF3n #NumeroDeHabilitacion."}],jsonSnippet:`{
  "resourceType": "Organization",
  "id": "org-001",
  "identifier": [{
    "use": "official",
    "system": "https://ihce.minsalud.gov.co/CodeSystem/IPSCodHabilitacion",
    "value": "110011234501"
  }],
  "name": "IPS FALCK SERVICIOS M\xC9DICOS DOMICILIARIOS",
  "type": [{
    "coding": [{
      "system": "https://ihce.minsalud.gov.co/CodeSystem/TipoPrestador",
      "code": "IPS",
      "display": "Instituci\xF3n Prestadora de Servicios de Salud"
    }]
  }]
}`}];entryBg(r){let e={slate:"bg-slate-50 border-slate-200",blue:"bg-blue-50 border-blue-200",emerald:"bg-emerald-50 border-emerald-200",amber:"bg-amber-50 border-amber-200",violet:"bg-violet-50 border-violet-200",rose:"bg-rose-50 border-rose-200",cyan:"bg-cyan-50 border-cyan-200",teal:"bg-teal-50 border-teal-200"};return e[r]??e.slate}entryActiveBg(r){let e={slate:"bg-slate-100 border-slate-400 ring-2 ring-slate-300",blue:"bg-blue-100 border-blue-400 ring-2 ring-blue-300",emerald:"bg-emerald-100 border-emerald-400 ring-2 ring-emerald-300",amber:"bg-amber-100 border-amber-400 ring-2 ring-amber-300",violet:"bg-violet-100 border-violet-400 ring-2 ring-violet-300",rose:"bg-rose-100 border-rose-400 ring-2 ring-rose-300",cyan:"bg-cyan-100 border-cyan-400 ring-2 ring-cyan-300",teal:"bg-teal-100 border-teal-400 ring-2 ring-teal-300"};return e[r]??e.slate}iconBg(r){let e={slate:"bg-slate-200 text-slate-700",blue:"bg-blue-200 text-blue-700",emerald:"bg-emerald-200 text-emerald-700",amber:"bg-amber-200 text-amber-700",violet:"bg-violet-200 text-violet-700",rose:"bg-rose-200 text-rose-700",cyan:"bg-cyan-200 text-cyan-700",teal:"bg-teal-200 text-teal-700"};return e[r]??e.slate}headerBg(r){let e={slate:"bg-slate-800",blue:"bg-blue-700",emerald:"bg-emerald-700",amber:"bg-amber-700",violet:"bg-violet-700",rose:"bg-rose-700",cyan:"bg-cyan-700",teal:"bg-teal-700"};return e[r]??e.slate}severityClass(r){let e={error:"bg-red-50 border-red-300 text-red-800",warning:"bg-amber-50 border-amber-300 text-amber-800",information:"bg-blue-50 border-blue-300 text-blue-800"};return e[r]??e.information}severityBadge(r){let e={error:"bg-red-600 text-white",warning:"bg-amber-500 text-white",information:"bg-blue-500 text-white"};return e[r]??e.information}onEntryHover(r){this.activeEntry.set(r)}onEntryLeave(){}selectEntry(r){this.activeEntry.update(e=>e===r?null:r)}clearSelection(){this.activeEntry.set(null)}toggleSecurityPanel(){this.showSecurityPanel.update(r=>!r),this.showSecurityPanel()&&this.showErrorDemo.set(!1)}toggleErrorDemo(){this.showErrorDemo.update(r=>!r),this.showErrorDemo()&&this.showSecurityPanel.set(!1)}async simularEnvioRDA(){this.sendingRDA.set(!0),this.sendResult.set(null),await new Promise(r=>setTimeout(r,1500)),this.sendingRDA.set(!1),this.sendResult.set("error-400"),this.showErrorDemo.set(!0)}static \u0275fac=function(e){return new(e||o)};static \u0275cmp=D({type:o,selectors:[["app-estructura-bundle"]],decls:44,vars:19,consts:[[1,"mb-8"],[1,"text-2xl","font-bold","text-slate-800"],[1,"text-sm","text-slate-500","mt-1"],[1,"px-1.5","py-0.5","bg-slate-100","rounded","text-xs","font-mono"],[1,"flex","flex-wrap","gap-2","mt-4"],["type","button",3,"click"],[3,"img","size"],["type","button",1,"inline-flex","items-center","gap-2","px-4","py-2","rounded-lg","text-sm","font-medium","bg-blue-600","text-white","hover:bg-blue-700","disabled:opacity-50","disabled:cursor-wait","shadow-md",3,"click","disabled"],["aria-label","Arquitectura de seguridad",1,"mb-8","bg-emerald-50","border","border-emerald-200","rounded-xl","p-6","animate-fadeIn"],["aria-label","Demostraci\xF3n de errores OperationOutcome",1,"mb-8","bg-red-50","border","border-red-200","rounded-xl","p-6","animate-fadeIn"],[1,"flex","flex-col","lg:flex-row","gap-6"],[1,"lg:w-1/2","xl:w-5/12","shrink-0"],[1,"rounded-xl","border-2","border-dashed","border-slate-300","bg-slate-50","p-4"],[1,"flex","items-center","gap-3","mb-4","pb-3","border-b","border-slate-200"],[1,"w-10","h-10","rounded-lg","bg-slate-800","text-white","flex","items-center","justify-center"],[1,"text-sm","font-bold","text-slate-800"],[1,"text-xs","text-slate-500","font-mono"],["role","list","aria-label","Entradas del Bundle FHIR",1,"space-y-2"],["type","button","role","listitem",1,"entry-block","w-full","text-left","rounded-lg","border-2","p-3","transition-all","duration-200","cursor-pointer",3,"class"],[1,"mt-4","pt-3","border-t","border-slate-200"],["title","bundle-wrapper.json",3,"code"],["aria-live","polite",1,"lg:w-1/2","xl:w-7/12","lg:sticky","lg:top-0","lg:self-start","lg:max-h-screen","lg:overflow-y-auto"],[1,"rounded-xl","border","border-slate-200","bg-white","shadow-lg","overflow-hidden","animate-fadeIn"],[1,"rounded-xl","border-2","border-dashed","border-slate-200","bg-slate-50","p-12","text-center","lg:sticky","lg:top-0"],["role","dialog","aria-modal","true",1,"lg:hidden","fixed","inset-0","z-50","bg-black/40","flex","items-end"],[1,"text-lg","font-bold","text-emerald-800","flex","items-center","gap-2","mb-4"],[1,"text-emerald-600",3,"img","size"],[1,"text-sm","text-emerald-700","mb-6"],[1,"grid","gap-6","lg:grid-cols-2"],[1,"text-sm","font-bold","text-emerald-800","flex","items-center","gap-2","mb-2"],[1,"text-xs","text-emerald-700","mb-2"],[1,"text-xs","bg-emerald-100","px-1","rounded"],["title","backend-for-frontend.ts",3,"code"],["title","enviarRDA.ts",3,"code"],["title","cifrado-aes256.ts",3,"code"],["title","manejar-operationoutcome.ts",3,"code"],[1,"text-lg","font-bold","text-red-800","flex","items-center","gap-2","mb-2"],[1,"text-red-600",3,"img","size"],[1,"text-sm","text-red-700","mb-4"],[1,"space-y-3"],[1,"rounded-lg","border","p-4",3,"class"],[1,"rounded-lg","border","p-4"],[1,"flex","items-start","gap-3"],[1,"shrink-0","px-2","py-0.5","rounded","text-xs","font-bold","uppercase"],[1,"flex-1","min-w-0"],[1,"text-sm","font-medium"],[1,"text-xs","mt-1","opacity-75","font-mono"],[1,"text-xs","mt-0.5","opacity-75"],["type","button","role","listitem",1,"entry-block","w-full","text-left","rounded-lg","border-2","p-3","transition-all","duration-200","cursor-pointer",3,"mouseenter","click"],[1,"flex","items-center","gap-3"],[1,"shrink-0","w-6","h-6","rounded-full","bg-slate-800","text-white","text-xs","font-bold","flex","items-center","justify-center"],[1,"shrink-0","w-8","h-8","rounded-lg","flex","items-center","justify-center"],[1,"flex","items-center","gap-2"],[1,"text-xs","font-mono","text-slate-500"],[1,"text-sm","font-bold","text-slate-800","truncate"],[1,"text-xs","text-slate-600","truncate"],[1,"shrink-0","text-slate-400","transition-transform","duration-200",3,"img","size"],[1,"px-6","py-4","text-white"],[1,"flex","items-center","justify-between"],[1,"w-9","h-9","rounded-lg","bg-white/20","flex","items-center","justify-center"],[1,"text-base","font-bold"],[1,"text-xs","opacity-80"],["type","button","aria-label","Cerrar panel",1,"w-8","h-8","rounded-lg","bg-white/10","hover:bg-white/20","flex","items-center","justify-center","transition-colors",3,"click"],[1,"p-6","space-y-6"],[1,"text-xs","font-bold","text-slate-500","uppercase","tracking-wider","mb-3"],[1,"space-y-1.5"],[1,"flex","items-start","gap-2","text-sm","text-slate-700"],[1,"p-3","bg-emerald-50","rounded-lg","border","border-emerald-200"],[3,"title","code"],[1,"shrink-0","mt-0.5","text-slate-400",3,"img","size"],[1,"text-xs","font-mono","bg-slate-100","px-1.5","py-0.5","rounded","break-all"],[1,"space-y-2"],[1,"flex","items-center","gap-2","p-2.5","bg-blue-50","rounded-lg","border","border-blue-100"],[1,"text-blue-600","shrink-0",3,"img","size"],[1,"text-sm","font-medium","text-blue-800","flex-1"],["target","_blank","rel","noopener noreferrer","aria-label","Ver cat\xE1logo en SISPRO",1,"text-blue-600","hover:text-blue-800","transition-colors",3,"href"],[1,"p-3","bg-amber-50","rounded-lg","border","border-amber-100"],[1,"flex","items-start","gap-2"],[1,"shrink-0","mt-0.5","text-amber-600",3,"img","size"],[1,"inline-block","px-1.5","py-0.5","bg-amber-200","text-amber-800","text-xs","font-bold","rounded","mb-1"],[1,"text-sm","text-amber-900"],[1,"shrink-0","mt-0.5","text-emerald-600",3,"img","size"],[1,"text-sm","text-emerald-800"],[1,"w-16","h-16","rounded-2xl","bg-slate-200","flex","items-center","justify-center","mx-auto","mb-4"],[1,"text-slate-400",3,"img","size"],[1,"text-lg","font-bold","text-slate-600","mb-2"],[1,"text-sm","text-slate-500","max-w-xs","mx-auto"],["role","dialog","aria-modal","true",1,"lg:hidden","fixed","inset-0","z-50","bg-black/40","flex","items-end",3,"click"],[1,"w-full","max-h-[85vh]","overflow-y-auto","bg-white","rounded-t-2xl","shadow-2xl","animate-slideUp",3,"click"],[1,"sticky","top-0","z-10","px-5","py-3.5","text-white","flex","items-center","justify-between"],[1,"w-8","h-8","rounded-lg","bg-white/20","flex","items-center","justify-center"],[1,"text-sm","font-bold"],["type","button","aria-label","Cerrar",1,"w-8","h-8","rounded-lg","bg-white/10","hover:bg-white/20","flex","items-center","justify-center",3,"click"],[1,"p-5","space-y-5"],[1,"text-xs","font-bold","text-slate-500","uppercase","tracking-wider","mb-2"],["target","_blank","rel","noopener noreferrer","aria-label","Ver cat\xE1logo",1,"text-blue-600","hover:text-blue-800",3,"href"]],template:function(e,l){if(e&1&&(t(0,"header",0)(1,"h2",1),a(2,"Cuerpo del JSON Transaccional"),i(),t(3,"p",2),a(4," Estructura visual del recurso "),t(5,"strong"),a(6,"Bundle"),i(),a(7," tipo "),t(8,"code",3),a(9,"document"),i(),a(10," (HL7 FHIR R4) \u2014 8 entradas obligatorias "),i(),t(11,"div",4)(12,"button",5),C("click",function(){return l.toggleSecurityPanel()}),d(13,"lucide-icon",6),a(14," Arquitectura de Seguridad "),i(),t(15,"button",5),C("click",function(){return l.toggleErrorDemo()}),d(16,"lucide-icon",6),a(17," OperationOutcome (Errores) "),i(),t(18,"button",7),C("click",function(){return l.simularEnvioRDA()}),d(19,"lucide-icon",6),m(20,ne,1,0)(21,oe,1,0),i()()(),m(22,ae,62,14,"section",8),m(23,le,12,2,"section",9),t(24,"div",10)(25,"div",11)(26,"div",12)(27,"div",13)(28,"div",14),d(29,"lucide-icon",6),i(),t(30,"div")(31,"h3",15),a(32,"Bundle"),i(),t(33,"span",16),a(34,'type: "document" \xB7 8 entries'),i()()(),t(35,"div",17),x(36,se,15,16,"button",18,te),i(),t(38,"div",19),d(39,"app-code-block",20),i()()(),t(40,"aside",21),m(41,Ce,27,13,"div",22)(42,ye,7,2,"div",23),i()(),m(43,Re,24,13,"div",24)),e&2){let u,v;n(12),y(l.showSecurityPanel()?"inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-emerald-600 text-white shadow-md":"inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"),n(),s("img",l.ShieldCheck)("size",16),n(2),y(l.showErrorDemo()?"inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white shadow-md":"inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"),n(),s("img",l.AlertTriangle)("size",16),n(2),s("disabled",l.sendingRDA()),n(),s("img",l.Send)("size",16),n(),g(l.sendingRDA()?20:21),n(2),g(l.showSecurityPanel()?22:-1),n(),g(l.showErrorDemo()?23:-1),n(6),s("img",l.Package)("size",20),n(7),b(l.entries),n(3),s("code",l.bundleWrapper),n(2),g((u=l.activeEntryData())?41:42,u),n(2),g((v=l.activeEntryData())?43:-1,v)}},dependencies:[Z,J,X],styles:[`@layer properties;[_nghost-%COMP%]{display:block}.entry-block[_ngcontent-%COMP%]:hover{transform:translateY(-1px);--tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}@keyframes _ngcontent-%COMP%_slideUp{0%{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}.animate-slideUp[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_slideUp .3s ease-out}@property --tw-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-shadow-color{syntax: "*"; inherits: false;}@property --tw-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-inset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-shadow-color{syntax: "*"; inherits: false;}@property --tw-inset-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-ring-color{syntax: "*"; inherits: false;}@property --tw-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-ring-color{syntax: "*"; inherits: false;}@property --tw-inset-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-ring-inset{syntax: "*"; inherits: false;}@property --tw-ring-offset-width{syntax: "<length>"; inherits: false; initial-value: 0px;}@property --tw-ring-offset-color{syntax: "*"; inherits: false; initial-value: #fff;}@property --tw-ring-offset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@layer properties{@supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))){*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]::backdrop{--tw-shadow: 0 0 #0000;--tw-shadow-color: initial;--tw-shadow-alpha: 100%;--tw-inset-shadow: 0 0 #0000;--tw-inset-shadow-color: initial;--tw-inset-shadow-alpha: 100%;--tw-ring-color: initial;--tw-ring-shadow: 0 0 #0000;--tw-inset-ring-color: initial;--tw-inset-ring-shadow: 0 0 #0000;--tw-ring-inset: initial;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-offset-shadow: 0 0 #0000}}}

`],changeDetection:0})};export{Y as EstructuraBundleComponent};
