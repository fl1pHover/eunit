import {
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { Tabs } from 'flowbite-react';
import { useState } from 'react';

import { BiUser } from 'react-icons/bi';
import { BsTelephone } from 'react-icons/bs';

const GroupLayout = ({ title, children }) => (
  <div className="flex flex-col gap-1">
    <Heading variant="smallHeading">{title}</Heading>
    {children}
  </div>
);

const Group = ({ placeholder, icon, phone }) => {
  return (
    <InputGroup>
      {phone}
      <Input
        placeholder={placeholder}
        variant="flushed"
        focusBorderColor="mainBlossom"
      />
      <InputRightElement>
        {/* <BiUser color="green.500" /> */}
        {icon}
      </InputRightElement>
    </InputGroup>
  );
};

const Item = ({ children, className }) => {
  return (
    <div className={`${className} grid grid-cols-2 py-5 gap-x-20 gap-y-10 `}>
      {children}
    </div>
  );
};

const Profile = () => {
  const [expand, setExpand] = useState(false);
  console.log(expand);

  return (
    <div
      className={`${
        expand ? 'w-[100%]' : 'w-[50%]'
      } flex rounded-xl bg-white p-5 shadow-md transition-all duration-200`}
    >
      <Tabs.Group
        aria-label="Tabs with underline"
        style="underline"
        onClick={() => setExpand(!expand)}
      >
        <Tabs.Item active={true} title="Хувийн мэдээлэл" height="100%">
          {/* <Heading variant={'mediumHeading'}>Хувийн мэдээлэл</Heading> */}

          <div className="items-end h-full flex-col-justify-between">
            <Item>
              <GroupLayout title="Овог Нэр">
                <Group placeholder="Lorem lorem" icon={<BiUser />} />
              </GroupLayout>
              <GroupLayout title="Утас">
                <Group
                  placeholder="0000-0000"
                  phone={<InputLeftAddon className="px-2">+976</InputLeftAddon>}
                  icon={<BsTelephone />}
                />
              </GroupLayout>

              <GroupLayout title="Хэрэглэгчийн төрөл">
                <RadioGroup>
                  <Stack spacing={5} direction="row" height="40px">
                    <Radio>Энгийн</Radio>
                    <Radio>Байгууллага</Radio>
                  </Stack>
                </RadioGroup>
              </GroupLayout>
              <GroupLayout title="Төрсөн өдөр">
                <Input type="date" />
              </GroupLayout>
            </Item>
          </div>
          <button className="float-right h-full">asd</button>
        </Tabs.Item>
        <Tabs.Item title="Миний зарууд">Миний зарууд</Tabs.Item>
        <Tabs.Item title="Хүсэл">Хүсэл</Tabs.Item>
        <Tabs.Item title="Хэтэвч">Хэтэвч</Tabs.Item>
      </Tabs.Group>
    </div>
  );
};

export default Profile;
