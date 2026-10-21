/* Mystic Academy Escape - game logic */
const $=id=>document.getElementById(id);
const show=id=>document.querySelectorAll('.scr').forEach(s=>s.classList.toggle('on',s.id===id));
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
let level=0,S=null,running=false;

const PAL={k:'#1b1b2e',w:'#f3ecff',g:'#f5c542',y:'#ffe66d',o:'#ff9a1f',r:'#e63946',p:'#ff8fa3',b:'#3a86ff',c:'#7fdcff',n:'#24337a',e:'#3cb371',l:'#9dffb8',d:'#1f7a4a',u:'#8e44ad',v:'#c9a0ff',m:'#8b5a2b',a:'#e8d8a8',s:'#aab0c8',t:'#5a6080'};
const PX={
key:'..gg..../.g..g.../.g..g.../..gg..../...g..../...gg.../...g..../...gg...',
lock:'..ssss../.s....s./.s....s./..gggg../.gggggg./.ggkkgg./.ggkkgg./..gggg..',
unlock:'..ssss../..s..s../......s./..gggg../.gggggg./.ggkkgg./.ggkkgg./..gggg..',
check:'......../......ll/.....ll./l...ll../ll.ll.../.lll..../..l...../........',
cross:'......../.rr..rr./..rrrr../...rr.../..rrrr../.rr..rr./......../........',
speaker:'...w..../..ww..w./.www.w.w/wwww.w.w/wwww.w.w/.www.w.w/..ww..w./...w....',
mic:'...ww.../..wwww../..wwww../..wwww../.w.ww.w./.w....w./..wwww../...ww...',
bag:'.mmmmmm./mmmmmmmm/mmoooomm/mmoooomm/mmmmmmmm/mmgmmgmm/mmmmmmmm/.mmmmmm.',
door:'..kkkk../.kmmmmk./.kmmmmk./.kmmmmk./.kmmmgk./.kmmmmk./.kmmmmk./.kkkkkk.',
trophy:'gggggggg/.gggggg./.gggggg./..gggg../...gg.../...gg.../..gggg../.gggggg.',
clock:'..kkkk../.kwwwwk./kwwwkwwk/kwwwkwwk/kwwwkkwk/kwwwwwwk/.kwwwwk./..kkkk..',
target:'..rrrr../.rwwwwr./rwwrrwwr/rwrkkrwr/rwrkkrwr/rwwrrwwr/.rwwwwr./..rrrr..',
star:'...yy.../...yy.../yyyyyyyy/.yyyyyy./..yyyy../..yyyy../.yy..yy./yy....yy',
ghost:'..wwww../.wwwwww./wwkwwkww/wwkwwkww/wwwwwwww/wwwwwwww/wwwwwwww/w.ww.ww.',
eye:'......../..wwww../.wwbbww./wwbkkbww/wwbkkbww/.wwbbww./..wwww../........',
ear:'..ssss../.sssssss/ss....ss/s..ss..s/s.s.s..s/ss.sss.s/.ss..ss./..ssss..',
pencil:'.......o/.....yyo/....yyy./...yyy../..yyy.../.ayy..../aa....../k.......',
book:'kkkkkkk./kbbbbwk./kbbbbwk./kbbbbwk./kbbbbwk./kbbbbwk./kkkkkkk./........',
telescope:'......ss/....sssb/...sssb./..sss.../.ss.m.../...m.m../..m...m./.m.....m',
flask:'...ss.../...ss.../..ssss../.slllls./slllllls/slllllls/slllllls/.ssssss.',
dragon:'................/...y...y......../..kyk.kyk......./..kdkkkdk......./..kddddddkkk..../.kdeeddddddekk../.kdeeyykeeeeeekk/.kddeykkeeeeekrk/.kddeeeeeeeeeeek/..kdddeeekkkkkk./..kkddekwkwkwk../...kkkdkkkkkkr../....kddk.....rr./.....kk.......o./................/................',
chair:'m......./m......./mmmmm.../m...m.../mmmmm.../m...m.../m...m.../m...m...',
plant:'..l.l.../.lelel../..lel.../.lelel../..ele.../..mmm.../.mmmmm../.mmmmm..',
owl:'m.mmmm.m/mmmmmmmm/mwwmmwwm/mwkmmkwm/mmmyymmm/mmmmmmmm/.mmmmmm./..y..y..',
cat:'s.s...../sss...../sksk..../sss...../sssss.../ssssss.s/sssssss./s.s.s.s.',
candle:'...o..../..oyo.../...y..../..aaa.../..aaa.../..aaa.../..aaa.../.mmmmm..',
moon:'..yyy.../.yy...../yy....../yy....../yy....../.yy...../..yyy.../........',
planet:'..oooo../.oooooo./yyyoooyy/.yoooy../.oooooo./..oooo../......../........',
sparkle:'...y..../...y..../..yyy.../yyywyyy./..yyy.../...y..../...y..../........',
bottle:'...mm.../...ss.../..ssss../.spppps./spppppps/spppppps/spppppps/.ssssss.',
skull:'.wwwwww./wwwwwwww/wkkwwkkw/wkkwwkkw/wwwkkwww/.wwwwww./.wkwkwk./.wwwwww.',
bone:'......../ww....ww/wwwwwwww/wwwwwwww/ww....ww/......../......../........',
sword:'.......w/......ws/....ws../...ws.../gg.s..../.gg...../mgg...../m.g.....',
gem:'..cccc../.cwwccc./cwccccbb/cccccbbb/.ccbbbb./..cbbb../...bb.../........',
coins:'..gggg../.gyyyyg./gyyggyyg/gyggggyg/gyyggyyg/.gyyyyg./..gggg../........',
scroll:'.aaaaaa./aaaaaaaa/akkakkaa/aaaaaaaa/akkkkkaa/aaaaaaaa/aakkaaaa/.aaaaaa.',
drumstick:'..mmm.../.mooom../.mooom../..mmm.../...a..../...a..../..a.a.../.a...a..',
bubble:'..cccc../.c....c./c.w....c/c.w....c/c......c/c......c/.c....c./..cccc..',
heart:'.rr..rr./rrrrrrrr/rrrrrrrr/rrrrrrrr/.rrrrrr./..rrrr../...rr.../........',
heartE:'.tt..tt./tttttttt/tttttttt/tttttttt/.tttttt./..tttt../...tt.../........',
globe:'..bbbb../.bcbbcb./bbcbbcbb/cccccccc/bbcbbcbb/bbcbbcbb/.bcbbcb./..bbbb..'};
const ICO={},URL_={};
Object.keys(PX).forEach(n=>{const rw=PX[n].split('/'),c=document.createElement('canvas');c.width=c.height=rw.length;const x=c.getContext('2d');rw.forEach((row,j)=>[...row].forEach((ch,i)=>{if(PAL[ch]){x.fillStyle=PAL[ch];x.fillRect(i,j,1,1)}}));ICO[n]=c;URL_[n]=c.toDataURL()});
const IMG=(n,z=16)=>`<img class="pi" width="${z}" height="${z}" src="${URL_[n]}" alt="">`;
const pi=(c,n,cx,cy,z=16)=>c.drawImage(ICO[n],Math.round(cx-z/2),Math.round(cy-z/2),z,z);
document.querySelectorAll('[data-ic]').forEach(e=>e.src=URL_[e.dataset.ic]);
const ROOMS=[
 {ic:'book',topic:'Present Simple',tes:'Presente simple',sk:'Writing',si:'pencil',st:0},
 {ic:'telescope',topic:'Present Continuous',tes:'Presente continuo',sk:'Reading',si:'eye',st:1},
 {ic:'flask',topic:'Comparatives & Superlatives',tes:'Comparativos y superlativos',sk:'Listening',si:'ear',st:2},
 {ic:'dragon',topic:'Passive Voice',tes:'Voz pasiva',sk:'Mixed',si:'book'}];
const GH={ic:'ghost',topic:'Vocabulary',tes:'Vocabulario'};
const GL={ic:'ghost',topic:'Ghosts'};
const FC={ic:'trophy',topic:'Final Challenge',tes:'Desafío final',sk:'All skills'};
let ES=false;
const T=(en,es)=>ES&&level===0?es:en;
const SWAP='<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M4 8h14M14 4l4 4-4 4M20 16H6M10 12l-4 4 4 4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const PSS="(+) subject + verb (he / she / it + s)\n(-) subject + do / does + not + verb\n(?) Do / Does + subject + verb?",PSE="(+) sujeto + verbo (he / she / it + s)\n(-) sujeto + do / does + not + verbo\n(?) Do / Does + sujeto + verbo?";
const PCS="(+) subject + am / is / are + verb + ing\n(-) subject + am / is / are + not + verb + ing\n(?) Am / Is / Are + subject + verb + ing?",PCE="(+) sujeto + am / is / are + verbo + ing\n(-) sujeto + am / is / are + not + verbo + ing\n(?) Am / Is / Are + sujeto + verbo + ing?";
const CMS="short adjective: adjective + er + than / the + adjective + est\nlong adjective: more + adjective + than / the most + adjective",CMSE="adjetivo corto: adjetivo + er + than / the + adjetivo + est\nadjetivo largo: more + adjetivo + than / the most + adjetivo";
const CMS2=CMS+"\nequal: as + adjective + as\nirregular: good - better - best / bad - worse - worst",CMSE2=CMSE+"\nigualdad: as + adjetivo + as\nirregulares: good - better - best / bad - worse - worst";
const STR=[[[PSS,PSE],[PSS,PSS]],[[PCS,PCE],[PCS,PCS]],[[CMS,CMSE],[CMS2,CMS2]]];
const MQ=(q,o,a,es,say)=>({k:'M',q,o:Array.isArray(o)?o:o.split('|'),a,es,say});
const NZ=t=>t.toLowerCase().replace(/[^a-z ]/g,'').replace(/\s+/g,' ').trim();
const WQ=(q,a,es)=>({k:'W',q,a:a.split('|').map(NZ),es});
const WM=(s,a)=>WQ('Write the missing word: '+s,a,'Escribe la palabra que falta: '+s);
const CM=(s,o,a)=>MQ('Choose the correct answer: '+s,o,a,'Elige la respuesta correcta: '+s);
const LS=(q,o,a,say,qes)=>MQ('Listen and choose: '+q,o,a,qes&&'Escucha y elige: '+qes,say);
const SPK=t=>({k:'S',q:'Press the mic. Read this sentence.',es:'Presiona el micrófono y lee esta oración.',t,key:t});
const cap=s=>s[0].toUpperCase()+s.slice(1);
const rnd=a=>a[Math.floor(Math.random()*a.length)];
const shuf=a=>[...a].sort(()=>Math.random()-.5);
const oneOf=(c,w)=>[c,...w].join('|');
const oth=(c,pool,n=3)=>shuf(pool.filter(x=>x!==c)).slice(0,n);
const SEEN=new Set();
function fresh(mk){let q;for(let i=0;i<30;i++){q=mk();if(!SEEN.has(q.key||q.q))break}SEEN.add(q.key||q.q);if(SEEN.size>900)SEEN.clear();return q}
const PN=['Tom','Anna','Maria','Leo','Mia','Sam','Lucy','Max','Eva','Ben','Zoe','Carla','Dr.','Ms.','Mr.','Prof.'];
const nm=t=>t==='I'||PN.includes(t.split(' ')[0])?t:t[0].toLowerCase()+t.slice(1);
const bE=s=>s[0]==='I'?'am':s[2]?'is':'are';
const hs=g=>g==='m'?['he','He','Él']:['she','She','Ella'];
const RN=[['Tom','m'],['Anna','f'],['Leo','m'],['Mia','f'],['Sam','m'],['Lucy','f'],['Max','m'],['Eva','f']],PROF=[['Dr. Lee','m'],['Ms. Costa','f'],['Mr. Evans','m'],['Prof. Santos','f']];
// ----- subjects, verbs and time words, by level -----
const SB=[
 [['I','Yo',0],['You','Tú',0],['We','Nosotros',0],['They','Ellos',0],['He','Él',1],['She','Ella',1],['Tom','Tom',1],['Anna','Anna',1],['My dog','Mi perro',1],['My parents','Mis padres',0]],
 [['My brother','',1],['Our teacher','',1],['The students','',0],['My cousins','',0],['Lucy and Max','',0],['The neighbors','',0],['My uncle','',1],['The children','',0]],
 [['The new manager','',1],['Our neighbours','',0],['The students from Brazil','',0],['My grandfather','',1],['The scientists','',0],['Maria and her sister','',0],['The head coach','',1],['Both engineers','',0]]];
const SBL=[SB[0],[...SB[0].slice(2),...SB[1]],[...SB[1],...SB[2]]];
const VPT=[
 [['play','plays','playing','tennis','jugar','jugando','al tenis','juega'],['eat','eats','eating','an apple','comer','comiendo','una manzana','come'],['drink','drinks','drinking','milk','beber','bebiendo','leche','bebe'],['watch','watches','watching','TV','mirar','mirando','televisión','mira'],['study','studies','studying','English','estudiar','estudiando','inglés','estudia'],['read','reads','reading','a book','leer','leyendo','un libro','lee'],['help','helps','helping','Mom','ayudar','ayudando','a mamá','ayuda'],['open','opens','opening','the door','abrir','abriendo','la puerta','abre'],['wash','washes','washing','the car','lavar','lavando','el auto','lava'],['visit','visits','visiting','grandma','visitar','visitando','a la abuela','visita'],['clean','cleans','cleaning','the room','limpiar','limpiando','la habitación','limpia'],['cook','cooks','cooking','pasta','cocinar','cocinando','pasta','cocina']],
 [['practice','practices','practicing','the piano'],['fix','fixes','fixing','old bikes'],['paint','paints','painting','landscapes'],['train','trains','training','at the gym'],['sell','sells','selling','fresh fruit'],['carry','carries','carrying','heavy boxes'],['listen','listens','listening','to the radio'],['wait','waits','waiting','for the bus'],['write','writes','writing','long emails'],['teach','teaches','teaching','math'],['walk','walks','walking','the dog'],['tidy','tidies','tidying','the garage']],
 [['revise','revises','revising','for the final exams'],['negotiate','negotiates','negotiating','a better contract'],['attend','attends','attending','a conference in Madrid'],['submit','submits','submitting','the annual report'],['rehearse','rehearses','rehearsing','the opening speech'],['organize','organizes','organizing','a charity event'],['analyze','analyzes','analyzing','the survey results'],['supervise','supervises','supervising','the new interns'],['prepare','prepares','preparing','a presentation for the board'],['complain','complains','complaining','about the noise'],['recover','recovers','recovering','from a serious injury'],['compete','competes','competing','in the national championship']]];
const TMT=[[['on Sundays','los domingos'],['every day','todos los días'],['at night','por la noche'],['on Fridays','los viernes'],['in the morning','por la mañana']],[['every weekend',''],['after school',''],['on weekdays',''],['before breakfast',''],['in the evening','']],[['twice a week',''],['once a month',''],['every other day',''],['three times a year','']]];
const AD=['always','usually','often','never'];
const A=v=>v[0]+' '+v[3],act=v=>v[2]+' '+v[3],actEs=v=>v[5]+' '+v[6];
// ---------- Room 1: present simple ----------
function pp(lv,noIY){const s=rnd(noIY?SBL[lv].filter(x=>x[0]!=='I'&&x[0]!=='You'):SBL[lv]),v=rnd(VPT[lv]),t=rnd(TMT[lv]),S0=s[0],cj=s[2]?v[1]:v[0],ax=s[2]?'does':'do',ob=v[3]+' '+t[0];
 return{s,v,t,S0,cj,ax,ob,sn:nm(S0),sent:`${S0} ${cj} ${ob}.`,AX:cap(ax),dn:ax==='does'?"doesn't":"don't",dn2:ax==='does'?"don't":"doesn't"}}
