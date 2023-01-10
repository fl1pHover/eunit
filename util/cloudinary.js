import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
const cld = new Cloudinary({
  cloud: {
    cloudName: 'BOM'
  }
});
export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: () => {
    return v2.config({
        cloud_name: 'dosvc4rce', 
        api_key: '418226341632639', 
        api_secret: 'RnQ2lcc8SA_UyM8jsq1VVOjfkiM' 
    });
  },
};

export const  uploadImage = async (file) => {
  const promise = await new Promise((resolve, reject) => {
    const upload = v2.uploader.upload_stream((error, result) => {
      if (error) return reject(error);
      resolve(result);
    });

    toStream(file.buffer).pipe(upload);
  }).then((r) => r['secure_url']);
  return promise;
}