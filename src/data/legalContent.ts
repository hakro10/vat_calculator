export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export const PRIVACY_POLICY_DATA = {
  title: 'Privacy Policy',
  lastUpdated: 'August 16, 2026',
  sections: [
    {
      heading: '1. Our Core Commitment: 100% Client-Side Calculations',
      paragraphs: [
        'At vatcalcs.net, we believe your financial figures, invoices, salaries, business revenues, and tax calculations are strictly private. All computations across our entire suite—including VAT additions/extractions, gross-to-net salary projections, freelance tax reserves, capital gains calculations, and commercial profit margins—are executed 100% client-side directly within your web browser using modern JavaScript.',
        'No salary amounts, revenue numbers, asset values, customer invoice records, or custom tax percentages are ever transmitted to, stored on, or processed by our web servers or any third-party database. When you close or refresh your browser tab, your active session calculation data is immediately cleared from memory.',
      ],
    },
    {
      heading: '2. Information We May Collect Automatically (Log Data & Telemetry)',
      paragraphs: [
        'Like virtually all modern web properties, our hosting infrastructure may automatically record standard technical server logs when you visit our website. This telemetry may include your IP address, browser type and version, device operating system, language preferences, referring URLs, and timestamps.',
        'This technical log data is used strictly for server diagnostic monitoring, DDoS prevention, rate-limiting malicious traffic, and ensuring reliable uptime. Server logs are never correlated with calculation inputs.',
      ],
    },
    {
      heading: '3. Cookies, Local Storage & Advertising Disclosures',
      paragraphs: [
        '• Local Storage (First-Party): We use browser LocalStorage strictly to store your chosen visual theme (Light vs. Dark mode), your preferred currency symbol (€, £, $, CA$, AU$, CHF, ¥), and your Cookie Consent preferences. This data remains on your local device and is never uploaded to our servers.',
        '• Third-Party Advertising & Google AdSense: We may partner with third-party advertising vendors, including Google AdSense and its certified advertising partners, to display advertisements on our website. Google uses cookies (including the DoubleClick DART cookie) to serve ads to users based on their visits to this site and other websites across the internet.',
        '• Users may opt out of personalized advertising by visiting Google Ads Settings (https://adssettings.google.com) or via the Digital Advertising Alliance (https://optout.aboutads.info). You may also manage or revoke your consent preferences at any time using our on-site Cookie Consent manager.',
      ],
    },
    {
      heading: '4. GDPR Compliance (EU / UK Data Protection)',
      paragraphs: [
        'Under the General Data Protection Regulation (GDPR) and the UK Data Protection Act, residents of the European Economic Area and the United Kingdom have specific statutory rights:',
        '• Right of Access & Portability: You may request details of any personal data processed.',
        '• Right to Rectification & Erasure: You may request correction or deletion of personal information.',
        '• Right to Restrict Processing & Object: You may object to the processing of telemetry data or revoke cookie consent.',
        'Because our calculation tools operate 100% client-side without user registration, accounts, or server databases, we do not store, profile, or monetize personal financial identities. For any privacy requests, contact our Data Protection Officer at privacy@vatcalcs.net.',
      ],
    },
    {
      heading: '5. CCPA / CPRA Notice for California Residents',
      paragraphs: [
        'Under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA), California residents have the right to know what personal information is collected, request its deletion, and opt out of the sale or sharing of personal information. vatcalcs.net does not sell personal financial information or user data.',
        'To exercise any consumer privacy rights under California law, please email privacy@vatcalcs.net or support@vatcalcs.net with the subject line "CCPA Request".',
      ],
    },
    {
      heading: '6. Contact Information',
      paragraphs: [
        'If you have questions, feedback, or concerns regarding this Privacy Policy or our client-side architecture, please contact us directly:',
        '• Email: privacy@vatcalcs.net / support@vatcalcs.net',
        '• Website: https://vatcalcs.net/contact',
      ],
    },
  ],
};

