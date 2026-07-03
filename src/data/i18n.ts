export type Language = 'vi' | 'en' | 'jp';

export const languages: { code: Language; label: string }[] = [
  { code: 'vi', label: 'VI' },
  { code: 'en', label: 'EN' },
  { code: 'jp', label: 'JP' }
];

export const dictionary = {
  vi: {
    nav: {
      services: 'DỊCH VỤ',
      process: 'QUY TRÌNH',
      capabilities: 'NĂNG LỰC',
      contact: 'LIÊN HỆ',
      hotline: 'HOTLINE',
      admin: 'ADMIN'
    },
    hero: {
      badge: 'Software Engineering · System Development',
      titlePrefix: 'Xây dựng hệ thống phần mềm',
      titleSuffix: 'hiện đại cho doanh nghiệp',
      lead:
        'VIORA thiết kế kiến trúc hệ thống, phát triển dashboard quản trị, backend API, website, web application và mobile application theo yêu cầu triển khai thực tế.',
      ctaPrimary: 'Gọi tư vấn dự án',
      ctaSecondary: 'Xem năng lực',
      panel: ['System architecture', 'Backend API', 'Dashboard realtime', 'Pilot deployment'],
      metrics: [
        ['API', 'Backend integration'],
        ['Web', 'Dashboard system'],
        ['Ops', 'Deploy & handover']
      ]
    },
    services: {
      eyebrow: 'Dịch vụ cốt lõi',
      title: 'Từ kiến trúc hệ thống đến triển khai vận hành.',
      text:
        'VIORA tập trung vào các hạng mục kỹ thuật thiết yếu để xây dựng phần mềm có cấu trúc, dễ bảo trì và phù hợp với nhu cầu tăng trưởng của doanh nghiệp.',
      items: [
        {
          title: 'Thiết kế hệ thống',
          eyebrow: 'System Architecture',
          description:
            'Thiết kế kiến trúc backend, database, agent app và dashboard quản trị với định hướng ổn định, bảo mật và dễ mở rộng.',
          items: ['Backend architecture', 'Database design', 'Agent app design', 'Dashboard architecture']
        },
        {
          title: 'Phát triển Dashboard Web',
          eyebrow: 'Management Dashboard',
          description:
            'Xây dựng dashboard quản trị phục vụ theo dõi, điều phối và vận hành thiết bị, ứng dụng và dữ liệu hệ thống.',
          items: ['Quản lý thiết bị', 'Gửi lệnh từ xa', 'Quản lý ứng dụng', 'Theo dõi trạng thái và log']
        },
        {
          title: 'Phát triển API Backend',
          eyebrow: 'Backend API',
          description:
            'Xây dựng hệ thống API phục vụ tích hợp, đồng bộ dữ liệu, xử lý nghiệp vụ và kết nối với các nền tảng liên quan.',
          items: ['RESTful API', 'Authentication', 'Logging', 'Documentation']
        },
        {
          title: 'Website, Web App & Mobile App',
          eyebrow: 'Software Development',
          description:
            'Phát triển, bảo trì và tối ưu website, web application và mobile application theo yêu cầu thực tế của doanh nghiệp.',
          items: ['UI & feature development', 'Database implementation', 'Bug fixing', 'Performance optimization']
        }
      ]
    },
    process: {
      eyebrow: 'Quy trình triển khai',
      title: 'Làm rõ yêu cầu, phát triển có kiểm soát, bàn giao có tài liệu.',
      text:
        'Quy trình được thiết kế để phù hợp với các dự án dashboard, backend, website, web app, mobile app và hệ thống quản trị thiết bị.',
      items: [
        'Phân tích yêu cầu và phạm vi triển khai',
        'Thiết kế giao diện, chức năng và cơ sở dữ liệu',
        'Phát triển backend, frontend và ứng dụng liên quan',
        'Kiểm thử unit test, integration test và UAT',
        'Cài đặt server, domain, CDN nếu cần',
        'Triển khai dashboard quản trị và policy ban đầu',
        'Bàn giao tài liệu và hướng dẫn vận hành'
      ]
    },
    capabilities: {
      eyebrow: 'Năng lực kỹ thuật',
      title: 'Đồng hành từ phát triển đến vận hành.',
      text:
        'VIORA không chỉ lập trình theo yêu cầu, mà còn tham gia phân tích, kiểm thử, tối ưu và bảo trì để hệ thống có thể vận hành ổn định sau khi bàn giao.',
      items: [
        'Thiết kế kiến trúc hệ thống có khả năng mở rộng',
        'Phối hợp triển khai và vận hành sản phẩm phần mềm',
        'Nghiên cứu, áp dụng công nghệ mới vào dự án',
        'Bảo trì, cập nhật và đảm bảo an toàn hệ thống'
      ]
    },
    contact: {
      eyebrow: 'Liên hệ VIORA',
      title: 'Bạn cần xây dựng hệ thống phần mềm cho doanh nghiệp?',
      text:
        'Liên hệ trực tiếp qua hotline hoặc email để trao đổi về phạm vi, kiến trúc, kế hoạch triển khai và phương án bàn giao.',
      phone: 'Hotline',
      email: 'Email hỗ trợ',
      address: 'Địa chỉ'
    },
    footer: {
      rights: 'All rights reserved.'
    }
  },
  en: {
    nav: {
      services: 'SERVICES',
      process: 'PROCESS',
      capabilities: 'CAPABILITIES',
      contact: 'CONTACT',
      hotline: 'HOTLINE',
      admin: 'ADMIN'
    },
    hero: {
      badge: 'Software Engineering · System Development',
      titlePrefix: 'Build modern software systems',
      titleSuffix: 'for growing businesses',
      lead:
        'VIORA designs system architecture, management dashboards, backend APIs, websites, web applications and mobile applications for real-world business deployment.',
      ctaPrimary: 'Call for consultation',
      ctaSecondary: 'View capabilities',
      panel: ['System architecture', 'Backend API', 'Realtime dashboard', 'Pilot deployment'],
      metrics: [
        ['API', 'Backend integration'],
        ['Web', 'Dashboard system'],
        ['Ops', 'Deploy & handover']
      ]
    },
    services: {
      eyebrow: 'Core services',
      title: 'From system architecture to operational deployment.',
      text:
        'VIORA focuses on essential engineering work to build structured, maintainable and scalable software systems.',
      items: [
        {
          title: 'System Architecture',
          eyebrow: 'System Architecture',
          description:
            'Backend, database, agent app and dashboard architecture designed for stability, security and scalability.',
          items: ['Backend architecture', 'Database design', 'Agent app design', 'Dashboard architecture']
        },
        {
          title: 'Dashboard Web Development',
          eyebrow: 'Management Dashboard',
          description:
            'Management dashboards for monitoring, coordinating and operating devices, applications and system data.',
          items: ['Device management', 'Remote commands', 'Application management', 'Status and log monitoring']
        },
        {
          title: 'Backend API Development',
          eyebrow: 'Backend API',
          description:
            'API systems for integration, data synchronization, business logic processing and platform connectivity.',
          items: ['RESTful API', 'Authentication', 'Logging', 'Documentation']
        },
        {
          title: 'Website, Web App & Mobile App',
          eyebrow: 'Software Development',
          description:
            'Development, maintenance and optimization of websites, web applications and mobile applications.',
          items: ['UI & feature development', 'Database implementation', 'Bug fixing', 'Performance optimization']
        }
      ]
    },
    process: {
      eyebrow: 'Delivery process',
      title: 'Clear requirements, controlled development and documented handover.',
      text:
        'A process suitable for dashboard, backend, website, web app, mobile app and device management projects.',
      items: [
        'Analyze requirements and implementation scope',
        'Design interfaces, features and database',
        'Develop backend, frontend and related applications',
        'Run unit tests, integration tests and UAT',
        'Set up server, domain and CDN if needed',
        'Deploy admin dashboard and initial policies',
        'Handover documentation and operation guide'
      ]
    },
    capabilities: {
      eyebrow: 'Technical capabilities',
      title: 'Supporting products from development to operation.',
      text:
        'VIORA participates in analysis, development, testing, optimization and maintenance so the system can operate reliably after delivery.',
      items: [
        'Design scalable system architecture',
        'Coordinate product deployment and operation',
        'Research and apply new technologies',
        'Maintain, update and secure software systems'
      ]
    },
    contact: {
      eyebrow: 'Contact VIORA',
      title: 'Need to build a business software system?',
      text:
        'Contact us directly by hotline or email to discuss scope, architecture, implementation plan and handover approach.',
      phone: 'Hotline',
      email: 'Support email',
      address: 'Address'
    },
    footer: {
      rights: 'All rights reserved.'
    }
  },
  jp: {
    nav: {
      services: 'サービス',
      process: 'プロセス',
      capabilities: '技術力',
      contact: 'お問い合わせ',
      hotline: '電話',
      admin: '管理'
    },
    hero: {
      badge: 'Software Engineering · System Development',
      titlePrefix: '企業向けの最新ソフトウェアシステムを',
      titleSuffix: '設計・開発します',
      lead:
        'VIORAは、実運用を見据えたシステムアーキテクチャ、管理ダッシュボード、バックエンドAPI、Webサイト、Webアプリケーション、モバイルアプリを開発します。',
      ctaPrimary: '電話で相談する',
      ctaSecondary: '技術力を見る',
      panel: ['システム設計', 'バックエンドAPI', 'リアルタイムダッシュボード', 'パイロット導入'],
      metrics: [
        ['API', 'バックエンド連携'],
        ['Web', '管理ダッシュボード'],
        ['Ops', '導入・引き継ぎ']
      ]
    },
    services: {
      eyebrow: '主要サービス',
      title: 'システム設計から導入・運用まで対応します。',
      text:
        'VIORAは、保守性・拡張性・安定性を重視したソフトウェア開発を行います。',
      items: [
        {
          title: 'システム設計',
          eyebrow: 'System Architecture',
          description:
            '安定性、セキュリティ、拡張性を考慮し、バックエンド、データベース、エージェントアプリ、ダッシュボードを設計します。',
          items: ['バックエンド設計', 'データベース設計', 'エージェントアプリ設計', 'ダッシュボード設計']
        },
        {
          title: 'ダッシュボード開発',
          eyebrow: 'Management Dashboard',
          description:
            'デバイス、アプリケーション、システムデータの監視・管理・運用を支援する管理画面を構築します。',
          items: ['デバイス管理', 'リモートコマンド', 'アプリ管理', '状態・ログ監視']
        },
        {
          title: 'APIバックエンド開発',
          eyebrow: 'Backend API',
          description:
            '外部連携、データ同期、業務ロジック処理、プラットフォーム接続に対応するAPIを開発します。',
          items: ['RESTful API', '認証', 'ログ管理', 'ドキュメント']
        },
        {
          title: 'Web・モバイルアプリ開発',
          eyebrow: 'Software Development',
          description:
            'Webサイト、Webアプリケーション、モバイルアプリケーションの開発・保守・最適化を行います。',
          items: ['UI・機能開発', 'データベース実装', 'バグ修正', 'パフォーマンス最適化']
        }
      ]
    },
    process: {
      eyebrow: '導入プロセス',
      title: '要件を明確化し、管理された開発と文書化された引き継ぎを行います。',
      text:
        'ダッシュボード、バックエンド、Webサイト、Webアプリ、モバイルアプリ、デバイス管理システムに適したプロセスです。',
      items: [
        '要件と導入範囲の分析',
        '画面、機能、データベースの設計',
        'バックエンド、フロントエンド、関連アプリの開発',
        '単体テスト、結合テスト、UATの実施',
        '必要に応じてサーバー、ドメイン、CDNを設定',
        '管理ダッシュボードと初期ポリシーを導入',
        'ドキュメントと運用ガイドの引き継ぎ'
      ]
    },
    capabilities: {
      eyebrow: '技術力',
      title: '開発から運用までサポートします。',
      text:
        'VIORAは、納品後も安定運用できるよう、分析、開発、テスト、最適化、保守に対応します。',
      items: [
        '拡張可能なシステムアーキテクチャ設計',
        'ソフトウェア製品の導入・運用支援',
        '新技術の調査と適用',
        'システムの保守、更新、セキュリティ対応'
      ]
    },
    contact: {
      eyebrow: 'VIORAへのお問い合わせ',
      title: '企業向けソフトウェアシステムの構築をご検討ですか？',
      text:
        'スコープ、アーキテクチャ、導入計画、引き継ぎ方法について、電話またはメールでご相談ください。',
      phone: '電話',
      email: 'サポートメール',
      address: '住所'
    },
    footer: {
      rights: 'All rights reserved.'
    }
  }
} as const;
