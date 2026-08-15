export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export const PRIVACY_POLICY_DATA = {
  title: 'Privacy Policy',
  lastUpdated: 'August 15, 2026',
  sections: [
    {
      heading: '1. Our Core Commitment: 100% Client-Side Calculations',
      paragraphs: [
        'At vatcalcs.net, we believe your financial numbers, salaries, business revenues, and tax calculations are strictly private. All calculations performed across our entire suite—including VAT additions, gross-to-net salary projections, freelance tax reserves, capital gains computations, and commercial margins—are executed 100% client-side directly within your web browser using JavaScript.',
        'No salary figures, revenue numbers, asset values, or invoice inputs are ever transmitted to, stored on, or processed by our web servers or any third-party database. When you close or refresh your browser tab, your session inputs are cleared.',
      ],
    },
    {
      heading: '2. Information We May Collect Automatically',
      paragraphs: [
        'Like virtually all modern websites, we may collect standard technical and telemetry data when you access our website. This includes your IP address, browser type and version, operating system, language preferences, referring URLs, and timestamps. This non-personally identifiable data is utilized strictly for system diagnostics, server performance monitoring, and security protection against malicious traffic.',
      ],
    },
    {
      heading: '3. Cookies and Local Storage',
      paragraphs: [
        'We use client-side browser LocalStorage exclusively to enhance your user experience by storing your chosen visual theme (Light vs. Dark mode), your preferred currency symbol (€, £, $, etc.), and your Cookie Consent preferences. LocalStorage resides strictly on your own device and is never synchronized with our servers.',
        'We may partner with third-party advertising networks (such as Google AdSense) that serve personalized or non-personalized advertisements. These networks may utilize cookies or web beacons to serve ads based on prior visits to this or other websites. You may manage or revoke your cookie preferences at any time using our Cookie Consent Banner or via Google Ad Settings.',
      ],
    },
    {
      heading: '4. GDPR & CCPA Compliance Rights',
      paragraphs: [
        'Under the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), users have the right to request access to, correction of, or deletion of any personal information held about them. Because we do not collect user accounts, names, emails, or financial records during calculation operations, we do not retain or sell personal consumer profiles.',
        'For inquiries regarding data privacy or telemetry data, contact our Data Protection Officer at privacy@vatcalcs.net.',
      ],
    },
  ],
};

export const TERMS_OF_SERVICE_DATA = {
  title: 'Terms of Service',
  lastUpdated: 'August 15, 2026',
  sections: [
    {
      heading: '1. Acceptance of Terms',
      paragraphs: [
        'By accessing or using the services provided on vatcalcs.net, you agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue use of the website immediately.',
      ],
    },
    {
      heading: '2. Educational & Informational Disclaimer (Not Financial Advice)',
      paragraphs: [
        'All tools, calculators, tax rates, formulas, examples, and educational content provided on vatcalcs.net are provided for general educational, estimation, and informational purposes only. They do not constitute official accounting, legal, tax, or professional financial advice.',
        'Tax legislation, statutory thresholds, social insurance brackets, and exemptions are subject to frequent legislative amendments across different jurisdictions (including HMRC, Irish Revenue, IRS, and EU tax authorities). You should always consult a licensed certified public accountant (CPA), chartered tax advisor, or legal professional before submitting statutory tax filings or making significant financial commitments.',
      ],
    },
    {
      heading: '3. Limitation of Liability',
      paragraphs: [
        'In no event shall vatcalcs.net, its creators, or affiliates be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of or inability to use the calculators or reliance upon calculation results.',
      ],
    },
    {
      heading: '4. Intellectual Property',
      paragraphs: [
        'The design, user interface components, educational guides, visual graphics, and code repository of vatcalcs.net are protected by international copyright, trademark, and intellectual property laws.',
      ],
    },
  ],
};

export const COOKIE_POLICY_DATA = {
  title: 'Cookie Policy',
  lastUpdated: 'August 15, 2026',
  sections: [
    {
      heading: '1. What Are Cookies?',
      paragraphs: [
        'Cookies are small text files placed on your computer or mobile device when you visit websites. They help websites remember your actions and preferences over time so you do not have to re-enter them on every visit.',
      ],
    },
    {
      heading: '2. How We Use Cookies & Local Storage',
      paragraphs: [
        '• Essential & Functional Storage: Used to remember your selected theme (Dark / Light mode) and your cookie preferences. These do not track personal identity.',
        '• Advertising Cookies: Google AdSense and third-party advertising partners may set cookies to display relevant advertisements and measure ad performance according to Google’s privacy standards.',
      ],
    },
    {
      heading: '3. How to Manage or Disable Cookies',
      paragraphs: [
        'You can manage your cookie consent preferences directly on our website using the "Customize Cookies" button in our consent banner or in the site footer. You can also configure your web browser to reject cookies or notify you when a cookie is being set.',
      ],
    },
  ],
};

export const ABOUT_US_DATA = {
  title: 'About vatcalcs.net',
  mission: 'Empowering global professionals, freelancers, and businesses with instant, accurate, and uncompromisingly private financial calculation tools.',
  paragraphs: [
    'vatcalcs.net was created with a clear mission: financial tools on the web should be fast, elegant, and 100% private. Far too many online calculators require slow page reloads, bombard users with intrusive popups, or silently upload sensitive salary and turnover data to remote servers.',
    'We built vatcalcs.net from the ground up using modern client-side React and TypeScript architecture. Every calculation runs locally inside your browser engine in sub-millisecond time. No server requests, no tracking of your numbers, and zero latency.',
    'Whether you are an independent freelancer calculating your quarterly tax buffer, an e-commerce seller setting retail margins with VAT, an employee checking a pay raise after progressive tax bands, or an investor modeling capital gains tax exemptions, vatcalcs.net gives you transparent, precision-engineered answers with step-by-step mathematical formulas.',
  ],
  pillars: [
    {
      title: '100% Privacy by Design',
      description: 'Your financial figures are processed purely in client memory and never leave your device.',
    },
    {
      title: 'Sub-Millisecond Speed',
      description: 'Reactive calculation pipelines compute outputs instantly with every single keystroke or slider change.',
    },
    {
      title: 'Regional Accuracy',
      description: 'Pre-loaded with up-to-date statutory tax rates and thresholds for Ireland, the UK, Europe, US, and beyond.',
    },
    {
      title: 'Educational Transparency',
      description: 'Every tool includes worked examples and exact formulas so you understand the underlying mathematics.',
    },
  ],
};