function psW(lv,type){
 const {s,v,t,S0,cj,ax,ob,sn,sent}=pp(lv,type==='que');
 if(lv===0){const oe=v[6]+' '+t[1];
  if(type==='aff')return WQ(`Write the missing word: ${S0} ___ (${v[0]}) ${ob}.`,cj,`Escribe la palabra que falta: ${s[1]} ___ (${v[4]}) ${oe}.`);
  if(type==='neg')return WQ(`Write do not or does not: ${S0} ___ ${v[0]} ${ob}.`,`${ax} not|${ax}nt`,`Escribe do not o does not: ${S0} ___ ${v[0]} ${ob}. (${s[1]} no ${v[4]} ${oe})`);
  return WQ(`Write Do or Does: ___ ${sn} ${v[0]} ${ob}?`,ax,`Escribe Do o Does: ___ ${sn} ${v[0]} ${ob}? (¿${s[1]} ${v[4]} ${oe}?)`)}
 if(lv===1){
  if(type==='aff')return WQ(`Write the missing word: ${S0} ${rnd(AD)} ___ (${v[0]}) ${v[3]}.`,cj);
  if(type==='neg')return WQ(`Write the negative: ${sent} = ${S0} ___ ${ob}.`,`${ax}nt ${v[0]}|${ax} not ${v[0]}`);
  return WQ(`Write the question: ${sent} = ___ ${sn} ___ ${ob}?`,`${ax} ${v[0]}`)}
 if(type==='aff')return Math.random()<.5?WQ(`Correct the mistake: ${S0} ${s[2]?v[0]:v[1]} ${ob}.`,`${S0} ${cj} ${ob}`):WQ(`Rewrite the sentence with "always" (remove the time phrase): ${sent}`,`${S0} always ${cj} ${v[3]}`);
 if(type==='neg')return WQ(`Write the sentence in the negative: ${sent}`,`${S0} ${ax}nt ${v[0]} ${ob}|${S0} ${ax} not ${v[0]} ${ob}`);
 return Math.random()<.5?WQ(`Write a question: ${sent}`,`${ax} ${sn} ${v[0]} ${ob}`):WQ(`Write a question with "How often": ${sent}`,`how often ${ax} ${sn} ${v[0]} ${v[3]}`)}
function psMC(lv,type){
 const {s,v,t,S0,cj,ax,ob,sn,AX,dn,dn2}=pp(lv,type==='que');
 if(lv===0){
  if(type==='aff')return MQ(`Choose the correct word: ${S0} ___ (${v[0]}) ${ob}.`,[cj,s[2]?v[0]:v[1],v[2],'is '+v[0]],0,`Elige la palabra correcta: ${s[1]} ___ (${v[4]}) ${v[6]} ${t[1]}.`);
  if(type==='neg')return MQ(`Choose the correct words: ${S0} ___ ${v[0]} ${ob}. (negative)`,[ax+' not',(s[2]?'do':'does')+' not','not','is not'],0,`Elige las palabras correctas: ${S0} ___ ${v[0]} ${ob}. (negativo)`);
  return MQ(`Choose the correct word to start the question: ___ ${sn} ${v[0]} ${ob}?`,[AX,s[2]?'Do':'Does','Is','Are'],0,`Elige la palabra correcta para empezar la pregunta: ___ ${sn} ${v[0]} ${ob}?`)}
 const good=type==='aff'?`${S0} ${cj} ${ob}.`:type==='neg'?`${S0} ${dn} ${v[0]} ${ob}.`:`${AX} ${sn} ${v[0]} ${ob}?`;
 const bad=type==='aff'?[`${S0} ${s[2]?v[0]:v[1]} ${ob}.`,`${S0} ${v[2]} ${ob}.`,`${S0} do ${cj} ${ob}.`]:type==='neg'?[`${S0} ${dn2} ${v[0]} ${ob}.`,`${S0} ${dn} ${v[1]} ${ob}.`,`${S0} not ${v[0]} ${ob}.`]:[`${s[2]?'Do':'Does'} ${sn} ${v[0]} ${ob}?`,`${AX} ${sn} ${v[1]} ${ob}?`,`${S0} ${cj} ${ob}?`];
 return MQ(`Choose the correct ${type==='aff'?'sentence':type==='neg'?'negative sentence':'question'}.`,[good,...bad],0)}
function psRead(lv){
 const [p,g]=rnd(lv===2?PROF:RN),h=hs(g),[v1,v2,v3]=shuf(VPT[lv]),[t1,t2]=shuf(TMT[lv]);
 if(lv===0){
  const P=`${p} ${v1[1]} ${v1[3]} ${t1[0]}. ${h[1]} doesn't ${A(v2)} ${t2[0]}.`,PE=`${p} ${v1[7]} ${v1[6]} ${t1[1]}. ${h[2]} no ${v2[7]} ${v2[6]} ${t2[1]}.`;
  if(Math.random()<.5)return MQ(`Read:\n${P}\nWhat does ${p} do ${t1[0]}?`,[A(v1),...oth(A(v1),VPT[0].map(A))],0,`Lee:\n${PE}\n¿Qué hace ${p} ${t1[1]}?`);
  const yes=Math.random()<.5,vv=yes?v1:v2;return MQ(`Read:\n${P}\nDoes ${p} ${A(vv)}?`,[`Yes, ${h[0]} does.`,`No, ${h[0]} doesn't.`,`Yes, ${h[0]} is.`,`No, ${h[0]} isn't.`],yes?0:1,`Lee:\n${PE}\n¿${p} ${vv[7]} ${vv[6]}?`)}
 if(lv===1){
  const P=`${p} always ${v1[1]} ${v1[3]}. ${h[1]} usually ${v2[1]} ${v2[3]}, but ${h[0]} never ${v3[1]} ${v3[3]}.`,t=rnd([0,1,2]);
  if(t===0)return MQ(`Read:\n${P}\nWhat does ${p} never do?`,[A(v3),...oth(A(v3),VPT[1].map(A))],0);
  if(t===1)return MQ(`Read:\n${P}\nHow often does ${p} ${A(v1)}?`,['Always','Usually','Sometimes','Never'],0);
  return MQ(`Read:\n${P}\nDoes ${p} ${A(v3)}?`,[`No, ${h[0]} doesn't.`,`Yes, ${h[0]} does.`,`Yes, ${h[0]} always does.`,`No, ${h[0]} is not.`],0)}
 const P=`${p} ${v1[1]} ${v1[3]} ${t1[0]}. ${h[1]} doesn't ${A(v2)}, so ${h[0]} ${v3[1]} ${v3[3]} instead.`;
 return Math.random()<.5?MQ(`Read:\n${P}\nWhat does ${p} do instead of ${v2[2]} ${v2[3]}?`,[A(v3),A(v1),A(v2),...oth(A(v3),VPT[2].map(A).filter(x=>x!==A(v1)&&x!==A(v2)),1)],0):
  MQ(`Read:\n${P}\nWhich sentence is true?`,[`${p} ${v3[1]} ${v3[3]} instead of ${v2[2]} ${v2[3]}.`,`${p} ${v2[1]} ${v2[3]} ${t1[0]}.`,`${p} doesn't ${A(v3)}.`,`${p} ${v1[1]} ${v2[3]}.`],0)}
// ---------- Room 2: present continuous ----------
const SCN=[['Tom','m','the kitchen','la cocina'],['Mia','f','her room','su habitación'],['Ben','m','the garden','el jardín'],['Lucy','f','the park','el parque'],['Max','m','the library','la biblioteca'],['Sara','f','the classroom','el aula']];
function pcW(lv,type){
 const s=rnd(type==='que'?SBL[lv].filter(x=>x[0]!=='I'&&x[0]!=='You'):SBL[lv]),v=rnd(VPT[lv]),be=bE(s),S0=s[0],sn=nm(S0),ing=act(v),NW=['now','right now','at the moment'][lv];
 if(lv===0){
  if(type==='aff')return WQ(`Write the missing words: ${S0} ___ (${v[0]}) ${v[3]} now.`,`${be} ${v[2]}`,`Escribe las palabras que faltan: ${s[1]} ___ (${v[4]}) ${v[6]} ahora.`);
  if(type==='neg')return WQ(`Write am not, is not or are not: ${S0} ___ ${ing} now.`,be==='am'?'am not':`${be} not|${be}nt`,`Escribe am not, is not o are not: ${S0} ___ ${ing} now. (${s[1]} no está ${v[5]} ${v[6]} ahora)`);
  return WQ(`Write Am, Is or Are: ___ ${sn} ${ing} now?`,be,`Escribe Am, Is o Are: ___ ${sn} ${ing} now? (¿${s[1]} está ${v[5]} ${v[6]} ahora?)`)}
 const sent=`${S0} ${be} ${ing} ${NW}.`;
 if(lv===1){
  if(type==='aff')return WQ(`Write the missing words: ${S0} ___ (${v[0]}) ${v[3]} ${NW}.`,`${be} ${v[2]}`);
  if(type==='neg')return WQ(`Write the negative: ${sent} = ${S0} ___ ${v[3]} ${NW}.`,be==='am'?`am not ${v[2]}`:`${be} not ${v[2]}|${be}nt ${v[2]}`);
  return WQ(`Write the question: ${sent} = ___ ${sn} ___ ${v[3]} ${NW}?`,`${be} ${v[2]}`)}
 if(type==='aff')return WQ(`Correct the mistake: ${S0} ${be} ${v[0]} ${v[3]} ${NW}.`,`${S0} ${be} ${ing} ${NW}`);
 if(type==='neg')return WQ(`Write the sentence in the negative: ${sent}`,be==='am'?`${S0} am not ${ing} ${NW}`:`${S0} ${be} not ${ing} ${NW}|${S0} ${be}nt ${ing} ${NW}`);
 return WQ(`Write a question: ${sent}`,`${be} ${sn} ${ing} ${NW}`)}
function gramPC(lv){
 const s=rnd(SBL[lv]),v=rnd(VPT[lv]),be=bE(s),S0=s[0],wb=rnd(['am','is','are'].filter(x=>x!==be)),ing=act(v);
 if(lv===0)return MQ('Choose the correct sentence.',[`${S0} ${be} ${ing}.`,`${S0} ${ing}.`,`${S0} ${be} ${v[0]} ${v[3]}.`,`${S0} ${wb} ${ing}.`],0,`Elige la oración correcta: ${s[1]} está ${v[5]} ${v[6]}.`);
 if(lv===1)return MQ('Choose the correct question.',[`${cap(be)} ${nm(S0)} ${ing}?`,`Does ${nm(S0)} ${ing}?`,`${S0} ${be} ${ing}?`,`${cap(wb)} ${nm(S0)} ${ing}?`],0);
 return MQ('Choose the correct negative sentence.',[`${S0} ${be} not ${ing}.`,`${S0} ${be} no ${ing}.`,`${S0} don't ${ing}.`,`${S0} ${be} not ${v[0]} ${v[3]}.`],0)}
const PB=[
 ["It's 8 p.m. and the library is closing. Most students are leaving, but Carla is still studying because she is preparing for a difficult exam. Her friends are waiting for her outside.",["What is Carla doing?","She is leaving with her friends|She is closing the library|She is studying for an exam|She is waiting outside",2],["Why are Carla's friends outside?","They are waiting for her|They are studying|They are closing the library|They are taking the exam",0]],
 ["Our team is improving every week, but we are still losing too many games. The coach isn't shouting at us. He is explaining new ideas, and we are listening carefully.",["What is the team's problem?","They are not practicing|They are losing many games|They are improving too fast|They are winning every game",1],["What is the coach doing?","Shouting at the team|Explaining new ideas|Losing the games|Leaving the team",1]],
 ["I'm writing from Madrid. My friends are visiting a museum, but I'm not going with them because I'm waiting for an important phone call.",["Why isn't the writer at the museum?","He or she is sleeping|He or she is waiting for a call|He or she is eating lunch|He or she is visiting a friend",1],["What are the friends doing?","Visiting a museum|Waiting for a call|Writing a letter|Eating lunch",0]],
 ["Listen! The students aren't talking. They are taking a very difficult test, and the teacher is walking between the desks.",["Which sentence is true?","The students are talking loudly.|The teacher is sleeping.|The teacher is walking between the desks.|The test is easy.",2],["What are the students doing?","Playing games|Taking a test|Talking loudly|Leaving school",1]],
 ["My brother is cooking dinner tonight because my parents are working late. I'm helping him, but I'm not cutting the vegetables. He is doing that himself.",["Why is the brother cooking?","His parents are working late|He is hungry|It's his birthday|The writer is sick",0],["What isn't the writer doing?","Helping his brother|Cooking dinner|Cutting the vegetables|Working late",2]],
 ["Right now, the museum is getting crowded. A group of tourists is taking photos, while a guide is telling them about an old painting. Nobody is touching anything.",["What is the guide doing?","Taking photos|Telling about a painting|Touching the painting|Leaving the museum",1],["What are the tourists doing?","Taking photos|Cleaning the floor|Sleeping|Painting a picture",0]]];
const PBQ=PB.flatMap(([p,...qs])=>qs.map(([q,o,a])=>MQ(`Read:\n${p}\n${q}`,o,a)));
const STV=['I am knowing the answer.','She is wanting a new phone.','They are liking this song.','He is loving his job.','We are believing you.','My dog is hating the rain.'];
function stative(){const good=shuf(SB[0]).slice(0,3).map(s=>{const v=rnd(VPT[0]);return `${s[0]} ${bE(s)} ${act(v)}.`});return MQ('Which sentence is NOT correct?',[rnd(STV),...good],0)}
function pcRead(lv,t){
 if(lv===2)return t===1||t===2?rnd(PBQ):t===3?stative():gramPC(2);
 const [a,b]=shuf(SCN),[v1,v2,v3]=shuf(VPT[lv]),h=hs(a[1]),opts=c=>[act(c),...shuf(VPT[lv].filter(x=>x!==c)).slice(0,3).map(act)];
 const yn=[`Yes, ${h[0]} is.`,`No, ${h[0]} isn't.`,`Yes, ${h[0]} does.`,`No, ${h[0]} doesn't.`];
 if(lv===0){
  const P=`${a[0]} is in ${a[2]}. ${h[1]} is ${act(v1)}.`,PE=`${a[0]} está en ${a[3]}. ${h[2]} está ${actEs(v1)}.`;
  if(t===1)return MQ(`Read:\n${P}\nWhat is ${a[0]} doing?`,opts(v1),0,`Lee:\n${PE}\n¿Qué está haciendo ${a[0]}?`);
  if(t===2){const tr=Math.random()<.5,vv=tr?v1:v2;return MQ(`Read:\n${P}\nIs ${a[0]} ${act(vv)}?`,yn,tr?0:1,`Lee:\n${PE}\n¿Está ${a[0]} ${actEs(vv)}?`)}
  if(t===3)return MQ(`Read:\n${P}\nWhich sentence is true?`,[`${h[1]} is ${act(v1)}.`,`${h[1]} are ${act(v1)}.`,`${h[1]} is not ${act(v1)}.`,`${h[1]} is ${act(v2)}.`],0,`Lee:\n${PE}\n¿Qué oración es verdadera?`);
  return gramPC(0)}
 const P=`${a[0]} is ${act(v1)} now, but ${h[0]} isn't ${act(v2)}. ${b[0]} is ${act(v3)} too.`;
 if(t===1)return MQ(`Read:\n${P}\nWhat isn't ${a[0]} doing?`,opts(v2),0);
 if(t===2)return MQ(`Read:\n${P}\nWho is ${act(v3)}?`,[b[0],a[0],'Both of them','Nobody'],0);
 if(t===3)return MQ(`Read:\n${P}\nIs ${a[0]} ${act(v2)}?`,yn,1);
 return gramPC(1)}
// ---------- Room 3: comparatives and superlatives ----------
const CAT=[
 {it:[['mouse','el ratón','m'],['cat','el gato','m'],['dog','el perro','m'],['horse','el caballo','m'],['elephant','el elefante','m']],hi:['big','bigger','biggest','grande','grande'],lo:['small','smaller','smallest','pequeño','pequeña']},
 {it:[['turtle','la tortuga','f'],['bicycle','la bicicleta','f'],['car','el auto','m'],['train','el tren','m'],['plane','el avión','m']],hi:['fast','faster','fastest','rápido','rápida'],lo:['slow','slower','slowest','lento','lenta']},
 {it:[['pen','la lapicera','f'],['book','el libro','m'],['phone','el teléfono','m'],['car','el auto','m'],['house','la casa','f']],hi:['expensive','more expensive','most expensive','caro','cara'],lo:['cheap','cheaper','cheapest','barato','barata']},
 {it:[['tree','el árbol','m'],['house','la casa','f'],['tower','la torre','f'],['skyscraper','el rascacielos','m']],hi:['tall','taller','tallest','alto','alta'],lo:['short','shorter','shortest','bajo','baja']},
 {it:[['phone','el teléfono','m'],['house','la casa','f'],['castle','el castillo','m'],['pyramid','la pirámide','f']],hi:['old','older','oldest','viejo','vieja'],lo:['new','newer','newest','nuevo','nueva']},
 {it:[['feather','la pluma','f'],['book','el libro','m'],['bag','la mochila','f'],['car','el auto','m']],hi:['heavy','heavier','heaviest','pesado','pesada'],lo:['light','lighter','lightest','liviano','liviana']},
 {it:[['ice cream','el helado','m'],['water','el agua','f'],['tea','el té','m'],['soup','la sopa','f']],hi:['hot','hotter','hottest','caliente','caliente'],lo:['cold','colder','coldest','frío','fría']},
 {nm:1,hi:['tall','taller','tallest','alto','alta'],lo:['short','shorter','shortest','bajo','baja']},
 {nm:1,hi:['old','older','oldest','mayor','mayor'],lo:['young','younger','youngest','menor','menor']},
 {nm:1,hi:['fast','faster','fastest','rápido','rápida'],lo:['slow','slower','slowest','lento','lenta']},
 {nm:1,hi:['strong','stronger','strongest','fuerte','fuerte'],lo:['weak','weaker','weakest','débil','débil']}];
