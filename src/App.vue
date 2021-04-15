<template>
  <section id="app">
    <router-view />
  </section>
</template>

<script>
export const absPath = fileNameOrFolder => {
  const path = require('path');
  return path.join(
    process.resourcesPath,
    process.env.NODE_ENV == 'development'
      ? `../../../../${fileNameOrFolder}`
      : `../${fileNameOrFolder}`
  );
};

export default {
  data() {
    return {
      loading: false,
      html: absPath('print/print.html'),
    };
  },
  created() {
    this.$Printer.bindIpcMessage();
  },
};
</script>
