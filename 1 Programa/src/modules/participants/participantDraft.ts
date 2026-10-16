const KEY='fortuna-real-participant-draft-v1';
export function readParticipantDraft(storage:Pick<Storage,'getItem'>):{name:string;bulkText:string}{try{const v=JSON.parse(storage.getItem(KEY)??'null');if(v&&typeof v.name==='string'&&typeof v.bulkText==='string')return v;}catch{/* Unavailable storage must not block entry. */}return{name:'',bulkText:''};}
export function saveParticipantDraft(storage:Pick<Storage,'setItem'>,name:string,bulkText:string){storage.setItem(KEY,JSON.stringify({name,bulkText}));}
