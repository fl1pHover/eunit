import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { Image, Input, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';

const ImageUploader = ({images, setImages}) => {
  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    setImages((images) => [...images, selectedFiles[0]]);
    // FOR BUG IN CHROME
    console.log(images);
    event.target.value = '';
  };

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  const [selectedImages, setSelectedImages] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);

  return (
    <VStack
      className={mergeNames(
        'border-2 border-dotted border-blue-400 bg-blue-100/50 rounded-xl outline-none p-2 md:p-4 min-h-[30vh] min-w-[40vw]',
        STYLES.flexCenter,
        'flex-col items-center',
        'relative overflow-hidden'
      )}
    >
      <FiUploadCloud
        size={90}
        className="absolute text-blue-400 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
      />
      <Input
        type={'file'}
        className="absolute w-full h-full opacity-0 cursor-pointer z-2"
        accept="image/png, image/jpg, image/jpeg"
        multiple
        onChange={(e) => onSelectFile(e)}
      />

      <div className="flex flex-wrap justify-center gap-3 md:gap-3">
        {selectedImages?.map((image, index) => {
          return (
            <div
              className="relative w-[100px] h-[100px] border-2 border-blue-300"
              position="relative"
              key={index}
            >
              <Image
                src={image}
                className="object-cover w-full h-full"
                alt="upload"
              />
              <div
                className="absolute delete -top-[10px] -right-[10px] rounded-full hover:bg-red-600 bg-red-500 ring-red-200 z-10 cursor-pointer"
                onClick={() => deleteHandler(image)}
              />
            </div>
          );
        })}
      </div>
    </VStack>
  );
};

export default ImageUploader;
