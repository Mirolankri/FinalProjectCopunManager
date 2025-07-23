const copyToClipboard = (code, AlertInstance) => {
  navigator.clipboard.writeText(code);
  AlertInstance("SUCCESS", "הקוד הועתק ללוח");
};

export { copyToClipboard };
