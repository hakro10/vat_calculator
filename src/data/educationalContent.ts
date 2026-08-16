export interface EducationalSection {
  heading: string;
  content: string[];
  formulaSnippet?: string;
  exampleBox?: {
    title: string;
    steps: string[];
    result: string;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface EducationalGuide {
  title: string;
  subtitle: string;
  summary: string;
  keyTakeaways: string[];
  sections: EducationalSection[];
  faqs: FAQItem[];
}

export const VAT_EDUCATIONAL_CONTENT: EducationalGuide = {
  title: 'Comprehensive Guide to VAT, Sales Tax & Reverse Calculations',
  subtitle: 'Master the mathematics of Value Added Tax, understand input vs. output VAT, and learn how to add or reverse tax calculations with precision.',
  summary: 'Value Added Tax (VAT) is a consumption tax assessed on the value added to goods and services at each stage of the supply chain. Whether you are invoicing a client (adding VAT) or verifying a vendor receipt (extracting VAT), understanding the underlying mathematics ensures compliance with revenue authorities and protects your profit margins.',
  keyTakeaways: [
    'Adding VAT uses the formula: Gross = Net × (1 + Rate / 100).',
    'Extracting VAT uses the reverse formula: Net = Gross ÷ (1 + Rate / 100).',
    'Never calculate reverse VAT by simply multiplying the gross by the tax percentage (e.g. 20% of €120 is €24, but the actual VAT portion is €20).',
    'Businesses registered for VAT can claim back input VAT on allowable business purchases to offset output VAT collected on sales.',
  ],
  sections: [
    {
      heading: '1. The Difference Between Adding VAT and Extracting VAT',
      content: [
        'When dealing with Value Added Tax or Sales Tax, two distinct mathematical operations are commonly required:',
        '• Adding VAT (Exclusive to Inclusive): This operation starts with a Net base price and calculates the additional tax that must be charged to the end customer. For example, a consulting service quoted at $100 with a 23% VAT rate will have a final invoice total of $123 ($100 Net + $23 VAT).',
        '• Extracting / Reverse VAT (Inclusive to Exclusive): This operation begins with a Gross final price (such as a retail till receipt) and calculates backwards to determine the underlying Net amount and the tax portion. A common beginner error is taking 20% of the Gross price, which incorrectly overstates the tax. The mathematically correct method is dividing the Gross amount by (1 + Tax Rate).',
      ],
      formulaSnippet: `To Add VAT (Find Gross Total):
  Gross Amount = Net Amount × (1 + VAT Rate ÷ 100)
  VAT Portion  = Net Amount × (VAT Rate ÷ 100)

To Extract VAT (Find Net Base & VAT from Gross):
  Net Amount   = Gross Amount ÷ (1 + VAT Rate ÷ 100)
  VAT Portion  = Gross Amount - Net Amount = Gross Amount × [VAT Rate ÷ (100 + VAT Rate)]`,
    },
    {
      heading: '2. Worked Examples Across Global VAT Rates',
      content: [
        'Let us examine how these mathematical formulas behave across common tax jurisdictions worldwide:',
        '• Ireland Standard Rate (23%): For a gross retail receipt of €246.00, dividing by 1.23 yields a Net amount of €200.00. The VAT portion is exactly €46.00 (€246.00 - €200.00).',
        '• United Kingdom Standard Rate (20%): For a gross purchase of £120.00, dividing by 1.20 yields a Net amount of £100.00. The extracted tax is £20.00.',
        '• Germany Standard Rate (19%): For a gross price of €119.00, dividing by 1.19 yields a Net amount of €100.00, with a tax portion of €19.00.',
        '• US Sales Tax Example (8.875% NYC): A product priced at $100.00 Net incurs $8.88 sales tax, resulting in a customer total of $108.88.',
      ],
      exampleBox: {
        title: 'Worked Example: Extracting 23% Irish VAT from a €615.00 Commercial Invoice',
        steps: [
          'Step 1: Identify the Gross Amount = €615.00 and VAT Rate = 23%.',
          'Step 2: Calculate the divisor: 1 + (23 ÷ 100) = 1.23.',
          'Step 3: Calculate the Net Amount: €615.00 ÷ 1.23 = €500.00.',
          'Step 4: Subtract Net from Gross to find VAT: €615.00 - €500.00 = €115.00.',
          'Verification: €500.00 × 0.23 = €115.00, and €500.00 + €115.00 = €615.00.',
        ],
        result: 'Net Amount = €500.00 | VAT Extracted = €115.00 | Effective Multiplier = 1.230',
      },
    },
    {
      heading: '3. Input VAT vs. Output VAT in Business Accounting',
      content: [
        'If your business is VAT-registered, you act as an official tax collector for the government revenue authority. The tax you charge on your sales invoices is known as "Output VAT", while the tax you pay on business purchases (such as web hosting, equipment, or inventory) is known as "Input VAT".',
        'At the end of each tax accounting period (usually bi-monthly or quarterly), you calculate the net tax liability: Net VAT Due = Output VAT - Input VAT. If your Input VAT exceeds your Output VAT during a period (e.g. during large initial capital expenditure), you are entitled to a tax refund from the Revenue authority.',
      ],
    },
    {
      heading: '4. Common VAT Compliance Pitfalls & Best Practices',
      content: [
        '• Never Treat Collected VAT as Revenue: Always maintain a separate tax bank account to hold collected Output VAT so funds remain available when filing returns.',
        '• Check Invoicing Requirements: A valid VAT invoice must display your business name, address, VAT registration number, sequential invoice number, date, tax rate per line, and total VAT charged.',
        '• Cross-Border B2B Reverse Charge: When supplying services B2B to another EU country or internationally, ensure you verify the customer’s VAT ID and apply the reverse charge mechanism if appropriate.',
      ],
    },
  ],
  faqs: [
    {
      question: 'Why can I not extract VAT by just subtracting 20% from the Gross total?',
      answer: 'Because the 20% tax was added to a smaller base (the Net amount), not the Gross amount. For example, 20% added to €100 gives €120. If you take 20% of €120, you get €24, which would wrongly leave €96 instead of the true €100 Net base. The correct mathematical formula is dividing by 1.20.',
    },
    {
      question: 'When should a business register for VAT?',
      answer: 'In most jurisdictions, registration is mandatory once your taxable turnover surpasses the statutory threshold over a rolling 12-month period (e.g., £90,000 in the UK, or €40,000 for services / €80,000 for goods in Ireland). Voluntary registration is also permitted and advantageous if you wish to reclaim input tax on startup expenses.',
    },
    {
      question: 'What is the difference between Zero-Rated (0%) and VAT-Exempt supplies?',
      answer: 'Zero-rated goods (such as books, children’s clothing, or certain unprocessed foods) are taxable supplies charged at 0%, meaning businesses can still reclaim input VAT incurred in producing them. VAT-exempt services (such as medical, banking, or education) are outside the VAT scope, meaning businesses cannot reclaim input tax on related expenses.',
    },
    {
      question: 'Are digital downloads and SaaS software subject to VAT?',
      answer: 'Yes. In the UK, EU, and Australia, digital products (software, ebooks, subscriptions) supplied B2C are taxed at the VAT/GST rate of the customer’s country of residence. In B2B sales, the reverse charge mechanism usually applies if the buyer provides a valid VAT ID.',
    },
    {
      question: 'How do rounding rules work on multi-item VAT invoices?',
      answer: 'Tax authorities generally allow either line-by-line rounding or invoice-total rounding, provided the method is applied consistently. Our calculator provides a multi-line invoice tally that calculates line-item tax and computes the exact total to the nearest currency cent/penny.',
    },
  ],
};

export const SALARY_EDUCATIONAL_CONTENT: EducationalGuide = {
  title: 'Complete Guide to Gross-to-Net Salary & Income Tax Brackets',
  subtitle: 'Understand progressive tax bands, tax credits, payroll deductions, and take-home pay calculations.',
  summary: 'Your gross salary represents total contractual compensation before statutory deductions. Your net take-home pay is what actually arrives in your bank account after mandatory income taxes, social security contributions (such as National Insurance in the UK, PRSI & USC in Ireland, or FICA in the US), and voluntary pre-tax deductions like workplace pensions.',
  keyTakeaways: [
    'Marginal tax rate applies only to income earned within the highest tax band, not your entire salary.',
    'Effective tax rate measures your total tax paid as a percentage of your total gross income.',
    'Tax credits reduce your final tax bill dollar-for-dollar, whereas deductions reduce taxable income before rate application.',
    'Pre-tax pension contributions significantly reduce your top-bracket taxable income.',
  ],
  sections: [
    {
      heading: '1. How Progressive Income Tax Systems Work',
      content: [
        'Most modern economies utilize a progressive income tax structure, where higher increments of income are taxed at progressively higher percentage rates. A common misconception among employees is fearing that a pay raise pushing them into a higher tax bracket will decrease their net take-home pay. This is mathematically impossible in standard tax systems because only the income exceeding the bracket threshold is taxed at the higher rate.',
        'For example, in a two-bracket system with 20% up to $50,000 and 40% above $50,000, earning $55,000 means only the top $5,000 is taxed at 40%. The initial $50,000 continues to be taxed at the baseline 20% rate.',
      ],
      formulaSnippet: `Effective Tax Rate = (Total Income Tax + Total Social Contributions) ÷ Gross Annual Salary × 100
Take-Home Pay     = Gross Salary - Pension Contribution - Income Tax - Social Taxes`,
    },
    {
      heading: '2. Social Insurance and Payroll Taxes Explained',
      content: [
        'In addition to statutory income tax, employees contribute to government social insurance funds:',
        '• United Kingdom: National Insurance (NI) Class 1 contributions fund state pensions and public benefits. Employees pay 8% on earnings between £12,570 and £50,270 per year, and 2% on earnings exceeding £50,270.',
        '• Ireland: Pay Related Social Insurance (PRSI) Class A is levied at 4.1% on weekly earnings above €352. In addition, the Universal Social Charge (USC) is a progressive individual charge ranging from 0.5% on the first €12,012 up to 8% on earnings above €70,044.',
        '• United States: FICA taxes consist of Social Security (6.2% up to the annual wage base cap) and Medicare (1.45% on all earnings, plus an Additional Medicare Tax of 0.9% on high earners above $200,000).',
      ],
      exampleBox: {
        title: 'Worked Example: UK Salary Breakdown on £60,000 Gross Annual Pay',
        steps: [
          'Step 1: Personal Allowance of £12,570 is tax-free.',
          'Step 2: Basic Rate Band (£12,570 to £50,270 = £37,700) @ 20% = £7,540.00 tax.',
          'Step 3: Higher Rate Band (£50,270 to £60,000 = £9,730) @ 40% = £3,892.00 tax.',
          'Step 4: Total Income Tax = £7,540 + £3,892 = £11,432.00.',
          'Step 5: National Insurance = 8% of £37,700 (£3,016) + 2% of £9,730 (£194.60) = £3,210.60.',
          'Step 6: Net Annual Take-Home = £60,000 - £11,432 - £3,210.60 = £45,357.40 (£3,779.78 / month).',
        ],
        result: 'Net Take-Home = £45,357.40 | Total Taxes = £14,642.60 | Effective Tax Rate = 24.40%',
      },
    },
    {
      heading: '3. Maximizing Take-Home Pay with Pension Tax Relief',
      content: [
        'One of the most tax-efficient strategies for full-time employees is utilizing salary sacrifice or pre-tax pension contributions. Because pension contributions are deducted from gross pay prior to income tax assessment, employees save at their marginal tax rate.',
        'A higher-rate taxpayer paying 40% income tax plus 2% social contributions saves €42/£42 in taxes for every €100/£100 contributed to their retirement fund, meaning an actual out-of-pocket cost of only €58/£58.',
      ],
    },
    {
      heading: '4. Understanding Cumulative vs. Week 1 / Month 1 Tax Codes',
      content: [
        'Under standard payroll systems, your tax allowances are calculated on a cumulative basis throughout the tax year, ensuring your tax liabilities are smoothed evenly across pay periods. If you change jobs or have temporary gaps in employment, cumulative tax codes automatically refund overpaid tax in subsequent pay periods.',
      ],
    },
  ],
  faqs: [
    {
      question: 'Will a pay raise ever reduce my total take-home pay?',
      answer: 'No. In progressive tax systems, moving into a higher tax bracket only increases the tax percentage on earnings above that specific threshold. You will always keep a substantial portion of any salary increase.',
    },
    {
      question: 'What is the difference between marginal and effective tax rates?',
      answer: 'Your marginal tax rate is the percentage of tax applied to the very last dollar/pound of income you earned (your highest bracket). Your effective tax rate is the overall percentage of your entire gross income that goes toward taxes.',
    },
    {
      question: 'How do tax credits differ from tax deductions?',
      answer: 'A tax deduction reduces your gross taxable income before tax calculation (saving you money proportional to your tax bracket). A tax credit is subtracted directly from your final calculated tax liability dollar-for-dollar.',
    },
    {
      question: 'How do pension contributions reduce my tax liability?',
      answer: 'Contributions to qualifying workplace pensions or personal retirement plans (such as 401(k), SIPP, or PRSA) are deducted from gross income before tax is calculated, providing instant tax relief at your highest marginal rate.',
    },
    {
      question: 'What happens to the UK Personal Allowance on salaries above £100,000?',
      answer: 'In the UK, the standard £12,570 Personal Allowance tapers down by £1 for every £2 of adjusted net income over £100,000, creating an effective 60% marginal income tax rate between £100,000 and £125,140.',
    },
  ],
};

export const FREELANCE_EDUCATIONAL_CONTENT: EducationalGuide = {
  title: 'Freelancer & Sole Trader Tax Buffer and Expense Deductions Guide',
  subtitle: 'Calculate your safe-to-spend income, tax reserves, and deductible business expenses.',
  summary: 'Unlike salaried employees whose taxes are withheld automatically via PAYE or W-2 payroll, self-employed contractors and freelancers receive gross payments directly from clients. To avoid unexpected tax liabilities at year-end, freelancers must set aside a systematic tax reserve and track all allowable business deductions.',
  keyTakeaways: [
    'Always maintain a separate tax reserve bank account holding 25% to 35% of all gross client invoices.',
    'Wholly and exclusively incurred business expenses directly reduce your taxable self-employment profit.',
    'If VAT-registered, output VAT collected is government money and must never be counted as operational revenue.',
    'Paying quarterly estimated tax installments prevents late payment interest and penalties.',
  ],
  sections: [
    {
      heading: '1. The Golden Rule of Self-Employed Cash Flow',
      content: [
        'When operating as an independent contractor, consultant, or agency owner, gross revenue does not equal take-home earnings. Self-employed professionals are responsible for both income tax and self-employment social taxes (such as SECA 15.3% in the US, Class 2/4 National Insurance in the UK, or Class S PRSI in Ireland).',
        'A prudent rule of thumb is the 30/70 principle: immediately transfer 30% of every invoice received into a dedicated high-yield tax reserve account. The remaining 70% covers deductible operating overheads and personal take-home compensation.',
      ],
      formulaSnippet: `Net Taxable Profit = Gross Invoiced Revenue - Allowable Business Expenses - Pension Deductions
Total Tax Reserve  = (Taxable Profit × Income Tax %) + (Taxable Profit × Social Tax %) + VAT Collected
Safe-to-Spend Net  = Taxable Profit - Income Tax Buffer - Social Buffer - Emergency Reserve`,
    },
    {
      heading: '2. Allowable Deductible Business Expenses',
      content: [
        'Tax authorities permit self-employed individuals to deduct business expenses incurred "wholly, exclusively, and necessarily" for trade purposes:',
        '• Equipment & Hardware: Laptops, monitors, smartphones, cameras, and test devices.',
        '• Software & Subscriptions: Cloud hosting, SaaS tools, design software, accounting platforms, domain names.',
        '• Home Office Allocation: A proportional percentage of rent, mortgage interest, electricity, heating, and high-speed broadband based on designated workspace square footage.',
        '• Professional Services: Legal advice, accountancy fees, tax preparation, professional indemnity insurance.',
        '• Training & Development: Industry certifications, technical books, professional memberships directly related to your current trade.',
      ],
      exampleBox: {
        title: 'Worked Example: Freelancer Invoicing $10,000 / month with $1,500 Expenses',
        steps: [
          'Step 1: Gross Annual Revenue = $120,000. Annual Deductible Expenses = $18,000.',
          'Step 2: Net Taxable Profit = $120,000 - $18,000 = $102,000.',
          'Step 3: Income Tax Buffer @ 22% = $22,440. Self-Employment Tax @ 15.3% = $15,606.',
          'Step 4: Total Annual Tax Reserve = $38,046 (Recommended Quarterly Reserve: $9,511.50).',
          'Step 5: Rainy Day Reserve (5%) = $5,100.',
          'Step 6: Safe-to-Spend Annual Take-Home = $102,000 - $38,046 - $5,100 = $58,854 ($4,904.50 / month).',
        ],
        result: 'Safe Take-Home = $4,904.50/mo | Tax Reserve = $3,170.50/mo | Overhead = $1,500.00/mo',
      },
    },
    {
      heading: '3. Establishing a Quarterly Estimated Tax Routine',
      content: [
        'Self-employed individuals must make periodic quarterly tax payments to avoid statutory penalties. In the US, quarterly estimated taxes are due in April, June, September, and January. In the UK, self-assessment "Payments on Account" occur each January 31 and July 31. Ireland uses Preliminary Tax payments in October/November.',
      ],
    },
    {
      heading: '4. Maintaining Separation Between Personal and Business Finances',
      content: [
        'Opening a dedicated business checking account simplifies expense categorization, ensures clean audit trails, and eliminates accidental commingling of tax reserve capital with personal living expenses.',
      ],
    },
  ],
  faqs: [
    {
      question: 'What percentage of my freelance income should I save for taxes?',
      answer: 'Most freelancers should reserve between 25% and 35% of net profit, depending on total income bracket and residency. If you are also VAT registered, add 100% of the VAT collected directly to your reserve account.',
    },
    {
      question: 'Can I deduct meals and coffee meetings as business expenses?',
      answer: 'Rules vary by country. In the US, business meals with clients are typically 50% deductible if direct business is conducted. In the UK and Ireland, business entertainment for clients is generally non-deductible for corporation and income tax relief.',
    },
    {
      question: 'How do I account for home office expenses?',
      answer: 'You can either use a simplified flat-rate method (e.g. HMRC simplified expenses or IRS standard $5/sq ft up to $1,500) or calculate actual utility and rent costs apportioned by the percentage of space and time used exclusively for business.',
    },
    {
      question: 'Do I need to register for VAT if I am a freelance sole trader?',
      answer: 'Yes, if your taxable freelance revenue crosses the local statutory threshold. In many digital sectors, voluntary VAT registration is also beneficial if you sell B2B across borders under reverse charge mechanisms.',
    },
    {
      question: 'How do quarterly preliminary tax payments work for self-employed professionals?',
      answer: 'Rather than paying one large annual tax bill, revenue authorities require advance payments based on either 100% of your previous year’s tax liability or 90% of your current estimated liability, distributed across quarterly installments.',
    },
  ],
};

export const CGT_EDUCATIONAL_CONTENT: EducationalGuide = {
  title: 'Capital Gains Tax (CGT) & Exemption Allowance Guide',
  subtitle: 'Calculate net taxable gains, deductible disposal costs, allowable improvements, and exemptions.',
  summary: 'Capital Gains Tax is charged on the profit or gain realized when disposing of a capital asset that has appreciated in value. Disposals include selling an asset, gifting it, swapping it for cryptocurrency or another asset, or receiving compensation for its loss.',
  keyTakeaways: [
    'CGT is assessed on the capital gain (sale price minus total allowable purchase and improvement costs), not the total sale proceeds.',
    'Annual tax-free exemptions allow individuals to realize a specific quota of gains each tax year tax-free.',
    'Prior-year allowable capital losses can be carried forward indefinitely to offset future taxable gains.',
    'Incidental transaction costs such as legal fees, stamp duty, estate agent commissions, and brokerage fees are 100% deductible.',
  ],
  sections: [
    {
      heading: '1. Core Mechanics of Capital Gains Calculations',
      content: [
        'To establish the chargeable gain on an asset disposal, taxpayers establish the "Base Cost" of the asset. The base cost includes original acquisition price plus incidental acquisition expenses (such as broker commissions, solicitor fees, survey reports, and stamp duty) plus allowable capital enhancements that added enduring value to the asset.',
        'Routine repairs and maintenance (e.g., repainting a rental property) cannot be added to the CGT base cost because they are treated as revenue expenses deductible against rental income.',
      ],
      formulaSnippet: `Gross Capital Gain = Disposal Price - Purchase Price - Purchase Incidental Costs - Improvement Costs - Disposal Costs
Taxable Gain       = Gross Capital Gain - Prior Year Losses - Annual Tax-Free Exemption Allowance
CGT Payable        = Taxable Gain × Applicable CGT Rate (%)`,
      exampleBox: {
        title: 'Worked Example: Sale of Investment Property in the UK',
        steps: [
          'Step 1: Purchase price in 2018 = £250,000. Legal & Stamp Duty = £10,000. Extension = £25,000.',
          'Step 2: Total Acquisition Base Cost = £250,000 + £10,000 + £25,000 = £285,000.',
          'Step 3: Sale price in 2026 = £360,000. Estate Agent & Legal Fees on sale = £6,000.',
          'Step 4: Gross Capital Gain = £360,000 - £285,000 - £6,000 = £69,000.',
          'Step 5: Apply UK Annual Exemption Allowance (£3,000) → Taxable Gain = £66,000.',
          'Step 6: Residential Property CGT @ 24% = £66,000 × 0.24 = £15,840.00.',
        ],
        result: 'Taxable Gain = £66,000.00 | CGT Payable = £15,840.00 | Net Post-Tax Proceeds = £338,160.00',
      },
    },
    {
      heading: '2. Regional Rates and Exemption Rules',
      content: [
        '• Ireland (Revenue): Standard CGT rate is 33% on most capital assets (venture capital relief may reduce to 10% on business disposals under entrepreneur relief). Every individual receives an annual small gains exemption of €1,270.',
        '• United Kingdom (HMRC): Standard rate is 10% (basic rate) / 20% (higher rate) for shares and general assets. Residential property gains are taxed at 18% / 24%. The annual exempt allowance is £3,000.',
        '• United States (IRS): Long-term capital gains (assets held > 1 year) are taxed at preferential rates of 0%, 15%, or 20% based on taxable income tiers (plus 3.8% Net Investment Income Tax for high earners). Short-term gains (< 1 year) are taxed at ordinary income tax rates up to 37%.',
      ],
    },
    {
      heading: '3. Carrying Forward and Offsetting Capital Losses',
      content: [
        'If you dispose of an asset at a financial loss, that loss can offset other capital gains made in the same tax year. Any remaining allowable losses can be declared to your tax authority and carried forward indefinitely to reduce capital gains in future tax years.',
      ],
    },
    {
      heading: '4. Timing Disposals Around Tax Year Boundaries',
      content: [
        'Because annual exemption allowances do not roll over to subsequent years (use it or lose it), investors often stagger the disposal of appreciating assets across multiple tax years to maximize statutory tax-free exemption thresholds.',
      ],
    },
  ],
  faqs: [
    {
      question: 'Do I pay Capital Gains Tax when selling my primary private residence?',
      answer: 'In most jurisdictions (including Private Residence Relief in the UK and Principal Private Residence relief in Ireland), gains realized on your sole or main family home are 100% exempt from CGT, provided the property was not used exclusively for business or let out.',
    },
    {
      question: 'What happens if I make a capital loss on an investment?',
      answer: 'Capital losses can be offset against capital gains realized in the same tax year. If your losses exceed your gains, the surplus unused loss can be registered and carried forward to reduce taxable capital gains in future tax years.',
    },
    {
      question: 'Is trading cryptocurrency subject to Capital Gains Tax?',
      answer: 'Yes. Swapping one crypto token for another, selling crypto for fiat currency, or spending cryptocurrency on goods and services are all disposal events subject to CGT reporting based on the fair market value at the time of disposal.',
    },
    {
      question: 'Which costs are allowable as capital improvements?',
      answer: 'Only capital expenditures that provide a permanent physical enhancement or increase the asset’s market value (such as building a house extension, installing solar panels, or major architectural renovations) qualify as allowable base cost additions.',
    },
    {
      question: 'How does the holding period affect my Capital Gains Tax rate?',
      answer: 'In countries like the United States and Australia, holding an asset for longer than 12 months qualifies you for discounted long-term capital gains tax rates (up to 50% discount in Australia or 0%/15%/20% preferential rates in the US).',
    },
  ],
};

export const MARGIN_EDUCATIONAL_CONTENT: EducationalGuide = {
  title: 'Commercial Profit Margin & Business Tax Calculator Guide',
  subtitle: 'Discover the difference between Markup and Margin, integrate VAT/Sales Tax, and forecast net post-tax profit.',
  summary: 'Pricing products and commercial services accurately requires understanding the mathematical relationship between Cost of Goods Sold (COGS), Gross Profit Margin, Markup, Operating Overheads, Sales Tax / VAT, and Corporate Income Tax. Confusing margin with markup is one of the most common causes of business insolvency.',
  keyTakeaways: [
    'Gross Profit Margin is profit divided by revenue (selling price); Markup is profit divided by cost.',
    'A 50% markup equals a 33.3% gross margin; a 100% markup equals a 50% gross margin.',
    'Selling prices must be calculated using net amounts before adding sales tax or VAT.',
    'Net Margin represents the final bottom line after subtracting overheads, depreciation, and corporate taxes.',
  ],
  sections: [
    {
      heading: '1. Margin vs. Markup: The Critical Distinction',
      content: [
        'While both metrics express profitability, they use different baselines:',
        '• Markup Percentage: Measures how much a product’s selling price is marked up above its direct production cost. Calculated as: (Selling Price - Cost) ÷ Cost × 100.',
        '• Gross Margin Percentage: Measures what percentage of the total selling price represents pure gross profit. Calculated as: (Selling Price - Cost) ÷ Selling Price × 100.',
        'To achieve a target gross margin of 40% on an item costing $60, you cannot simply add 40% ($24) to $60. Doing so produces a price of $84 with only a 28.5% gross margin. The correct pricing formula is: Cost ÷ (1 - Margin Rate) = $60 ÷ (1 - 0.40) = $100.',
      ],
      formulaSnippet: `Price from Margin: Selling Price = Unit Cost ÷ (1 - Target Margin / 100)
Gross Margin %    = (Net Selling Price - Unit Cost) ÷ Net Selling Price × 100
Markup %          = (Net Selling Price - Unit Cost) ÷ Unit Cost × 100
Net Margin %      = Net Post-Tax Profit ÷ Net Revenue × 100`,
      exampleBox: {
        title: 'Worked Example: Pricing an E-commerce Product with 40% Margin and 20% VAT',
        steps: [
          'Step 1: Direct unit cost (COGS) = €30.00. Target Gross Margin = 40%.',
          'Step 2: Calculate net selling price: €30.00 ÷ (1 - 0.40) = €50.00.',
          'Step 3: Gross profit per unit = €50.00 - €30.00 = €20.00 (Markup = 66.67%).',
          'Step 4: Add 20% VAT: €50.00 × 1.20 = €60.00 retail shelf price.',
          'Step 5: Deduct operating overhead per unit (€5.00) → Operating Profit = €15.00.',
          'Step 6: Deduct Corporate Tax (12.5% in Ireland) = €1.88 → Net Profit = €13.12 (Net Margin = 26.24%).',
        ],
        result: 'Retail Price (Inc VAT) = €60.00 | Net Price = €50.00 | Net Post-Tax Profit = €13.12 (26.24%)',
      },
    },
    {
      heading: '2. Factoring in Corporate Tax and Break-Even Volume',
      content: [
        'Achieving positive gross profit is insufficient if total gross margin fails to cover fixed operating overheads (rent, salaries, software, insurance). The break-even volume calculates the exact number of units required to cover all fixed costs before generating taxable operating profit.',
        'Once break-even is surpassed, corporate income taxes (e.g., 12.5% in Ireland, 19%-25% in the UK, 21% in the US) apply to remaining operating profits.',
      ],
    },
    {
      heading: '3. Volume Break-Even Equation',
      content: [
        'The unit break-even point is calculated as: Fixed Costs ÷ (Net Selling Price - Unit Cost). Every unit sold above this threshold contributes directly to operating profit and net after-tax margin.',
      ],
    },
    {
      heading: '4. Protecting Margins Against Inflation and Shipping Fluctuations',
      content: [
        'Regularly auditing Unit COGS to account for freight shipping rate changes, payment processing transaction fees (e.g., 2.9% + $0.30), and raw material price increases ensures your actual realized net margin matches your business plan.',
      ],
    },
  ],
  faqs: [
    {
      question: 'Why is a 50% markup not the same as a 50% profit margin?',
      answer: 'A 50% markup on a $100 cost sets the price at $150. Your gross profit is $50. Dividing $50 profit by $150 revenue equals a 33.3% gross margin. A true 50% margin requires selling the $100 item for $200 (a 100% markup).',
    },
    {
      question: 'How does VAT affect my commercial profit margins?',
      answer: 'VAT does not directly impact your gross profit margin if your business is VAT registered, because output VAT collected is remitted to the government and input VAT on materials is reclaimed. However, in B2C markets, VAT increases the final retail price for price-sensitive consumers.',
    },
    {
      question: 'What is a healthy net profit margin for a business?',
      answer: 'Healthy net margins vary by sector: retail groceries and e-commerce typically operate on 2% to 10% net margins, professional services and consulting achieve 15% to 30%, and software/SaaS companies can exceed 25% to 40% net post-tax margins.',
    },
    {
      question: 'What are Operating Overheads and how do they differ from COGS?',
      answer: 'Cost of Goods Sold (COGS) includes direct costs that increase with every unit produced (raw materials, packaging, direct assembly labor). Operating overheads are indirect fixed costs (office rent, accounting software, insurance, marketing retainers) incurred regardless of unit sales.',
    },
    {
      question: 'How does Corporate Income Tax impact pricing strategy?',
      answer: 'Corporate tax is levied on net operating taxable income (Gross Profit - Operating Expenses). Businesses must model both pre-tax operating margin and net post-tax cash margin to ensure adequate retained earnings for reinvestment and shareholder dividends.',
    },
  ],
};
