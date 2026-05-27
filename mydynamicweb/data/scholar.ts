export interface ScholarProfile {
  totalCitations: number
  hIndex: number
  i10Index?: number
  scholarUrl: string
  lastUpdated: string
}

export interface Patent {
  id: string
  title: string
  number: string
  assignee: string
  url: string
  citesPaperId?: string
  year: number
}

export const scholarProfile: ScholarProfile = {
  totalCitations: 159,
  hIndex: 2,
  i10Index: 2,
  scholarUrl: 'https://scholar.google.com/citations?user=CVNU7NcAAAAJ',
  lastUpdated: '2026-05-14',
}

export const patents: Patent[] = [
  {
    id: 'mitsubishi-bp-2023',
    title: 'Health management apparatus and health management method',
    number: 'US20230063221A1',
    assignee: 'Mitsubishi Electric Corporation',
    url: 'https://patents.google.com/patent/US20230063221A1',
    citesPaperId: 'sensors-bp',
    year: 2023,
  },
]