let CI=Math.floor(Math.random()*CAT.length);
function cx(k){
 const c=CAT[CI++%CAT.length],hi=Math.random()<.5,P=hi?c.hi:c.lo,Q=hi?c.lo:c.hi,L=c.nm?shuf(RN).slice(0,5):c.it.map(x=>[...x]);
 const pick=shuf(L.map((_,i)=>i)).slice(0,k).sort((a,b)=>a-b).map(i=>L[i]),r=hi?[...pick].reverse():pick;
 const en=x=>c.nm?x[0]:'the '+x[0],es=x=>c.nm?x[0]:x[1],g=x=>c.nm?x[1]:x[2];
 return{c,P,Q,L,r,en,es,N:x=>cap(en(x)),NE:x=>cap(es(x)),ad:x=>g(x)==='f'?P[4]:P[3],W:c.nm?'Who':'Which one',we:c.nm?'Quién':'Cuál',opt:(ans,n=3)=>[ans,...shuf(L.filter(y=>y!==ans)).slice(0,n)].map(y=>c.nm?y[0]:cap('the '+y[0]))}}
function cmpListen(lv){
 const {P,Q,r,en,N,W,we,opt}=cx(lv===0?2:3);let say,q,ans,es;
 if(lv===0){say=`${N(r[0])} is ${P[1]} than ${en(r[1])}.`;q=`${W} is ${P[1]}?`;ans=r[0];es=`¿${we} es más ${P[3]}?`}
 else if(lv===1&&Math.random()<.5){say=`${N(r[1])} is ${P[1]} than ${en(r[2])}, but ${en(r[0])} is the ${P[2]}.`;q=`${W} is the ${P[2]}?`;ans=r[0]}
 else if(lv===1){say=`${N(r[1])} is not as ${P[0]} as ${en(r[0])}.`;q=`${W} is ${P[1]}?`;ans=r[0]}
 else{say=`${N(r[1])} is not nearly as ${P[0]} as ${en(r[0])}, but it is far ${P[1]} than ${en(r[2])}.`;const sup=Math.random()<.5;q=`${W} is the ${sup?P[2]:Q[2]}?`;ans=sup?r[0]:r[2]}
 return LS(q,opt(ans),0,say,es)}
function cmpRead(lv){
 const {P,Q,r,en,es,N,NE,ad,W,we,opt}=cx(3);
 if(lv===0){
  const T1=`${N(r[0])} is ${P[1]} than ${en(r[1])}. ${N(r[1])} is ${P[1]} than ${en(r[2])}.`,T1E=`${NE(r[0])} es más ${ad(r[0])} que ${es(r[1])}. ${NE(r[1])} es más ${ad(r[1])} que ${es(r[2])}.`,sup=Math.random()<.5;
  return MQ(`Read:\n${T1}\n${W} is the ${sup?P[2]:Q[2]}?`,opt(sup?r[0]:r[2]),0,`Lee:\n${T1E}\n¿${we} es el más ${sup?P[3]:Q[3]}?`)}
 if(lv===1)return MQ(`Read:\n${N(r[1])} is not as ${P[0]} as ${en(r[0])}, but ${en(r[1])} is ${P[1]} than ${en(r[2])}.\n${W} is the ${P[2]}?`,opt(r[0]),0);
 return MQ(`Read:\n${N(r[0])} is by far the ${P[2]} of the three. ${N(r[1])} is nearly as ${P[0]} as ${en(r[0])}, and ${en(r[2])} is much less ${P[0]} than ${en(r[1])}.\n${W} is the least ${P[0]}?`,opt(r[2]),0)}
const PAIRS=[['hard','harder','good','better','you study','your grades are'],['early','earlier','good','better','you arrive','your seat is'],['fast','faster','dangerous','more dangerous','you drive','it is']];
function cmpWrite(lv,t){
 const {P,r,en,es,N,NE,ad}=cx(3),a=r[0],b=r[1];
 if(lv===0){
  if(t===0)return WQ(`Write the missing word: ${N(a)} is ___ (${P[0]}) than ${en(b)}.`,P[1],`Escribe la palabra que falta: ${NE(a)} es ___ (${ad(a)}) que ${es(b)}.`);
  return WQ(`Write the missing word: ${N(a)} is the ___ (${P[0]}) of all.`,P[2],`Escribe la palabra que falta: ${NE(a)} es el/la ___ (${ad(a)}) de todos.`)}
 if(lv===1){
  if(t===0)return WQ(`Write the missing words: ${N(a)} is ___ (${P[0]}) than ${en(b)}.`,P[1]);
  return WQ(`Write the missing word: ${N(a)} is as ___ (${P[0]}) as ${en(b)}.`,P[0])}
 const z=Math.random();
 if(z<.34)return WQ(`Rewrite with "not as ... as": ${N(a)} is ${P[1]} than ${en(b)}. = ${N(b)} is not as ___ as ${en(a)}.`,P[0]);
 if(z<.67)return WQ(`Write the missing words: ${N(a)} is by far the ___ (${P[0]}) of the three.`,P[2]);
 const p=rnd(PAIRS);return WQ(`Complete the sentence: The ___ (${p[0]}) ${p[4]}, the ___ (${p[2]}) ${p[5]}.`,`${p[1]} ${p[3]}`)}
function cmpMC(lv){
 const {P,r,en,es,N,NE,ad}=cx(2),a=r[0],b=r[1],uq=x=>[...new Set(x)];
 if(lv===0)return MQ(`Choose the correct word: ${N(a)} is ___ than ${en(b)}. (${P[0]})`,uq([P[1],P[2],'more '+P[0],P[0],'very '+P[0],P[0]+'er']).slice(0,4),0,`Elige la palabra correcta: ${NE(a)} es ___ que ${es(b)}. (${ad(a)})`);
 if(lv===1)return MQ('Choose the correct sentence.',[`${N(a)} is ${P[1]} than ${en(b)}.`,`${N(a)} is ${P[1]} that ${en(b)}.`,`${N(a)} is more ${P[1]} than ${en(b)}.`,`${N(a)} is the ${P[1]} than ${en(b)}.`],0);
 return MQ('Choose the correct sentence.',[`${N(a)} is by far the ${P[2]} of all.`,`${N(a)} is by far ${P[2]} of all.`,`${N(a)} is by far the more ${P[0]} of all.`,`${N(a)} is by far the ${P[0]}er of all.`],0)}
// ---------- Room 4: passive voice ----------
const PASP=[
 ["English is spoken in many countries.","The cake is made by my mom.","The door is closed at night.","Milk is sold in the shop.","Rice is eaten in many countries.","The classroom is cleaned every day.","Letters are written by students.","The garden is watered every morning."],
 ["The wand was broken by the wizard.","This book was written in nineteen fifty.","Pizza is eaten all over the world.","The window was not opened by Sam.","Was the cake made by your mother?","The letters were sent yesterday.","This song was sung by a famous singer.","The homework was not finished."],
 ["The key has been stolen by someone in the academy.","The potion will be prepared tomorrow morning.","The spell must be finished before midnight.","The castle was built more than five hundred years ago.","The new students have not been told about the rules.","Will the exam be held in the great hall?","The mystery was solved by the youngest student in the academy.","All the doors had been locked before the guests arrived."]];
function pickPas(lv,n){const p=shuf(PASP[lv]);return[...p.filter(x=>!SEEN.has(x)),...p.filter(x=>SEEN.has(x))].slice(0,n).map(SPK)}
const PAS=[['The cake','make','made','by my mom','La torta','hacer','por mi mamá'],['The window','open','opened','by Sam','La ventana','abrir','por Sam'],['The letter','write','written','by Anna','La carta','escribir','por Anna'],['English','speak','spoken','in Canada','El inglés','hablar','en Canadá'],['The bridge','build','built','by workers','El puente','construir','por obreros'],['The song','sing','sung','by a famous singer','La canción','cantar','por un cantante famoso'],['The key','find','found','by the teacher','La llave','encontrar','por el profesor'],['The room','clean','cleaned','by Tom','La habitación','limpiar','por Tom'],['The picture','paint','painted','by an artist','El cuadro','pintar','por un artista'],['The door','break','broken','by the wind','La puerta','romper','por el viento']];
const T2=[['use present perfect','has been'],['use will','will be'],['use must','must be'],['use past negative','was not|wasnt']];
const PAL_=[
 [["The cake is made by my mom.","Who makes the cake?","My mom",["My dad","My sister","My teacher"],"¿Quién hace la torta?"],["The window is opened by Sam.","Who opens the window?","Sam",["Tom","Anna","Max"],"¿Quién abre la ventana?"],["English is spoken in Canada.","Where is English spoken?","In Canada",["In Peru","In Japan","In Egypt"],"¿Dónde se habla inglés?"],["The letter is written by Anna.","What is written by Anna?","A letter",["A song","A book","A story"],"¿Qué es escrito por Anna?"],["The room is cleaned by Tom.","What is cleaned by Tom?","The room",["The car","The kitchen","The door"],"¿Qué es limpiado por Tom?"],["The song is sung by a famous singer.","Who sings the song?","A famous singer",["A teacher","A doctor","A baker"],"¿Quién canta la canción?"]],
 [["The wand was broken by the wizard.","What was broken?","The wand",["The window","The book","The door"]],["The window was not opened by Sam.","Who did not open the window?","Sam",["Tom","Anna","Max"]],["This book was written in nineteen fifty.","When was the book written?","In nineteen fifty",["In nineteen sixty","In nineteen forty","In two thousand"]],["The letters were sent yesterday.","When were the letters sent?","Yesterday",["Today","Tomorrow","Last week"]],["The bridge was built by workers.","Who built the bridge?","Workers",["Students","Doctors","Farmers"]],["The homework was not finished.","What was not finished?","The homework",["The dinner","The test","The letter"]]],
 [["The key has been stolen by someone in the academy.","What has happened to the key?","It has been stolen",["It has been found","It has been lost","It has been sold"]],["The potion will be prepared tomorrow morning.","When will the potion be prepared?","Tomorrow morning",["Tomorrow night","This afternoon","Next month"]],["The spell must be finished before midnight.","When must the spell be finished?","Before midnight",["After midnight","At noon","Before breakfast"]],["The castle was built more than five hundred years ago.","How old is the castle?","More than five hundred years",["About fifty years","Exactly one thousand years","Less than a hundred years"]],["The new students have not been told about the rules.","Who has not been told about the rules?","The new students",["The teachers","The old students","The guards"]],["All the doors had been locked before the guests arrived.","When were the doors locked?","Before the guests arrived",["After the guests arrived","While the guests were eating","The next morning"]]]];
function pasListen(lv){const [say,q,c,d,es]=rnd(PAL_[lv]);return LS(q,[c,...d],0,say,es)}
const PAR=[
 [["Rice is grown in Asia. It is eaten every day.","Where is rice grown?","In Asia",["In Europe","In Canada","In Egypt"],"El arroz se cultiva en Asia. Se come todos los días.","¿Dónde se cultiva el arroz?"],["The school is cleaned every day. The windows are opened in the morning.","When are the windows opened?","In the morning",["At night","On Sunday","In the afternoon"],"La escuela se limpia todos los días. Las ventanas se abren por la mañana.","¿Cuándo se abren las ventanas?"],["This cake is made by my mom. It is served at parties.","Who makes the cake?","My mom",["My dad","My teacher","My brother"],"Esta torta es hecha por mi mamá. Se sirve en las fiestas.","¿Quién hace la torta?"],["The letters are written by students. They are sent every Friday.","When are the letters sent?","Every Friday",["Every Monday","Every day","Every month"],"Las cartas son escritas por estudiantes. Se envían todos los viernes.","¿Cuándo se envían las cartas?"],["Milk is sold in the shop. It is kept in the fridge.","Where is milk sold?","In the shop",["In the school","In the park","In the garden"],"La leche se vende en la tienda. Se guarda en la heladera.","¿Dónde se vende la leche?"]],
 [["The museum was built in nineteen hundred. It was closed during the war, but it was opened again in nineteen fifty.","When was the museum opened again?","In nineteen fifty",["In nineteen hundred","In nineteen forty","In two thousand"]],["The bridge was damaged by a storm. It was repaired by workers last week.","Who repaired the bridge?","Workers",["The storm","Tourists","Students"]],["The cookies were not eaten. They were put in a box.","What was done with the cookies?","They were put in a box",["They were eaten","They were sold","They were thrown away"]],["Was the room cleaned? Yes, it was cleaned by Tom this morning.","Who cleaned the room?","Tom",["Anna","The teacher","Nobody"]],["The song was sung by a famous singer. It was recorded in London.","Where was the song recorded?","In London",["In Paris","In Madrid","In Rome"]]],
 [["The ancient manuscript, which was discovered in a cave, has been studied by experts for decades. It is believed to have been written by a monk.","Who is believed to have written the manuscript?","A monk",["An expert","A king","A student"]],["Students are expected to be silent while the exams are being corrected.","When must the students be silent?","While the exams are being corrected",["After the exams are corrected","Before the exams begin","While the teachers are eating"]],["The report should have been submitted yesterday, but it was delayed by the manager.","Who delayed the report?","The manager",["The assistant","The students","The clients"]],["The festival will be held in the great hall next week, unless the roof has not been repaired by then.","What could stop the festival?","The roof not being repaired",["Too many guests","A late manager","Rain in the garden"]],["The stolen painting was found in a warehouse, where it had been hidden for years.","Where was the painting found?","In a warehouse",["In a museum","In a school","In a bank"]]]];
function pasRead(lv){const [p,q,c,d,pe,qe]=rnd(PAR[lv]);return MQ(`Read:\n${p}\n${q}`,[c,...d],0,pe&&`Lee:\n${pe}\n${qe}`)}
function pasW(lv){
 const [S0,vb,pp2,ag,Se,ve,ae]=rnd(PAS),t=rnd([0,1,2]);
 if(lv===0)return WQ(`Write the missing word: ${S0} is ___ (${vb}) ${ag}.`,pp2,`Escribe la palabra que falta: ${Se} es ___ (${ve}) ${ae}.`);
 if(lv===1){
  if(t===0)return WQ(`Write the missing word: ${S0} was ___ (${vb}) ${ag}.`,pp2);
  if(t===1)return WQ(`Write the negative: ${S0} was ${pp2} ${ag}. = ${S0} ___ ${pp2} ${ag}.`,'was not|wasnt');
  return WQ(`Write the question: ${S0} was ${pp2} ${ag}. = ___ ${nm(S0)} ${pp2} ${ag}?`,'was')}
 const x=rnd(T2);return WQ(`Write the missing words: ${S0} ___ (${vb}) ${ag}. (${x[0]})`,x[1].split('|').map(y=>y+' '+pp2).join('|'))}
