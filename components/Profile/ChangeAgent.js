import { LoadingButton } from '@/lib/Button';
import { STYLES } from '@/styles/index';
import CustomModal from '@/util/CustomModal';
import mergeNames from '@/util/mergeNames';
import WhiteBox from '@/util/product/WhiteBox';
import { useDisclosure } from '@chakra-ui/react';
import { BiEdit } from 'react-icons/bi';
import { AtomLabel } from '../createAd/step3/atom';
import FieldPhotoUpload from '../createAd/step3/fieldPhotoUpload';

const FlexDiv = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-2">
      {title}
      {children}
    </div>
  );
};

const ChangeAgent = ({ agent, org, setOrg, setAgent, setImage }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return agent || org ? (
    <CustomModal
      onClose={onClose}
      onOpen={onOpen}
      isOpen={isOpen}
      onclick={onClose}
      btnOpen={
        <>
          {agent && <p>Агент</p>}
          {org && <p>Байгууллага</p>}
          <BiEdit />
        </>
      }
      btnClose={<LoadingButton text="Болсон" />}
      btnClose2="Буцах"
      header="Хэрэглэгчийн төрөл"
    >
      {agent && (
        <>
          <WhiteBox heading="Бөглөх" classnames="grid grid-cols-2 gap-5 ">
            <>
              <FlexDiv title="Байгууллагын нэр">
                <input
                  className={mergeNames(STYLES.input)}
                  ph="Байгууллагын нэр"
                  onChange={(e) =>
                    setAgent((prev) => ({ ...prev, orgName: e.target.value }))
                  }
                />
              </FlexDiv>

              <FlexDiv title="Овог">
                <input
                  className={mergeNames(STYLES.input)}
                  onChange={(e) =>
                    setAgent((prev) => ({ ...prev, firstName: e.target.value }))
                  }
                />
              </FlexDiv>
              <FlexDiv title="Нэр">
                <input
                  className={mergeNames(STYLES.input)}
                  onChange={(e) =>
                    setAgent((prev) => ({ ...prev, lastName: e.target.value }))
                  }
                />
              </FlexDiv>
              <FlexDiv title="Регистрийн дугаар">
                <input
                  className={mergeNames(STYLES.input)}
                  onChange={(e) =>
                    setAgent((prev) => ({ ...prev, register: e.target.value }))
                  }
                />
              </FlexDiv>
              <FlexDiv title="Компанийн байршил хаяг">
                <input
                  className={mergeNames(STYLES.input)}
                  onChange={(e) =>
                    setAgent((prev) => ({ ...prev, location: e.target.value }))
                  }
                />
              </FlexDiv>
            </>
          </WhiteBox>
          <WhiteBox
            heading="Зураг оруулах"
            classnames="grid grid-cols-2 gap-5 "
          >
            <>
              <FlexDiv title="">
                <AtomLabel>Байгууллагатай байгуулсан гэрээ</AtomLabel>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  multiple
                  onChange={(e) =>
                    setAgent((prev) => ({
                      ...prev,
                      orgCertification: [e.target.files[0]],
                    }))
                  }
                />
              </FlexDiv>
              <FlexDiv title="">
                <FieldPhotoUpload
                  label="Иргэний үнэмлэх зураг"
                  setGeneralData={setAgent}
                  setImages={setImage}
                />
              </FlexDiv>
            </>
          </WhiteBox>
        </>
      )}
      {org && (
        <>
          <WhiteBox heading="Бөглөх" classnames="grid grid-cols-2 gap-5 ">
            <>
              <FlexDiv title="Байгууллагын нэр">
                <input
                  className={mergeNames(STYLES.input)}
                  onChange={(e) =>
                    setOrg((prev) => ({ ...prev, orgName: e.target.value }))
                  }
                  ph="Байгууллагын нэр"
                />
              </FlexDiv>

              <FlexDiv title="Байгууллагын регистрийн дугаар">
                <input
                  className={mergeNames(STYLES.input)}
                  onChange={(e) =>
                    setOrg((prev) => ({ ...prev, orgRegister: e.target.value }))
                  }
                  ph="Байгууллагын регистрийн дугаар"
                />
              </FlexDiv>
            </>
          </WhiteBox>
          <WhiteBox
            heading="Зураг оруулах"
            classnames="grid grid-cols-2 gap-5 "
          >
            <FlexDiv title="">
              <AtomLabel>Копманы гэрчилгээ хуулбар</AtomLabel>
              <input
                type="file"
                accept="image/*,application/pdf"
                multiple
                onChange={(e) =>
                  setOrg((prev) => ({
                    ...prev,
                    orgCertification: [e.target.files[0]],
                  }))
                }
              />
            </FlexDiv>
          </WhiteBox>
          <WhiteBox heading="Компаны хаяг">
            <input
              className={mergeNames(STYLES.input, 'min-w-[500px]')}
              type="text"
              placeholder="Нэр"
              onChange={(e) =>
                setOrg((prev) => ({ ...prev, location: e.target.value }))
              }
            />
          </WhiteBox>
        </>
      )}
    </CustomModal>
  ) : (
    <></>
  );
};

export default ChangeAgent;
