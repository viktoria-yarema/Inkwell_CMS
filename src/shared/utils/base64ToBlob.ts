export const getBase64ToBlob = async (base64: string) => {
  const url = await fetch(base64);
  const blob = await url.blob();
  return blob;
  //   const [header, base64String] = dataUrl.split(",");
  //   const mimeMatch = header.match(/:(.*?);/);
  //   if (!mimeMatch) {
  //     throw new Error("Invalid data URL");
  //   }
  //   const mime = mimeMatch[1];
  //   const byteString = atob(base64String);
  //   const ab = new Uint8Array(byteString.length);
  //   for (let i = 0; i < byteString.length; i++) {
  //     ab[i] = byteString.charCodeAt(i);
  //   }
  //   return new Blob([ab], { type: mime });
};