function pasMC(lv){
 const [S0,vb,pp2,ag,Se,ve,ae]=rnd(PAS),t=rnd([0,1]);
 if(lv===0){
  if(t===0)return MQ(`Choose the correct word: ${S0} is ___ (${vb}) ${ag}.`,[pp2,vb,vb+'s','be '+pp2],0,`Elige la palabra correcta: ${Se} es ___ (${ve}) ${ae}.`);
  return MQ('Choose the passive sentence.',[`${S0} is ${pp2} ${ag}.`,`${S0} ${vb}s ${ag}.`,`${S0} ${vb} ${ag}.`,`${S0} has ${vb} ${ag}.`],0,'Elige la oración en voz pasiva.')}
 if(lv===1)return MQ('Choose the correct sentence.',[`${S0} was ${pp2} ${ag}.`,`${S0} were ${pp2} ${ag}.`,`${S0} was ${vb} ${ag}.`,`${S0} did ${pp2} ${ag}.`],0);
 return t===0?MQ('Choose the correct sentence.',[`${S0} must be ${pp2} ${ag}.`,`${S0} must ${pp2} ${ag}.`,`${S0} must be ${vb} ${ag}.`,`${S0} must been ${pp2} ${ag}.`],0):MQ('Choose the correct sentence.',[`${S0} has been ${pp2} ${ag}.`,`${S0} has ${pp2} ${ag}.`,`${S0} has been ${vb} ${ag}.`,`${S0} have been ${pp2} ${ag}.`],0)}
const pasGhost=lv=>Math.random()<.5?pasW(lv):pasMC(lv);

const MK=[
 lv=>({main:[()=>psW(lv,'aff'),()=>psMC(lv,'neg'),()=>psW(lv,'que'),()=>psRead(lv)],extra:[()=>psMC(lv,'aff'),()=>psW(lv,'neg'),()=>psMC(lv,'que'),()=>psRead(lv)]}),
 lv=>({main:[()=>pcRead(lv,1),()=>pcW(lv,'neg'),()=>pcRead(lv,2),()=>pcW(lv,'que')],extra:[()=>pcW(lv,'aff'),()=>gramPC(lv),()=>pcRead(lv,3),()=>pcRead(lv,1)]}),
 lv=>({main:[()=>cmpListen(lv),()=>cmpRead(lv),()=>cmpWrite(lv,0),()=>cmpWrite(lv,1)],extra:[()=>cmpMC(lv),()=>cmpWrite(lv,0),()=>cmpRead(lv),()=>cmpListen(lv)]}),
 lv=>({main:[()=>pasListen(lv),()=>pasRead(lv),()=>pasW(lv),()=>pasMC(lv)],extra:[()=>pasW(lv),()=>pasMC(lv),()=>pasListen(lv),()=>pasRead(lv)]})];
// ---------- Hall ghosts: academy vocabulary ----------
const VOC=[
 [['a place where you read books','library','un lugar donde lees libros'],['a person who teaches students','teacher','una persona que enseña a los estudiantes'],['a person who studies at school','student','una persona que estudia en la escuela'],['you write with it','pen','con eso escribes','pencil'],['the room where you sleep','bedroom','el cuarto donde duermes'],['the opposite of "open"','closed','lo contrario de "abierto"','close|shut'],['you read it and it has pages','book','lo lees y tiene páginas'],['a place with many trees and flowers','garden','un lugar con muchos árboles y flores'],['you use it to open a door','key','lo usas para abrir una puerta'],['a man who does magic','wizard','un hombre que hace magia'],['the opposite of "big"','small','lo contrario de "grande"','little'],['a very tall building in a castle','tower','un edificio muy alto en un castillo'],['you use it to do magic','wand','lo usas para hacer magia']],
 [['a long old paper with writing','scroll'],['a magic drink','potion'],['the room where students sleep','dormitory','dorm'],['a person who learns magic','apprentice'],['the opposite of "ancient"','modern','new'],['a book with words and their meanings','dictionary'],['witches use it to fly','broom','broomstick'],['a night bird that says "hoo"','owl'],['a person who protects a door','guard'],['a magic word or sentence','spell'],['a big animal with wings that breathes fire','dragon'],['a glass ball to see the future','crystal ball']],
 [['the leader of a school','headmaster','headmistress|principal|head teacher|headteacher'],['a list of subjects in a school','curriculum'],['not allowed','forbidden'],['full of magic','enchanted'],['very, very old','ancient'],['a big pot for making potions','cauldron'],['a book of spells','spellbook','grimoire'],['strange and hard to understand','mysterious'],['a hidden path','secret passage|secret tunnel'],['a person who walks in dreams','sleepwalker'],['a test at the end of a course','final exam|exam']]];
function vocab(){const P=VOC[level],it=rnd(P),mc=Math.random()<.5,d=it[0],a=it[1],e=level===0?it[2]:undefined,alt=level===0?it[3]:it[2];
 if(mc){const m=MQ('Choose the word that means: '+d,oneOf(a.split('|')[0],oth(a.split('|')[0],P.map(x=>x[1].split('|')[0]))),0,e&&'Elige la palabra que significa: '+e);m.key=d;return m}
 const w=WQ('Write the word that means: '+d,[a].concat(alt?alt.split('|'):[]).join('|'),e&&'Escribe la palabra que significa: '+e);w.key=d;return w}
const lk=k=>level===2?'g':k;
const mkLv=()=>{const m=level===0?3:2;return{0:m,1:m,2:m,3:m,f:m,g:3}};
function genMain(i){return MK[i](level).main.map(f=>fresh(f))}
function genGhost(sc){const m=sc==='hall'?[vocab]:(()=>{const o=MK[sc](level);return o.main.concat(o.extra)})();return fresh(rnd(m))}
function genFinal(){const lv=level,q1=fresh(()=>psW(lv,rnd(['aff','neg','que']))),q2=fresh(()=>pcRead(lv,rnd([1,2,3]))),q3=fresh(()=>cmpListen(lv)),q4=fresh(()=>Math.random()<.5?pasW(lv):pasRead(lv));q1.st=0;q2.st=1;return [q1,q2,q3,q4]}

// ---------- Flow ----------
document.querySelectorAll('#lv .ib').forEach(b=>b.onclick=()=>{level=+b.dataset.l;document.querySelectorAll('#lv .ib').forEach(x=>x.classList.toggle('sel',x===b))});
$('play').onclick=()=>{ES=false;CT=false;TL=false;audioInit();renderIntro();show('intro')};
function startGame(){newGame();show('game');if(!running){running=true;tick()}}
$('go').onclick=()=>{buildCust();show('cust')};
function newGame(){S={sc:'hall',x:272,y:80,ghd:0,rs:[],gd:{},fin:false,lv:mkLv(),lifeKey:null,dir:'d',keys:[0,0,0,0],open:[1,0,0,0],held:null,done:[0,0,0,0],dig:[0,0,0,0].map(()=>Math.floor(Math.random()*10)),log:[],paused:false,t:0};
 ['qm','inv','kp','pz','hp','gv','sp'].forEach(i=>$(i).classList.remove('on'));menuReset();build('hall');$('tutp').style.display='none';$('mbtn').style.display='';$('mbtn').classList.remove('pulse')}

// ---------- Input ----------
const held=new Set();
addEventListener('keydown',e=>{
 if(e.target.tagName==='INPUT'){if(e.key==='Enter'){e.target.id==='ci'?tryCode():sub()}return}
 if(!S||!$('game').classList.contains('on'))return;
 if(e.key==='Escape'){if(S.dead||(S.tut&&S.tut.step<6))return;S.man?setMan(false):setMan(true,'pz');return}
 if(S.man)return;
 const k=e.key.toLowerCase();
 if('wasd'.includes(k)&&k.length===1){held.add(k);e.preventDefault()}
 if(k==='e'){ if($('inv').classList.contains('on'))closeInv(); else if(!S.paused)openInv() }
 if(S.tutModal&&(k==='q'||k==='enter')){$('tok').click();return}
 if(k==='q'&&!S.paused)interact();
});
addEventListener('keyup',e=>held.delete(e.key.toLowerCase()));

// ---------- World (pixel art, 400x240 escalado x2) ----------
const cv=$('cv'),g=cv.getContext('2d');
const pxc=document.createElement('canvas'),p=pxc.getContext('2d');
let SC=3,VW=400,VH=240;
function resize(){cv.width=innerWidth;cv.height=innerHeight;SC=clamp(Math.floor(Math.min(innerWidth/380,innerHeight/230)),2,4);VW=Math.ceil(innerWidth/SC);VH=Math.ceil(innerHeight/SC);pxc.width=VW;pxc.height=VH;p.imageSmoothingEnabled=false;g.imageSmoothingEnabled=false}
addEventListener('resize',resize);resize();
const cam=(pos,view,size)=>size<=view?-(view-size)/2:clamp(pos-view/2,0,size-view);
const DOORC=[3,10,22,29],SOL='#pbtofvrnkg';
const SZ={tut:[22,16],hall:[34,24],0:[28,22],1:[28,22],2:[32,24],3:[28,22]};
const DEC=[
 [['b',2,4,9,1],['b',17,4,9,1],['b',2,7,8,1],['b',18,7,8,1],['b',2,10,8,1],['b',18,10,8,1],['b',2,13,8,1],['b',18,13,8,1],['t',4,17,3,1],['t',21,17,3,1],['g',10,6],['g',17,6]],
 [['p',3,6],['p',3,11],['p',3,16],['p',24,6],['p',24,11],['p',24,16],['p',7,8],['p',7,14],['p',20,8],['p',20,14],['#',9,16,1,4],['#',18,16,1,4],['t',3,18,4,1],['t',21,18,4,1],['n',6,11],['n',21,11]],
 [['t',3,6,5,1],['t',24,6,5,1],['t',3,10,5,1],['t',24,10,5,1],['t',3,14,5,1],['t',24,14,5,1],['#',10,9,1,8],['#',21,9,1,8],['p',12,11],['p',19,11],['p',12,17],['p',19,17],['v',7,4],['v',24,4],['v',6,19],['v',25,19],['k',2,19,1,2],['k',29,19,1,2]],
 [['p',6,6],['p',21,6],['p',6,13],['p',21,13],['r',10,8],['r',17,8],['r',10,13],['r',17,13],['b',2,4,4,1],['b',22,4,4,1],['k',2,19,2,1],['k',24,19,2,1],['t',4,16,4,1],['t',20,16,4,1],['#',4,8,1,5],['#',23,8,1,5]]];
const DECO=[
 [['chair',4,18],['chair',6,18],['chair',21,18],['chair',23,18],['plant',1,19],['plant',26,19],['owl',5,4],['owl',20,4],['cat',9,8],['scroll',22,9],['candle',11,18]],
 [['moon',3,4],['sparkle',24,5],['scroll',5,19],['sparkle',12,9],['sparkle',15,14],['telescope',12,18],['sparkle',9,11]],
 [['bubble',12,8],['bubble',19,13],['skull',22,20],['bottle',9,20],['flask',5,17],['bottle',26,17],['bubble',12,14]],
 [['dragon',11,4],['dragon',16,4],['coins',3,17],['gem',24,17],['bone',9,18],['bone',18,12],['sword',13,18],['coins',7,10]]];
const TH={
 hall:{w:'#1b2036',f:['#9a86d2','#8d79c7'],k:'brick',sh:'books',pl:['#c9c3dc','#f0ecff','#9a94b5'],ca:['#8a2346','#e0b23a'],te:['book']},
 0:{w:'#3b2410',f:['#8a6038','#7a5230'],k:'wood',sh:'books',pl:['#8b5a2b','#b07a45','#5a3a1e'],ca:['#7a1f2e','#e0b23a'],te:['book','candle','scroll']},
 1:{w:'#0a0e2e',f:['#34488f','#2c3d7c'],k:'brick',sh:'scroll',pl:['#5563a8','#8ea0f0','#3a4680'],ca:['#3b2a7a','#8ea0ff'],te:['telescope','scroll']},
 2:{w:'#2f7a62',f:['#d3ebe0','#a5d3bc'],k:'tile',sh:'potion',pl:['#9fc9b4','#dff5ea','#6c9c85'],ca:['#2f7fa8','#bfe9ff'],te:['flask','bottle']},
 3:{w:'#1e0a10',f:['#6e3b3f','#613337'],k:'brick',sh:'weapon',pl:['#8a6068','#c08f98','#5c3a40'],ca:['#7a0f1a','#f0b429'],te:['candle','scroll']}};
DEC.tut=[['p',4,6],['p',17,6],['t',3,11,3,1],['t',16,11,3,1]];DECO.tut=[];TH.tut=TH.hall;
const BK=['#c0392b','#2980b9','#27ae60','#f1c40f','#8e44ad'],PC=['#ff4d6d','#4dff88','#4da6ff','#ffd24d','#c04dff'];
function wallDec(c,sc,W){
 const m=W*8,hw=W>=32?[216,120]:[168,96];
 [m-hw[0],m-hw[1],m+hw[1],m+hw[0]].forEach((x,i)=>{
  if(sc===0){c.fillStyle='#c9a227';c.fillRect(x-12,8,24,20);c.fillStyle=['#2a4f7a','#5a2f4a','#2f5a3a','#4a3a5a'][i];c.fillRect(x-10,10,20,16);c.fillStyle='#f5d76e';c.fillRect(x+3,12,4,4);c.fillStyle='#2f7a4a';c.fillRect(x-10,20,20,6)}
  else if(sc===1){c.fillStyle='#3a4680';c.fillRect(x-9,6,18,24);c.fillStyle='#050a24';c.fillRect(x-7,8,14,20);c.fillStyle='#fff';c.fillRect(x-3,12,1,1);c.fillRect(x+3,17,1,1);c.fillRect(x-1,23,1,1);c.fillRect(x+4,10,1,1)}
  else if(sc===2){c.fillStyle='#3d240f';c.fillRect(x-14,21,28,3);for(let k=0;k<5;k++){c.fillStyle=PC[(k+i)%5];c.fillRect(x-12+k*6,12,4,9);c.fillStyle='#fff';c.fillRect(x-11+k*6,10,2,2)}}
  else{c.fillStyle='#8f1024';c.fillRect(x-7,4,14,22);for(let r=0;r<6;r++)c.fillRect(x-7+r,26+r,14-2*r,1);c.fillStyle='#f0b429';c.fillRect(x-7,4,14,2);c.fillRect(x-2,10,4,6)}});
 c.save();c.translate(m-256,0);
 if(sc===0){c.fillStyle='#e8d8a8';c.beginPath();c.arc(256,18,9,0,7);c.fill();c.fillStyle='#3d240f';c.fillRect(255,11,2,8);c.fillRect(255,18,6,2)}
 if(sc===1){c.fillStyle='#3a4680';c.beginPath();c.arc(256,18,11,0,7);c.fill();c.fillStyle='#fff';[[251,12],[258,14],[254,20],[261,22],[249,18]].forEach(a=>c.fillRect(a[0],a[1],1,1))}
 if(sc===2){c.fillStyle='#e8fff6';c.fillRect(244,8,24,18);c.fillStyle='#7fd6c0';c.fillRect(246,10,20,14);c.fillStyle='#e8fff6';c.fillRect(255,10,2,14)}
 if(sc===3){c.fillStyle='#6b4a52';c.fillRect(248,6,16,20);c.fillStyle='#f0b429';c.fillRect(254,10,4,10);c.fillStyle='#cfd6e6';c.fillRect(244,8,2,16);c.fillRect(266,8,2,16)}
 c.restore()}
