import { AtomLabel } from '@/components/createAd/step3/atom';
import React from 'react';
import { BiX } from 'react-icons/bi';
import { MdPictureAsPdf } from 'react-icons/md';

const SharingUpload = ({
  label,
  onChange,
  generalData = {},
  setImages = () => {},
  images = [],
  setGeneralData = () => {},
}) => {
  const hiddenFileInput = React.useRef(null);
  // saving IMAGES locally
  const [selectedImages, setSelectedImages] = React.useState(
    generalData.images || []
  );
  const [isImageSelected, setIsImageSelected] = React.useState(
    generalData?.imgSelected
  );

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files;
    const selectedFilesArray = Array.from(fileUploaded);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setSelectedImages((previousImages) => [...previousImages, ...imagesArray]);
    setImages((images) => [...images, fileUploaded[0]]);

    // FOR BUG IN CHROME
    event.target.value = '';
    setIsImageSelected(true);
    setGeneralData((prev) => ({
      ...prev,
      imgSelected: true,
      images: [...prev.images, ...imagesArray],
    }));
  };

  function deleteHandler(image) {
    // IF ALL IMAGES ARE GONE, SETTING STATUS FALSE
    if (selectedImages?.length === 1) {
      setGeneralData((prev) => ({ ...prev, imgSelected: false }));
      setIsImageSelected(false);
    }
    setSelectedImages(selectedImages.filter((e) => e !== image));
    if (images) setImages(images.filter((e) => e !== image));
    setGeneralData((prev) => ({
      ...prev,
      imgSelected: true,
      images: selectedImages.filter((e) => e !== image),
    }));

    URL.revokeObjectURL(image);
  }

  return (
    <div className="">
      <AtomLabel>{label ? label : 'PDF зураг оруулах'}</AtomLabel>
      <>
        <input
          type="file"
          name="upload"
          accept="application/pdf"
          ref={hiddenFileInput}
          style={{ display: 'none' }}
          multiple
          onChange={onChange}
        />
        {isImageSelected ? (
          <div className="grid w-full h-full grid-cols-2 gap-4 p-4 overflow-hidden border-2 border-blue-400 border-dotted outline-none md:grid-cols-3 bg-blue-100/50 rounded-xl">
            {selectedImages.map((image, key) => {
              console.log(image);
              return (
                <div
                  key={key}
                  className="h-[40vh] relative rounded-md flex justify-center items-center"
                >
                  <img
                    src={image}
                    alt="image"
                    className="object-cover object-center w-full h-full overflow-hidden bg-gray-300 rounded-md"
                  />
                  <button
                    onClick={() => deleteHandler(image)}
                    className="absolute text-white transition-all bg-gray-500 rounded-full -bottom-2 -right-2 hover:bg-red-500"
                  >
                    <BiX size={30} />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <button
            onClick={handleClick}
            className="border-2 w-full min-h-[40vh] h-full border-dotted border-blue-400 bg-blue-100/50 rounded-xl outline-none p-4 flex flex-col justify-center items-center"
          >
            <MdPictureAsPdf size={90} className="text-blue-400" />
            <p>Зураг оруулах</p>
          </button>
        )}
      </>
    </div>
  );
};

export default SharingUpload;
