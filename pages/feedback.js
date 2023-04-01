import MainContainer from '@/layout/mainContainer';
import CustomModal from '@/util/CustomModal';
import React from 'react';

const Feedback = () => {
  return;
  {
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      btnOpen={
        <>
          Дараах <FiArrowRight size={20} />
        </>
      }
      onclick={onNext}
      btnClose={'asd'}
      btnClose2="Буцах"
      header="Баталгаажуулах хэсэг"
      btnOpen="Санал хүсэлт"
    />;
  }
};

export default Feedback;