function build(sc){
 const hall=sc==='hall',[W,H]=SZ[sc],T=TH[sc];S.W=W;S.H=H;S.dyn=[];
 const m=Array.from({length:H},(_,y)=>Array.from({length:W},(_,x)=>y<3||y>=H-1||x<1||x>=W-1?'#':'.'));
 const put=(c,x,y,w=1,h=1)=>{for(let j=0;j<h;j++)for(let i=0;i<w;i++)m[y+j][x+i]=c};
 const cc=W/2-2;
 for(let y=3;y<H-1;y++)for(let x=cc;x<cc+4;x++)m[y][x]='c';
 if(hall){
  put('#',1,10,11,1);put('#',22,10,11,1);
  put('#',9,11,1,5);put('#',9,19,1,4);put('#',24,11,1,5);put('#',24,19,1,4);
  [[11,12],[22,12],[11,20],[22,20],[7,6],[26,6],[13,5],[20,5]].forEach(a=>put('p',...a));
  put('b',1,11,7,1);put('b',26,11,7,1);put('t',3,14,3,1);put('t',28,14,3,1);put('t',3,20,3,1);put('t',28,20,3,1);put('t',2,8,3,1);put('t',29,8,3,1)}
 else{DEC[sc].forEach(d=>put(...d));put('o',W/2-1,sc==='tut'?8:5,2,1)}
 S.map=m;
 const o2=W>=32?[160,80]:[132,48];
 S.tor=hall?[120,240,304,424]:[W*8-o2[0],W*8-o2[1],W*8+o2[1],W*8+o2[0]];
 S.gh=[];for(let i=0,gn=hall?6+Math.floor(Math.random()*2):sc==='tut'?0:3;i<gn;i++){const q=rfree();S.gh.push({x:q[0],y:q[1],vx:0,vy:0,t:0,q:genGhost(sc),r:hall?null:sc})}
  const b=document.createElement('canvas');b.width=W*16;b.height=H*16;const c=b.getContext('2d');c.imageSmoothingEnabled=false;
 const fl=(x,y,X,Y)=>{
  c.fillStyle=T.f[(x+y)%2];c.fillRect(X,Y,16,16);
  if(sc===0){c.fillStyle='rgba(0,0,0,.22)';c.fillRect(X,Y+7,16,1);c.fillRect(X+((x+y)%2?4:11),Y,1,8);c.fillRect(X+((x+y)%2?11:4),Y+8,1,8)}
  else if(sc===1){if((x*5+y*11)%7==0){c.fillStyle='#cfd8ff';c.fillRect(X+3+(x%5),Y+4+(y%6),1,1);c.fillRect(X+11,Y+11,1,1)}c.fillStyle='rgba(255,255,255,.05)';c.fillRect(X,Y,16,1);c.fillRect(X,Y,1,16)}
  else if(sc===2){c.fillStyle='rgba(0,0,0,.14)';c.fillRect(X+15,Y,1,16);c.fillRect(X,Y+15,16,1);if((x*3+y*7)%13==0){c.fillStyle='rgba(60,190,110,.35)';c.fillRect(X+3,Y+5,7,4)}}
  else if(sc===3){c.fillStyle='rgba(0,0,0,.2)';c.fillRect(X+15,Y,1,16);c.fillRect(X,Y+15,16,1);if((x*7+y*3)%9==0){c.fillStyle='#ff6a1a';c.fillRect(X+3,Y+5,3,1);c.fillRect(X+6,Y+6,3,1);c.fillRect(X+9,Y+7,2,1);c.fillStyle='#ffd23f';c.fillRect(X+6,Y+6,1,1)}}
  else{c.fillStyle=(x+y)%2?'rgba(255,255,255,.07)':'rgba(0,0,0,.08)';c.fillRect(X,Y,16,16);if((x*7+y*13)%11==0){c.fillStyle='rgba(255,255,255,.12)';c.fillRect(X+5,Y+6,2,1)}}};
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){
  const ch=m[y][x],X=x*16,Y=y*16;
  if(ch==='#'){c.fillStyle=T.w;c.fillRect(X,Y,16,16);
   if(T.k==='wood'){c.fillStyle='rgba(0,0,0,.3)';c.fillRect(X+5,Y,1,16);c.fillRect(X+11,Y,1,16);c.fillStyle='rgba(255,255,255,.08)';c.fillRect(X+6,Y,1,16)}
   else if(T.k==='tile'){c.fillStyle='rgba(255,255,255,.28)';c.fillRect(X,Y+7,16,1);c.fillRect(X+7,Y,1,16)}
   else{c.fillStyle='rgba(255,255,255,.09)';c.fillRect(X,Y+7,16,1);c.fillRect(X,Y+15,16,1);c.fillRect(X+(y%2?4:12),Y,1,7);c.fillRect(X+(y%2?12:4),Y+8,1,7)}
   if(m[y+1]&&m[y+1][x]!=='#'){c.fillStyle='rgba(0,0,0,.4)';c.fillRect(X,Y+12,16,4);c.fillStyle='rgba(255,255,255,.35)';c.fillRect(X,Y+11,16,1)}
   continue}
  fl(x,y,X,Y);
  if(ch==='c'||ch==='o'){c.fillStyle=T.ca[0];c.fillRect(X,Y,16,16);c.fillStyle=T.ca[1];if(x==cc)c.fillRect(X,Y,2,16);if(x==cc+3)c.fillRect(X+14,Y,2,16);if(y%3==0&&(x==cc+1||x==cc+2))c.fillRect(X+6,Y+6,4,4)}
  if(ch==='p'){c.fillStyle='rgba(0,0,0,.35)';c.fillRect(X+1,Y+13,14,3);c.fillStyle=T.pl[0];c.fillRect(X+3,Y+1,10,14);c.fillStyle=T.pl[1];c.fillRect(X+4,Y+1,2,14);c.fillStyle=T.pl[2];c.fillRect(X+11,Y+1,2,14);c.fillStyle=T.pl[1];c.fillRect(X+2,Y,12,2);c.fillRect(X+2,Y+14,12,2)}
  if(ch==='b'){
   if(T.sh==='books'){c.fillStyle='#5b3a1e';c.fillRect(X,Y,16,16);c.fillStyle='#2e1c0d';c.fillRect(X,Y+7,16,1);c.fillRect(X,Y+15,16,1);for(let i=0;i<4;i++){c.fillStyle=BK[(x+i+y)%5];c.fillRect(X+1+i*4,Y+2,3,5);c.fillStyle=BK[(x+i*2+y+1)%5];c.fillRect(X+1+i*4,Y+9,3,6)}}
   else if(T.sh==='scroll'){c.fillStyle='#2a2f66';c.fillRect(X,Y,16,16);for(let r=0;r<3;r++){c.fillStyle='#e8d8a8';c.fillRect(X+2,Y+1+r*5,12,3);c.fillStyle='#b8a070';c.fillRect(X+2,Y+1+r*5,1,3);c.fillRect(X+13,Y+1+r*5,1,3)}}
   else if(T.sh==='potion'){c.fillStyle='#3d240f';c.fillRect(X,Y,16,16);c.fillStyle='#24140a';c.fillRect(X,Y+7,16,1);c.fillRect(X,Y+15,16,1);for(let i=0;i<3;i++){c.fillStyle=PC[(x+i)%5];c.fillRect(X+2+i*5,Y+3,3,4);c.fillStyle=PC[(y+i+2)%5];c.fillRect(X+2+i*5,Y+10,3,5)}}
   else{c.fillStyle='#2b1a12';c.fillRect(X,Y,16,16);for(let i=0;i<3;i++){c.fillStyle='#cfd6e6';c.fillRect(X+2+i*5,Y+1,2,11);c.fillStyle='#e0b23a';c.fillRect(X+1+i*5,Y+11,4,2);c.fillStyle='#7a4a24';c.fillRect(X+2+i*5,Y+13,2,3)}}}
  if(ch==='t'){c.fillStyle='rgba(0,0,0,.3)';c.fillRect(X,Y+12,16,4);c.fillStyle='#7a4a24';c.fillRect(X,Y+3,16,10);c.fillStyle='#9a6335';c.fillRect(X,Y+3,16,2);c.fillStyle='#3d240f';c.fillRect(X+1,Y+13,2,3);c.fillRect(X+13,Y+13,2,3);
   if((x+y)%2==0)pi(c,T.te[((x+y)>>1)%T.te.length],X+8,Y+6,8)}
  if(ch==='f'){const n=(a,d)=>m[y+d]&&m[y+d][x+a]==='f';c.fillStyle='#b9b3d6';c.fillRect(X,Y,16,16);
   const l=n(-1,0)?0:3,r=n(1,0)?0:3,t=n(0,-1)?0:3,bt=n(0,1)?0:3;c.fillStyle=(x+y)%2?'#3aa0ff':'#5bb8ff';c.fillRect(X+l,Y+t,16-l-r,16-t-bt)}
  if(ch==='v'){c.fillStyle='#1b1b1b';c.fillRect(X+2,Y+6,12,9);c.fillStyle='#3a3a3a';c.fillRect(X+1,Y+5,14,2);c.fillStyle='#5cff7a';c.fillRect(X+3,Y+5,10,2);c.fillStyle='#000';c.fillRect(X+3,Y+15,3,1);c.fillRect(X+10,Y+15,3,1);S.dyn.push(['v',X,Y])}
  if(ch==='r'){c.fillStyle='#6b6b7a';c.fillRect(X+5,Y+10,6,6);c.fillStyle='#3a3a44';c.fillRect(X+3,Y+8,10,3);S.dyn.push(['r',X,Y])}
  if(ch==='n'){c.fillStyle='#5563a8';c.fillRect(X+4,Y+11,8,5);c.fillStyle='#8ea0ff';c.beginPath();c.arc(X+8,Y+7,6,0,7);c.fill();c.fillStyle='#e8ecff';c.fillRect(X+5,Y+4,2,2);S.dyn.push(['n',X,Y])}
  if(ch==='k'){c.fillStyle='rgba(0,0,0,.3)';c.fillRect(X,Y+14,16,2);c.fillStyle='#7a4a24';c.fillRect(X+1,Y+5,14,10);c.fillStyle='#9a6335';c.fillRect(X+1,Y+3,14,4);c.fillStyle='#e0b23a';c.fillRect(X+7,Y+3,2,12);c.fillRect(X+1,Y+8,14,1)}
  if(ch==='g'){c.fillStyle='#5a3a1e';c.fillRect(X+6,Y+11,4,5);c.fillRect(X+3,Y+15,10,1);c.fillStyle='#2f7fa8';c.beginPath();c.arc(X+8,Y+7,5,0,7);c.fill();c.fillStyle='#3cb371';c.fillRect(X+5,Y+5,3,3);c.fillRect(X+9,Y+8,2,2)}
 }
 if(!hall){wallDec(c,sc,W);DECO[sc].forEach(d=>pi(c,d[0],d[1]*16+8,d[2]*16+8,16))}
 S.bg=b}
function dynDraw(){S.dyn.forEach(([ch,X,Y])=>{
 if(ch==='v'){p.fillStyle='#b8ffb8';p.fillRect(X+4+(((S.t>>3)+X)%3)*3,Y+3-((S.t>>2)+Y)%3,2,2)}
 else if(ch==='r'){const f=(S.t>>2)+X;p.fillStyle='rgba(255,140,40,.13)';p.fillRect(X-8,Y-8,32,32);p.fillStyle=f%2?'#ff9a1f':'#ffd23f';p.fillRect(X+5,Y+2,6,6+f%2);p.fillStyle='#ff5a1f';p.fillRect(X+6,Y+5,4,3)}
 else{p.globalAlpha=.14+.1*Math.sin(S.t/15);p.fillStyle='#aab8ff';p.fillRect(X-6,Y-6,28,28);p.globalAlpha=1}})}
function go(sc,x,y){S.sc=sc;S.x=x;S.y=y;build(sc)}
function objs(){
 const ex={x:(S.W/2-2)*16,y:(S.H-2)*16,w:64,h:32};
 if(S.sc==='tut')return[{x:(S.W/2-1)*16,y:128,w:32,h:16,t:'puz',i:'tut'},{x:(S.W/2-1)*16,y:16,w:32,h:32,t:'door',i:1}];
 if(S.sc==='hall')return[...DOORC.map((c,i)=>({x:c*16,y:16,w:32,h:32,t:'door',i})),{...ex,t:'main'}];
 return[{x:(S.W/2-1)*16,y:80,w:32,h:16,t:'puz',i:S.sc},{...ex,t:'exit'}]}
const free=(x,y)=>![[x-5,y],[x+5,y],[x-5,y-6],[x+5,y-6]].some(([a,b])=>{const r=S.map[Math.floor(b/16)];return !r||SOL.includes(r[Math.floor(a/16)]||'#')});
function rfree(){for(let k=0;k<300;k++){const x=1+Math.floor(Math.random()*(S.W-2)),y=3+Math.floor(Math.random()*(S.H-5)),px=x*16+8,py=y*16+12;if(!SOL.includes(S.map[y][x])&&free(px,py)&&Math.hypot(px-S.x,py-S.y)>110)return[px,py]}return[S.W*8,64]}
function tick(){
 S.t++;
 if(!S.paused&&!S.man&&$('game').classList.contains('on')){
  let dx=(held.has('d')?1:0)-(held.has('a')?1:0),dy=(held.has('s')?1:0)-(held.has('w')?1:0);
  S.moving=!!(dx||dy);const ox=S.x,oy=S.y;
  if(S.moving){S.dir=dy<0?'u':dy>0?'d':dx<0?'l':'r';if(dx&&dy){dx*=.707;dy*=.707}
   const sp=1.7;if(free(S.x+dx*sp,S.y))S.x+=dx*sp;if(free(S.x,S.y+dy*sp))S.y+=dy*sp;if(S.tut)S.tut.mv+=Math.hypot(S.x-ox,S.y-oy)}
  S.gh.forEach(h=>{
   const d=Math.hypot(S.x-h.x,S.y-h.y)+.01;
   if(d<90){h.vx=(S.x-h.x)/d*.6;h.vy=(S.y-h.y)/d*.6}
   else if(--h.t<=0){const a=Math.random()*6.28;h.vx=Math.cos(a)*.4;h.vy=Math.sin(a)*.4;h.t=60+Math.random()*90}
   if(free(h.x+h.vx,h.y))h.x+=h.vx;else h.t=0;
   if(free(h.x,h.y+h.vy))h.y+=h.vy;else h.t=0;
   if(d<11&&!S.paused)ghostHit(h)});
  if(S.tut)tutCheck();
  if(S.rs.length&&S.sc!=='tut'&&S.t>S.rs[0]){S.rs.shift();const q=rfree();S.gh.push({x:q[0],y:q[1],vx:0,vy:0,t:0,q:genGhost(S.sc),r:S.sc==='hall'?null:S.sc})}}
 if(S.tut)$('tutp').style.visibility=S.paused||S.man?'hidden':'visible';
 S.near=objs().map(o=>[o,Math.hypot(S.x-(o.x+o.w/2),S.y-(o.y+o.h/2))]).filter(a=>a[1]<38).sort((a,b)=>a[1]-b[1]).map(a=>a[0])[0];
 draw();requestAnimationFrame(tick)}
const CH={robe:'#2f66e0',hat:'#5b2fc9',skin:'#f1c9a0',hair:'#4a2f14',hatS:0,face:0,outfit:0,staff:0};
function heroDraw(c,x,y,dir,st){
 const X=Math.round(x)-5,Y=Math.round(y)-15,u=dir==='u',sx=dir==='l'?-1:9,R=(a,b,w,h,col)=>{c.fillStyle=col;c.fillRect(X+a,Y+b,w,h)};
 R(1,14,8,2,'rgba(0,0,0,.3)');
 if(CH.staff==0){R(sx,5,1,10,'#8b5a2b');R(sx,4,1,1,'#7ff')}else if(CH.staff==1){R(sx,9,1,5,'#d8d8e8');R(sx,8,1,1,'#ffeb3b')}
 if(CH.outfit==3&&!u){R(0,8,10,7,'#8e1b2b');R(0,8,1,7,'#d12d3f');R(9,8,1,7,'#d12d3f')}
 R(3,5,4,3,u?CH.hair:CH.skin);
 if(CH.hatS==3)R(3,4,4,2,CH.hair);
 if(!u){R(3,5,4,1,CH.hair);R(3,6,1,1,'#111');R(6,6,1,1,'#111');
  if(CH.face==1){R(2,5,3,3,'#111');R(5,5,3,3,'#111');R(4,6,2,1,'#111');R(3,6,1,1,'#bfe9ff');R(6,6,1,1,'#bfe9ff');R(3,5,1,1,'#fff');R(6,5,1,1,'#fff')}
  else if(CH.face==3)R(3,7,4,1,CH.hair);else if(CH.face==4)R(2,5,3,2,'#111')}
 if(CH.hatS==0){R(4,0,2,2,CH.hat);R(3,2,4,2,CH.hat);R(1,4,8,1,CH.hat)}
 else if(CH.hatS==1){R(3,0,4,4,CH.hat);R(1,4,8,1,CH.hat)}
 else if(CH.hatS==2){R(3,3,4,2,'#f5c542');R(3,2,1,1,'#f5c542');R(5,2,1,1,'#f5c542');R(6,2,1,1,'#f5c542')}
 R(2,8,6,5,CH.robe);if(!u)R(2,10,6,1,'#f5c542');
 if(CH.outfit==1)R(2,12,6,1,'#f5c542');if(CH.outfit==3&&!u)R(2,8,6,1,'#f5c542');
 if(CH.outfit==2){R(3,9,1,1,'#ffe66d');R(6,11,1,1,'#ffe66d');R(4,12,1,1,'#ffe66d')}
 if(CH.outfit==3&&u){R(0,8,10,7,'#8e1b2b');R(4,8,2,7,'#d12d3f');R(2,8,6,1,'#f5c542')}
 if(!u&&CH.face==2)R(3,8,4,2,'#e8e8e8');
 R(2,13,2,1+st,'#1b1b2e');R(6,13,2,2-st,'#1b1b2e')}
