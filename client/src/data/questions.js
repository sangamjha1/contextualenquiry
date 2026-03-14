export const professionLabels = {
  doctor: "Doctor",
  nurse: "Nurse",
  receptionist: "Receptionist",
  labTechnician: "Lab Technician",
  pharmacist: "Pharmacist",
  hospitalAdministrator: "Hospital Administrator",
  patient: "Patient",
  generalUser: "General User (Visitor/Caregiver)",
  itSystemAdministrator: "IT / System Administrator",
  billingAccountsStaff: "Billing / Accounts Staff",
  insuranceTpaCoordinator: "Insurance / TPA Coordinator",
  emergencyStaff: "Emergency Staff",
  wardBedManagementStaff: "Ward / Bed Management Staff",
  hospitalOwnerManagement: "Hospital Owner / Management",
};

export const questionsByProfession = {
  doctor: [
    {
      question:
        "Describe your end-to-end consultation workflow from patient arrival to treatment plan finalization.",
      options: [
        "Mostly manual, paper-heavy",
        "Mixed paper + digital systems",
        "Fully digital in one system",
        "Digital but fragmented across systems",
        "Not involved in full workflow",
      ],
    },
    {
      question: "Where do you spend the most non-clinical time in a typical day?",
      options: [
        "Documentation / notes",
        "Ordering tests / referrals",
        "Billing / insurance forms",
        "Follow-up scheduling",
        "Chasing results / coordination",
      ],
    },
    {
      question: "How do you access previous patient history, and what delays occur?",
      options: [
        "Instant in same system",
        "Multiple systems cause delays",
        "Paper files retrieved",
        "History often missing",
        "No standardized access",
      ],
    },
    {
      question: "What information is usually missing when patients reach you?",
      options: [
        "Past history / medications",
        "Lab / imaging results",
        "Vitals / triage notes",
        "Insurance / payment details",
        "Referral notes",
      ],
    },
    {
      question: "How do lab and radiology results currently reach you, and what causes delays?",
      options: [
        "Printed reports delivered",
        "Phone / WhatsApp updates",
        "Partial HIS integration",
        "Real-time digital alerts",
        "Batch updates with delays",
      ],
    },
    {
      question: "Which clinical decisions are slowed by incomplete or late data?",
      options: [
        "Medication selection",
        "Admission / discharge",
        "Referral / escalation",
        "Procedure / surgery timing",
        "Rarely impacted",
      ],
    },
    {
      question: "Where do duplicate data entries happen across OPD/IPD systems?",
      options: [
        "OPD to IPD admission",
        "EMR and billing",
        "Orders and lab systems",
        "Discharge summary",
        "Rarely any duplication",
      ],
    },
    {
      question: "How do you coordinate with nurses, pharmacy, and billing during patient care?",
      options: [
        "Phone / WhatsApp",
        "In-person rounds",
        "EMR tasks / orders",
        "Nurse relay / verbal",
        "No structured workflow",
      ],
    },
    {
      question: "What communication gaps most often impact patient safety or quality?",
      options: [
        "Lab / radiology updates",
        "Nursing handoffs",
        "Pharmacy availability",
        "Billing / insurance clearance",
        "Bed / OT scheduling",
      ],
    },
    {
      question: "How do you track follow-ups, chronic cases, or treatment adherence?",
      options: [
        "Manual diary / notes",
        "Phone / WhatsApp reminders",
        "EMR reminders",
        "No systematic tracking",
        "Handled by another team",
      ],
    },
    {
      question: "What reporting or documentation tasks feel redundant?",
      options: [
        "Duplicate clinical notes",
        "Insurance documentation",
        "Discharge summaries",
        "Quality / compliance forms",
        "None, already streamlined",
      ],
    },
    {
      question: "What real-time dashboard information would most improve your decisions?",
      options: [
        "Pending lab / imaging",
        "Bed / OT availability",
        "Critical alerts / vitals",
        "Patient queue status",
        "Billing clearance status",
      ],
    },
    {
      question: "What should JEEVAN NETRA automate first for doctors?",
      options: [
        "Documentation / notes",
        "Orders & results tracking",
        "Follow-up reminders",
        "Inter-department coordination",
        "Billing / discharge clearance",
      ],
    },
  ],
  nurse: [
    {
      question: "Walk through your shift workflow from handover to shift closure.",
      options: [
        "Mostly manual, paper-based",
        "Mixed manual + digital",
        "Fully digital nursing system",
        "Fragmented across tools",
        "Varies by ward",
      ],
    },
    {
      question: "What patient information is hardest to access quickly during rounds?",
      options: [
        "Medication orders",
        "Latest vitals / notes",
        "Lab / imaging status",
        "Discharge plan",
        "All are accessible",
      ],
    },
    {
      question: "Where do medication administration delays happen most often?",
      options: [
        "Waiting for doctor orders",
        "Pharmacy delays",
        "Patient verification",
        "Stock availability",
        "Rarely delayed",
      ],
    },
    {
      question: "How do you currently record vitals and nursing notes?",
      options: [
        "Paper charts",
        "Excel / standalone app",
        "EMR bedside entry",
        "Batch entry later",
        "Mixed approach",
      ],
    },
    {
      question: "Which tasks require entering the same data in multiple places?",
      options: [
        "Vitals and notes",
        "Medication records",
        "Admission / discharge",
        "Bed transfers",
        "Rarely duplicated",
      ],
    },
    {
      question: "How do you communicate urgent updates to doctors and support teams?",
      options: [
        "Phone / WhatsApp",
        "In-person update",
        "EMR alerts / tasks",
        "Nursing station relay",
        "No standard method",
      ],
    },
    {
      question: "What issues occur during bed transfers, discharge, or admissions?",
      options: [
        "Bed availability delays",
        "Incomplete documentation",
        "Transport coordination",
        "Billing clearance wait",
        "No major issues",
      ],
    },
    {
      question: "How do you track pending orders and completed interventions?",
      options: [
        "Manual checklists",
        "Nursing station board",
        "EMR task list",
        "Verbal updates",
        "No structured tracking",
      ],
    },
    {
      question: "What bottlenecks reduce time available for direct patient care?",
      options: [
        "Documentation workload",
        "Coordination with departments",
        "Medication preparation",
        "Admissions / discharge",
        "Staffing shortage",
      ],
    },
    {
      question: "What features in JEEVAN NETRA would improve nursing efficiency most?",
      options: [
        "Bedside documentation",
        "Order tracking",
        "Medication admin workflow",
        "Shift handover tools",
        "Alerting / escalation",
      ],
    },
  ],
  receptionist: [
    {
      question: "Describe the patient registration and appointment workflow step by step.",
      options: [
        "Mostly manual, paper-based",
        "Mixed paper + digital",
        "Fully digital registration",
        "Separate systems for OPD",
        "Varies by patient type",
      ],
    },
    {
      question: "What are the most frequent delays at the front desk?",
      options: [
        "Patient data entry",
        "Insurance / TPA verification",
        "Doctor availability",
        "Queue management",
        "Payment / billing",
      ],
    },
    {
      question: "How do you verify patient identity and demographic details?",
      options: [
        "Manual ID checks",
        "Aadhaar / government ID",
        "Hospital ID card",
        "OTP / phone verification",
        "Often not verified",
      ],
    },
    {
      question: "Where do repeat visits create duplicate records?",
      options: [
        "Name spelling variations",
        "Phone number changes",
        "Missing MRN / ID",
        "Multiple family members",
        "Rarely duplicates",
      ],
    },
    {
      question: "How do you manage queue visibility for patients and clinicians?",
      options: [
        "Manual token system",
        "Display screen",
        "Mobile / SMS updates",
        "Verbal announcements",
        "No queue visibility",
      ],
    },
    {
      question: "What communication gaps occur between reception, billing, and OPD?",
      options: [
        "Billing status unclear",
        "Appointment changes",
        "Patient eligibility",
        "Doctor delays not shared",
        "No major gaps",
      ],
    },
    {
      question: "How often are appointments rescheduled, and why?",
      options: [
        "Very frequent, doctor changes",
        "Frequent, patient no-shows",
        "Occasional, resource issues",
        "Rare, schedules stable",
        "Not tracked",
      ],
    },
    {
      question: "What information do patients ask for that is hard to provide quickly?",
      options: [
        "Doctor availability",
        "Queue / waiting time",
        "Billing estimates",
        "Report / result status",
        "Room / bed availability",
      ],
    },
    {
      question: "What should JEEVAN NETRA improve first at reception?",
      options: [
        "Registration speed",
        "Queue visibility",
        "Insurance verification",
        "Appointment scheduling",
        "Billing handoff",
      ],
    },
  ],
  labTechnician: [
    {
      question: "Explain the workflow from test order receipt to report release.",
      options: [
        "Mostly manual, paper-based",
        "Mixed manual + digital",
        "Fully digital lab system",
        "Fragmented across tools",
        "Varies by test type",
      ],
    },
    {
      question: "Where do sample labeling or tracking errors happen?",
      options: [
        "At collection point",
        "During transport",
        "At lab reception",
        "During processing",
        "Rarely occur",
      ],
    },
    {
      question: "How do you prioritize urgent vs routine tests today?",
      options: [
        "Manual triage by staff",
        "Marked by doctor / ER",
        "System priority flags",
        "Verbal escalation",
        "No clear priority system",
      ],
    },
    {
      question: "What causes delays in result validation and doctor notification?",
      options: [
        "Equipment / reagent issues",
        "Pending senior approval",
        "Manual entry workload",
        "Doctor unreachable",
        "Rarely delayed",
      ],
    },
    {
      question: "How often do you re-enter patient or order data manually?",
      options: [
        "Almost always",
        "Often",
        "Sometimes",
        "Rarely",
        "Never",
      ],
    },
    {
      question: "How integrated is your lab system with hospital records currently?",
      options: [
        "Not integrated",
        "Partial, manual sync",
        "Order in HIS, result in LIS",
        "Mostly integrated",
        "Fully integrated",
      ],
    },
    {
      question: "What quality or compliance checks are hardest to maintain?",
      options: [
        "QC logs",
        "Calibration schedules",
        "Turnaround time reporting",
        "Sample traceability",
        "No major issues",
      ],
    },
    {
      question: "What real-time data would help you manage workload better?",
      options: [
        "Pending samples queue",
        "Critical alerts",
        "Equipment utilization",
        "Staff workload",
        "Turnaround time targets",
      ],
    },
    {
      question: "What should JEEVAN NETRA solve for lab operations first?",
      options: [
        "Sample tracking",
        "Order-to-result workflow",
        "Result notifications",
        "Quality compliance",
        "Inventory / reagents",
      ],
    },
  ],
  pharmacist: [
    {
      question: "Describe your prescription-to-dispense workflow.",
      options: [
        "Manual, paper prescriptions",
        "Mixed paper + digital",
        "Electronic prescriptions",
        "Separate OPD/IPD flows",
        "Varies by department",
      ],
    },
    {
      question: "What prescription issues commonly require clarification with doctors?",
      options: [
        "Dose / frequency unclear",
        "Drug interaction concern",
        "Stock substitution",
        "Illegible handwriting",
        "Rarely need clarification",
      ],
    },
    {
      question: "How do you check drug availability and alternatives in real time?",
      options: [
        "Manual stock check",
        "Inventory software",
        "Call to store",
        "No real-time view",
        "Usually pre-stocked",
      ],
    },
    {
      question: "Where do billing or inventory mismatches usually occur?",
      options: [
        "Dispense vs billing",
        "Stock adjustments",
        "Returns / cancellations",
        "IPD ward issues",
        "Rarely mismatched",
      ],
    },
    {
      question: "How do you record controlled drug dispensing and compliance notes?",
      options: [
        "Paper registers",
        "Excel or local tool",
        "Integrated pharmacy system",
        "Manual + digital",
        "Not applicable",
      ],
    },
    {
      question: "What delays happen between order entry and medicine handover?",
      options: [
        "Order not received",
        "Stock not available",
        "Billing clearance",
        "Packaging / verification",
        "Rarely delayed",
      ],
    },
    {
      question: "How do you coordinate with nursing for in-patient medication cycles?",
      options: [
        "Phone / WhatsApp",
        "Paper medication chart",
        "EMR order schedule",
        "Ward pharmacist rounds",
        "No standard workflow",
      ],
    },
    {
      question: "What duplicate documentation work affects pharmacy speed?",
      options: [
        "Billing + stock entries",
        "Controlled drug logs",
        "Returns / substitutions",
        "Manual registers",
        "Minimal duplication",
      ],
    },
    {
      question: "What JEEVAN NETRA capabilities would most improve pharmacy accuracy?",
      options: [
        "e-Prescriptions",
        "Inventory sync",
        "Drug interaction alerts",
        "IPD medication cycle",
        "Billing integration",
      ],
    },
  ],
  hospitalAdministrator: [
    {
      question: "What are your key operational workflows across departments each day?",
      options: [
        "Admissions / discharges",
        "Staffing / rosters",
        "Revenue / billing flow",
        "Bed utilization",
        "Multi-dept coordination",
      ],
    },
    {
      question: "Which KPIs are hardest to monitor in real time?",
      options: [
        "Bed occupancy",
        "OPD / IPD throughput",
        "Revenue collection",
        "TAT for labs",
        "Patient satisfaction",
      ],
    },
    {
      question: "Where do inter-department bottlenecks impact patient throughput most?",
      options: [
        "Admissions",
        "Lab / radiology",
        "Billing / discharge",
        "OT / procedure scheduling",
        "Bed transfers",
      ],
    },
    {
      question: "How do you currently handle escalation when systems or teams fail?",
      options: [
        "Phone / WhatsApp escalation",
        "Manual incident logs",
        "Department heads meeting",
        "No defined process",
        "Vendor support",
      ],
    },
    {
      question: "What reporting requires manual consolidation from multiple systems?",
      options: [
        "Financial reports",
        "Operational KPIs",
        "Clinical quality metrics",
        "Compliance audits",
        "Inventory usage",
      ],
    },
    {
      question: "Where do you see the highest cost of inefficiency today?",
      options: [
        "Staff utilization",
        "Inventory wastage",
        "Delayed discharges",
        "Billing leakage",
        "OT idle time",
      ],
    },
    {
      question: "How reliable is data consistency across clinical, billing, and inventory systems?",
      options: [
        "Consistent and reliable",
        "Minor mismatches",
        "Frequent mismatches",
        "Mostly manual reconciliation",
        "Not sure",
      ],
    },
    {
      question: "What compliance or audit pain points consume administrative time?",
      options: [
        "Documentation completeness",
        "Data traceability",
        "Billing compliance",
        "Regulatory reporting",
        "No major pain points",
      ],
    },
    {
      question: "Which decision-making processes are slowed by delayed insights?",
      options: [
        "Resource allocation",
        "Staffing decisions",
        "Budget planning",
        "Service line expansion",
        "Rarely slowed",
      ],
    },
    {
      question: "How do staffing, bed occupancy, and resource data influence daily planning?",
      options: [
        "Real-time dashboard",
        "Daily manual reports",
        "Ad-hoc phone updates",
        "Not reliably available",
        "Not used in planning",
      ],
    },
    {
      question: "What integration gaps with external systems are most critical?",
      options: [
        "Insurance / TPA",
        "Government reporting",
        "Labs / diagnostics",
        "Pharmacy suppliers",
        "None",
      ],
    },
    {
      question: "What top outcomes should JEEVAN NETRA deliver in the first 6 months?",
      options: [
        "Operational visibility",
        "Faster patient flow",
        "Revenue accuracy",
        "Compliance readiness",
        "Cost reduction",
      ],
    },
  ],
  patient: [
    {
      question: "Describe your hospital journey from appointment/arrival to discharge.",
      options: [
        "Smooth and clear",
        "Some confusing steps",
        "Many confusing steps",
        "Very stressful journey",
        "Not yet discharged",
      ],
    },
    {
      question: "Where did you experience the longest wait or confusion?",
      options: [
        "Registration",
        "Doctor consultation",
        "Lab / diagnostics",
        "Billing / discharge",
        "Pharmacy",
      ],
    },
    {
      question: "How easy was it to access your reports, prescriptions, and bills?",
      options: [
        "Very easy",
        "Mostly easy",
        "Somewhat difficult",
        "Very difficult",
        "Could not access",
      ],
    },
    {
      question: "Did you need to provide the same information multiple times?",
      options: [
        "Yes, many times",
        "Yes, a few times",
        "Only once",
        "Not sure",
        "Not applicable",
      ],
    },
    {
      question: "How clear was communication about next steps in your treatment?",
      options: [
        "Very clear",
        "Mostly clear",
        "Sometimes unclear",
        "Very unclear",
        "No communication",
      ],
    },
    {
      question: "What updates did you wish you had in real time?",
      options: [
        "Doctor availability",
        "Test results status",
        "Billing / insurance status",
        "Discharge timeline",
        "Room / bed status",
      ],
    },
    {
      question: "What part of the process felt most stressful for you or your family?",
      options: [
        "Waiting / queues",
        "Unclear instructions",
        "Billing / costs",
        "Care coordination",
        "Finding information",
      ],
    },
    {
      question: "What should JEEVAN NETRA improve first to enhance patient experience?",
      options: [
        "Queue visibility",
        "Clear communication",
        "Single patient record",
        "Digital reports",
        "Faster billing",
      ],
    },
  ],
  generalUser: [
    {
      question: "What is your role in supporting the patient during hospital visits?",
      options: [
        "Primary caregiver",
        "Family member",
        "Friend / visitor",
        "Hired attendant",
        "Other",
      ],
    },
    {
      question: "Which hospital processes are hardest for caregivers/visitors to navigate?",
      options: [
        "Registration / admission",
        "Finding departments",
        "Billing / payments",
        "Lab / report collection",
        "Discharge process",
      ],
    },
    {
      question: "How clear is information on appointments, queue, and doctor availability?",
      options: [
        "Very clear",
        "Mostly clear",
        "Somewhat unclear",
        "Very unclear",
        "Not provided",
      ],
    },
    {
      question: "Where do you notice communication breakdowns between departments?",
      options: [
        "Reception to billing",
        "Doctor to lab",
        "Ward to pharmacy",
        "Insurance to billing",
        "Not sure",
      ],
    },
    {
      question: "What repetitive paperwork or verification steps create frustration?",
      options: [
        "Repeated ID proofs",
        "Insurance forms",
        "Consent forms",
        "Billing receipts",
        "No major issues",
      ],
    },
    {
      question: "What real-time notifications would be most useful to caregivers?",
      options: [
        "Queue / wait time",
        "Test results ready",
        "Doctor availability",
        "Discharge updates",
        "Billing status",
      ],
    },
    {
      question: "What should JEEVAN NETRA change to make hospital journeys smoother?",
      options: [
        "Single patient record",
        "Better wayfinding",
        "Faster billing",
        "Clearer communication",
        "Digital updates",
      ],
    },
  ],
  itSystemAdministrator: [
    {
      question: "Describe the current hospital IT architecture and key systems in use.",
      options: [
        "Single integrated HIS",
        "Multiple best-of-breed systems",
        "Mostly manual with some tools",
        "Legacy on-prem systems",
        "Mixed cloud + on-prem",
      ],
    },
    {
      question: "What are the biggest integration challenges between existing applications?",
      options: [
        "No standard APIs",
        "Vendor lock-in",
        "Data format mismatch",
        "Real-time sync issues",
        "Access control conflicts",
      ],
    },
    {
      question: "How do you currently manage user access, roles, and permissions?",
      options: [
        "Manual user management",
        "Role-based access system",
        "Active Directory integration",
        "Department-managed access",
        "Not standardized",
      ],
    },
    {
      question: "Where do downtime incidents occur most, and how are they handled?",
      options: [
        "Network outages",
        "Server / database failures",
        "Power issues",
        "Vendor system downtime",
        "Rarely any downtime",
      ],
    },
    {
      question: "What data synchronization or latency issues affect operations?",
      options: [
        "Delayed lab results",
        "Billing sync issues",
        "Inventory mismatch",
        "Patient master data",
        "No major latency",
      ],
    },
    {
      question: "How do you monitor security events and potential vulnerabilities?",
      options: [
        "SIEM / centralized logs",
        "Manual log reviews",
        "Vendor alerts",
        "No active monitoring",
        "Periodic audits only",
      ],
    },
    {
      question: "What backup and disaster recovery gaps concern you most?",
      options: [
        "Backup frequency",
        "Restore time",
        "Offsite storage",
        "Testing / drills",
        "No major gaps",
      ],
    },
    {
      question: "Which workflows still rely on spreadsheets or manual file exchanges?",
      options: [
        "Billing reconciliation",
        "Inventory tracking",
        "HR / staffing",
        "Department reporting",
        "None",
      ],
    },
    {
      question: "What API or interoperability standards are currently missing?",
      options: [
        "HL7 / FHIR",
        "DICOM integration",
        "Insurance APIs",
        "Government reporting",
        "Not sure",
      ],
    },
    {
      question: "What governance controls are needed for data quality and master records?",
      options: [
        "Patient master data",
        "Service master",
        "Doctor / staff master",
        "Inventory master",
        "No formal governance",
      ],
    },
    {
      question: "What must JEEVAN NETRA provide to be deployable in your environment?",
      options: [
        "High availability",
        "Interoperability",
        "Strong security",
        "Easy migration tools",
        "Low infrastructure cost",
      ],
    },
    {
      question: "What would a successful migration from legacy systems look like?",
      options: [
        "Minimal downtime",
        "Phased rollout",
        "Full data migration",
        "Parallel run period",
        "Not sure",
      ],
    },
  ],
  billingAccountsStaff: [
    {
      question: "Walk through billing from service capture to final payment.",
      options: [
        "Mostly manual",
        "Mixed manual + digital",
        "Fully digital billing",
        "Separate systems by dept",
        "Varies by case",
      ],
    },
    {
      question: "Where do charge capture errors or missing entries typically happen?",
      options: [
        "Procedure charges",
        "Lab / diagnostics",
        "Pharmacy",
        "Nursing services",
        "Rarely",
      ],
    },
    {
      question: "How often do billing disputes occur, and what causes them?",
      options: [
        "Very frequent, unclear items",
        "Frequent, insurance issues",
        "Occasional, pricing confusion",
        "Rare, processes clear",
        "Not tracked",
      ],
    },
    {
      question: "What delays happen due to late clinical documentation?",
      options: [
        "Discharge billing",
        "Insurance claims",
        "Final invoice",
        "Service coding",
        "No major delays",
      ],
    },
    {
      question: "How do you reconcile pharmacy, lab, and procedure charges?",
      options: [
        "Manual reconciliation",
        "Excel tracking",
        "System-based reconciliation",
        "Department checks",
        "Not consistent",
      ],
    },
    {
      question: "Which reports require manual effort at day-end or month-end?",
      options: [
        "Revenue summaries",
        "Outstanding dues",
        "Insurance claims",
        "Doctor collections",
        "Inventory billing",
      ],
    },
    {
      question: "What data duplication exists between billing and finance systems?",
      options: [
        "Patient billing data",
        "Payment entries",
        "Insurance adjustments",
        "Refunds / cancellations",
        "Minimal duplication",
      ],
    },
    {
      question: "What should JEEVAN NETRA automate to improve billing accuracy and speed?",
      options: [
        "Charge capture",
        "Real-time billing",
        "Insurance checks",
        "Discharge clearance",
        "Reports / analytics",
      ],
    },
  ],
  insuranceTpaCoordinator: [
    {
      question: "Describe the pre-authorization and claims workflow end to end.",
      options: [
        "Mostly manual",
        "Mixed manual + portal",
        "Fully portal-based",
        "Multiple insurer portals",
        "Varies by insurer",
      ],
    },
    {
      question: "What documentation gaps most often delay claim approvals?",
      options: [
        "Missing clinical notes",
        "Incomplete billing details",
        "Policy documents",
        "Doctor signatures",
        "Rarely delayed",
      ],
    },
    {
      question: "How do you coordinate between insurer, billing, and clinical teams?",
      options: [
        "Phone / WhatsApp",
        "Email threads",
        "Portal messaging",
        "In-person follow-ups",
        "No structured process",
      ],
    },
    {
      question: "Where do status visibility issues create repeated follow-up work?",
      options: [
        "Pre-auth status",
        "Claim submission",
        "Claim approval",
        "Payment status",
        "Not sure",
      ],
    },
    {
      question: "What claim rejection patterns do you observe frequently?",
      options: [
        "Missing documents",
        "Policy exclusions",
        "Incorrect coding",
        "Late submission",
        "Rarely rejected",
      ],
    },
    {
      question: "How are policy rules checked today, and where do errors occur?",
      options: [
        "Manual policy reading",
        "Portal rule checks",
        "Insurer call center",
        "No formal checks",
        "Errors are rare",
      ],
    },
    {
      question: "What timeline bottlenecks affect patient discharge in insured cases?",
      options: [
        "Final bill approval",
        "TPA authorization",
        "Document preparation",
        "Insurer response time",
        "No major bottleneck",
      ],
    },
    {
      question: "What JEEVAN NETRA features would reduce TPA turnaround times?",
      options: [
        "Auto document checklist",
        "Real-time claim tracking",
        "Integrated insurer APIs",
        "Standard templates",
        "Faster billing sync",
      ],
    },
  ],
  emergencyStaff: [
    {
      question: "Explain the emergency intake and triage workflow under peak load.",
      options: [
        "Mostly manual",
        "Mixed manual + digital",
        "Fully digital triage",
        "Varies by shift",
        "No standard workflow",
      ],
    },
    {
      question: "What information is critical but often unavailable at arrival?",
      options: [
        "Past history",
        "Allergies / medications",
        "Insurance info",
        "Previous investigations",
        "Nothing missing",
      ],
    },
    {
      question: "Where are the biggest delays in emergency diagnostics or interventions?",
      options: [
        "Lab turnaround",
        "Radiology availability",
        "Specialist arrival",
        "Bed / ICU availability",
        "No major delays",
      ],
    },
    {
      question: "How do you coordinate quickly with lab, radiology, ICU, and wards?",
      options: [
        "Phone / WhatsApp",
        "Emergency pager",
        "EMR orders / alerts",
        "In-person runners",
        "No standard process",
      ],
    },
    {
      question: "What handoff issues occur when transferring patients to other units?",
      options: [
        "Incomplete notes",
        "Delay in acceptance",
        "Bed not ready",
        "Missing test results",
        "No major issues",
      ],
    },
    {
      question: "How do you track bed availability and specialist readiness in real time?",
      options: [
        "Manual calls",
        "Whiteboard / station board",
        "System dashboard",
        "Nursing relay",
        "Not tracked",
      ],
    },
    {
      question: "What documentation burden impacts emergency response speed?",
      options: [
        "Triage documentation",
        "Consent forms",
        "Insurance paperwork",
        "Discharge notes",
        "No major burden",
      ],
    },
    {
      question: "What should JEEVAN NETRA prioritize for emergency care operations?",
      options: [
        "Triage workflow",
        "Bed / ICU visibility",
        "Rapid diagnostics",
        "Critical alerts",
        "Handoff tools",
      ],
    },
  ],
  wardBedManagementStaff: [
    {
      question: "Describe the process of bed allocation, transfer, and discharge turnover.",
      options: [
        "Manual tracking",
        "Mixed manual + digital",
        "Fully digital bed board",
        "Varies by ward",
        "No standard process",
      ],
    },
    {
      question: "How do you track real-time bed status across departments?",
      options: [
        "Phone calls",
        "Whiteboard",
        "Digital dashboard",
        "Nursing relay",
        "Not tracked",
      ],
    },
    {
      question: "What causes mismatch between actual and system bed availability?",
      options: [
        "Cleaning delays",
        "Late discharge updates",
        "Transfer coordination",
        "Manual entry errors",
        "Rarely mismatched",
      ],
    },
    {
      question: "How do cleaning and maintenance status updates reach your team?",
      options: [
        "Phone / WhatsApp",
        "Paper logs",
        "Digital housekeeping app",
        "In-person updates",
        "Not consistently",
      ],
    },
    {
      question: "Where do communication delays affect patient movement decisions?",
      options: [
        "ICU to ward",
        "ER to ward",
        "Surgery to ward",
        "Discharge to admission",
        "No major delays",
      ],
    },
    {
      question: "How often do emergency admissions disrupt planned allocations?",
      options: [
        "Very frequent",
        "Often",
        "Sometimes",
        "Rarely",
        "Never",
      ],
    },
    {
      question: "Which data points are required to improve occupancy planning?",
      options: [
        "Discharge forecasts",
        "Admission pipeline",
        "Cleaning turnaround",
        "Bed type availability",
        "Staffing levels",
      ],
    },
    {
      question: "What should JEEVAN NETRA do to optimize bed utilization first?",
      options: [
        "Real-time bed board",
        "Cleaning workflow",
        "Transfer coordination",
        "Discharge planning",
        "Demand forecasting",
      ],
    },
  ],
  hospitalOwnerManagement: [
    {
      question: "What strategic outcomes are you targeting from a centralized hospital system?",
      options: [
        "Operational efficiency",
        "Revenue growth",
        "Better patient experience",
        "Compliance readiness",
        "Multi-site scalability",
      ],
    },
    {
      question: "Which operational inefficiencies have the highest business impact today?",
      options: [
        "Bed turnover delays",
        "Revenue leakage",
        "Staff productivity",
        "Inventory wastage",
        "Long patient waits",
      ],
    },
    {
      question: "What visibility gaps limit your confidence in key decisions?",
      options: [
        "Real-time KPIs",
        "Department performance",
        "Profitability by service",
        "Compliance status",
        "Patient satisfaction",
      ],
    },
    {
      question: "How do you currently review performance across multiple departments or units?",
      options: [
        "Manual reports",
        "Weekly reviews",
        "Monthly dashboards",
        "Ad-hoc meetings",
        "No standard review",
      ],
    },
    {
      question: "Where do you see revenue leakage or avoidable costs?",
      options: [
        "Uncaptured services",
        "Inventory wastage",
        "Claim denials",
        "Underutilized assets",
        "Not sure",
      ],
    },
    {
      question: "What risks related to compliance, quality, or reputation concern you most?",
      options: [
        "Regulatory compliance",
        "Clinical quality outcomes",
        "Patient safety events",
        "Data security",
        "Brand reputation",
      ],
    },
    {
      question: "How should data-driven governance be structured in your hospital?",
      options: [
        "Central data governance",
        "Department-led governance",
        "Hybrid governance model",
        "External audit driven",
        "Not defined",
      ],
    },
    {
      question: "What implementation risks do you foresee for a CHMS rollout?",
      options: [
        "Change resistance",
        "Data migration issues",
        "Downtime risk",
        "Training gaps",
        "Budget overrun",
      ],
    },
    {
      question: "Which metrics should be available on an executive dashboard daily?",
      options: [
        "Occupancy and throughput",
        "Revenue and collections",
        "TAT for key services",
        "Quality and safety",
        "Patient satisfaction",
      ],
    },
    {
      question: "What are your non-negotiable expectations from JEEVAN NETRA?",
      options: [
        "Reliability and uptime",
        "Data accuracy",
        "Ease of use",
        "Security and compliance",
        "Scalability",
      ],
    },
  ],
};
