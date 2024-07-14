export interface TranslatedText {
  en: string;
  ka: string;
};

export interface BlogType {
  id: number;
  user_id: number;
  title: TranslatedText;
  description: TranslatedText;
  createdAt: string; // Assuming ISO 8601 string format
  image_url: string;
  approved: boolean;
  type: string;
};

// export interface AddBlogType{
//   user_id: number;
//   title_en: string;
//   title_ka: string;
//   description_en: string;
//   description_ka: string;
//   image_url: string;
//   approved: boolean;
//   type: string;
// }


export interface AddBlogType {
  user_id: number;
  title: TranslatedText;
  description: TranslatedText;
  image_url: string;
  approved: boolean;
  type: string;
};