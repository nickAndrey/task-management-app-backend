import DTO from '../types/dto.type';

const chatCreateDto: DTO = {
  sender_id: {
    required: true,
  },

  recipient_id: {
    required: true,
  },

  message: {
    required: true,
  },
};

export default chatCreateDto;