function hero(x,y){heroDraw(p,x,y,S.dir,S.moving?(S.t>>3)%2:0)}
function draw(){
 S.cx=Math.round(cam(S.x,VW,S.W*16));S.cy=Math.round(cam(S.y,VH,S.H*16));
 p.fillStyle='#07040f';p.fillRect(0,0,VW,VH);
 p.save();p.translate(-S.cx,-S.cy);
 p.drawImage(S.bg,0,0);dynDraw();
 S.tor.forEach((x,i)=>{const f=(S.t>>3)+i;p.fillStyle='rgba(255,180,60,.10)';p.fillRect(x-14,20,28,28);p.fillStyle='#3a2410';p.fillRect(x-1,34,2,7);p.fillStyle=f%2?'#ff9a1f':'#ffd23f';p.fillRect(x-2,29,4,5+f%2)});
 objs().forEach(o=>{
  const cx=o.x+o.w/2,cy=o.y+o.h/2;
  if(o.t==='door'){const open=S.open[o.i];
   p.fillStyle='#2b1a0c';p.fillRect(o.x-2,o.y-2,o.w+4,o.h+2);
   if(open){p.fillStyle='#07040f';p.fillRect(o.x,o.y,o.w,o.h);p.fillStyle='#6b4423';p.fillRect(o.x,o.y,6,o.h)}
   else{p.fillStyle='#7a4d26';p.fillRect(o.x,o.y,o.w,o.h);p.fillStyle='#5a3a1e';for(let k=8;k<o.w;k+=8)p.fillRect(o.x+k,o.y,1,o.h);p.fillStyle='#c9a227';p.fillRect(o.x,o.y+8,o.w,1);p.fillRect(o.x,o.y+22,o.w,1)}
   pi(p,ROOMS[o.i].ic,cx,8,16);
   if(!open)pi(p,'lock',cx,cy,16);else if(S.done[o.i])pi(p,'check',cx,cy,16)}
  else if(o.t==='main'){p.fillStyle='#1a1a22';p.fillRect(o.x-2,o.y,o.w+4,o.h);p.fillStyle='#3b3b4a';p.fillRect(o.x,o.y+4,o.w,o.h);pi(p,S.done.every(Boolean)?'unlock':'lock',cx,cy+2,16)}
  else if(o.t==='puz'){p.fillStyle='#4b3f7a';p.fillRect(o.x-2,o.y+9,o.w+4,8);p.fillStyle='#6d5fb0';p.fillRect(o.x-2,o.y+9,o.w+4,2);pi(p,S.done[o.i]?'check':(ROOMS[o.i]||ROOMS[0]).ic,cx,cy+Math.round(Math.sin(S.t/20)*1.5),16)}
  else{p.fillStyle='#2b1a0c';p.fillRect(o.x-2,o.y,o.w+4,o.h);p.fillStyle='#4a3520';p.fillRect(o.x,o.y+4,o.w,o.h);pi(p,'door',cx,cy+2,16)}
  if(o===S.near&&!S.paused){p.strokeStyle='#f5c542';p.lineWidth=1;p.strokeRect(o.x-2.5,o.y-2.5,o.w+5,o.h+5)}
 });
 if(S.tut&&(S.t>>4)%2){const o=objs().find(x=>x.t===(S.tut.step===1?'puz':S.tut.step===3?'door':''));if(o){p.strokeStyle='#ffe66d';p.lineWidth=2;p.strokeRect(o.x-4,o.y-4,o.w+8,o.h+8)}}
 S.gh.forEach(h=>{p.globalAlpha=.88;pi(p,'ghost',h.x,h.y-8+Math.round(Math.sin((S.t+h.x)/10)*2),16);p.globalAlpha=1});
 hero(S.x,S.y);
 if(S.fx){const f=S.fx,k=++f.t/30;pi(p,'key',f.sx+(f.tx-f.sx)*k,f.sy+(f.ty-f.sy)*k-Math.sin(k*3.14)*10,16);if(f.t>=30)S.fx=null}
 p.restore();
 g.drawImage(pxc,0,0,VW*SC,VH*SC);
 if(S.tut){const tp=$('tutp'),px=(S.x-S.cx)*SC;if(px<innerWidth/2){tp.style.right='12px';tp.style.left='auto'}else{tp.style.left='12px';tp.style.right='auto'}}
 g.textAlign='center';g.textBaseline='middle';
 if(S.near&&!S.paused){const qx=(S.x-S.cx)*SC,qy=(S.y-S.cy-34)*SC+SC*4;g.fillStyle='#f5c542';g.fillRect(qx-14,qy,28,26);g.fillStyle='#241a45';g.font='bold 18px Georgia';g.fillText('Q',qx,qy+14)}
 const hk=S.sc==='tut'?(S.tut&&S.tut.step===5?'g':null):level===2?'g':(typeof S.sc==='number'?S.sc:null);
 if(hk!=null){const n=S.lv[hk],mx=level===1?2:3;for(let i=0;i<mx;i++)g.drawImage(ICO[i<n?'heart':'heartE'],10+i*40,10,32,32)}
 if(S.held!=null){g.fillStyle='#000a';g.fillRect(10,54,96,38);g.strokeStyle='#f5c542';g.strokeRect(10,54,96,38);g.drawImage(ICO.key,16,59,28,28);g.drawImage(ICO[ROOMS[S.held].ic],62,59,28,28)}
}
function toast(en,es){const t=(ES&&level===0&&es)?es:en,e=$('toast');e.textContent=t;e.style.display='block';clearTimeout(toast.h);toast.h=setTimeout(()=>e.style.display='none',3600)}
function interact(){
 const o=S.near;if(!o)return;
 if(o.t==='door'){const i=o.i;
  if(S.sc==='tut'){if(S.open[i])return toast('The door is open. Great! Now finish the tutorial.','La puerta está abierta. ¡Bien! Ahora termina el tutorial.');if(S.held!==i&&!S.keys[i])return toast('This door is locked. First visit the stand to get a key.','La puerta está cerrada. Primero visita el pedestal para obtener una llave.')}
  if(S.open[i]){go(i,SZ[i][0]*8,(SZ[i][1]-2)*16-22);return}
  if(S.held===i){S.open[i]=1;S.keys[i]=0;S.held=null;S.fx={t:0,sx:S.x,sy:S.y-10,tx:o.x+o.w/2,ty:o.y+o.h/2};sfx('key');return toast('The key fits! The door opens. Press Q again to go in.','¡La llave encaja! La puerta se abre. Presiona Q otra vez para entrar.')}
  if(S.held!=null)return toast('This key does not fit this door.','Esta llave no encaja en esta puerta.');
  if(S.keys[i])return toast('You have the key, but not in your hand. Press E and choose the key.','Tienes la llave, pero no en la mano. Presiona E y elige la llave.');
  return toast('This door is closed. Finish the last room to get the key.','La puerta está cerrada. Termina la sala anterior para obtener la llave.')}
 if(o.t==='exit'){const i=S.sc;go('hall',(DOORC[i]+1)*16,64)}
 else if(o.t==='puz'){if(S.sc==='tut')return startTutPuzzle();S.done[o.i]?toast('You already did this puzzle.','Ya hiciste este acertijo.'):startPuzzle(o.i)}
 else if(o.t==='main'){if(!S.done.every(Boolean))toast('The door is closed. Finish the four rooms first.','La puerta está cerrada. Termina primero las cuatro salas.');else S.fin?openKeypad():startFinal()}
}

// ---------- Puzzles ----------
function startPuzzle(i){S.qctx=ROOMS[i];S.lifeKey=i;S.gl=false;S.qs=genMain(i);S.qi=0;S.qend=()=>finish(i);showQ()}
function startFinal(){S.qctx=FC;S.lifeKey='f';S.gl=false;S.qs=genFinal();S.qi=0;S.qend=()=>{$('qm').classList.remove('on');S.fin=true;toast('Great! Now the door asks for the code.','¡Bien! Ahora la puerta pide el código.');openKeypad()};showQ()}
function ghostHit(h){if(S.tut)return tutGhostNote(h);S.qctx=h.r==null?GH:ROOMS[h.r];S.lifeKey=h.r==null?null:h.r;S.gl=true;S.qs=[h.q];S.qi=0;
 S.qend=()=>{S.gh=S.gh.filter(z=>z!==h);S.ghd++;S.rs.push(S.t+1500);if(S.tut&&S.tut.step===4)tutGo(5);$('qm').classList.remove('on');S.paused=false;toast('You beat the ghost!','¡Venciste al fantasma!')};showQ()}
const hearts=()=>{const n=S.lv[lk(S.lifeKey)],mx=level===1?2:3;let h='';for(let i=0;i<mx;i++)h+=IMG(i<n?'heart':'heartE',22);return h};
function showQ(keep){
 const R=S.qctx,q=S.qs[S.qi],k=q.k,si=q.st!==undefined?q.st:R.st,tr=ES&&level===0,typed=keep&&$('wi')?$('wi').value:'';
 if(!keep){
  $('qbox').innerHTML=`<div class="qtop">${level===0?`<button class="ib sm tbtn" aria-label="Hold to translate" title="Hold to see Spanish" oncontextmenu="return false">${SWAP}</button>`:'<span></span>'}<div id="lf">${S.lifeKey!=null?hearts():''}</div><button class="ib sm" onclick="goHome()" aria-label="Back to start" title="Back to start"><svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M3 11l9-8 9 8v10h-6v-6H9v6H3z" fill="currentColor"/></svg></button></div><div id="qb"></div>`;
  S.ord=[0,1,2,3].sort(()=>Math.random()-.5);S.paused=true;$('qm').classList.add('on');S.t0=performance.now();musicHold(false)}
 let h=`<div class="tp">${tr&&R.tes?R.tes:R.topic}</div>`;
 if(level<2&&si!==undefined&&k!=='S'&&!q.say)h+=`<div class="st"><b>${tr?'Estructura':'Structure'}</b>\n${STR[si][level][tr?1:0]}</div>`;
 if(q.say||k==='S')h+=`<button class="ib sm" onclick="say()" aria-label="Listen">${IMG('speaker',24)}</button>`;
 h+=`<p class="qt">${tr&&q.es?q.es:q.q}</p>`;
 if(k==='S')h+=`<p class="qt say">${q.t}</p><button class="ib big" onclick="rec()" aria-label="Speak">${IMG('mic',48)}</button><div id="heard"></div><div id="fbk" style="display:none;gap:8px;align-items:center;justify-content:center;width:100%"><input id="wi" autocomplete="off" placeholder="${T('Type it here','Escríbela aquí')}"><button class="ib sm" onclick="sub()" aria-label="Confirm">${IMG('check',24)}</button></div>`;
 else if(k==='M'){const O=q.o;h+=S.ord.map((o,j)=>`<button class="opt" onclick="pick(${j},this)">${O[o]}</button>`).join('')}
 else h+=`<input id="wi" autocomplete="off"><button class="ib sm" onclick="sub()" aria-label="Confirm">${IMG('check',24)}</button>`;
 h+=`<div id="fb"></div><div>${S.qs.map((_,j)=>j<S.qi?'●':'○').join(' ')}</div>`;
 $('qb').innerHTML=h;if(typed&&$('wi')){$('wi').value=typed;if(k==='S')$('fbk').style.display='flex'}
 if(!keep){if(q.say)say();else if(k==='W')setTimeout(()=>$('wi')&&$('wi').focus(),50)}}
let HT=0;
function musicHold(on){if(!AC)return;MH=on;mg.gain.cancelScheduledValues(AC.currentTime);mg.gain.setTargetAtTime(on?0:MV*.25,AC.currentTime,on?.1:.5)}
function say(){if(!window.speechSynthesis)return;const q=S.qs[S.qi];speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(q.say||q.t),tk=++HT;u.lang='en-US';u.rate=VR;
 u.onstart=()=>musicHold(true);u.onend=u.onerror=()=>{if(tk===HT)musicHold(false)};musicHold(true);setTimeout(()=>{if(tk===HT)musicHold(false)},20000);speechSynthesis.speak(u)}
