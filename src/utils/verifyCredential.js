/**
 * Dynamically creates and submits a hidden HTML form using POST in a new window/tab.
 * Used for external credential validation services (like Blackbucks) that require POST requests.
 *
 * @param {Object} config
 * @param {string} config.action - Target POST endpoint URL
 * @param {Record<string, string>} config.fields - Key-value map of form fields
 * @param {string} [config.enctype='multipart/form-data'] - Encoding type
 * @param {string} [config.target='_blank'] - Target window/tab
 */
export const submitPostVerification = ({
  action,
  fields = {},
  enctype = 'multipart/form-data',
  target = '_blank',
}) => {
  if (typeof document === 'undefined' || !action) return;

  const form = document.createElement('form');
  form.action = action;
  form.method = 'POST';
  form.target = target;
  form.enctype = enctype;
  form.style.display = 'none';

  Object.entries(fields).forEach(([name, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = String(value);
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};
