import {
  boolean,
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
export const versionEnum = pgEnum('version', [
  'Studio',
  'Live',
  'Acoustic',
  'Remix',
  'Extended Version',
]);

export const imageTypeEnum = pgEnum('image_type', [
  'References',
  'Primary Artists',
  'Featuring Artists',
]);

export const contractStatusEnum = pgEnum('contract_status', [
  'Pending',
  'Concluded',
  'Waiting for signature',
]);

export const contractTypeEnum = pgEnum('contract_type', [
  'exclusive',
  'unique',
]);

export const fileMusicTypeEnum = pgEnum('file_music_type', ['Image', 'Audio']);

export const pixStatusEnum = pgEnum('pix_status', [
  'accepted',
  'rejected',
  'pending',
]);

export const bankStatusEnum = pgEnum('bank_status', ['active', 'inactive']);

export const pixTypeEnum = pgEnum('pix_type', [
  'email',
  'telephone',
  'document',
  'random',
]);
export const accountTypeEnum = pgEnum('account_type', ['savings', 'checking']);

export const biographyTypeEnum = pgEnum('biography_type', [
  'Biography',
  'Release',
]);

export const fileTypeEnum = pgEnum('file_type', ['docx', 'PDF']);

export const inviteStatusEnum = pgEnum('invite_status', [
  'pending',
  'accepted',
  'rejected',
]);

export const personTypeEnum = pgEnum('person_type', ['physical', 'legal']);

export const socialTypeEnum = pgEnum('social_type', [
  'CPF',
  'Passport',
  'CAE',
  'IPI',
  'CNPJ',
]);

export const songwriterContractTypeEnum = pgEnum('songwriter_contract_type', [
  'Exclusive',
  'By Work',
]);

export const songwriterIsNewMusicEnum = pgEnum('songwriter_new_music', [
  'Yes',
  'No',
  'I dont know',
]);

export const releaseFormatEnum = pgEnum('release_format', [
  'Single',
  'EP',
  'Album',
]);

export const releaseStatusEnum = pgEnum('release_status', [
  'pending',
  'pending validation',
  'validated',
  'distribuited',
  'blocked',
  'correction',
]);

export const contentTypeEnum = pgEnum('content_type', ['Audio', 'Video']);

export const languagesEnum = pgEnum('languages', [
  'Português (Brasil)',
  'Afrikaans',
  'Alemão',
  'Amárico',
  'Árabe',
  'Armênio',
  'Azerbaijano',
  'Basco',
  'Bengali',
  'Búlgaro',
  'Cantonês',
  'Catalão',
  'Coreano',
  'Croata',
  'Dinamarquês',
  'Eslovaco',
  'Esloveno',
  'Espanhol',
  'Espanhol (Espanha)',
  'Espanhol (México)',
  'Espanhol (Argentina)',
  'Espanhol (Colômbia)',
  'Espanhol (Chile)',
  'Espanhol (Peru)',
  'Espanhol (Venezuela)',
  'Espanhol (Equador)',
  'Espanhol (Cuba)',
  'Espanhol (República Dominicana)',
  'Espanhol (Panamá)',
  'Espanhol (Uruguai)',
  'Espanhol (Paraguai)',
  'Espanhol (Costa Rica)',
  'Espanhol (Bolívia)',
  'Espanhol (Honduras)',
  'Espanhol (Nicarágua)',
  'Espanhol (El Salvador)',
  'Espanhol (Guatemala)',
  'Espanhol (Puerto Rico)',
  'Filipino',
  'Finlandês',
  'Francês',
  'Galego',
  'Georgiano',
  'Grego',
  'Guarani',
  'Gujarati',
  'Hebraico',
  'Hindi',
  'Holandês',
  'Húngaro',
  'Indonésio',
  'Inglês',
  'Inglês (EUA)',
  'Inglês (Reino Unido)',
  'Inglês (Austrália)',
  'Inglês (Canadá)',
  'Inglês (Irlanda)',
  'Inglês (Nova Zelândia)',
  'Islandês',
  'Italiano',
  'Japonês',
  'Javanês',
  'Kannada',
  'Khmer Central',
  'Lao',
  'Latim',
  'Letão',
  'Lituano',
  'Malaiala',
  'Malaio',
  'Mandarim',
  'Marathi',
  'Nepalês',
  'Norueguês',
  'Pig Latin',
  'Polonês',
  'Português',
  'Português (Portugal)',
  'Português (Angola)',
  'Português (Moçambique)',
  'Português (Cabo Verde)',
  'Português (Guiné-Bissau)',
  'Português (São Tomé e Príncipe)',
  'Português (Timor-Leste)',
  'Português (Macau)',
  'Romeno',
  'Russo',
  'Sérvio',
  'Sinhalês',
  'Sueco',
  'Sundanês',
  'Swahili',
  'Taiwan Tradicional',
  'Tamil',
  'Tcheco',
  'Telugu',
  'Thai (Tailândia)',
  'Turco',
  'Ucraniano',
  'Urdu',
  'Vietnamita',
  'Yue',
  'Zulu',
]);

export const tokenTypeEnum = pgEnum('token_type', [
  'Password Recovery',
  'Google',
]);

export const isExplicitEnum = pgEnum('is_explicit_enum', [
  'Sim',
  'Não',
  'Versão Limpa',
]);
export const trackTypeEnum = pgEnum('track_type', [
  'Original',
  'Cover',
  'Cover by cover artist',
  'Medley',
  'Karaoke',
]);

export const userStatusEnum = pgEnum('user_status', [
  'active',
  'inactive',
  'deleted',
  'waiting',
]);

export const roleEnum = pgEnum('role', [
  'owner',
  'admin',
  'manager',
  'editor',
  'user',
]);
