export type ExpEntry = {
  id: string
  company: string
  role: string
  period: string
  points: string[]
}

// Single source of truth: the home page shows the first entry in full, the
// /experience page shows every entry. Newest first.
//
// Bullets stay deliberately high level — the mechanism, never the magnitude.
// Numbers live in the resume, which is sent on request.
export const allExperience: ExpEntry[] = [
  {
    id: "amazon",
    company: "Amazon Lab126",
    role: "Software Engineer Intern",
    period: "Jun — Sep 2026",
    points: [
      "Shipped a C++ on-device speaker identification module to a production vehicle fleet, off the response path.",
      "Quantized the embedding model to INT8 ONNX for real-time recognition on ARM silicon.",
      "Built an MLOps loop fed by fleet data for continuous fine-tuning of SLMs, ASR and TTS.",
    ],
  },
  {
    id: "amazon-leo",
    company: "Amazon Leo",
    role: "ML Engineering Lead",
    period: "Jan — May 2026",
    points: [
      "Forecasted G7 space policy a year out with a three-model time-series ensemble.",
      "Built an ETL turning a data lake into a queryable database, and smoothed signals temporally to cut Type I errors.",
    ],
  },
  {
    id: "gdit",
    company: "General Dynamics Information Technology",
    role: "Software Engineer Intern",
    period: "Jun — Aug 2025",
    points: [
      "Deployed a zero-to-one edge vision module detecting vehicles and streaming geospatial telemetry to connected users.",
      "Held out-of-sample accuracy on noisy sensor data through projected gradient descent adversarial training.",
      "Architected a thread-safe, quantized three-stage pipeline running on a TPU over live video feeds.",
    ],
  },
  {
    id: "gdit-lead",
    company: "General Dynamics Information Technology",
    role: "Engineering Project Lead",
    period: "Jan — May 2025",
    points: [
      "Led a team of engineers shipping a hybrid graph and vector RAG pipeline over an agency record corpus to analysts.",
      "Raised retrieval accuracy with custom chunking and named-entity recognition, cutting analyst discovery time.",
    ],
  },
  {
    id: "bah",
    company: "Booz Allen Hamilton",
    role: "Engineering Project Manager",
    period: "Sep — Dec 2024",
    points: [
      "Automated medical policy audits with summarization and sentiment analysis pipelines.",
      "Built a full-stack, human-in-the-loop scraping and audit pipeline to cut manual review time.",
    ],
  },
  {
    id: "irs",
    company: "Internal Revenue Service",
    role: "Software Engineer Intern",
    period: "Jan — Dec 2024",
    points: [
      "Upgraded division-wide Jenkins CI/CD (JDK 11 to 17) for fraud detection across national tax applications.",
      "Cut build times for the division by migrating a twenty-year-old Java system from Ant to Maven.",
    ],
  },
]
