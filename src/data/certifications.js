/**
 * CREDENTIALS REGISTRY
 *
 * Separated into two distinct categories:
 * 1. CERTIFICATIONS: Technical / professional credentials where you are certified in a skill or technology (e.g. MERN Stack, Java, AWS, Python).
 * 2. CERTIFICATES: Documents proving completion or participation in an experience or program (e.g. Deloitte Job Simulation, internships, workshops, hackathons).
 *
 * How to add new credentials:
 * - Place your certificate file (.pdf, .png, .jpg) in `public/certificates/`.
 * - Add an entry to either CERTIFICATIONS_DATA or CERTIFICATES_DATA below.
 */

/**
 * 1. TECHNICAL / PROFESSIONAL CERTIFICATIONS
 * Skill and technology masteries
 */
export const CERTIFICATIONS_DATA = [
    {
    id: 'cert-apexplanet',
    name: 'Full Stack Web Development',
    issuer: 'ApexPlanet Software Pvt Ltd',
    issueDate: '2026 / July',
    credentialId: 'APSPL2636336',
    credentialUrl: 'https://apexplanet.in/internship/verify/certificate/validate/APSPL2636336',
    previewUrl: '/certificates/ApexPlanet_Certificate_APSPL2636336.pdf',
    previewType: 'pdf',
  },
  {
    id: 'cert-mern-blackbucks',
    name: 'MERN Stack',
    issuer: 'Blackbucks Education Pvt. Ltd.',
    issueDate: '2026 / July',
    credentialId: 'BBEDINT2026ST05107',
    verificationPost: {
      action: 'https://theblackbucks.com/Internships-certificate/search/st2026-search.php',
      method: 'POST',
      target: '_blank',
      enctype: 'multipart/form-data',
      fields: {
        query: 'B24CN133L',
      },
    },
    actionLabel: 'Verify Credential ↗',
    previewUrl: '/certificates/Blackbucks_MernStack.pdf',
    previewType: 'pdf',
  },
  // Future technical certifications (e.g. AWS, Python, Java) can be added here
];

/**
 * 2. PROGRAM & EXPERIENCE CERTIFICATES
 * Internships, job simulations, and participation records
 */
export const CERTIFICATES_DATA = [
  // {
  //   id: 'cert-apexplanet',
  //   name: 'Full Stack Web Development',
  //   issuer: 'ApexPlanet Software Pvt Ltd',
  //   issueDate: '2026 / July',
  //   credentialId: 'APSPL2636336',
  //   credentialUrl: 'https://apexplanet.in/internship/verify/certificate/validate/APSPL2636336',
  //   previewUrl: '/certificates/ApexPlanet_Certificate_APSPL2636336.pdf',
  //   previewType: 'pdf',
  // },
  {
    id: 'cert-deloitte',
    name: 'Data Analytics Job Simulation',
    issuer: 'Deloitte. Australia',
    issueDate: '2026 / June',
    credentialId: '69d9a0ab4e33635ea4a1866f',
    credentialUrl: 'https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_69d9a0ab4e33635ea4a1866f_1781102523527_completion_certificate.pdf',
    previewUrl: '/certificates/deloitte_ceritficate.pdf',
    previewType: 'pdf',
  },
  {
    id: 'cert-omp',
    name: 'Prompt Engineers for AI Systems',
    issuer: 'Dubai One Million Prompters',
    issueDate: '2026 / June',
    credentialId: '3zqs0S5U34hy',
    credentialUrl: 'https://omp.dub.ai/certificate/3zqs0S5U34hy',
    previewUrl: '/certificates/OneMillionPrompters.pdf',
    previewType: 'pdf',
  },
];