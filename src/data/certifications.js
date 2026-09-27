/**
 * CERTIFICATIONS REGISTRY
 *
 * How to add your certificates:
 * 1. Place your certificate image (.png, .jpg) or PDF (.pdf) in the `public/certificates/` folder.
 * 2. Add an object to the CERTIFICATIONS_DATA array below.
 *
 * Example:
 * {
 *   id: 'python-ibm',
 *   name: 'Python for Data Science',
 *   issuer: 'IBM',
 *   issueDate: '2024 / June',
 *   credentialId: 'ABC-12345',                          // Optional: Leave empty '' if none
 *   credentialUrl: 'https://coursera.org/verify/XXXX',   // Optional: External verification link
 *   previewUrl: '/certificates/my-python-cert.png',     // Path to file inside public/certificates/
 *   previewType: 'image',                                // 'image' or 'pdf'
 * }
 */

export const CERTIFICATIONS_DATA = [
    {
    id: 'cert-1',
    name: 'Full Stack Web Development',
    issuer: 'Meta',
    issueDate: '2024 / August',
    credentialId: 'APSPL2636336',
    credentialUrl: 'https://apexplanet.in/internship/verify/certificate/validate/APSPL2636336',
    previewUrl: '/certificates/ApexPlanet_Certificate_APSPL2636336.pdf',
    previewType: 'pdf',                               // Renders embedded PDF viewer
  },
  // {
  //   id: 'cert-2',
  //   name: 'Prompt Engineers for AI Systems',
  //   issuer: 'Dubai One Million Prompters',
  //   issueDate: '2026 / June',
  //   credentialId: 'ABC-12345',                       // Optional (can be left as '')
  //   credentialUrl: 'https://omp.dub.ai/certificate/3zqs0S5U34hy', // Optional: external verification link
  //   previewUrl: '/certificates/OneMillionPrompters.pdf',      // File inside public/certificates/
  //   previewType: 'pdf',                             // 'image' or 'pdf'
  // },
  // {
  //   id: 'cert-2',
  //   name: 'Full Stack Web Development',
  //   issuer: 'Meta',
  //   issueDate: '2024 / August',
  //   credentialId: 'XYZ-98765',
  //   credentialUrl: 'https://coursera.org/verify/...',
  //   previewUrl: '/certificates/meta-fullstack.pdf',
  //   previewType: 'pdf',                               // Renders embedded PDF viewer
  // },
  // Copy and paste more as needed...
];