export class ImageImport {
  constructor(quill, options = {}) {
    this.quill = quill
    this.handleDrop = this.handleDrop.bind(this)
    this.handlePaste = this.handlePaste.bind(this)
    this.quill.root.addEventListener('drop', this.handleDrop, false)
    this.quill.root.addEventListener('paste', this.handlePaste, false)
  }
  handleDrop(evt) {
    evt.preventDefault()
    if (evt.dataTransfer && evt.dataTransfer.files && evt.dataTransfer.files.length) {
      this.readFiles(evt.dataTransfer.files, this.insert.bind(this))
    }
  }
  handlePaste(evt) {
    if (evt.clipboardData && evt.clipboardData.items && evt.clipboardData.items.length) {
      this.readFiles(evt.clipboardData.items, dataUrl => {
        const selection = this.quill.getSelection()
        if (selection) {
        } else {
          setTimeout(() => this.insert(dataUrl), 0)
        }
      })
    }
  }
  insert(dataUrl) {
    const index = (this.quill.getSelection() || {}).index || this.quill.getLength()
    this.quill.insertEmbed(index, 'image', dataUrl, 'user')
  }
  readFiles(files, callback) {
    [].forEach.call(files, file => {
      if (!file.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp|vnd\.microsoft\.icon)/i)) {
        return
      }
      const reader = new FileReader()
      reader.onload = (evt) => {
        callback(evt.target.result)
      }
      const blob = file.getAsFile ? file.getAsFile() : file
      if (blob instanceof Blob) {
        reader.readAsDataURL(blob)
      }
    })
  }
}
