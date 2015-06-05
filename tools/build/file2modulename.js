function file2moduleName(filePath) {
  return filePath.replace(/\\/g, '/')
    // module name should be relative to `modules` and `tools` folder
    .replace(/.*\/base\//, '')
    .replace(/\.js$/, '')
}
if (typeof module !== 'undefined') {
  module.exports = file2moduleName;
}
