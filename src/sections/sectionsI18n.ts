import type { Language } from '../data/i18n';

export const contactDictionary = {
  vi: {
    name: 'VIORA',
    legalName: 'VIORA CO., LTD',
    field: 'Sản xuất phần mềm',
    email: 'viora.co.ltd@gmail.com',
    phone: '0365048367',
    address: 'Tầng 9, tòa Detech Tower 2, số 107 đường Nguyễn Phong Sắc, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Hà Nội'
  },
  en: {
    name: 'VIORA',
    legalName: 'VIORA CO., LTD',
    field: 'Software Development',
    email: 'viora.co.ltd@gmail.com',
    phone: '0365048367',
    address: '9th Floor, Detech Tower 2, 107 Nguyen Phong Sac Street, Dich Vong Hau Ward, Cau Giay District, Hanoi, Viet Nam'
  },
  jp: {
    name: 'VIORA',
    legalName: 'VIORA CO., LTD',
    field: 'ソフトウェア開発',
    email: 'viora.co.ltd@gmail.com',
    phone: '0365048367',
    address: '9階、Detech Tower 2、107 Nguyen Phong Sac Street、Dich Vong Hau Ward、Cau Giay District、ハノイ、 ベトナム'
  }
} as const;

export function getContactText(language: Language) {
  return contactDictionary[language];
}
