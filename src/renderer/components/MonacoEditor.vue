<template>
  <div>
    Monaco should show up here 🤞🏻️
    https://github.com/Microsoft/monaco-editor/issues/90
    <!-- <monaco-editor
    class="editor"
    v-model="code"
    :require="amdRequire"
    language="javascript">
    </monaco-editor>-->
  </div>
</template>


 <script>
import MonacoEditor from "vue-monaco";
// This doesnt work because there is no window.nodeRequire
// let nodeRequire = window.nodeRequire
let nodeRequire = window.require;
let sc = document.createElement("script");
sc.setAttribute(
  "src",
  "./../../../node_modules/monaco-editor/min/vs/loader.js"
);
document.head.appendChild(sc);
// // workaround monaco-css not understanding the environment
// self.module = undefined
// // workaround monaco-typescript not understanding the environment
// self.process.browser = true
// I could not get this line to work either??
//
// amdRequire(['vs/editor/editor.main'], function () {
//   var editor = monaco.editor.create(document.getElementById('container'), {
//     value: [
//       'function x() {',
//       '\tconsole.log("Hello world!");',
//       '}'
//     ].join('\n'),
//     language: 'javascript'
//   })
// })
export default {
  components: {
    MonacoEditor
  },
  data: () => ({
    code: "hi"
  }),
  methods: {
    // amdRequire: amdRequire // this.window.require
  }
};
</script>

<style>
.editor {
  width: 600px;
  height: 800px;
}
</style>
