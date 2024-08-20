import JSZip from 'jszip'

export function downloadFile(blob: File, filename?: string) {
  const url = typeof blob === 'string' ? blob : URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename || blob.name
  a.click()

  return { filename, blob }
}

export const downloadFiles = async (fileList: File[]) => {
  const zip = new JSZip()

  fileList.forEach((file) => {
    zip.file(file.name, file, {
      date: new Date(file.lastModified)
    })
  })

  const zipBuffer = await zip.generateAsync({
    type: JSZip.support.uint8array ? 'uint8array' : 'string'
  })

  const zipFile = new File([zipBuffer], 'untitled', {
    type: 'application/zip'
  })

  downloadFile(zipFile, 'cooltool.app_downloads.zip')
}

export function getFileExtension(filename: string) {
  const parts = filename.split('.')

  if (parts.length === 1) return ''

  return parts.pop()
}

export const replaceFileExtension = (filename: string, extension: string) => {
  return filename.replace(/\.\w+$/, `.${extension}`)
}

export const removeFileExtension = (filename: string) => {
  return filename.replace(/\.\w+$/, '')
}

export const createDownloadFilename = (filename: string) => {
  const timezoneOffset = new Date().getTimezoneOffset()
  const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60)

  return `/www.cooltool.app_${new Date(
    new Date().getTime() + 1000 * 60 * 60 * offsetHours
  ).toISOString()}_${filename}`
}