const NUMW={'1':'one','2':'two','3':'three','4':'four','5':'five','6':'six','7':'seven','8':'eight','9':'nine','10':'ten','100':'one hundred','500':'five hundred','1950':'nineteen fifty'};
const wd=t=>t.toLowerCase().replace(/\d+/g,m=>' '+(NUMW[m]||m)+' ').replace(/'/g,'').replace(/[^a-z ]/g,' ').split(/\s+/).filter(Boolean);
function lev(a,b){const d=Array.from({length:a.length+1},(_,i)=>[i]);for(let j=1;j<=b.length;j++)d[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[a.length][b.length]}
const near=(a,b)=>a===b||(a.length>3&&b.length>3&&lev(a,b)<=1)||(a.length>6&&b.length>6&&lev(a,b)<=2);
function heardOk(t,target){const a=wd(t),b=wd(target);if(!a.length||!b.length)return false;const used=new Set();let hit=0;b.forEach(w=>{const i=a.findIndex((x,k)=>!used.has(k)&&near(x,w));if(i>=0){used.add(i);hit++}});return hit/b.length>=.7}
function envHint(){let fr=false;try{fr=window.top!==window.self}catch(e){fr=true}
 return fr?T('The game is inside a frame. Open it in its own browser tab.','El juego está dentro de un marco. Ábrelo en su propia pestaña del navegador.'):location.protocol==='file:'?T('Voice can be blocked on a saved file. Try the web link in Chrome.','La voz puede estar bloqueada en un archivo guardado. Prueba el enlace web en Chrome.'):''}
function rec(){
 const SR=window.SpeechRecognition||window.webkitSpeechRecognition,hd=$('heard'),fk=()=>{$('fbk').style.display='flex'},q0=S.qs[S.qi],target=q0.t;
 if(!SR){hd.textContent=T('Your browser has no speech recognition. Use Chrome or Edge, or type the sentence.','Tu navegador no tiene reconocimiento de voz. Usa Chrome o Edge, o escribe la oración.');fk();return}
 if(S.mfk!==q0){S.mfk=q0;S.mf=0}
 try{S.rec&&S.rec.abort()}catch(e){}
 if(window.speechSynthesis)speechSynthesis.cancel();
 const tk=++HT;musicHold(true);
 const r=S.rec=new SR();let best='',done=false;
 r.lang='en-US';r.interimResults=true;r.maxAlternatives=3;r.continuous=false;
 const miss=()=>{S.mf++;if(S.mf>=2)fk()};
 hd.textContent=T('Starting the microphone...','Iniciando el micrófono...');
 r.onstart=()=>{hd.textContent=T('Listening... speak now','Escuchando... habla ahora')};
 r.onresult=e=>{let txt='',alts=[],fin=false;
  for(let i=e.resultIndex;i<e.results.length;i++){const R=e.results[i];txt+=R[0].transcript;if(R.isFinal){fin=true;alts=Array.from(R).map(a=>a.transcript)}}
  best=txt||best;hd.textContent=T('I heard: "','Escuché: "')+best+'"';
  if(fin&&!done){done=true;res(alts.some(t=>heardOk(t,target))||heardOk(best,target))}};
 r.onerror=e=>{const c=e.error;
  if(c==='no-speech'||c==='aborted'){hd.textContent=T('I did not hear you. Try again.','No te escuché. Intenta de nuevo.');miss();return}
  fk();
  if(c==='not-allowed'||c==='service-not-allowed'){
   hd.textContent=T('Voice is blocked here ('+c+'). ','La voz está bloqueada aquí ('+c+'). ')+envHint();
   if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)navigator.mediaDevices.getUserMedia({audio:true}).then(m=>{m.getTracks().forEach(t=>t.stop());hd.textContent=T('The microphone works, but speech recognition is blocked. ','El micrófono funciona, pero el reconocimiento de voz está bloqueado. ')+envHint()}).catch(()=>{hd.textContent=T('The microphone is blocked for this page. Allow it in the browser address bar. ','El micrófono está bloqueado para esta página. Permítelo en la barra de direcciones del navegador. ')+envHint()});
   return}
  hd.textContent=c==='network'?T('Voice needs internet. Type the sentence.','La voz necesita internet. Escribe la oración.'):c==='audio-capture'?T('No microphone found. Type the sentence.','No se encontró micrófono. Escribe la oración.'):T('Voice problem ('+c+'). Try again or type the sentence.','Problema de voz ('+c+'). Intenta de nuevo o escribe la oración.');
  if(c!=='network'&&c!=='audio-capture')miss()};
 r.onend=()=>{if(tk===HT)musicHold(false);
  if(!done&&best){done=true;res(heardOk(best,target))}
  else if(!done&&/Listening|Escuchando|Starting|Iniciando/.test(hd.textContent)){hd.textContent=T('I did not hear you. Try again.','No te escuché. Intenta de nuevo.');miss()}};
 try{r.start()}catch(e){hd.textContent=T('The microphone does not work. Type the sentence.','El micrófono no funciona. Escribe la oración.');fk();musicHold(false)}}
function pick(j,b){const ok=S.ord[j]===S.qs[S.qi].a;res(ok);if(!ok&&b)b.disabled=true}
function sub(){const w=$('wi');if(!w)return;const q=S.qs[S.qi],n=t=>t.toLowerCase().replace(/[^a-z ]/g,'').replace(/\s+/g,' ').trim();res(q.k==='S'?heardOk(w.value,q.t):q.a.includes(n(w.value)))}
function res(ok){
 if(S.lock)return;
 const R=S.qctx,now=performance.now();
 S.log.push({topic:S.gl?'Ghosts':R.topic,ok:ok?1:0,time:+((now-S.t0)/1000).toFixed(2)});S.t0=now;
 const fb=$('fb');
 if(!ok){sfx('bad');
  if(S.lifeKey!=null){const k=lk(S.lifeKey);S.lv[k]--;$('lf').innerHTML=hearts();if(S.lv[k]<=0){gameOver();return}}
  {const w=$('wi');if(w){w.value='';w.focus()}}fb.innerHTML=IMG('cross',16)+' '+T('Try again!','¡Intenta de nuevo!');fb.className='bad';const b=$('qbox');b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake');return}
 sfx('good');fb.innerHTML=IMG('check',16)+' '+T('Correct!','¡Correcto!');fb.className='good';S.lock=true;
 const sid=S;setTimeout(()=>{S.lock=false;if(S!==sid||!$('game').classList.contains('on'))return;S.qi++;S.qi<S.qs.length?showQ():S.qend()},700)}
function gameOver(){S.dead=true;S.paused=true;S.lock=false;musicHold(false);$('qm').classList.remove('on');$('gv').classList.add('on')}
function finish(i){
 S.done[i]=1;if(i<3)S.keys[i+1]=true;sfx('key');
 $('qm').classList.remove('on');S.paused=false;
 toast(i<3?`You got a key! Press E and take the key in your hand. Your number: ${S.dig[i]}`:`Last room done! Your number: ${S.dig[i]}. Go to the main door for the final challenge.`,
  i<3?`¡Obtuviste una llave! Presiona E y toma la llave en tu mano. Tu número: ${S.dig[i]}`:`¡Última sala lista! Tu número: ${S.dig[i]}. Ve a la puerta principal para el desafío final.`)}

// ---------- Inventory & code ----------
function openInv(){
 S.paused=true;
 $('ibox').innerHTML=`<div>${IMG('bag',32)}</div>
 <div class="row">${[1,2,3].map(i=>S.keys[i]?`<button class="slot has ${S.held===i?'eq':''}" onclick="equip(${i})" aria-label="Key">${IMG('key',24)}<small>${IMG(ROOMS[i].ic,16)}</small></button>`:`<div class="slot">${S.open[i]?IMG('unlock',24):'·'}<small>${IMG(ROOMS[i].ic,16)}</small></div>`).join('')}</div>
 <div class="row">${S.done.map((d,i)=>`<div class="slot ${d?'has':''}">${d?S.dig[i]:'?'}<small>${IMG(ROOMS[i].ic,16)}</small></div>`).join('')}</div>
 <button class="ib sm" onclick="closeInv()" aria-label="Close">${IMG('cross',24)}</button>`;
 $('inv').classList.add('on')}
function equip(i){S.held=S.held===i?null:i;closeInv();toast(S.held===i?'Key in hand. Go to the door and press Q.':'You put the key away.',S.held===i?'Llave en mano. Ve a la puerta y presiona Q.':'Guardaste la llave.')}
function closeInv(){$('inv').classList.remove('on');S.paused=false}
function openKeypad(){S.paused=true;$('kp').classList.add('on');$('ci').value='';$('cf').textContent='';setTimeout(()=>$('ci').focus(),50)}
$('cx').onclick=()=>{$('kp').classList.remove('on');S.paused=false};
$('cok').onclick=tryCode;
function tryCode(){
 if($('ci').value===S.dig.join('')){$('kp').classList.remove('on');endGame()}
 else{sfx('bad');$('cf').innerHTML=IMG('cross',24);const b=$('kbox');b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake')}}

// ---------- Ending + Danfo.js ----------
const ALL=[...ROOMS,GL,FC];
function analyze(){
 const rows=S.log.map(r=>[r.topic,r.ok,r.time]);
 const out={total:rows.length,ok:0,avg:0,by:[],danfo:false};
 const manual=()=>{out.ok=rows.reduce((a,r)=>a+r[1],0);out.avg=rows.reduce((a,r)=>a+r[2],0)/rows.length;
  out.by=ALL.map(R=>{const s=rows.filter(r=>r[0]===R.topic);return{R,n:s.length,ok:s.reduce((a,r)=>a+r[1],0),t:s.reduce((a,r)=>a+r[2],0)/(s.length||1)}})};
 try{
  const df=new dfd.DataFrame(rows,{columns:['topic','ok','time']});
  out.total=df.shape[0];out.ok=df['ok'].sum();out.avg=df['time'].mean();
  out.by=ALL.map(R=>{try{const s=df.query(df['topic'].eq(R.topic));return{R,n:s.shape[0],ok:s['ok'].sum(),t:s['time'].mean()}}catch(e){return{R,n:0,ok:0,t:0}}});
  out.danfo=true;
 }catch(e){manual()}
 return out}
function endGame(){
 S.paused=true;const a=analyze();sfx('win');musicHold(true);setTimeout(()=>musicHold(false),3300);
 const acc=Math.round(100*a.ok/a.total);
 $('ecard').innerHTML=`<div class="big">You escaped!</div>
 <div class="kpis">
  <div class="kpi">${IMG('clock',24)}<b>${a.avg.toFixed(1)}s</b><small>Time per answer</small></div>
  <div class="kpi">${IMG('check',24)}<b>${a.ok}</b><small>Right</small></div>
  <div class="kpi">${IMG('cross',24)}<b>${a.total-a.ok}</b><small>Wrong</small></div>
  <div class="kpi">${IMG('target',24)}<b>${acc}%</b><small>Success</small></div></div>
 <div class="row">${IMG('ghost',24)} Ghosts beaten: ${S.ghd}</div>
 ${a.by.filter(b=>b.n).map(b=>`<div class="bar"><span class="bn">${b.R.topic}</span><i><s style="width:${Math.round(100*b.ok/(b.n||1))}%"></s></i><span>${b.ok}/${b.n} · ${b.t.toFixed(1)}s</span></div>`).join('')}
 <button class="ib big" style="align-self:center" onclick="home()" aria-label="Home"><svg viewBox="0 0 24 24" width="44" height="44" aria-hidden="true"><path d="M3 11l9-8 9 8v10h-6v-6H9v6H3z" fill="currentColor"/></svg></button>`;
 show('end');anim.on=true;anim.t=0;anim.loop()}
function home(){anim.on=false;show('menu')}
const anim={on:false,t:0,loop(){
 if(!anim.on)return;
 const c=$('ec'),w=c.width=innerWidth,h=c.height=innerHeight,x=c.getContext('2d');anim.t++;
 const gr=x.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#0b0720');gr.addColorStop(.6,'#3b2a7a');gr.addColorStop(1,'#120c24');x.fillStyle=gr;x.fillRect(0,0,w,h);
 x.fillStyle='#fff';for(let i=0;i<60;i++){x.globalAlpha=.4+.6*Math.abs(Math.sin(anim.t/30+i));x.fillRect((i*137)%w,(i*71)%(h*.5),2,2)}x.globalAlpha=1;
 x.fillStyle='#f4efd0';x.beginPath();x.arc(w*.75,h*.16,Math.min(w,h)*.07,0,7);x.fill();
 x.fillStyle='#160f33';x.beginPath();x.moveTo(0,h);x.lineTo(0,h*.62);for(let i=0;i<=w;i+=20)x.lineTo(i,h*.6-Math.sin(i/90)*h*.03);x.lineTo(w,h);x.fill();
 x.fillStyle='#2b2250';x.beginPath();x.moveTo(w*.49,h*.6);x.lineTo(w*.51,h*.6);x.lineTo(w*.78,h);x.lineTo(w*.22,h);x.fill();
 x.fillStyle='#ffd98a';x.globalAlpha=.5+.3*Math.sin(anim.t/15);x.fillRect(w*.5-4,h*.6-3,8,3);x.globalAlpha=1;
 const k=(anim.t%480)/480,s=(1-.75*k)*Math.max(5,h/80),X=w*.5+Math.sin(anim.t/40)*w*.01*(1-k),Y=h*(.95-.33*k)+Math.sin(anim.t/4)*s*.25;
 const r=(dx,dy,ww,hh,col)=>{x.fillStyle=col;x.fillRect(X+dx*s,Y+dy*s,ww*s,hh*s)};
 const st=Math.floor(anim.t/8)%2;
 r(-4,0,8,.6,'rgba(0,0,0,.35)');
 r(4,-9,1,9,'#8b5a2b');r(4,-10,1,1,'#7ff');
 r(-1,-15,2,2,CH.hat);r(-2,-13,4,2,CH.hat);r(-4,-11,8,1,CH.hat);
 r(-2,-10,4,3,CH.hair);
 r(-3,-7,6,6,CH.robe);r(-1,-7,1,6,'rgba(0,0,0,.25)');
 r(-2,-1,2,1+st,'#1b1b2e');r(0,-1,2,2-st,'#1b1b2e');
 requestAnimationFrame(anim.loop)}};
(function(){
 const c=$('mbg'),x=c.getContext('2d'),W=320,H=180;
 const R=(a,b,w,h,col)=>{x.fillStyle=col;x.fillRect(a,b,w,h)};
 for(let i=0;i<14;i++)R(0,i*10,W,10,`hsl(${255+i*2},${55-i}%,${8+i*2.2}%)`);
 for(let i=0;i<70;i++)R((i*97)%W,(i*53)%90,1,1,i%5?'#fff':'#ffd98a');
 x.fillStyle='#f4efd0';x.beginPath();x.arc(262,32,13,0,7);x.fill();
 for(let i=0;i<W;i++)R(i,Math.round(128+Math.sin(i/28)*6+Math.sin(i/9)*2),1,H,'#1a1240');
 const wall='#2a1f55',dark='#1d1540',lit='#ffd98a';
 const tower=(cx,top,w,rh)=>{R(cx-w/2,top,w,152-top,wall);R(cx-w/2,top,1,152-top,'#3a2c72');R(cx+w/2-1,top,1,152-top,dark);
  for(let r=0;r<rh;r++){const hw=Math.round((w/2+2)*(1-r/rh));R(cx-hw,top-1-r,hw*2,1,r%2?'#5b2fc9':'#6d3fd1')}
  for(let y=top+8;y<140;y+=18)R(cx-1,y,3,5,lit)};
 tower(160,40,30,34);
 R(96,92,128,60,wall);R(96,92,128,1,'#3a2c72');for(let k=96;k<224;k+=8)R(k,88,4,4,wall);
 for(let k=108;k<216;k+=16){if(k>140&&k<176)continue;R(k,104,4,7,lit);R(k,124,4,7,lit)}
 R(148,118,24,34,'#0f0a22');R(150,124,20,28,'#ffb84d');R(159,124,2,28,'#7a4d26');
 tower(78,66,26,26);tower(242,66,26,26);tower(40,104,18,16);tower(280,104,18,16);
 R(0,152,W,28,'#0c0818');
 for(let y=152;y<H;y++){const hw=Math.round(12+(y-152)*1.2);R(160-hw,y,hw*2,1,'#241a45')}
 [18,300,52,268].forEach(t=>{R(t-1,142,2,10,'#120c24');for(let r=0;r<16;r++)R(Math.round(t-r/2),128+r,r+1,1,'#0f0a22')});
})();
function menuReset(){$('mpn').classList.remove('on');$('bpz').style.display='';$('bpl').style.display='none'}
function setMan(on,ov){
 if(on&&!S.man){S.man=true;S.pp=S.paused;S.pt=performance.now();S.paused=true;held.clear();if(window.speechSynthesis)speechSynthesis.cancel();try{S.rec&&S.rec.abort()}catch(e){}}
 else if(!on&&S.man){S.man=false;S.paused=S.pp;if(S.t0)S.t0+=performance.now()-S.pt}
 const z=S.man&&ov==='pz';
 $('pz').classList.toggle('on',z);$('hp').classList.toggle('on',S.man&&ov==='hp');$('sp').classList.toggle('on',S.man&&ov==='sp');
 $('bpz').style.display=z?'none':'';$('bpl').style.display=z?'':'none'}
$('mbtn').onclick=()=>$('mpn').classList.toggle('on');
$('bpz').onclick=()=>setMan(true,'pz');
$('bpl').onclick=$('pzp').onclick=()=>setMan(false);
$('bhelp').onclick=()=>{$('mpn').classList.remove('on');setMan(true,'hp')};
$('hx').onclick=()=>setMan(false);
$('brst').onclick=()=>newGame();
function goHome(){musicHold(false);S.man=false;S.lock=false;if(window.speechSynthesis)speechSynthesis.cancel();try{S.rec&&S.rec.abort()}catch(e){}['qm','inv','kp','pz','hp','gv','sp'].forEach(i=>$(i).classList.remove('on'));menuReset();anim.on=false;show('menu')}
$('bhome').onclick=goHome;
const fsFail=()=>{$('mpn').classList.remove('on');toast('Full screen is blocked here. Press F11 or open the game file in your browser.','La pantalla completa está bloqueada aquí. Presiona F11 o abre el archivo del juego en tu navegador.')};
$('bfs').onclick=()=>{const d=document,e=d.documentElement,on=d.fullscreenElement||d.webkitFullscreenElement;try{const r=on?(d.exitFullscreen||d.webkitExitFullscreen).call(d):(e.requestFullscreen||e.webkitRequestFullscreen).call(e);if(r&&r.catch)r.catch(fsFail)}catch(x){fsFail()}};

// ---------- customize + intro ----------
const COL={robe:['#2f66e0','#c0392b','#27ae60','#8e44ad','#e67e22','#16a085'],hat:['#5b2fc9','#c0392b','#2f66e0','#27ae60','#e67e22','#222233'],skin:['#f8d9bd','#f1c9a0','#d9a066','#a86b3c','#6b4226'],hair:['#4a2f14','#1b1b1b','#c9a227','#c0392b','#e8e8e8']};
const NM={robe:['Robe color','Color de túnica'],hat:['Hat color','Color de sombrero'],skin:['Skin','Piel'],hair:['Hair color','Color de pelo']};
const OPT=[['Hat style','Sombrero','hatS',['Wizard hat','Top hat','Crown','No hat'],['Sombrero de mago','Sombrero de copa','Corona','Sin sombrero']],
 ['Face','Cara','face',['Nothing','Glasses','Beard','Mustache','Eye patch'],['Nada','Gafas','Barba','Bigote','Parche']],
 ['Outfit','Ropa','outfit',['Plain robe','Gold trim','Stars','Red cape'],['Túnica lisa','Borde dorado','Estrellas','Capa roja']],
 ['Item','Objeto','staff',['Staff','Wand','Nothing'],['Bastón','Varita','Nada']]];
let CT=false,TL=false,TI=0;
const CHL='<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',CHR='<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
function buildCust(){
 const L=CT&&level===0?1:0;
 $('ctitle').textContent=L?'Crea tu mago':'Make your wizard';$('ctl').style.visibility=level===0?'visible':'hidden';
 $('crows').innerHTML=Object.keys(COL).map(k=>`<div class="crow"><span>${NM[k][L]}</span>${COL[k].map(c=>`<button class="sw${CH[k]===c?' on':''}" style="background:${c}" onclick="setCh('${k}','${c}')" aria-label="${NM[k][L]}"></button>`).join('')}</div>`).join('')+
  OPT.map(o=>`<div class="crow"><span>${o[L]}</span><button class="ib sm" onclick="stepCh('${o[2]}',-1,${o[3].length})" aria-label="Previous">${CHL}</button><span class="nm">${(L?o[4]:o[3])[CH[o[2]]]}</span><button class="ib sm" onclick="stepCh('${o[2]}',1,${o[3].length})" aria-label="Next">${CHR}</button></div>`).join('');
 const c=$('cpv'),x=c.getContext('2d');x.clearRect(0,0,16,20);heroDraw(x,8,19,'d',0)}
$('ctl').onclick=()=>{CT=!CT;buildCust()};
function setCh(k,c){CH[k]=c;buildCust()}
function stepCh(k,d,n){CH[k]=(CH[k]+d+n)%n;buildCust()}
const STORY=[
 ["You are a student at Mystic Academy. Tonight, the Great Wizard closed all the doors with a spell.","Eres estudiante de la Mystic Academy. Esta noche, el gran mago cerró todas las puertas con un hechizo."],
 ["There are four rooms. Solve the puzzles in each room. When you solve them, you get a key in each room to enter the next room. You also get a secret number to escape. Press E to take the keys and press Q to enter the rooms.","Hay cuatro habitaciones. Resuelve los acertijos de cada una. Al lograrlo, recibirás una llave en cada habitación que te permitirá ingresar a la siguiente. También recibirás un número secreto que te servirá para escapar. Presiona E para tomar las llaves y Q para ingresar en las habitaciones."]];
const LIVES=[["You have 3 lives in each room. If you lose all your lives, you start again.","Tienes 3 vidas por habitación. Si pierdes todas, empiezas de nuevo."],["You have 2 lives in each room. If you lose all your lives, you start again.","Tienes 2 vidas por habitación. Si pierdes todas, empiezas de nuevo."],["You have 3 lives. If you lose all your lives, you start again.","Tienes 3 vidas. Si pierdes todas, empiezas de nuevo."]];
const STORY2=[["There are ghosts in the academy. If a ghost catches you, you answer a question to get free.","Hay fantasmas en la academia. Si uno te atrapa, respondes una pregunta para liberarte."],["After you solve all the puzzles in the rooms, there is a final challenge. After you solve it, type the code on the main door and escape.","Luego de resolver todos los acertijos de las habitaciones, hay un desafío final. Luego de resolverlo, escribe el código en la puerta principal y escapa."]];
function renderIntro(){
 const i=ES&&level===0?1:0;
 $('story').innerHTML=[...STORY,LIVES[level],...STORY2].map(t=>t[i]).join('<br><br>');
 $('itl').parentElement.style.display=level===0?'flex':'none'}
$('cok2').onclick=()=>startTutorial();
// hold the button = Spanish, release = English (basic level only)
function rerender(){if($('intro').classList.contains('on'))renderIntro();else if($('qm').classList.contains('on')&&S.qs)showQ(true)}
document.addEventListener('pointerdown',e=>{const b=e.target.closest&&e.target.closest('.tbtn');if(b&&level===0){e.preventDefault();ES=true;rerender()}});
['pointerup','pointercancel'].forEach(v=>document.addEventListener(v,()=>{if(ES){ES=false;rerender()}}));
addEventListener('blur',()=>{if(ES){ES=false;rerender()}});
const PLAYS='<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" style="display:block"><path d="M8.5 5v14l10-7z" fill="currentColor"/></svg>';
const KC=t=>t==='WASD'?t.split('').map(c=>`<span class="k">${c}</span>`).join(''):`<span class="k">${t}</span>`;
const TS=[
 [`Move! Use ${KC('WASD')} to walk around.`,`¡Muévete! Usa ${KC('WASD')} para caminar.`,0],
 [`Walk to the glowing stand and press ${KC('Q')} to start a puzzle.`,`Camina hasta el pedestal brillante y presiona ${KC('Q')} para empezar un acertijo.`,0],
 [`You got a key! Press ${KC('E')} to open your bag. Click the key to hold it in your hand.`,`¡Obtuviste una llave! Presiona ${KC('E')} para abrir tu mochila. Haz clic en la llave para tomarla en la mano.`,0],
 [`Now walk to the glowing door at the top and press ${KC('Q')} to open it.`,`Ahora camina hasta la puerta brillante de arriba y presiona ${KC('Q')} para abrirla.`,0],
 ['A ghost is here! Let it touch you.','¡Hay un fantasma! Deja que te toque.',0],
 [()=>'The hearts at the top are your lives. '+LIVES[level][0],()=>'Los corazones de arriba son tus vidas. '+LIVES[level][1],1],
 [`Use the menu button (three lines, top right) to pause, go home, change the sound and see the controls. <span class="nw">You can also press ${KC('Esc')}.</span>`,`Usa el botón de menú (tres líneas, arriba a la derecha) para pausar, volver al inicio, cambiar el sonido y ver los controles. <span class="nw">También puedes presionar ${KC('Esc')}.</span>`,1],
 ['Tutorial complete! Now the real game starts: solve the four rooms, win the final challenge and escape.','¡Tutorial completo! Ahora empieza el juego real: resuelve las cuatro habitaciones, supera el desafío final y escapa.',2]];
function startTutorial(){TL=CT&&level===0;newGame();S.tut={step:0,mv:0};go('tut',SZ.tut[0]*8,(SZ.tut[1]-3)*16);$('tutp').style.display='flex';tutRender();show('game');if(!running){running=true;tick()}}
function tutRender(){
 $('mbtn').style.display=S.tut.step<6?'none':'';if(S.tut.step<6)$('mpn').classList.remove('on');$('mbtn').classList.toggle('pulse',S.tut.step===6);
 const e=TS[S.tut.step],L=TL&&level===0?1:0,t=e[L],last=e[2];
 $('tlg').style.display=level===0?'flex':'none';$('tpe').classList.toggle('sel',!TL);$('tps').classList.toggle('sel',TL);
 $('tpt').innerHTML=typeof t==='function'?t():t;
 $('tpn').style.display=last?'flex':'none';$('tpk').style.display=last===2?'none':'flex';$('tpn').innerHTML=last===2?PLAYS:CHR;$('tpn').setAttribute('aria-label',last===2?'Start the game':'Next')}
function tutPlace(){
 const pn=$('tutp');if(!pn||pn.style.display==='none')return;
 const r=pn.getBoundingClientRect();if(!r.width)return;
 const w=r.width,h=r.height,top=r.top,rects=[[(S.x-S.cx)*SC-50,(S.y-S.cy)*SC-80,100,110]];
 const o=objs().find(x=>x.t===(S.tut.step===1?'puz':S.tut.step===3?'door':''));
 if(o)rects.push([(o.x-S.cx)*SC-8,(o.y-S.cy)*SC-8,o.w*SC+16,o.h*SC+16]);
 S.gh.forEach(g2=>rects.push([(g2.x-S.cx)*SC-24,(g2.y-S.cy)*SC-48,48,56]));
 const ov=left=>{const x=left?12:innerWidth-12-w;return rects.some(q=>!(x+w<q[0]||x>q[0]+q[2]||top+h<q[1]||top>q[1]+q[3]))};
 const cur=pn.classList.contains('l');
 if(ov(cur)&&!ov(!cur)&&S.t-(S.tut.sw||-999)>100){S.tut.sw=S.t;pn.classList.toggle('l')}}
function tutGo(n){S.tut.step=n;tutRender();sfx('good')}
function tutCheck(){const t=S.tut;
 if(t.step===0&&t.mv>=90)tutGo(1);
 else if(t.step===2&&S.held===1)tutGo(3);
 else if(t.step===3&&S.open[1]){tutGo(4);const q=rfree();S.gh.push({x:q[0],y:q[1],vx:0,vy:0,t:0,q:vocab(),r:null})}}
$('tpe').innerHTML='';const SKIP_='<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M4 5l8 7-8 7zM12 5l8 7-8 7z" fill="currentColor"/></svg>';
const FEN_='<svg viewBox="0 0 60 40" width="52" height="34" aria-hidden="true"><rect width="60" height="40" fill="#1f3a8a"/><path d="M0 0L60 40M60 0L0 40" stroke="#fff" stroke-width="8"/><path d="M0 0L60 40M60 0L0 40" stroke="#c8102e" stroke-width="3"/><path d="M30 0V40M0 20H60" stroke="#fff" stroke-width="12"/><path d="M30 0V40M0 20H60" stroke="#c8102e" stroke-width="7"/></svg>',FES_='<svg viewBox="0 0 60 40" width="52" height="34" aria-hidden="true"><rect width="60" height="40" fill="#c60b1e"/><rect y="10" width="60" height="20" fill="#ffc400"/></svg>';
$('tpe').innerHTML=FEN_;$('tps').innerHTML=FES_;$('tpk').innerHTML=SKIP_;
function tutNote(ic,en,es,ok){S.paused=true;S.lifeKey=null;S.tutModal=true;S.tn={ic,en,es,ok};tutNoteRender();$('qm').classList.add('on')}
function tutNoteRender(){
 const n=S.tn,L=TL&&level===0?1:0;
 $('qbox').innerHTML=`${level===0?`<div class="row"><button class="ib fl ${L?'':'sel'}" id="nfe" aria-label="English">${FEN_}</button><button class="ib fl ${L?'sel':''}" id="nfs" aria-label="Español">${FES_}</button></div>`:''}<div class="tic">${IMG(n.ic,48)}</div><p class="qt">${L?n.es:n.en}</p><button class="ib sm" id="tok" aria-label="Continue">${IMG('check',24)}</button>`;
 $('tok').onclick=()=>{S.tutModal=false;$('qm').classList.remove('on');S.paused=false;n.ok()};
 if($('nfe')){$('nfe').onclick=()=>{TL=false;tutNoteRender()};$('nfs').onclick=()=>{TL=true;tutNoteRender()}}}
function startTutPuzzle(){
 tutNote('book','You will have to answer 4 questions in each room. You will have to write, listen and read.','Deberás responder 4 preguntas en cada habitación. Deberás escribir, escuchar y leer.',
  ()=>{if(!S.keys[1]){S.keys[1]=true;if(S.tut&&S.tut.step<=2)tutGo(2);sfx('key');toast('You got a key! Press E to open your bag.','¡Obtuviste una llave! Presiona E para abrir tu mochila.')}})}
function tutGhostNote(h){
 tutNote('ghost','If a ghost catches you, you will have to answer a question to be free.','Si un fantasma te atrapa, deberás responder una pregunta para liberarte.',
  ()=>{S.gh=S.gh.filter(z=>z!==h);if(S.tut&&S.tut.step===4)tutGo(5)})}
$('tpe').onclick=()=>{TL=false;tutRender()};$('tps').onclick=()=>{TL=true;tutRender()};
$('tpn').onclick=()=>{if(TS[S.tut.step][2]===2)startGame();else tutGo(S.tut.step+1)};
$('tpk').onclick=()=>startGame();
// ---------- audio: generative music ----------
let AC,mg,sg,MB,MV=.5,SV=.7,VR=.9,stp=0,mus=0,MH=false,sec=0,prog=0,pat=0,lead=true,brk=false,ld=3;
const PR=[[[57,60,64],[53,57,60],[48,52,55],[55,59,62]],[[50,53,57],[58,62,65],[53,57,60],[57,61,64]],[[52,55,59],[48,52,55],[57,60,64],[55,59,62]],[[45,48,52],[50,53,57],[52,56,59],[45,48,52]],[[53,57,60],[55,59,62],[57,60,64],[52,55,59]]];
const PAT=[[0,1,2,1,0,2,1,2],[0,2,1,2,0,2,1,2],[0,1,2,3,2,1,0,1],[0,-1,1,-1,2,-1,1,-1]],SCALE=[0,2,4,7,9];
function audioInit(){
 if(AC){if(AC.state==='suspended')AC.resume();return}
 try{AC=new(window.AudioContext||window.webkitAudioContext)();mg=AC.createGain();mg.gain.value=MV*.25;mg.connect(AC.destination);sg=AC.createGain();sg.gain.value=SV;sg.connect(AC.destination);
  MB=AC.createGain();MB.connect(mg);const dl=AC.createDelay(),fb=AC.createGain();dl.delayTime.value=.45;fb.gain.value=.35;MB.connect(dl);dl.connect(fb);fb.connect(dl);dl.connect(mg);
  if(!mus)mus=setInterval(music,300)}catch(e){}}
function note(m,t,d,type,v,out){const o=AC.createOscillator(),g2=AC.createGain();o.type=type;o.frequency.value=440*Math.pow(2,(m-69)/12);g2.gain.setValueAtTime(0,t);g2.gain.linearRampToValueAtTime(v,t+.02);g2.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g2);g2.connect(out);o.start(t);o.stop(t+d+.05)}
function music(){
 if(!AC||AC.state!=='running'||MH)return;
 const s8=stp&7,bar=(stp>>3)&3,t=AC.currentTime;
 if((stp&31)==0){prog=(prog+1+Math.floor(Math.random()*(PR.length-1)))%PR.length;pat=Math.floor(Math.random()*PAT.length);lead=Math.random()<.7;brk=(++sec%4)==0}
 const c=PR[prog][bar];
 if(s8==0){note(c[0]-12,t,2.4,'sine',.7,MB);c.forEach(n=>note(n,t,2.4,'sine',.16,MB))}
 if(!brk){const k=PAT[pat][s8];if(k>=0)note(k<3?c[k]+12:c[0]+24,t,.5,'triangle',.4,MB)}
 if(lead&&!brk&&Math.random()<.45){ld=Math.max(0,Math.min(9,ld+rnd([-2,-1,1,2])));note(c[0]+12+SCALE[ld%5]+12*Math.floor(ld/5),t,.7,'sine',.28,MB)}
 stp++}
function sfx(kind){
 if(!AC)return;const t=AC.currentTime;
 if(kind==='win'){[[72,0,.25],[76,.16,.25],[79,.32,.25],[84,.48,.5],[79,.8,.2],[84,.96,.2],[88,1.12,1],[84,1.12,1],[79,1.12,1]].forEach(([m,d,l])=>note(m,t+d,l,'triangle',.22,sg));[[60,0],[64,.48],[67,1.12]].forEach(([m,d])=>note(m,t+d,1,'sine',.2,sg));return}
 ({good:[[76,0],[83,.1]],bad:[[50,0],[45,.14]],key:[[76,0],[83,.08],[88,.16]]})[kind].forEach(([m,d])=>note(m,t+d,.2,kind==='bad'?'sawtooth':'square',.15,sg))}
addEventListener('pointerdown',()=>{if(AC&&AC.state==='suspended')AC.resume()});
$('bset').onclick=()=>{$('mpn').classList.remove('on');setMan(true,'sp')};
$('sx').onclick=()=>setMan(false);
$('smu').oninput=e=>{MV=e.target.value/100;if(mg&&!MH)mg.gain.value=MV*.25};
$('ssf').oninput=e=>{SV=e.target.value/100;if(sg)sg.gain.value=SV};
$('svr').oninput=e=>{VR=e.target.value/100};
$('grs').onclick=()=>newGame();
$('ghm').onclick=goHome;
// ---------- no copying out, no pasting in ----------
(()=>{
 const isIn=t=>t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'),stop=e=>{e.preventDefault();e.stopPropagation()};
 ['copy','cut','paste','dragstart','drop','contextmenu'].forEach(n=>document.addEventListener(n,e=>{if((n==='copy'||n==='cut')&&e.clipboardData)e.clipboardData.setData('text/plain','');stop(e)},true));
 document.addEventListener('selectstart',e=>{if(!isIn(e.target))stop(e)},true);
 document.addEventListener('beforeinput',e=>{if(/paste|drop|yank/i.test(e.inputType||''))stop(e)},true);
 document.addEventListener('keydown',e=>{const k=(e.key||'').toLowerCase();if(((e.ctrlKey||e.metaKey)&&['c','v','x','a'].includes(k))||(e.shiftKey&&k==='insert')||(e.ctrlKey&&k==='insert'))stop(e)},true);
 document.addEventListener('focusin',e=>{if(isIn(e.target))['autocomplete:off','spellcheck:false','autocorrect:off','autocapitalize:off'].forEach(a=>{const[p,v]=a.split(':');e.target.setAttribute(p,v)})});
})();
