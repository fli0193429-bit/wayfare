import { test, after } from 'node:test'
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'

const port = 19000 + Math.floor(Math.random() * 30000)
const base = 'http://127.0.0.1:' + port
const child = spawn(process.execPath, ['server.mjs'], {env:{...process.env, PORT:String(port),PAYPAL_CLIENT_ID:'',PAYPAL_CLIENT_SECRET:''}, stdio:'ignore'})
after(() => child.kill())
for(let i=0;i<80;i++) {
  if(child.exitCode !== null) throw Error('Server exited early')
  try {if((await fetch(base+'/config')).ok) break} catch {}
  if(i===79) throw Error('Server did not start')
  await sleep(50)
}
async function req(path, body) {
  const r=await fetch(base+path,body===undefined?undefined:{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
  return {status:r.status,data:await r.json()}
}
test('serves app and config',async()=>{
  const page=await fetch(base)
  assert.equal(page.status,200)
  assert.match(await page.text(),/Wayfare/)
  assert.deepEqual((await req('/config')).data,{clientId:'',currency:'EUR'})
})
test('validates travel brief',async()=>{
  assert.equal((await req('/draft',{brief:'short'})).status,400)
})
test('validates quotes and makes a customer link',async()=>{
  const q={scope:'Trip planning',exclusions:'Hotels not booked',total:'240.00',deposit:'60.00'}
  for(const invalid of [{...q,deposit:'241.00'},{...q,deposit:'0'},{...q,deposit:'1.234'},{...q,scope:''}])
    assert.equal((await req('/quotes',invalid)).status,400)
  const result=await req('/quotes',q)
  assert.equal(result.status,201)
  const id=result.data.id
  assert.match(id,/^[0-9a-f-]{36}$/)
  const opened=await req('/quotes/'+id)
  assert.equal(opened.status,200)
  assert.equal(opened.data.total,'240.00')
  assert.equal(opened.data.deposit,'60.00')
  assert.equal(opened.data.scope,q.scope)
  assert.equal((await req('/orders',{id})).status,503)
  assert.equal((await req('/capture',{id,orderId:'wrong'})).status,400)
})

