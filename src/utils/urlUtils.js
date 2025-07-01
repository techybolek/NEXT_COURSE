export const encodeUrlId = (id) => {
  // Replace dots with underscores for URL safety
  return id.toString().replace(/\./g, '_');
};

export const decodeUrlId = (encodedId) => {
  // Replace underscores back to dots
  return encodedId.replace(/_/g, '.');
}; 