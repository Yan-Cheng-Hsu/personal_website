import { Html, Head, Main, NextScript } from 'next/document'

// Script to set theme before page renders to prevent flash
const themeScript = `
  (function() {
    var saved = localStorage.getItem('theme');
    var theme = saved || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  })();
`;

// JSON-LD structured data for Google rich results / SEO
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Yan-Cheng Hsu',
  alternateName: 'Bill Hsu',
  jobTitle: 'Infrastructure Software Engineer II',
  description:
    'Infrastructure Software Engineer specializing in AI training platforms, Kubernetes, and cross-cluster GPU orchestration. Ex-Amazon AGI. UCSD MS CS. 159+ Google Scholar citations.',
  url: 'https://bill-yc-hsu.com',
  image: 'https://bill-yc-hsu.com/pics/resume_photo.jpg',
  email: 'mailto:bill.ych.jobs@gmail.com',
  worksFor: {
    '@type': 'Organization',
    name: 'Alibaba Cloud',
    url: 'https://www.alibabacloud.com',
  },
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'University of California, San Diego',
      url: 'https://ucsd.edu',
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'National Central University',
      url: 'https://www.ncu.edu.tw/',
    },
  ],
  knowsAbout: [
    'Kubernetes',
    'Virtual Kubelet',
    'AI Training Infrastructure',
    'GPU Orchestration',
    'Distributed Systems',
    'Cross-Cluster Architecture',
    'Site Reliability Engineering',
    'Multi-Agent Systems',
    'Root Cause Analysis',
  ],
  sameAs: [
    'https://www.linkedin.com/in/yan-cheng-hsu/',
    'https://github.com/Yan-Cheng-Hsu',
    'https://scholar.google.com/citations?user=CVNU7NcAAAAJ',
  ],
}

export default function Document() {
  return (
    <Html lang="en" data-theme="dark">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </Head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