export const TERMS_OF_SERVICE_DATA = {
  title: 'Terms of Service',
  lastUpdated: 'August 16, 2026',
  sections: [
    {
      heading: '1. Acceptance of Terms',
      paragraphs: [
        'By accessing or using the services, calculators, and content on vatcalcs.net, you agree to be bound by these Terms of Service. If you do not agree to all terms and conditions, please discontinue use of the website immediately.',
      ],
    },
    {
      heading: '2. Educational & Informational Disclaimer (Not Official Tax or Financial Advice)',
      paragraphs: [
        'All calculation algorithms, tax rate tables, formulas, worked examples, and guides on vatcalcs.net are provided for general educational, estimation, and informational purposes only. They do not constitute certified accounting, tax, legal, or financial advice.',
        'Tax legislation, statutory thresholds, social insurance brackets, and exemptions are subject to frequent legislative amendments across different jurisdictions (such as HMRC in the UK, Irish Revenue, the US Internal Revenue Service, and EU tax authorities). You should always consult a licensed certified public accountant (CPA), chartered tax advisor, or legal professional before submitting statutory tax returns or making commercial financial commitments.',
      ],
    },
    {
      heading: '3. Limitation of Liability',
      paragraphs: [
        'In no event shall vatcalcs.net, its operators, or contributors be liable for any direct, indirect, incidental, consequential, special, or exemplary damages resulting from your use of or inability to use the calculators or reliance upon calculation results.',
      ],
    },
    {
      heading: '4. Intellectual Property & Acceptable Use',
      paragraphs: [
        'The design, user interface components, educational guides, visual graphics, and code repository of vatcalcs.net are protected by international copyright laws. Automated scraping or framing without prior written consent is strictly prohibited.',
        'For business inquiries or questions regarding these terms, please contact support@vatcalcs.net.',
      ],
    },
  ],
};

export const COOKIE_POLICY_DATA = {
  title: 'Cookie Policy',
  lastUpdated: 'August 16, 2026',
  sections: [
    {
      heading: '1. What Are Cookies and Local Storage?',
      paragraphs: [
        'Cookies are small text files placed on your device by websites you visit. Browser Local Storage is a modern web standard that allows websites to store key-value data directly on your local device without sending it across network headers.',
      ],
    },
    {
      heading: '2. How We Use Cookies & Local Storage',
      paragraphs: [
        '• Essential & Functional Storage (First-Party): We store your chosen theme preference (Dark / Light mode), your active currency symbol (€, £, $, etc.), and your Cookie Consent preferences. These strictly persist user interface settings and never track personal identity.',
        '• Advertising Cookies (Third-Party): We may display advertisements provided by Google AdSense and certified third-party ad networks. These vendors may use cookies and web beacons to serve advertisements based on your visits to this website and other websites.',
      ],
    },
    {
      heading: '3. How to Manage and Revoke Consent',
      paragraphs: [
        'You can modify or revoke your cookie choices at any time using our on-site "Cookie Preferences" modal available in the site footer. You can also configure your web browser settings to block or delete cookies.',
        'For further assistance, reach our support team at support@vatcalcs.net.',
      ],
    },
  ],
};

export const ABOUT_US_DATA = {
  title: 'About vatcalcs.net',
  mission: 'Empowering global professionals, freelancers, and businesses with instant, accurate, and uncompromisingly private financial calculation tools.',
  paragraphs: [
    'vatcalcs.net was founded with a single driving principle: financial calculation tools on the web should be ultra-fast, visually intuitive, and 100% private. Far too many online financial calculators require disruptive page reloads, bombard users with intrusive popups, or silently upload sensitive salary and turnover figures to remote servers.',
    'We engineered vatcalcs.net from the ground up using React 19 and TypeScript. Every calculation executes entirely within your web browser engine in sub-millisecond time. No server requests, no tracking of your financial figures, and zero latency.',
    'Whether you are an independent freelancer calculating your quarterly tax buffer, an e-commerce seller pricing products with VAT, an employee checking a pay raise after progressive tax bands, or an investor modeling capital gains tax exemptions, vatcalcs.net provides transparent, precision-engineered answers with step-by-step mathematical formulas.',
    'Have feedback or feature suggestions? We would love to hear from you at support@vatcalcs.net.',
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
