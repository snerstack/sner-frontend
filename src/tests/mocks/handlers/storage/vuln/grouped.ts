import { rest } from 'msw'

const data = {
  draw: '1',
  recordsTotal: '3',
  recordsFiltered: '3',
  data: [
    {
      name: 'aggregable vuln',
      severity: 'medium',
      tags: ['reportdata'],
      cnt_vulns: 2,
    },
    {
      name: 'PHP 5.6.x < 5.6.32 Multiple Vulnerabilities',
      severity: 'critical',
      tags: [],
      cnt_vulns: 1,
    },
    {
      name: 'test vulnerability',
      severity: 'medium',
      tags: ['report', 'tag2', 'tag1', 'xdd'],
      cnt_vulns: 1,
    },
  ],
}

export const vulnGroupedHandler = rest.post('http://localhost:18000/storage/vuln/grouped.json', (_, res, ctx) => {
  return res(ctx.json(data))
})
