export function getFilenameFromHeader(header: Headers) {
  const contentDisposition = header.get("Content-Disposition");
  const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
  const matches = filenameRegex.exec(contentDisposition || "");
  if (matches != null && matches[1]) {
    return decodeURIComponent(matches[1].replace(/['"]/g, "")); // 去掉引号
  }
  return "";
}
