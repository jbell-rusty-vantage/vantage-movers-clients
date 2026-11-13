import {mkdir,writeFile} from 'node:fs/promises';
import {previewConnection,preflight,check} from '../session-8/preview-qualification.mjs';

const expected=process.env.EXPECTED_API_SHA;
check(/^[a-f0-9]{40}$/.test(expected??''),'Expected isolated API source required');
const api=await previewConnection();
const evidence=await preflight(api);
const response=await api.get('/api/v1/site-preview/website-outcomes');
check(response.status===200,'Read-only source probe failed');
const body=await response.json();
check(body.ok===true&&body.source_sha===expected,'Isolated API source mismatch');
const result={...evidence,source:body.source_sha,reportStatus:response.status,writes:0};
const output=new URL('./evidence/deployed/',import.meta.url);await mkdir(output,{recursive:true});
await writeFile(new URL('api-readonly.json',output),JSON.stringify(result,null,2));
console.log(JSON.stringify(result));
